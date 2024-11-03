import { Pressable, StyleSheet, View,TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { theme } from '../constants/theme';
import { heightPercentage, widthPercentage } from '../helpers/common';

const Button = ({
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
    <TouchableOpacity  onPress={onPress} style={[styles.button, buttonStyle, { backgroundColor }, hasShadow && shadowStyle]}>
      <AntDesign name="arrowright" size={30} color="black" />
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    height: heightPercentage(8, 8),
    width: heightPercentage(8, 8), // Asegúrate de que el ancho sea igual a la altura
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: heightPercentage(8, 8) / 2, // La mitad de la altura para hacer un círculo
    borderWidth: 2,
    borderColor: 'black',
    borderBottomWidth: 5
  },
});
