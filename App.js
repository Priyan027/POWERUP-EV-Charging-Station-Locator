import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './App/Screen/LoginScreen/Navigations/TabNavigation';
import Loginscreen from './App/Screen/LoginScreen/Loginscreen';
import * as Location from 'expo-location';
import { UserLocationContext } from './App/context/userlocationcontext'; // Import the context
import 'react-native-get-random-values';
import { FeedbackProvider } from './App/context/FeedbackContext'; // Import FeedbackProvider
import FeedbackListScreen from './App/Screen/Profilescreen/FeedbackListScreen';

SplashScreen.preventAutoHideAsync();

const tokenCache = {
  async getToken(key) {
    return SecureStore.getItemAsync(key);
  },
  async saveToken(key, value) {
    return SecureStore.setItemAsync(key, value);
  },
};

export default function App() {
  const [loaded, error] = useFonts({
    'RobotoSlab': require('./assets/fonts/RobotoSlab-Regular.ttf'),
    'RobotoSlab-semibold': require('./assets/fonts/RobotoSlab-SemiBold.ttf'),
    'RobotoSlab-Bold': require('./assets/fonts/RobotoSlab-Bold.ttf'),
  });

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    }

    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (loaded && !error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded) {
    return null;
  }

  return (
    <FeedbackProvider> {/* Wrap with FeedbackProvider */}
    <ClerkProvider publishableKey={'pk_test_ZmluZXItY2hvdy02MS5jbGVyay5hY2NvdW50cy5kZXYk'}
      tokenCache={tokenCache}>
      
        <UserLocationContext.Provider value={{ location, setLocation }}>
          <View style={styles.container}>
            <NavigationContainer>
              <SignedIn>
                <TabNavigation />
              </SignedIn>

              <SignedOut>
                <Loginscreen />
              </SignedOut>
            </NavigationContainer>

            <StatusBar style="auto" />
          </View>
        </UserLocationContext.Provider>
      
    </ClerkProvider>
    </FeedbackProvider> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 25,
  },
});