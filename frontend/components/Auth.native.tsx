import { Platform, AppState } from 'react-native';
import { router } from 'expo-router';
import * as AppleAuthentication from 'expo-apple-authentication';
import React from 'react';
import 'react-native-url-polyfill/auto';

import { supabase, getCurrentUser } from '../libs/supabaseClient';
import { useGlobalContext } from "../context/GlobalProvider";

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export function Auth() {
  const { login } = useGlobalContext();
  if (Platform.OS === 'ios')
    return (
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={{ width: 320, height: 60 }}
        onPress={async () => {
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            });
            console.log(credential);

            if (credential.identityToken) {
              // Use signInWithIdToken for Apple login
              const { error, data: { user } } = await supabase.auth.signInWithIdToken({
                provider: 'apple',
                token: credential.identityToken,
              });

              if (error) {
                console.error("Error during Apple sign-in:", error);
              } else if (user){
                //get user data from profile data
                const authFlow = async () => {
                  const data = await getCurrentUser(); // Call the JS function to get the profile
                
                  if (data) {
                    console.log(data);
                    login();
                    router.replace('/courts');
                  } else {
                    console.log("No user exists / error loading user");
                    router.replace({
                      pathname: '/create-profile',
                      params: {
                        id: user?.id, 
                        email: user?.email,
                        updated_at: new Date().toISOString(),
                      },
                    });
                  }
                };
                
                // Call the function
                authFlow();
              }
            } else {
              throw new Error('No identityToken.');
            }
          } catch (e) {
            if ((e as any).code === 'ERR_REQUEST_CANCELED') {
              console.log('Login cancelled');
            } else {
              console.error('Error during authentication:', e);
            }
          }
        }}
      />
    );

  return <>{/* Implement Android Auth options. */}</>;
}