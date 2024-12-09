import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Pressable, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import ScreenWrapper from '../components/ScreenWrapper';
import { theme } from '../constants/theme';
import ProfileComponents from '../components/ProfileComponents';
import SimpleFeedPost from '../components/SimpleFeedPost';
import MainPanel from '../components/MainPanel';
import ActionModal from '../components/ActionModal';
import LogOutModal from '../components/LogOutModal';
import Feather from '@expo/vector-icons/Feather';
import { fetchUserPosts } from '../api/posts';
import { fetchUserById } from '../api/users';
import LevelModal from '../components/LevelModal';

const Profile = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const [isModalLogOutVisible, setIsModaLogOutlVisible] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const loadUserData = async () => {
      try {

        if(id)
          setUserId(id)
        else
          setUserId(await SecureStore.getItemAsync('userId'));

        /* if (!userId) {
          Alert.alert('Error', 'No se encontró el ID del usuario. Por favor, inicia sesión nuevamente.');
          return;
        } */

        if(userId){
          const user = await fetchUserById(userId); // Carga los datos del usuario
          setUserData(user);
        }
      } catch (error) {
        console.error('Error al cargar los datos del usuario:', error);
        Alert.alert('Error', 'No se pudieron cargar los datos del usuario.');
      }
    };
    const loadUserPosts = async () => {
      try {
        
        if(id)
          setUserId(id)
        else
          setUserId(await SecureStore.getItemAsync('userId'));

        /* if (!userId) {
          Alert.alert('Error', 'No se encontró el ID del usuario. Por favor, inicia sesión nuevamente.');
          return;
        } */
        if(userId){
          const posts = await fetchUserPosts(userId);
          setUserPosts(posts);
        }
      } catch (error) {
        console.error('Error al cargar los posts del usuario:', error);
        Alert.alert('Error', 'No se pudieron cargar los posts.');
      }
    };
    loadUserData();
    loadUserPosts();
  }, [userId]);
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

  const generateColor = (index) => {
    const colors = ['#61E4C5', '#FFD465', '#FFC7DE', '#FFF4CC', '#F4F5F7'];
    return colors[index % colors.length]; // Selecciona un color de forma cíclica
  };
  const currentPoints = userData?.points || 0;
  const nextLevelRequirements = userData?.nextLevelRequirements || 0;
  const levelName = userData?.level?.name || 'Nivel Desconocido';

  return (
    <ScreenWrapper style={styles.screenWrapper}>
      <ScrollView contentContainerStyle={styles.scrollContent} style={styles.scrollView}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <ProfileComponents.CircularAvatar
              avatarSource={{ uri: userData?.profileImg?.secure_url || '../assets/images/pic.png' }}
            />
          </View>
          { !id && (
            <Pressable onPress={() => setOptionsModalVisible(true)} style={styles.optionsButton}>
              <Feather name="more-vertical" size={24} color="black" />
            </Pressable>
          )}
          <Text style={styles.name}>{userData?.displayName || 'Usuario'}</Text>
          <Text style={styles.username}>@{userData?.userName || 'username'}</Text>

          {/* Level Bar */}
          <ProfileComponents.LevelBarWrapper
            levelName={levelName}
            progress={currentPoints}
            maxProgress={nextLevelRequirements}
            widthMultiplier={62}
            onPress={() => setModalVisible(true)} // Handle modal display
          />

          {/* Stats Section */}
          <View style={styles.statsContainer}>
            <ProfileComponents.Stats posts={userPosts.length} followers={userData?.followers?.length || 0} following={userData?.following?.length || 0} />
          </View>
        </View>

        {/* Bio Section */}
        <View style={styles.bioSection}>
          <Text style={styles.sectionTitle}>Bio</Text>
          <Text style={styles.bioText}>{userData?.biography || 'Sin biografía'}</Text>
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
          {userData?.skills && userData.skills.length > 0 ? (
            <View style={styles.tagsContainer}>
              {userData.skills[0]
                .split(',')
                .map((skill, index) => (
                  <View
                    key={`tag-${index}-${skill}`}
                    style={[styles.tag, { backgroundColor: generateColor(index) }]}
                  >
                    <Text style={styles.tagText}>{String(skill).trim()}</Text>
                  </View>
                ))}
            </View>
          ) : (
            <Text style={styles.bioText}>No hay etiquetas asignadas actualmente.</Text>
          )}
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
    position: 'relative',
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
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Permite que los elementos se ajusten a múltiples filas
    marginTop: 8,
    gap: 8, // Espaciado uniforme entre chips
  },
  tag: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  tagText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  tagsSection: {
    paddingVertical: 10,
    padding: 20,
  },
});
