import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { StatusBar } from 'expo-status-bar'
import ButtonBack from '../components/ButtonBack'
import { heightPercentage, widthPercentage } from '../helpers/common'
import { useRouter } from 'expo-router'
import { theme } from '../constants/theme'
import Input from '../components/Input'
import Feather from '@expo/vector-icons/Feather'
import ButtonMain from '../components/ButtonMain'

const updatePassword = () => {

  const router = useRouter();
  return (
    <ScreenWrapper>
      <StatusBar style='dark'/>
        <View style={styles.container}>
          <ButtonBack
            buttonStyle={{marginHorizontal:widthPercentage(2)}}
            router = {router}
            backgroundColor={'white'}
            textColor='white'
          />

          {/*titulo y escrito del Update Password */}
          <View style={{gap:20}}>
            <Text style={styles.title}>Cambiar contraseña</Text>
            <Text style={styles.punchline}>Asegúrate de colocar correctamente las contraseñas</Text>
          </View>

          {/*Formulario*/}
        
          <View style={styles.form}>
            <Input
              icon={<Feather name="lock" size={24} color="black" />}
              placeholder='Contraseña actual'
              onChangeText={value=>{passwordRef.current = value}}
              secureTextEntry
              inputStyle = {{ fontSize: heightPercentage(2.5) }}
            />
            <Input
              icon={<Feather name="lock" size={24} color="black" />}
              placeholder='Contraseña nueva'
              onChangeText={value=>{passwordRef.current = value}}
              secureTextEntry
              inputStyle = {{ fontSize: heightPercentage(2.5) }}
            />
            <Input
              icon={<Feather name="lock" size={24} color="black" />}
              placeholder='Repetir contraseña'
              onChangeText={value=>{passwordRef.current = value}}
              secureTextEntry
              inputStyle = {{ fontSize: heightPercentage(2.5) }}
            />

            {/*Boton Iniciar sesion*/}
            <ButtonMain
              title='Enviar'
              buttonStyle={{marginHorizontal:widthPercentage(0)}}
              onPress={()=>{router.push('profile')}}
              backgroundColor={theme.colors.primary}
              textColor= {theme.colors.dark}
            /> 
          </View>
        </View>
    </ScreenWrapper>
  )
}

export default updatePassword

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