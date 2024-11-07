import { StyleSheet, Text, View, Image, ScrollView, Pressable } from 'react-native';
import React from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import { StatusBar } from 'expo-status-bar';
import ButtonBack from '../components/ButtonBack';
import { widthPercentage, heightPercentage } from '../helpers/common.js';
import { theme } from '../constants/theme.js';
import { useRouter } from 'expo-router';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import OptionsButtons from '../components/OptionsButtons.jsx';

import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const SignUpStepTwo = () => {
  const router = useRouter();
  const tags = [
    'Git', 'C++', 'Python', 'Laravel', 'Redes', 'Desarrollo Móvil', 'JavaScript'
  ];

  const handleTag = (tag) => {};

  return (
    <View style={styles.container}>
        
      <StatusBar style='dark' />
      <ScreenWrapper>
        <ScrollView contentContainerStyle={styles.scrollContent} style={styles.scrollView}>
          {/* Back Button */}
          <ButtonBack
          buttonStyle={{marginHorizontal:widthPercentage(2)}}
          router = {router}
          backgroundColor={'white'}
          textColor='white'
        />
          
          {/* Title and Subtitle */}
          <View style={styles.header}>
            <Text style={styles.title}>Crear cuenta</Text>
            <Text style={styles.subtitle}>Llena el formulario y regístrate para formar parte de la comunidad</Text>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            <Input
              icon={<MaterialCommunityIcons name="file-document-outline" size={24} color="black" />}
              placeholder='Biografía'
              multiline={true}
              inputStyle={{ fontSize: heightPercentage(2.5) }}
              containerStyles={{ marginBottom: heightPercentage(2), minHeight: heightPercentage(10) }}
              numberOfLines={4}
            />
            <Text style={styles.interestsTitle}>Intereses</Text>
            <OptionsButtons tags={tags} onSelectTag={handleTag} />

            {/* Profile Picture Upload Section */}
            <Text style={styles.interestsTitle}>Foto de perfil</Text>
            <View style={styles.profilePicContainer}>
              <Image source={require('../assets/images/addImage.png')} style={styles.profilePic} />
              <Text style={styles.profilePicText}>Seleccionar imagen</Text>
            </View>
          </View>

          
        </ScrollView>
        {/* Submit Button */}
        <Button
            title='Crear cuenta'
            buttonStyle={styles.submitButton}
            onPress={() => router.push('feed')} 
            backgroundColor={theme.colors.primary}
            textColor='black'
            textStyle={{ fontWeight: theme.fonts.extraBold }}
          />

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>¿Ya tienes cuenta?</Text>
            <Pressable onPress={() => router.push('login')}>
              <Text style={[styles.footerText, styles.footerLink]}> Ingresa aquí</Text>
            </Pressable>
          </View>
      </ScreenWrapper>
    </View>
  );
};

export default SignUpStepTwo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: widthPercentage(4),
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
  },
  backButton: {
    marginVertical: heightPercentage(2),
  },
  header: {
    marginBottom: heightPercentage(2),
  },
  title: {
    color: theme.colors.textTitles,
    fontSize: heightPercentage(4),
    fontWeight: theme.fonts.extraBold,
    textAlign: 'left',
    marginTop: 20
  },
  subtitle: {
    fontSize: heightPercentage(2.5),
    color: theme.colors.text,
    textAlign: 'left',
  },
  formContainer: {
    marginBottom: heightPercentage(2),
  },
  interestsTitle: {
    fontSize: heightPercentage(2.5),
    fontWeight: theme.fonts.bold,
    color: theme.colors.textTitles,
    marginVertical: heightPercentage(1),
  },
  profilePicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: heightPercentage(2),
    marginBottom: heightPercentage(2),
  },
  profilePic: {
    width: widthPercentage(20),
    height: widthPercentage(20),
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
  },
  profilePicText: {
    marginLeft: widthPercentage(4),
    fontSize: heightPercentage(2),
  },
  submitButton: {
    width: '100%',
    paddingVertical: heightPercentage(1),
    borderRadius: theme.radius.md,
    borderBottomWidth: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: heightPercentage(2),
    marginBottom: 25
  },
  footerText: {
    fontSize: heightPercentage(1.6),
    color: theme.colors.dark,
  },
  footerLink: {
    color: theme.colors.secondary,
    fontWeight: theme.fonts.bold,
  },
});
