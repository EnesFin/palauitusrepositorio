import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native';
import {Link} from 'react-router-native';
import Constants from 'expo-constants';
import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import { useQuery } from '@apollo/client';
import { useApolloClient } from '@apollo/client';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
    display: "flex",
    flexDirection: "row"
    // ...
  }, 
  navButton: {
    color: "white",
    fontSize: 24,
    margin: 20,
    fontWeight: "bold"
  }
  // ...
});

const AppBar = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const { data } = useQuery(ME);
  const isUserSignedIn = (data && data.me) ? true:false

  const signOut = async () => {
      console.log("Removing access token");

      try{
        await authStorage.removeAccessToken();
        await apolloClient.resetStore();
      }

      catch(error){
        console.log("error while signing out: ", error);
      }
  }

  return (
  <View style={styles.container}>
    <ScrollView horizontal={true}>
          <Pressable><Link to="/"><Text style={styles.navButton}>Repositories</Text></Link></Pressable>
          {!isUserSignedIn && <Pressable><Link to="/signin"><Text style={styles.navButton}>Sign In</Text></Link></Pressable>}
          {!isUserSignedIn && <Pressable><Link to="/register"><Text style={styles.navButton}>Register</Text></Link></Pressable>}
          {isUserSignedIn && <Pressable onPress={signOut}><Text style={styles.navButton}>Sign Out</Text></Pressable>}
          {isUserSignedIn && <Pressable><Link to="/myreviews"><Text style={styles.navButton}>My Reviews</Text></Link></Pressable>}
          {isUserSignedIn && <Pressable><Link to="/review"><Text style={styles.navButton}>Review</Text></Link></Pressable>}

    </ScrollView>
  </View>
  
  )
};

export default AppBar;