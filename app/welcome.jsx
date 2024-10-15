import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { StatusBar } from 'expo-status-bar'
import { widthPercentage, heightPercentage } from '../helpers/common.js'
import { theme } from '../constants/theme.js'
import Button from '../components/Button.jsx'

const welcome = () => {
  return (
    <ScreenWrapper>
      <StatusBar style='dark'/>
      <View style={styles.container}>
        {/*Imagen de bienvenida con fondo circular*/}
        <View style={styles.circle}>
          <Image style={styles.welcomeImage} resizeMode='contain' source={require('../assets/images/designer-working.png')}/>
        </View>

        {/*Imagen de bienvenida con fondo circular*/}
        <View style={{gap:20}}>
          <Text style={styles.title}>¡Bienvenido a Caffeine!</Text>
          <Text style={styles.punchline}>Amamos la tecnología y el café por partes iguales.</Text>
        </View>

      {/*Footer*/}
        <View style={styles.footer}>
          <Button
            title='Saltar'
            buttonStyle={{marginHorizontal:widthPercentage(3)}}
            onPress={()=>{}}
            backgroundColor={'white'}
            textColor='black'
          />  
          <Button
            title='Siguiente'
            buttonStyle={{marginHorizontal:widthPercentage(3)}}
            onPress={()=>{}}
            backgroundColor={theme.colors.textTitles}
            textColor='white'
          />  
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default welcome

const styles = StyleSheet.create({
    container:{
      flex:1,
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: 'white',
      paddingHorizontal: widthPercentage(4)
    },
    welcomeImage:{
      height: heightPercentage(30),
      width: widthPercentage(100),
      alignSelf: 'center',
    },
    circle: {
      width: 300, 
      height: 300,
      borderRadius: 200, 
      backgroundColor: '#FFBD12',
      alignItems: 'center',
      justifyContent: 'center'
    },
    title:{
      color: theme.colors.textTitles, //esto viene de nuestra carpeta constants
      fontSize: heightPercentage(4),
      textAlign: 'center',
      fontWeight: theme.fonts.extraBold
    },
    punchline:{
      textAlign: 'center',
      paddingHorizontal: widthPercentage(10),
      fontSize: heightPercentage(2.5),
      color: theme.colors.text
    },
    footer:{
      flexDirection: 'row',
      justifyContent: 'space-between',
    }

})