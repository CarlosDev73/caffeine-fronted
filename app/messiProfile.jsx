import React, { useState } from 'react'; // Asegúrate de importar useState
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import ScreenWrapper from '../components/ScreenWrapper';
import { theme } from '../constants/theme';
import ProfileComponents from '../components/ProfileComponents';
import SimpleFeedPost from '../components/SimpleFeedPost';
import MainPanel from '../components/MainPanel';
import ActionModal from '../components/ActionModal'; // Importar ActionModal
import LogOutModal from '../components/LogOutModal'; // import LogOutModal

import Feather from '@expo/vector-icons/Feather'; // Importar íconos necesarios

const messiProfile = () => {

  const router = useRouter();
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const [isModalLogOutVisible, setIsModaLogOutlVisible] = useState(false);// Status modal Log out confirmation

  // Acciones para el ActionModal en el perfil
  const profileActions = [
    {
      text: 'Editar perfil',
      icon: <Feather name="edit" size={24} color="black" />,
      onPress: () => {
        setOptionsModalVisible(false);
        console.log('Editar perfil seleccionado');
        router.push('editProfile');
      },
    },
    {
      text: 'Cambiar contraseña',
      icon: <Feather name="lock" size={24} color="black" />,
      onPress: () => {
        setOptionsModalVisible(false);
        console.log('Cambiar contraseña seleccionado');
        router.push('updatePassword');
      },
    },
    {
      text: 'Cerrar sesión',
      icon: <Feather name="log-out" size={24} color="black" />,
      onPress: () => {
        setOptionsModalVisible(false);
        setIsModaLogOutlVisible(true);
      },
    },
  ];

  const tagsData = [
    { text: 'C++', color: '#E0E0E0' },
    { text: 'JavaScript', color: '#FFD700' },
    { text: 'Python', color: '#A7FFEB' },
    { text: 'Visual Basic', color: '#FFCCBC' },
    { text: 'POO', color: '#CFD8DC' },
  ];

  return (
    <ScreenWrapper style={styles.screenWrapper}>
      <ScrollView contentContainerStyle={styles.scrollContent} style={styles.scrollView}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <ProfileComponents.StarAvatar  size={100} />
          </View>
          <Text style={styles.name}>Lionel Messi</Text>
          <Text style={styles.username}>@Thegoat</Text>

          {/* Level Bar */}
          <ProfileComponents.LevelBar levelName="Capuchino" progress={1} maxProgress={100} />

          {/* Stats Section */}
          <View style={styles.statsContainer}>
            <ProfileComponents.Stats posts={0} followers="100k" following={1} />
          </View>
        </View>

        {/* Bio Section */}
        <View style={styles.bioSection}>
          <Text style={styles.sectionTitle}>Bio</Text>
          <Text style={styles.bioText}>
          Después de ganar el Mundial, decidí que era hora de un nuevo desafío. Así que me puse a aprender programación. Si puedo driblar defensas, ¡seguro puedo manejar unos cuantos códigos!
          </Text>
        </View>

        {/* Last Post Section 
        <View style={styles.lastPostSection}>
          <Text style={styles.sectionTitle}>Último post</Text>
          <TouchableOpacity onPress={() => router.push('myPost')}>
            <SimpleFeedPost />
          </TouchableOpacity>
        </View>*/}

        {/* Tags Section */}
        <View style={styles.tagsSection}>
          <Text style={styles.sectionTitle}>Tags</Text>
          <ProfileComponents.Tags tags={tagsData} />
        </View>
      </ScrollView>

      {/* Bottom Menu */}
      <MainPanel />
      <ActionModal visible={optionsModalVisible} onClose={() => setOptionsModalVisible(false)} actions={profileActions} />
      <LogOutModal visible={isModalLogOutVisible} onClose={() => setIsModaLogOutlVisible(false)} />
    </ScreenWrapper>
  )
}

export default messiProfile

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
  },
  scrollView: {
    marginTop: -30,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
    paddingTop: 0,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingTop: 30,
    backgroundColor: theme.colors.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'relative', // Para el posicionamiento del botón de opciones
  },
  avatarContainer: {
    position: 'relative',
  },
  optionsButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  name: {
    fontSize: 36,
    fontWeight: '800',
    color: theme.colors.dark,
  },
  username: {
    fontSize: 16,
    color: theme.colors.text,
  },
  statsContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  bioSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: theme.colors.dark,
  },
  bioText: {
    fontSize: 16,
    color: theme.colors.text,
    marginTop: 5,
  },
  lastPostSection: {
    padding: 20,
  },
  tagsSection: {
    padding: 20,
  },
})