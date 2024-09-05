import { useApolloClient, useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
    
    const [mutate, result] = useMutation(SIGN_IN);

    const signIn = async ({ username, password }) => {
        try {
            const response = await mutate({ variables: { username, password } });
            const token = response.data.authenticate.accessToken;

            console.log("setting user token in local storage ", token);
            await authStorage.setAccessToken(token);
            apolloClient.resetStore();
            return response;
        } 
        catch (error) {
            console.error('Sign in failed:', error);
        }
    };

    return [signIn, result];
};

export default useSignIn;