import React, { useState, useEffect } from 'react'; // Asegúrate de importar useState
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import ScreenWrapper from '../components/ScreenWrapper';
import { theme } from '../constants/theme';
import ProfileComponents from '../components/ProfileComponents';
import SimpleFeedPost from '../components/SimpleFeedPost';
import MainPanel from '../components/MainPanel';
import ActionModal from '../components/ActionModal'; // Importar ActionModal
import LogOutModal from '../components/LogOutModal'; // import LogOutModal
import Feather from '@expo/vector-icons/Feather'; // Importar íconos necesarios
import { fetchUserPosts } from '../api/posts';
import LevelModal from '../components/LevelModal';

const Profile = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const [isModalLogOutVisible, setIsModaLogOutlVisible] = useState(false);// Status modal Log out confirmation
  const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {
    const loadUserPosts = async () => {
      try {
        const userId = await SecureStore.getItemAsync('userId');
        if (!userId) {
          Alert.alert('Error', 'No se encontró el ID del usuario. Por favor, inicia sesión nuevamente.');
          return;
        }

        const posts = await fetchUserPosts(userId);
        setUserPosts(posts);
      } catch (error) {
        console.error('Error al cargar los posts del usuario:', error);
        Alert.alert('Error', 'No se pudieron cargar los posts.');
      }
    };

    loadUserPosts();
  }, []);
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
            <ProfileComponents.StarAvatar avatarSource={require('../assets/images/pic.png')} size={100} />
          </View>
          <Pressable onPress={() => setOptionsModalVisible(true)} style={styles.optionsButton}>
            <Feather name="more-vertical" size={24} color="black" />
          </Pressable>
          <Text style={styles.name}>Katrisa Feona</Text>
          <Text style={styles.username}>@katiness</Text>

          {/* Level Bar */}
          <ProfileComponents.LevelBarWrapper
            levelName="Capuchino"
            progress={2500}
            maxProgress={3000}
            widthMultiplier={62}
            onPress={() => setModalVisible(true)} // Aquí llamas al estado del modal
          />

          {/* Stats Section */}
          <View style={styles.statsContainer}>
            <ProfileComponents.Stats posts={276} followers="62k" following={23} />
          </View>
        </View>

        {/* Bio Section */}
        <View style={styles.bioSection}>
          <Text style={styles.sectionTitle}>Bio</Text>
          <Text style={styles.bioText}>
            Soy una desarrolladora apasionada del desarrollo web y me gustaría compartir mis conocimientos con todos
          </Text>
        </View>

        {/* Last Post Section */}
        <View style={styles.lastPostSection}>
          <Text style={styles.sectionTitle}>Últimos posts</Text>
          {userPosts.map((post) => (
            <TouchableOpacity key={post._id} onPress={() => router.push(`post/${post._id}`)}>
              <SimpleFeedPost post={post} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Tags Section */}
        <View style={styles.tagsSection}>
          <Text style={styles.sectionTitle}>Tags</Text>
          <ProfileComponents.Tags tags={tagsData} />
        </View>
      </ScrollView>

      {/* Bottom Menu */}
      <MainPanel />
      <ActionModal visible={optionsModalVisible} onClose={() => setOptionsModalVisible(false)} actions={profileActions} />
      <LevelModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <LogOutModal visible={isModalLogOutVisible} onClose={() => setIsModaLogOutlVisible(false)} />
    </ScreenWrapper>
  );
};

export default Profile;

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
});
