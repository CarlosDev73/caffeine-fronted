import { Pressable, StyleSheet, Text, View } from 'react-native'
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
}) => {
  const shadowStyle = hasShadow ? {
    shadowColor: 'black', // Color de la sombra
    shadowOffset: { width: 0, height: 4 }, // Sombra en la parte inferior
    shadowOpacity: 4, // Opacidad de la sombra
    shadowRadius: 3, // Difusión de la sombra
    elevation: 8, // Sombra en Android (con una pequeña elevación)
  } : {};

  return (
    <Pressable onPress={onPress} style={[styles.button, buttonStyle, { backgroundColor }, hasShadow && shadowStyle]}>
      <Ionicons name="close" size={30} color="black" />
    </Pressable>
  );
};

export default ButtonCancel

const styles = StyleSheet.create({
  button: {
    alignSelf:'flex-start',
    height: heightPercentage(7, 7),
    width: heightPercentage(7, 7), // Asegúrate de que el ancho sea igual a la altura
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: heightPercentage(7, 7) / 2, // La mitad de la altura para hacer un círculo
    borderWidth: 2,
    borderColor: 'black',

  },
});
