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

  const shadowStyle={

  }

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
    backgroundColor: "red",
    height: heightPercentage(7,7),
    width: widthPercentage(40),
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