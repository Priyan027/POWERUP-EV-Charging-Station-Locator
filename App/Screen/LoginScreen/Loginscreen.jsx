
/*import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';  // ✅ Added useEffect import
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import { useWarmUpBrowser } from '../../../hooks/warmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';
import * as AuthSession from 'expo-auth-session';

export default function Loginscreen() {
  
  useEffect(() => {
    WebBrowser.maybeCompleteAuthSession();  // ✅ Moved inside useEffect
  }, []);

  useWarmUpBrowser();
  
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = async () => {
    try {
      const { createdSession, setActive } = await startOAuthFlow();

      if (createdSession) {
        setActive({ session: createdSession.id });
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  return (
    <LinearGradient 
      colors={['#ffffff', '#f0fdf4']} 
      start={{ x: 0, y: 0 }} 
      end={{ x: 1, y: 1 }} 
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Image source={require('./../../../assets/images/POWERUP EV.png')} style={styles.logoImage} />
        <Image source={require('./../../../assets/images/opt3.png')} style={styles.bgImage} />
        
        <View style={{ padding: 20 }}>
          <Text style={styles.heading}>Charge Fast, Drive Far</Text>
          <Text style={styles.desc}>Your Ultimate EV Charging Station App</Text>

          <TouchableOpacity style={styles.button} onPress={onPress}>  
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },
  logoImage: {
    width: 320,
    height: 160,
    resizeMode: "contain",
    margin: -30
  },
  bgImage: {
    width: '100%',
    height: 300,
    marginTop: 10,
    objectFit: 'cover'
  },
  heading: {
    fontSize: 25,
    fontFamily: 'RobotoSlab-Bold',
    textAlign: 'center',
    marginTop: 1
  },
  desc: {
    fontSize: 17,
    fontFamily: 'RobotoSlab-Regular',
    textAlign: 'center',
    marginTop: 15,
    color: '#666'
  },
  button: {
    backgroundColor: '#006400', 
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'RobotoSlab-Bold',
    fontSize: 17
  },
  gradient: {
    flex: 1,
    width: '100%',
    paddingBottom: 30
  }
});
*/

import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import * as AuthSession from 'expo-auth-session';
import { useRouter } from 'expo-router';

export default function Loginscreen() {
  
  useEffect(() => {
    WebBrowser.maybeCompleteAuthSession();
  }, []);

  const router = useRouter();
  
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = async () => {
    try {
      const { createdSession, setActive } = await startOAuthFlow();

      if (createdSession) {
        setActive({ session: createdSession.id });
        router.replace('/HomeScreen');  // Navigate to HomeScreen after login
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  return (
    <LinearGradient 
      colors={['#ffffff', '#f0fdf4']} 
      start={{ x: 0, y: 0 }} 
      end={{ x: 1, y: 1 }} 
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Image source={require('./../../../assets/images/POWERUP EV.png')} style={styles.logoImage} />
        <Image source={require('./../../../assets/images/opt3.png')} style={styles.bgImage} />
        
        <View style={{ padding: 20 }}>
          <Text style={styles.heading}>Charge Fast, Drive Far</Text>
          <Text style={styles.desc}>Your Ultimate EV Charging Station App</Text>

          <TouchableOpacity style={styles.button} onPress={onPress}>  
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },
  logoImage: {
    width: 320,
    height: 160,
    resizeMode: "contain",
    margin: -30
  },
  bgImage: {
    width: '100%',
    height: 300,
    marginTop: 10,
    objectFit: 'cover'
  },
  heading: {
    fontSize: 25,
    fontFamily: 'RobotoSlab-Bold',
    textAlign: 'center',
    marginTop: 1
  },
  desc: {
    fontSize: 17,
    fontFamily: 'RobotoSlab-Regular',
    textAlign: 'center',
    marginTop: 15,
    color: '#666'
  },
  button: {
    backgroundColor: '#006400', 
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'RobotoSlab-Bold',
    fontSize: 17
  },
  gradient: {
    flex: 1,
    width: '100%',
    paddingBottom: 30
  }
});





