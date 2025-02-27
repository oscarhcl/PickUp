import {Text, View } from 'react-native';
import { Redirect } from 'expo-router';
import {StatusBar} from 'expo-status-bar'
import React from 'react';
import { useGlobalContext } from '../context/GlobalProvider';

export default function App() {
  const {user, isLoading, isLoggedIn} = useGlobalContext();

  if (isLoading) {
    console.log("PickUp app is loading...");
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  console.log("isLoggedIn= " + isLoggedIn);
  if (isLoggedIn && user != null) return <Redirect href='/courts'/>;

  return (
    <Redirect href="/signin"/>
  );
};
