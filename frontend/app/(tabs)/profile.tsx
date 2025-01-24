import { StyleSheet, Text, View, Button } from 'react-native';
import { getCurrentUser } from '../../libs/supabaseUser';
import React, { useState } from 'react';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);

  const fetchProfile = async () => {
    try {
      const data = await getCurrentUser();  // Call the JS function to get the profile
      console.log(data);
      //setProfileData(data);
    } catch (error) {
      console.log("Error loading user");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Button 
        title="Toggle Profile Data"
        onPress={fetchProfile} // Toggle the fetchProfile function
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