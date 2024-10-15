import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layaout = () => {
  return (
    <Stack 
      screenOptions={{
      headerShown: false
    }}
    />
  )
}

export default _layaout