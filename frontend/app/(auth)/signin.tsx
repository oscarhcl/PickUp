import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Link,router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { Auth } from "../../components/Auth";

export default function SignIn() {
  // const navigation = useNavigation();

  // // Handle navigation to the Home screen after sign-in (for now, just navigate on button press)
  // const handleSignIn = () => {
  //   navigation.replace('courts')  // Navigate to Home screen
  // };
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>PickUp:{"\n"}Making hooping on campus easy for you.</Text>
      </View>
      <Auth />
      {/* <Button title="Go to courts" onPress={handleSignIn} /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255, 100, 0)',
    justifyContent: 'center',
    alignItems: 'center',  // Center the Auth button
  },
  textContainer: {
    position: 'absolute',  // Position the text independently of other elements
    left: 0,  // Align the text to the left edge of the screen
    top: 160,  // Adjust the top margin to fit your design
    paddingLeft: 20,  // Add some padding from the left side
  },
  text: {
    color: 'white',  // Set the text color to white
    fontSize: 35,  // Increase the font size
    fontFamily: 'roboto',
    fontWeight: 'bold',  // Make the text bold
    textAlign: 'left',  // Align text to the left
  },
});