import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import { StatusBar } from 'expo-status-bar';
import ButtonBack from '../components/ButtonBack';
import { heightPercentage, widthPercentage } from '../helpers/common';
import { useRouter } from 'expo-router';
import { theme } from '../constants/theme';
import Input from '../components/Input';
import Feather from '@expo/vector-icons/Feather';
import ButtonMain from '../components/ButtonMain';
import { forgotPassword } from '../api/auth'; // Importa la función de la API

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Por favor, introduce un correo válido.');
      return;
    }

    try {
      const response = await forgotPassword(email);
      Alert.alert('Éxito', response.message || 'Revisa tu correo para continuar.');
      router.push('/reset-password'); // Redirigir al inicio de sesión
    } catch (error) {
      console.error('Error al solicitar recuperación de contraseña:', error);
      Alert.alert('Error', error.message || 'No se pudo procesar la solicitud.');
    }
  };

  return (
    <ScreenWrapper>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <ButtonBack
          buttonStyle={{ marginHorizontal: widthPercentage(2) }}
          router={router}
          backgroundColor={'white'}
          textColor="white"
        />

        <View style={{ gap: 20 }}>
          <Text style={styles.title}>Recuperar contraseña</Text>
          <Text style={styles.punchline}>
            Introduce tu correo electrónico registrado para recibir un enlace de recuperación.
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            icon={<Feather name="mail" size={24} color="black" />}
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            inputStyle={{ fontSize: heightPercentage(2.5) }}
          />

          <ButtonMain
            title="Enviar"
            buttonStyle={{ marginHorizontal: widthPercentage(0) }}
            onPress={handleForgotPassword}
            backgroundColor={theme.colors.primary}
            textColor={theme.colors.dark}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: widthPercentage(6),
  },
  title: {
    color: theme.colors.textTitles,
    fontSize: heightPercentage(4),
    textAlign: 'left',
    fontWeight: theme.fonts.extraBold,
  },
  punchline: {
    textAlign: 'left',
    fontSize: heightPercentage(2.5),
    color: theme.colors.text,
  },
  form: {
    gap: 25,
  },
});
