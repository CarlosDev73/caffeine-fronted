import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'
import { heightPercentage, widthPercentage } from '../helpers/common'

const Button = ({
  buttonStyle,
  textStyle,
  title= '',
  onPress=()=>{},
  loading = false,
  hasShadow = true,
  backgroundColor,
  textColor,
}) => {

  const shadowStyle = hasShadow ? {
    shadowColor: 'black', // Color de la sombra
    shadowOffset: { width: 0, height: 4 }, // Sombra en la parte inferior
    shadowOpacity: 4, // Opacidad de la sombra
    shadowRadius: 3, // Difusión de la sombra
    elevation: 8, // Sombra en Android (con una pequeña elevación)
  } : {};

  return (
    <Pressable onPress={onPress} style={[styles.button, buttonStyle,
      { backgroundColor },hasShadow && shadowStyle]}>
      <Text style={[styles.text, textStyle,{color: textColor}]}>{title}</Text>
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
  button:{
    height: heightPercentage(7,7),
    justifyContent: 'center',
    alignItems: 'center',
    borderCurve: 'continuous',
    borderRadius: theme.radius.xl,
    borderWidth: 2,       
    borderColor: "black", 
  },
  text:{
    fontSize: heightPercentage(3),
    fontWeight: theme.fonts.bold
  }
})