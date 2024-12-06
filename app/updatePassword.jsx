import { StyleSheet, Text, View, Alert } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { StatusBar } from 'expo-status-bar'
import ButtonBack from '../components/ButtonBack'
import { heightPercentage, widthPercentage } from '../helpers/common'
import { useRouter } from 'expo-router'
import { theme } from '../constants/theme'
import Input from '../components/Input'
import Feather from '@expo/vector-icons/Feather'
import ButtonMain from '../components/ButtonMain'
import * as SecureStore from 'expo-secure-store'
import { changeUserPassword } from '../api/users'

const updatePassword = () => {

  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleChangePassword = async () => {
    // Validar que la nueva contraseña y la confirmación coincidan
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'La nueva contraseña y la confirmación no coinciden.');
      return;
    }
    try {
      // Obtener el ID del usuario almacenado en SecureStore
      const userId = await SecureStore.getItemAsync('userId');
      if (!userId) {
        Alert.alert('Error', 'No se encontró el ID del usuario.');
        return;
      }

      // Llamar a la API para cambiar la contraseña
      const response = await changeUserPassword(userId, currentPassword, newPassword);
      Alert.alert('Éxito', response);
      router.push('profile'); // Redirigir al perfil tras éxito
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      Alert.alert('Error', error.message || 'No se pudo cambiar la contraseña.');
    }
  };

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
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
              inputStyle = {{ fontSize: heightPercentage(2.5) }}
            />
            <Input
              icon={<Feather name="lock" size={24} color="black" />}
              placeholder='Contraseña nueva'
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              inputStyle = {{ fontSize: heightPercentage(2.5) }}
            />
            <Input
              icon={<Feather name="lock" size={24} color="black" />}
              placeholder='Repetir contraseña'
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              inputStyle = {{ fontSize: heightPercentage(2.5) }}
            />

            {/*Boton Iniciar sesion*/}
            <ButtonMain
              title='Enviar'
              buttonStyle={{marginHorizontal:widthPercentage(0)}}
              onPress={handleChangePassword}
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