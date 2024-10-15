import { View, Text, Button } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

const index = () => {
  const router = useRouter();

  return (
    <View>
      <Text>Presentacion super bonita siuu</Text>
      <Button title='welcome' onPress={()=> router.push('welcome')}/>
    </View>
  )
}

export default index