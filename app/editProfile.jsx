import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Pressable, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import { StatusBar } from 'expo-status-bar';
import { widthPercentage, heightPercentage } from '../helpers/common.js';
import { theme } from '../constants/theme.js';
import { useRouter } from 'expo-router';
import AbsoluteButton from '../components/AbsoluteButton.jsx';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import OptionsButtons from '../components/OptionsButtons.jsx';

import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import { updateUser } from '../api/users';

const EditProfile = () => {
  const router = useRouter();

  const [userId, setUserId] = useState(null);
  const [name, setName] = useState('');
  const [biography, setBiography] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [profileImg, setProfileImg] = useState(null);

  const tags = ['Git', 'C++', 'Python', 'Laravel', 'Redes', 'Desarrollo Móvil', 'JavaScript'];

  const handleTag = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
    );
  };
  const handleImagePicker = async () => {
    try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
        setProfileImg(result.assets[0]); // Asegúrate de usar este estado en tu componente
      } else {
        console.log('Image picker canceled');
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'No se pudo seleccionar la imagen.');
    }
  };

  const translateY = useSharedValue(300);

  useEffect(() => {
    const loadUserId = async () => {
      const storedUserId = await SecureStore.getItemAsync('userId');
      setUserId(storedUserId);
    };
    loadUserId();
    translateY.value = withTiming(0, { duration: 600 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const handleSave = async () => {
    if (!userId) {
      Alert.alert('Error', 'No se encontró el ID del usuario.');
      return;
    }
  
    
      // Crear el FormData para enviar los datos al backend
      const formData = new FormData();
  
      // Agregar campos editables al FormData
      if (name) formData.append('displayName', name);
      if (biography) formData.append('biography', biography);
      if (selectedTags.length > 0) formData.append('skills', selectedTags.join(',')); // Convertir el array a string
  
      // Agregar la imagen al FormData si existe
      if (profileImg) {
        formData.append('profileImg', {
          uri: profileImg.uri,
          name: 'profileImg.jpg',
          type: 'image/jpeg',
        });
      }
  
      console.log('FormData being sent:', formData);
  try {
      // Llamar a la función `updateUser` con el ID del usuario y los datos del formulario
      const response = await updateUser(userId, formData);
  
      Alert.alert('Éxito', 'Perfil actualizado con éxito.');
      router.push('profile');
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      Alert.alert('Error', error.message || 'No se pudo actualizar el perfil.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScreenWrapper>
        <View style={styles.exitBtn}>
          <AbsoluteButton
            child={<Feather name="x" size={30} color="black" />}
            buttonStyle={{ top: -10, backgroundColor: 'white' }}
            onPress={() => router.push('feed')}
          />
        </View>
        <Animated.View style={[animatedStyle, styles.content]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20 }}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={profileImg ? { uri: profileImg.uri } : require('../assets/images/pic.png')}
                style={{ borderRadius: 100, borderWidth: 10, width: 30, height: 30 }}
              />
              <View style={{ marginLeft: 7 }}>
                <Text style={[{ fontWeight: theme.fonts.bold }]}>Editar Perfil</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <ScrollView>
              <Input
                placeholder="@ Usuario"
                value={name}
                onChangeText={setName}
                inputStyle={{ fontSize: heightPercentage(2) }}
                containerStyles={{ marginBottom: heightPercentage(2) }}
              />
              <Input
                placeholder="Biografía"
                icon={<Ionicons name="document-text-outline" size={24} color="black" />}
                value={biography}
                onChangeText={setBiography}
                inputStyle={{ fontSize: heightPercentage(2) }}
                containerStyles={{ height: 'fit-content' }}
                multiline={true}
                numberOfLines={7}
              />
              <View style={{ marginVertical: heightPercentage(2) }}>
                <Text style={{ fontSize: heightPercentage(2.5) }}> Intereses </Text>
                <OptionsButtons tags={tags} selectedTags={selectedTags} onSelectTag={handleTag} />
              </View>
              <View style={styles.imagePickerContainer}>
              <Text style={styles.sectionTitle}>Foto de Perfil</Text>
              <Pressable onPress={handleImagePicker}>
                <View style={styles.imagePicker}>
                  {profileImg ? (
                    <Image source={{ uri: profileImg?.uri }} style={styles.imagePreview} />
                  ) : (
                    <Image source={require('../assets/images/addImage.png')} style={styles.imagePreview} />
                  )}
                  <Text style={styles.imagePickerText}>Adjuntar Imágenes</Text>
                </View>
              </Pressable>
            </View>
              <Button
                title="Guardar"
                buttonStyle={styles.publicBtn}
                onPress={handleSave}
                backgroundColor={theme.colors.primary}
                textColor="black"
                textStyle={{ fontWeight: theme.fonts.extraBold }}
              />
            </ScrollView>
          </View>
        </Animated.View>
      </ScreenWrapper>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#bababc',
        paddingHorizontal: widthPercentage(4),
        height: heightPercentage(100),
      },
      exitBtn: {
        width: widthPercentage(100),
        height: heightPercentage(10),
        justifyContent: 'center',
        backgroundColor: 'transparent',
      },
      content: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderColor: 'black',
        borderTopWidth: 5,
        borderWidth: 2,
        paddingHorizontal: widthPercentage(5),
      },
      title: {
        fontSize: heightPercentage(3.5),
        fontWeight: theme.fonts.bold,
        marginVertical: heightPercentage(2),
      },
      sectionTitle: {
        fontSize: heightPercentage(2.5),
        fontWeight: theme.fonts.bold,
        marginVertical: heightPercentage(1),
      },
      imagePickerContainer: {
        marginVertical: heightPercentage(2),
      },
      imagePicker: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      imagePreview: {
        width: widthPercentage(20),
        height: widthPercentage(20),
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000',
      },
      imagePickerText: {
        marginLeft: widthPercentage(4),
        fontSize: heightPercentage(2),
      },
      publicBtn: {
        width: 'fit-content',
        paddingVertical: 3,
        paddingHorizontal: 10,
        height: heightPercentage(7),
        borderRadius: theme.radius.md,
        borderBottomWidth: 5
    },
      saveButton: {
        marginVertical: heightPercentage(3),
      },
    });