
        
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { FontAwesome } from '@expo/vector-icons';

export default function Header() {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: user?.imageUrl }} 
        style={styles.profileImage} 
      />
      <Image 
        source={require('./../../../../assets/images/POWERUP EV.png')}
        style={{ width: 200, height: 45, resizeMode: 'contain' }}
      />
      <FontAwesome name="filter" size={26} color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    zIndex: 10,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 99,
  },
});
