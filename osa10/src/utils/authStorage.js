import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  getAccessToken = async () => {
    const rawToken = await AsyncStorage.getItem(
        `${this.namespace}:token`,
      );
  
      return rawToken ? JSON.parse(rawToken) : "";
  }

  setAccessToken = async (accessToken) => {
    await AsyncStorage.setItem(
      `${this.namespace}:token`,
      JSON.stringify(accessToken),
    );
  }

  removeAccessToken = async() => {
    await AsyncStorage.removeItem(`${this.namespace}:token`);
  }
}

export default AuthStorage;