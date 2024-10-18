import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { StatusBar } from 'expo-status-bar'
import ButtonCancel from '../components/ButtonCancel';
import { widthPercentage, heightPercentage } from '../helpers/common.js'
import { theme } from '../constants/theme.js'
import { useRouter } from 'expo-router'
import Input from '../components/Input.jsx';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import ButtonMain from '../components/ButtonMain.jsx'

const login = () => {

  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loading,setLoading] = useState(false);

  return (
    <ScreenWrapper >
      <StatusBar style='dark'/>
      <View style={styles.container}>
        <ButtonCancel
            buttonStyle={{marginHorizontal:widthPercentage(2)}}
            onPress={()=>{router.push('welcome')}}
            backgroundColor={'white'}
            textColor='white'
          />

          {/*titulo y escrito del inicio de sesion */}
        <View style={{gap:20}}>
          <Text style={styles.title}>Inicio de sesión</Text>
          <Text style={styles.punchline}>Ingresa la dirección de correo y contraseña de tu cuenta en Caffeine</Text>
        </View>

        {/*Formulario*/}
        <View style={styles.form}>
          <Input
            icon={<MaterialIcons name="person-outline" size={26} color="black" />}
            placeholder='Correo electrónico'
            onChangeText={value=>{emailRef.current = value}}
            inputStyle = {{ fontSize: heightPercentage(2.5) }}
          />
          <Input
            icon={<Feather name="lock" size={24} color="black" />}
            placeholder='●●●●●●●'
            onChangeText={value=>{passwordRef.current = value}}
            secureTextEntry
            inputStyle = {{ fontSize: heightPercentage(2.5) }}
          />
          <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>

          {/*Boton Iniciar sesion*/}
          <ButtonMain
            title='Iniciar sesión'
            buttonStyle={{marginHorizontal:widthPercentage(0)}}
            onPress={()=>{router.push('login')}}
            backgroundColor={theme.colors.primary}
            textColor= {theme.colors.dark}
          /> 
        </View>
        {/*Footer*/}
        <View style={styles.footer}>
          <Text style={styles.footerText}>¿No tienes cuenta?</Text>
          <Pressable>
          <Text style={[styles.footerText, {color:theme.colors.secondary}]}>Crea una</Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default login

const styles = StyleSheet.create({

  container:{
    flex:1,
    gap:45,
    paddingHorizontal: widthPercentage(6)
  },
  title:{
    color: theme.colors.textTitles, //esto viene de nuestra carpeta constants
    fontSize: heightPercentage(4),
    textAlign: 'left',
    fontWeight: theme.fonts.extraBold
  },
  punchline:{
    textAlign: 'left',
    fontSize: heightPercentage(2.5),
    color: theme.colors.text
  },
  form:{
    gap:25
  },
  forgotPassword:{
    textAlign:'right',
    fontWeight: theme.fonts.semiBold,
    fontSize: heightPercentage(1.6)
  },
  footer:{
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    gap: 5,
  },
  footerText:{
    textAlign: 'center',
    color: theme.colors.dark,
    fontSize: heightPercentage(1.6)
  }
})