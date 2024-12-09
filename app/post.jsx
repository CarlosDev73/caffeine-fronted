import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Pressable, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import { widthPercentage, heightPercentage } from '../helpers/common.js';
import { theme } from '../constants/theme.js';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AbsoluteButton from '../components/AbsoluteButton.jsx';
import Button from '../components/Button.jsx';
import CommentModal from '../components/CommentModal';
import ActionModal from '../components/ActionModal'; // Asegúrate de importar ActionModal correctamente
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import LikeButton from '../components/LikeButton';
import CommentButton from '../components/CommentButton';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { fetchPostById } from '../api/posts';
import * as SecureStore from 'expo-secure-store';

const Post = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  //console.log('Retrieved post ID:', id);
  const [modalVisible, setModalVisible] = useState(false);
  const [optionsModalVisible, setOptionsModalVisible] = useState(false); // Estado para ActionModal
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        if (!id) throw new Error('Post ID is missing');
        //  console.log('Fetching post by ID:', id);
        const fetchedPost = await fetchPostById(id); // Fetching the post by ID
        //  console.log('Fetched Post:', fetchedPost);
        console.log('Profile Image URL:', post._userId?.profileImg?.secure_url);
        setPost(fetchedPost); // Set the fetched post data

        const fetchedUserId = await SecureStore.getItemAsync('userId');
        if (!fetchedUserId) {
          console.error("User ID not found in SecureStore");
          return;
        }

        // Set the user ID state
        setUserId(fetchedUserId);

      } catch (error) {
        Alert.alert('Error', error.message || 'Failed to fetch post data.');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading post...</Text>
      </View>
    );
  }

  if (!post) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Post not found</Text>
      </View>
    );
  }



  // Acciones para el ActionModal de opciones
  const optionsActions = [
    {
      text: 'Editar',
      icon: <Feather name="edit" size={24} color="black" />,
      onPress: () => {
        setOptionsModalVisible(false);
        console.log('Editar opción seleccionada');
        // Agregar lógica de edición aquí
      },
    },
    {
      text: 'Eliminar',
      icon: <MaterialCommunityIcons name="trash-can-outline" size={24} color="black" />,
      onPress: () => {
        setOptionsModalVisible(false);
        console.log('Eliminar opción seleccionada');
        // Agregar lógica de eliminación aquí
      },
    },
  ];
  return (
    <View style={styles.container}>
      <ScreenWrapper>
        <View style={styles.exitBtn}>
          <AbsoluteButton
            child={<Feather name="x" size={30} color="black" />}
            buttonStyle={{ top: -10, backgroundColor: 'white' }}
            onPress={() => { router.push('feed') }}
          />
        </View>
        <View style={styles.content}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20 }}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={
                  post._userId?.profileImg?.secure_url
                    ? { uri: post._userId.profileImg.secure_url }
                    : require('../assets/images/avatar.png') // Reemplaza con una imagen predeterminada
                }
                style={styles.avatar}
              />
              <View style={{ marginLeft: 7 }}>
                <Text style={[{ fontWeight: theme.fonts.bold }]}>@{post._userId?.userName || 'Unknown User'}</Text>
                <View style={styles.statusContainer}>
                  <AntDesign name="star" size={20} color="green" />
                  <Text style={[{ fontWeight: theme.fonts.bold, fontSize: heightPercentage(1.5) }]}>{post._userId.level?.name || 'N/A'}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <Button
              title='Seguir'
              buttonStyle={styles.followBtn}
              onPress={() => { console.log('seguido') }}
              backgroundColor={theme.colors.primary}
              textColor='black'
              textStyle={{ fontSize: heightPercentage(1.5) }}
            />
            {/* Botón de opciones (tres puntos) 
            <Pressable onPress={() => setOptionsModalVisible(true)}>
              <Feather name="more-vertical" size={20} color="black" />
            </Pressable>*/}
          </View>
          <View style={{ flex: 1 }}>
            <ScrollView>
              <Text style={styles.title}>{post.title}</Text>
              <View style={styles.dateTags}>
                <Text style={styles.date}>
                  {post.createdAt
                    ? `${new Date(post.createdAt).toLocaleDateString()} ${new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                    : 'Fecha no disponible'}
                </Text>
                {post.tags?.length > 0 && (
                  <Text style={styles.tagsText}>
                    {post.tags.join(', ')}
                  </Text>
                )}
              </View>
              <View style={styles.imageTextContainer}>
                <Image source={{ uri: post.media[0].secure_url }} style={styles.postImage} />
              </View>
              <View style={styles.contentContainer}>
                {post.type === 'issue' && post.codeContent ? (
                  <View style={styles.codeContainer}>
                    <Text style={styles.codeContent}>{post.codeContent}</Text>
                  </View>
                ) : (
                  <>

                  </>
                )}
                <Text style={styles.description}>{post.content}</Text>
              </View>
            </ScrollView>
          </View>
          <View style={styles.reactionsSection}>
            <View style={styles.reactionsContainer}>
              <Pressable style={styles.reactions} onPress={() => setModalVisible(true)}>
                <CommentButton postId={post._id} onPress={() => setModalVisible(true)} />
              </Pressable>
              <LikeButton postId={post._id} currentUserId={userId} />
              <ShareButton post={post} />
              <FavoriteButton postId={post._id} currentUserId={userId} />
            </View>
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
              <View style={[styles.inputContainer, { flexDirection: 'row-reverse' }]}>
                <FontAwesome5 name="comment" size={24} color="black" />
                <Text style={[styles.placeholderText, { fontSize: heightPercentage(1.5) }]}>
                  Escribe un comentario...
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ScreenWrapper>
      <CommentModal visible={modalVisible} onClose={() => setModalVisible(false)} postId={id} postType={post.type} postOwnerId={post._userId} />
      <ActionModal visible={optionsModalVisible} onClose={() => setOptionsModalVisible(false)} actions={optionsActions} />
    </View>
  );
};
export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#bababc',
    paddingHorizontal: widthPercentage(4),
    height: heightPercentage(100)
  },
  codeContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  codeContent: {
    fontFamily: 'monospace',
    fontSize: heightPercentage(2),
    color: theme.colors.dark,
  },
  contentContainer: {
    marginVertical: 10,
  },
  exitBtn: {
    width: widthPercentage(100),
    height: heightPercentage(10),
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  content: {
    flex: 1,
    height: heightPercentage(100),
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderColor: 'black',
    borderTopWidth: 5,
    borderWidth: 2,
    paddingHorizontal: widthPercentage(5)
  },
  statusContainer: {
    backgroundColor: '#F4F5F7',
    borderRadius: theme.radius.md,
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: widthPercentage(24),
  },
  followBtn: {
    width: 'fit-content',
    paddingVertical: 3,
    paddingHorizontal: 10,
    height: heightPercentage(4.5),
    borderRadius: theme.radius.md,
    borderBottomWidth: 3
  },
  title: {
    fontSize: heightPercentage(5),
    fontWeight: theme.fonts.bold,
  },
  dateTags: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  imageTextContainer: {
    paddingVertical: heightPercentage(2)
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 17,
  },
  description: {
    marginTop: 10
  },
  reactionsSection: {
    height: heightPercentage(15)
  },
  reactionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  reactions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reactionsText: {
    marginLeft: 4,
    fontWeight: theme.fonts.bold,
  },
  inputContainer: {
    flexDirection: 'row',
    height: heightPercentage(7, 2),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: theme.colors.dark,
    borderRadius: theme.radius.xl,
    borderCurve: 'continuous',
    paddingHorizontal: 18,
    gap: 12,
  },
  placeholderText: {
    flex: 1,
    fontSize: heightPercentage(2.5),
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.dark,
  },
});
