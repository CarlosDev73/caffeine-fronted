import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { StatusBar } from 'expo-status-bar'
import { widthPercentage, heightPercentage } from '../helpers/common.js'
import { theme } from '../constants/theme.js'
import Button from '../components/Button.jsx'
import { useRouter } from 'expo-router'
import ButtonNext from '../components/ButtonNext.jsx'

const welcome2 = () => {
  const router = useRouter();

  return (
    <ScreenWrapper backGround={theme.colors.secondary}>
      <StatusBar style='dark'/>
      <View style={styles.container}>
        {/*Imagen de bienvenida con fondo circular*/}
        <View style={styles.circle}>
          <Image style={styles.welcomeImage} resizeMode='contain' source={require('../assets/images/Group2.png')}/>
        </View>

        {/*titulo y escrito*/}
        <View style={{gap:20}}>
          <Text style={styles.title}>Explora y Contribuye</Text>
          <Text style={styles.punchline}>Encuentra soluciones, comparte tus conocimientos y aprende en cada taza.</Text>
        </View>

      {/*Footer*/}
        <View style={styles.footer}>

        <View style={styles.circleContainer}>
            <View style={styles.progressCircle} /> 
            <View style={[styles.progressCircle, { backgroundColor: 'white' }]} /> 
            <View style={styles.progressCircle} /> 
        </View>

        <ButtonNext
            buttonStyle={{marginHorizontal:widthPercentage(3)}}
            onPress={()=>{router.push('welcome4')}}
            backgroundColor={theme.colors.primary}
            textColor='white'
          /> 
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default welcome2

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.secondary,
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
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title:{
    color: 'white', //esto viene de nuestra carpeta constants
    fontSize: heightPercentage(4),
    textAlign: 'center',
    fontWeight: theme.fonts.extraBold
  },
  punchline:{
    textAlign: 'center',
    paddingHorizontal: widthPercentage(10),
    fontSize: heightPercentage(2.5),
    color: 'white'
  },
  footer:{
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    width: '100%', 
    paddingHorizontal: widthPercentage(2)
  },

  circleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10, // Espacio entre los círculos
  },
  progressCircle: {
    width: 15, 
    height: 15, 
    borderRadius: 10, 
    borderWidth: 2,
    borderColor: 'black',
  },
})