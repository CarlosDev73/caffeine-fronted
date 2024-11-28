import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import { StatusBar } from 'expo-status-bar';
import ButtonBack from '../components/ButtonBack';
import { widthPercentage, heightPercentage } from '../helpers/common.js';
import { useRouter } from 'expo-router';
import { theme } from '../constants/theme.js';
import Input from '../components/Input.jsx';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import ButtonNext from '../components/ButtonNext.jsx';

const signUp = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    displayName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (name, value) => {
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (!userData.displayName || !userData.userName || !userData.email || !userData.password || !userData.confirmPassword) {
      alert('All fields are required!');
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    router.push({
      pathname: 'signUpStepTwo',
      params: { ...userData }, // Pass collected data
    });
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

        {/* Title and subtitle */}
        <View style={{ gap: 0 }}>
          <Text style={styles.title}>Crear cuenta</Text>
          <Text style={styles.punchline}>
            Llena el formulario y regístrate para formar parte de la comunidad
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Input
            icon={<MaterialIcons name="person-outline" size={26} color="black" />}
            placeholder="Nombre completo"
            onChangeText={(value) => handleChange('displayName', value)}
            inputStyle={{ fontSize: heightPercentage(2.5) }}
          />
          <Input
            icon={<MaterialIcons name="alternate-email" size={24} color="black" />}
            placeholder="Usuario"
            onChangeText={(value) => handleChange('userName', value)}
            inputStyle={{ fontSize: heightPercentage(2.5) }}
          />
          <Input
            icon={<MaterialCommunityIcons name="email-outline" size={24} color="black" />}
            placeholder="Correo electrónico"
            onChangeText={(value) => handleChange('email', value)}
            inputStyle={{ fontSize: heightPercentage(2.5) }}
          />
          <Input
            icon={<Feather name="lock" size={24} color="black" />}
            placeholder="Contraseña"
            onChangeText={(value) => handleChange('password', value)}
            secureTextEntry
            inputStyle={{ fontSize: heightPercentage(2.5) }}
          />
          <Input
            icon={<Feather name="lock" size={24} color="black" />}
            placeholder="Confirmar contraseña"
            onChangeText={(value) => handleChange('confirmPassword', value)}
            secureTextEntry
            inputStyle={{ fontSize: heightPercentage(2.5) }}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.circleContainer}>
            <View
              style={[
                styles.progressCircle,
                { backgroundColor: theme.colors.secondary },
              ]}
            />
            <View style={styles.progressCircle} />
          </View>

          <ButtonNext
            buttonStyle={{ marginHorizontal: widthPercentage(3) }}
            onPress={handleNext}
            backgroundColor={theme.colors.primary}
            textColor="white"
          />
        </View>

        {/* Footer text */}
        <View style={styles.footer2}>
          <Text style={styles.footerText}>¿Ya tienes cuenta? </Text>
          <Pressable onPress={() => router.push('login')}>
            <Text style={[styles.footerText, { color: theme.colors.secondary }]}>
              Ingresa aquí
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default signUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: widthPercentage(1),
  },
  circleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  progressCircle: {
    width: 15,
    height: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  footer2: {
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
    color: theme.colors.dark,
    fontSize: heightPercentage(1.6),
  },
});
