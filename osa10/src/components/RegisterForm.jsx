import Text from './Text';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { GET_REPOSITORIES } from '../graphql/queries';
import { REGISTER } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import useSignIn from '../hooks/useSignIn';

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
    username: '',
    password: '',
  };
  
  const validationSchema = yup.object().shape({
      username: yup
          .string()
          .min(5, 'Username must be at least 5 characters long')
          .max(30, 'Username length cannot exceed 30 characters')
          .required('Username is required'),  
  
      password: yup 
          .string()
          .min(5, 'Password must be at least 5 characters long')
          .max(30, 'Password length cannot exceed 30 characters')
          .required('Password is required'),

      confirmPassword: yup 
          .string()
          .oneOf([yup.ref('password'), null])
          .min(5, 'Password must be at least 5 characters long')
          .max(30, 'Password length cannot exceed 30 characters')
          .required('Password confirmation is required'),


    });

const RegisterForm = () => {
    const [mutate] = useMutation(REGISTER);
    const [signIn] = useSignIn();

    const navigate = useNavigate();

    const onSubmit = async () => {
        try{
            const user = {
                username: formik.values.username,
                password: formik.values.confirmPassword,
            };
            
            console.log("user", user);

            const response = await mutate({ 
            variables: {
                username: user.username,
                password: user.password
            },
                refetchQueries: [{ query: GET_REPOSITORIES }]
            });

            if(response){
                await signIn({ username: user.username, password: user.password });
                navigate(`/`);
            }
        }

        catch(error)
        {
            console.log(error);
        }

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
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.password}</Text>
      )}
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Confirm Password"
        value={formik.values.confirmPassword}
        onChangeText={formik.handleChange('confirmPassword')}
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.confirmPassword}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  );
}

export default RegisterForm;