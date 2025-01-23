import { StyleSheet, View } from 'react-native';
import React from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './(auth)/signin'; // Assuming SignInScreen is your sign-in component
import { Redirect } from 'expo-router';
import Courts from './(tabs)/courts' 
const Stack = createStackNavigator();

export default function App() {
  return (
    <Redirect href="/signin"/>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});