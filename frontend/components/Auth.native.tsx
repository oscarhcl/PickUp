import { Platform } from 'react-native'
import * as AppleAuthentication from 'expo-apple-authentication'
import React from 'react'

import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from "@react-native-async-storage/async-storage";

import {router} from 'expo-router'

export const supabase = createClient(
  "https://nddyokboixdpybuvswaw.supabase.co", 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kZHlva2JvaXhkcHlidXZzd2F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczMzQ0NDUsImV4cCI6MjA1MjkxMDQ0NX0.B-yX-xQMWuBAqFMR0hqu7BMQkqQEIIJutBnEl3-Mi2E", {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
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
            })
            console.log(credential);
            // Sign in via Supabase Auth.
            if (credential.identityToken) {
              const {
                error,
                data: { user },
              } = await supabase.auth.signInWithIdToken({
                provider: 'apple',
                token: credential.identityToken,
              })
              console.log(JSON.stringify({ error, user }, null, 2))
              if (!error) {
                // User is signed in
                console.log("user is logged in")
                router.replace("/courts")

              }
            } else {
              throw new Error('No identityToken.')
            }
          } catch (e) {
            if ((e as any).code === 'ERR_REQUEST_CANCELED') {
              // handle that the user canceled the sign-in flow
              console.log("login cancelled")
            } else {
              // handle other errors
            }
          }
        }}
      />
    )
  return <>{/* Implement Android Auth options. */}</>
}