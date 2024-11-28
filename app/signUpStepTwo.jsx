import { StyleSheet, Text, View, Image, ScrollView, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import ScreenWrapper from '../components/ScreenWrapper';
import { StatusBar } from 'expo-status-bar';
import ButtonBack from '../components/ButtonBack';
import { widthPercentage, heightPercentage } from '../helpers/common.js';
import { theme } from '../constants/theme.js';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import OptionsButtons from '../components/OptionsButtons.jsx';
import axios from 'axios';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const SignUpStepTwo = () => {
  const router = useRouter();
  const params = useLocalSearchParams(); // Use data from the first step
  const [biography, setBiography] = useState('');
  const [skills, setSkills] = useState([]);
  const [profileImg, setProfileImg] = useState(null);

  const tags = ['Git', 'C++', 'Python', 'Laravel', 'Redes', 'Desarrollo Móvil', 'JavaScript'];

  const handleTag = (tag) => {
    setSkills((prevSkills) =>
      prevSkills.includes(tag) ? prevSkills.filter((t) => t !== tag) : [...prevSkills, tag]
    );
  };

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImg(result.assets[0]);
    }
  };

  const handleRegister = async () => {
    if (!biography || skills.length === 0 || !profileImg) {
      Alert.alert('Error', 'Please fill all fields and select a profile image.');
      return;
    }

    const formData = new FormData();
    formData.append('userName', params.userName);
    formData.append('displayName', params.displayName);
    formData.append('email', params.email);
    formData.append('password', params.password);
    formData.append('biography', biography);
    formData.append('skills', skills.join(','));

    if (profileImg) {
      formData.append('profileImg', {
        uri: profileImg.uri,
        name: 'profile.jpg',
        type: 'image/jpeg',
      });
    }
    console.log('FormData being sent:', formData);
    try {
      const response = await axios.post('http://192.168.50.78:3000/api/v1/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        
      });
      Alert.alert('Success', 'Account created successfully');
      router.push('/login');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to create account');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScreenWrapper>
        <ScrollView contentContainerStyle={styles.scrollContent} style={styles.scrollView}>
          <ButtonBack
            buttonStyle={{ marginHorizontal: widthPercentage(2) }}
            router={router}
            backgroundColor="white"
            textColor="white"
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
              placeholder="Biografía"
              multiline
              inputStyle={{ fontSize: heightPercentage(2.5) }}
              containerStyles={{
                marginBottom: heightPercentage(2),
                minHeight: heightPercentage(10),
              }}
              numberOfLines={4}
              onChangeText={(text) => setBiography(text)}
              value={biography}
            />
            <Text style={styles.interestsTitle}>Intereses</Text>
            <OptionsButtons tags={tags} onSelectTag={handleTag} selectedTags={skills} />

            {/* Profile Picture Upload Section */}
            <Pressable onPress={handleImagePicker}>
              <Text style={styles.interestsTitle}>Foto de perfil</Text>
              <View style={styles.profilePicContainer}>
                {profileImg ? (
                  <Image source={{ uri: profileImg.uri }} style={styles.profilePic} />
                ) : (
                  <Image source={require('../assets/images/addImage.png')} style={styles.profilePic} />
                )}
                <Text style={styles.profilePicText}>Seleccionar imagen</Text>
              </View>
            </Pressable>
          </View>
        </ScrollView>

        {/* Submit Button */}
        <Button
          title="Crear cuenta"
          buttonStyle={styles.submitButton}
          onPress={handleRegister}
          backgroundColor={theme.colors.primary}
          textColor="black"
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
