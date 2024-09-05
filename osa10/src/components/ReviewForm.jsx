import Text from './Text';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { LEAVE_REVIEW } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';
import { GET_REPOSITORIES } from '../graphql/queries';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      width: '80%',
      height: 40,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    button: {
      backgroundColor: 'blue',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  
const initialValues = {
    repoOwnerName: '',
    repoName: '',
    rating: '',
    review: ''
  };
  
  const validationSchema = yup.object().shape({
      repoOwnerName: yup
          .string()
          .required('Repository owner name is required'),  
  
      repoName: yup 
          .string()
          .required('Repository name is required'),

        rating: yup 
        .number()
        .required('Rating is required')
        .min(0, 'Rating must be greater than or equal to 0')
        .max(100, 'Rating must be less than or equal to 100'),

        review: yup
        .string()
    });

const ReviewForm = () => {
  const [mutate, result] = useMutation(LEAVE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async () => {
    const review = {
      ownerName: formik.values.repoOwnerName,
      repositoryName: formik.values.repoName,
      rating: Number(formik.values.rating),
      text: formik.values.review
    };

    console.log("review", review);

    const response = await mutate({ variables: {
        ownerName: review.ownerName,
        repositoryName: review.repositoryName,
        rating: review.rating,
        text: review.text
      },
      refetchQueries: [{ query: GET_REPOSITORIES }]
    });
    navigate(`/repos/${response.data.createReview.repositoryId}`)
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Repository Owner Name"
        value={formik.values.repoOwnerName}
        onChangeText={formik.handleChange('repoOwnerName')}
      />
      {formik.touched.repoOwnerName && formik.errors.repoOwnerName && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.repoOwnerName}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Repository Name"
        value={formik.values.repoName}
        onChangeText={formik.handleChange('repoName')}
      />
      {formik.touched.repoName && formik.errors.repoName && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.repoName}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Rating 0-100"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.rating}</Text>
      )}
      <TextInput
        style={[styles.input, {height: 100, textAlignVertical: 'top'}]}
        placeholder="Your Review"
        multiline={true}
        value={formik.values.review}
        onChangeText={formik.handleChange('review')}
      />
      {formik.touched.review && formik.errors.review && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.review}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Submit Review</Text>
      </Pressable>
    </View>
  );
}

export default ReviewForm;