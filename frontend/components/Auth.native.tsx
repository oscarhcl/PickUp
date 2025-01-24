import { Platform, AppState } from 'react-native';
import { router } from 'expo-router';
import * as AppleAuthentication from 'expo-apple-authentication';
import React from 'react';
import 'react-native-url-polyfill/auto';
import { supabase } from '../libs/supabaseClient';

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export function Auth() {
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
                // // Insert into your custom users table if necessary
                // console.log(JSON.stringify({ error, user }, null, 2))
                // const { error: insertError } = await supabase
                //   .from('profiles') // Replace 'users' with your actual table name
                //   .insert([
                //     {
                //       email: user.email,
                //       id: user.id, // You can store the Apple ID or any other relevant data
                //       updated_at: new Date(),
                //     },
                //   ]);

                // if (insertError) {
                //   console.error('Error inserting user:', insertError);
                // } else {
                //   console.log('User inserted successfully into the table');
                // }
                // //console.log(JSON.stringify({ error, user }, null, 2))
                router.replace({
                  pathname: '/create-profile',
                  params: {
                    id: user.id, 
                    email: user.email,
                    updated_at: new Date().toISOString(),
                  },
                });
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