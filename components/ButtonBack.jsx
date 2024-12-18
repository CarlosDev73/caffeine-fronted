import { Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { theme } from '../constants/theme'
import { widthPercentage, heightPercentage } from '../helpers/common.js'

const ButtonCancel = ({
  buttonStyle,
  onPress = () => {},
  loading = false,
  hasShadow = true,
  backgroundColor,
  router
}) => {
  const shadowStyle = hasShadow ? {
    shadowColor: 'black', // Color de la sombra
    shadowOffset: { width: 0, height: 4 }, // Sombra en la parte inferior
    shadowOpacity: 4, // Opacidad de la sombra
    shadowRadius: 3, // Difusión de la sombra
    elevation: 8, // Sombra en Android (con una pequeña elevación)
  } : {};

  return (
    <TouchableOpacity  onPress={()=> router.back()} style={[styles.button, buttonStyle, { backgroundColor }, hasShadow && shadowStyle]}>
      <Ionicons name="chevron-back" size={24} color="black" />
    </TouchableOpacity >
  );
};

export default ButtonCancel

const styles = StyleSheet.create({
  button: {
    alignSelf:'flex-start',
    height: heightPercentage(7, 7),
    width: heightPercentage(7, 7), 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: heightPercentage(7, 7) / 2, 
    borderWidth: 2,
    borderColor: 'black',
    borderBottomWidth: 4
  },
});
