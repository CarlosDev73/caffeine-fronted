import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import { StatusBar } from 'expo-status-bar';
import { widthPercentage, heightPercentage } from '../helpers/common.js';
import { theme } from '../constants/theme.js';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AbsoluteButton from '../components/AbsoluteButton.jsx';
import Input from '../components/Input.jsx';
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
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        if (!id) throw new Error('Post ID is missing');
        //  console.log('Fetching post by ID:', id);
        const fetchedPost = await fetchPostById(id); // Fetching the post by ID
        //  console.log('Fetched Post:', fetchedPost);
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
              <Image source={require('../assets/images/avatar.png')} style={{ borderRadius: 100, borderWidth: 10 }} />
              <View style={{ marginLeft: 7 }}>
                <Text style={[{ fontWeight: theme.fonts.bold }]}>Lamborci Mona</Text>
                <View style={styles.statusContainer}>
                  <AntDesign name="star" size={20} color="green" />
                  <Text style={[{ fontWeight: theme.fonts.bold, fontSize: heightPercentage(1.5) }]}>Expresso</Text>
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
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </Text>
                {post.tags?.length > 0 && (
                  <Text style={styles.tagsText}>
                    {post.tags.join(', ')}
                  </Text>
                )}
              </View>
              <View style={styles.imageTextContainer}>
                <Image source={{ uri: post.media[0].secure_url }} style={styles.postImage} />
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
              <FavoriteButton postId={post._id} currentUserId={userId} />
              <ShareButton post={post} />
            </View>
            <Input
              icon={<FontAwesome5 name="comment" size={24} color="black" />}
              placeholder='Escribe un comentario...'
              onChangeText={() => { }}
              inputStyle={{ fontSize: heightPercentage(1.5) }}
              containerStyles={{ flexDirection: 'row-reverse' }}
            />
          </View>
        </View>
      </ScreenWrapper>
      <CommentModal visible={modalVisible} onClose={() => setModalVisible(false)} postId={id} />
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
});
