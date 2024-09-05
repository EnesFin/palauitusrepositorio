import { Text, FlatList } from 'react-native';
import { ME } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import ReviewItem from './ReviewItem';

const MyReviews = () => {
    const { data, error, loading } = useQuery(ME, { variables: {includeReviews: true} });
    
    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error fetching repositories: {error.message}</Text>;

    if(!data.me)
      return <Text>Please sign in to view your reviews</Text>

    const reviews = data.me.reviews.edges;
    
    return (
      <>
      { reviews.length > 0 ?         
      <FlatList
          data={reviews}
          renderItem={({ item }) => <ReviewItem review={item.node} showRepoName={true}/>}
        />
        :
        <Text>You don't have any reviews</Text>

      }
     </>
    );
    
}; 

export default MyReviews; 