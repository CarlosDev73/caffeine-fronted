/* 
El ScreenWrapper es un componente reutilizable que asegura que todas las pantallas envueltas tengan un relleno superior adecuado para evitar superposiciones con la barra de estado y un color de fondo consistente. Esto facilita la gestión de estilos comunes y mejora la organización del código.
*/

import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ScreenWrapper = ({children,backGround}) => {
  
  const {top} = useSafeAreaInsets();
  const paddingTop = top>0? top+5: 30;
  return (
    <View style={{flex:1, paddingTop, backgroundColor:backGround}}>
      {
        children
      }
    </View>
  )
}

export default ScreenWrapper