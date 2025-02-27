import { StyleSheet, Text, View, Button } from 'react-native';
import { getCurrentUser } from '../../libs/supabaseClient';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGlobalContext } from '../../context/GlobalProvider';
import { router } from 'expo-router';

const Profile = () => {
  const { user, logout, isLoggedIn } = useGlobalContext();

  useEffect(() => {
    console.log("isLoggedIn= " + isLoggedIn);
    console.log("user= " + user.user.id);
  }, [isLoggedIn]);

  const fetchProfile = async () => {
    try {
      const data = await getCurrentUser();  // Call the JS function to get the profile
      console.log(data);
      //setProfileData(data);
      console.log("isLoggedIn= " + isLoggedIn);
    } catch (error) {
      console.log("Error loading user");
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/signin');
  };

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log("AsyncStorage cleared");
    } catch (error) {
      console.log("Error clearing AsyncStorage");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Button 
        title="Toggle Profile Data"
        onPress={fetchProfile} // Toggle the fetchProfile function
      />
      <Button 
        title="Clear AsyncStorage"
        onPress={clearAsyncStorage} // Clear AsyncStorage
      />
      <Button
        title="Logout"
        onPress={handleLogout}
      />
      {/* {profileData && (
        <View>
          <Text>User Profile: {JSON.stringify(profileData)}</Text>
        </View>
      )} */}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});