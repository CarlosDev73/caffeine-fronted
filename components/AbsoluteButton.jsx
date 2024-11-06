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
    height: heightPercentage(8, 8),
    width:  heightPercentage(8, 8),
    alignItems: 'center',
    justifyContent: 'center',
    borderCurve: 'continuous',
    borderRadius: heightPercentage(8, 8)/2,
    borderWidth: 2,       
    borderColor: 'black', 
    borderBottomWidth: 5,
    position: 'absolute',
    backgroundColor: 'white',
  },
})