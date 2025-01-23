import { StyleSheet, Text, View, Image } from 'react-native'
import { Tabs,Redirect } from 'expo-router'
import React from 'react'

const TabsLayout = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen 
          name="courts"
          options={{
            title: 'Courts',
            headerShown: false,
          }}
          />
        
        <Tabs.Screen 
          name="players"
          options={{
            title: 'Players',
            headerShown: false,
          }}
          />

          <Tabs.Screen 
          name="games"
          options={{
            title: 'Games',
            headerShown: false,
          }}
          />

          <Tabs.Screen 
          name="profile"
          options={{
            title: 'Profile',
            headerShown: false,
          }}
          />

      </Tabs>
    </>
  )
}

export default TabsLayout

const styles = StyleSheet.create({})