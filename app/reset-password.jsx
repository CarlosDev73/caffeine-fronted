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
import { resetPassword } from '../api/auth'; // Importa la función de la API

const ResetPassword = () => {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = async () => {
    if (!token) {
      Alert.alert('Error', 'Debes ingresar el token proporcionado.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await resetPassword(token, newPassword);
      Alert.alert('Éxito', response.message || 'Contraseña restablecida exitosamente.');
      router.push('/login'); // Redirigir al inicio de sesión
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      Alert.alert('Error', error.message || 'No se pudo restablecer la contraseña.');
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
          <Text style={styles.title}>Restablecer contraseña</Text>
          <Text style={styles.punchline}>
            Ingresa el token enviado a tu correo, tu nueva contraseña, y asegúrate de que coincidan.
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            icon={<Feather name="key" size={24} color="black" />}
            placeholder="Token"
            value={token}
            onChangeText={setToken}
            inputStyle={{ fontSize: heightPercentage(2.5) }}
          />
          <Input
            icon={<Feather name="lock" size={24} color="black" />}
            placeholder="Nueva contraseña"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            inputStyle={{ fontSize: heightPercentage(2.5) }}
          />
          <Input
            icon={<Feather name="lock" size={24} color="black" />}
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            inputStyle={{ fontSize: heightPercentage(2.5) }}
          />

          <ButtonMain
            title="Restablecer"
            buttonStyle={{ marginHorizontal: widthPercentage(0) }}
            onPress={handleResetPassword}
            backgroundColor={theme.colors.primary}
            textColor={theme.colors.dark}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default ResetPassword;

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
