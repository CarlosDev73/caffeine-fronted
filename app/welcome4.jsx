import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { StatusBar } from 'expo-status-bar'
import { widthPercentage, heightPercentage } from '../helpers/common.js'
import { theme } from '../constants/theme.js'
import ButtonMain from '../components/ButtonMain.jsx'
import { useRouter } from 'expo-router'

const welcome = () => {

  const router = useRouter();

  return (
    <ScreenWrapper>
      <StatusBar style='dark'/>
      <View style={styles.container}>
        {/*Imagen de bienvenida con fondo circular*/}
        <View style={styles.circle}>
          <Image style={styles.welcomeImage} resizeMode='contain' source={require('../assets/images/moon.png')}/>
        </View>

        {/*titulo y escrito*/}
        <View style={{gap:20}}>
          <Text style={styles.punchline}>Gamificación incorporada</Text>
          <Text style={styles.title}>Gana Puntos y Sube niveles</Text> 
        </View>

      {/*Footer*/}
        <View style={styles.footer}>
          <ButtonMain
            title='Empieza Ahora >'
            buttonStyle={{marginHorizontal:widthPercentage(3)}}
            onPress={()=>{router.push('welcome2')}}
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
      backgroundColor: theme.colors.LemonChiffon,
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
      gap: 30,
      width: '100%'
    }

})