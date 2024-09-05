import { View, StyleSheet } from 'react-native';
import Text from './Text';
import { Button, Alert } from 'react-native';
import { useNavigate } from 'react-router-native';
import { DELETE_REVIEW } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
import { ME } from '../graphql/queries';

const ReviewItem = ({review, showRepoName}) => {
    const navigate = useNavigate();
    const [mutate, result] = useMutation(DELETE_REVIEW);

    const styles = StyleSheet.create({
        ratingCircle: {
            borderWidth: 4,
            borderColor: '#28629f',
            borderRadius: 50,
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 0,
            marginRight: 20,
            backgroundColor: 'white'
        },

        rating:{
            fontSize: 32
        },

        flexRow: {
            flexDirection: "row"
        },

        flexColumn: {
            flexDirection: "column",
            flex: 1
        },

        username:{
            fontWeight: 'bold'
        },

        createdAt:{
            color: 'grey'
        },

        textContainer: {

        },

        text:{

        },

        repoName:{
            fontWeight: 'bold'
        },

        buttonContainer:{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 40,
            marginBottom: 20,
            justifyContent: 'space-around'
        },

        deleteButton:{
            color:'red'
        }
        });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const calculateFontSize = (rating) => {
        let baseFontSize = 32;
        
        if (rating >= 100) {
            baseFontSize = 24;
        }

        return baseFontSize;
    };

    const NavigateToRepo = () => {
        navigate(`/repos/${review.repository.id}`)
    }

    const createTwoButtonAlert = () =>
    Alert.alert('Delete Review', 'Are you sure you want to delete this review?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },

      {text: 'Yes', onPress: () => DeleteRepo()},
    ]);


    const DeleteRepo = async () => {
        const response = await mutate({ variables: {
            id: review.id
          },
          refetchQueries: [{ query: ME, variables: {includeReviews: true} }]
        });
    }

  return (
    <View style={{marginVertical: 5, padding: 20, backgroundColor: '#defafd'}}>
        <View style={styles.flexRow}>
            <View style={styles.ratingCircle}>
                <Text style={[styles.rating, { fontSize: calculateFontSize(review.rating) }]}>{review.rating}</Text>
            </View>
            <View style={styles.flexColumn}>
                {showRepoName && <Text style={styles.repoName}>{review.repository.fullName}</Text>}
                {!showRepoName && <Text style={styles.username}>{review.user.username}</Text>}
                <Text style={styles.createdAt}>{formatDate(review.createdAt)}</Text>
                <View style={styles.textContainer}>
                        <Text style={styles.text}>{review.text}</Text>
                </View>
            </View>
       
        </View>
        {showRepoName &&
                <View style={styles.buttonContainer}>
                    <Button onPress={NavigateToRepo} title="View Repository"><Text>View Repository</Text></Button>
                    <Button onPress={createTwoButtonAlert} color="darkred" title="Delete Review"><Text>Delete Review</Text></Button>
                </View>
            }
    </View>
  );
}

export default ReviewItem;