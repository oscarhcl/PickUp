import { StyleSheet, Text, View } from 'react-native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen 
          name="signin" 
          options={{ gestureEnabled: true,headerShown: false }}
        />
        <Stack.Screen
          name="create-profile"
          options={{ gestureEnabled: true, headerShown: false }}
        />
      </Stack>

      <StatusBar backgroundColor="#161622" style="light" />
    </>
  )
}

export default AuthLayout

const styles = StyleSheet.create({})