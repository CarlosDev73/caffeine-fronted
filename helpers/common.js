/* 
Dimensions.get(‘window’): Obtiene las dimensiones de la ventana del dispositivo.
heightPercentage: Calcula el valor correspondiente a un porcentaje de la altura del dispositivo.
widthPercentage: Calcula el valor correspondiente a un porcentaje del ancho del dispositivo.
Estas funciones son útiles para crear diseños responsivos, donde los tamaños de los elementos se ajustan proporcionalmente a las dimensiones de la pantalla del dispositivo
*/

import { Dimensions } from "react-native";

const {width: deviceWidth, height:devideHeight} = Dimensions.get('window');

export const heightPercentage = percentage =>{
  return (percentage * devideHeight)/100 
}

export const widthPercentage = percentage =>{
  return (percentage * deviceWidth)/100 
}