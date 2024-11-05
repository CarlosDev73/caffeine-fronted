import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'
import { heightPercentage, widthPercentage } from '../helpers/common'

const AbsoluteButton = ({
  child,
  buttonStyle,
  color,
  onPress=()=>{},
}) => {

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, {backgroundColor: color}, buttonStyle]}>
      {child}
    </TouchableOpacity>
  )
}

export default AbsoluteButton

const styles = StyleSheet.create({
  button:{
    margin: 20,
    height: heightPercentage(7),
    width: widthPercentage(15),
    alignItems: 'center',
    justifyContent: 'center',
    borderCurve: 'continuous',
    borderRadius: 100,
    borderWidth: 2,       
    borderColor: 'black', 
    borderBottomWidth: 5,
    position: 'absolute',
    backgroundColor: 'white',
  },
})