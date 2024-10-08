import useSignIn from '../hooks/useSignIn';
import SignInForm from './SignInForm';
import { useNavigate } from 'react-router-native';

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signIn({ username, password });
      navigate("/");
    } 
    
    catch (e) {
      console.log(e);
    }
  };

  return (
    <SignInForm onSubmit={onSubmit}/>
  );
}

export default SignIn;