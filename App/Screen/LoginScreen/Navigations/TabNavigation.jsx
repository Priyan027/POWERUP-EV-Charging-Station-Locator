import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; // Import stack navigator
import HomeScreen from '../Homescreen/Homescreen'; // Make sure this path is correct
import { Ionicons } from '@expo/vector-icons';
import FavoriteScreen from '../../Favoritescreen/Favoritescreen';
import ProfileScreen from '../../Profilescreen/Profilescreen';
import FeedbackListScreen from '../../Profilescreen/FeedbackListScreen'; // Import FeedbackListScreen
import Colors from '../utils/colors';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // Create Stack navigator

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    <Stack.Screen name="FeedbackListScreen" component={FeedbackListScreen} />
  </Stack.Navigator>
);

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen} // Adding HomeScreen back
        options={{
          tabBarLabel: 'Home',
          tabBarActiveTintColor: Colors.PRIMARY,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} /> // Search-outline icon for "Home"
          ),
        }}
      />
      <Tab.Screen
        name="favourite"
        component={FavoriteScreen}
        options={{
          tabBarLabel: 'Favorite',
          tabBarActiveTintColor: Colors.PRIMARY,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarActiveTintColor: Colors.PRIMARY,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-circle" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
