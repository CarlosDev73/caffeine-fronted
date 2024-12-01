import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity, Image, Alert, ToastAndroid } from 'react-native';
import { theme } from '../constants/theme';
import { heightPercentage, widthPercentage } from '../helpers/common';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import Feather from '@expo/vector-icons/Feather';
import { deletePost } from '../api/posts'
import ActionModal from './ActionModal'; // Ensure this component exists or adjust the import path accordingly
import LikeButton from './LikeButton';
import CommentCountButton from './CommentButton';


const FeedPost = ({ post }) => {
  const router = useRouter();

  const [comments, setComments] = useState(post.comments?.length || 0);
  const [points, setPoints] = useState(post.stars?.length || 0);
  const [userId, setUserId] = useState(null);
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  
  const isOwner = post._userId._id?.toString() === userId?.toString();

  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [isLiked, setIsLiked] = useState(post.isLiked);

  const optionsActions = [
    ...(isOwner
      ? [
          {
            text: 'Editar',
            icon: <Feather name="edit" size={24} color="black" />,
            onPress: () => {
              setOptionsModalVisible(false);
              router.push({ pathname: '/editMyPost', params: { id: post._id } });
              console.log('Editar opción seleccionada');
            },
          },
          {
            text: 'Eliminar',
            icon: <MaterialCommunityIcons name="trash-can-outline" size={24} color="black" />,
            onPress: async () => {
              console.log('Opción eliminar tocada');
              try {
                Alert.alert(
                  'Confirmar eliminación',
                  '¿Estás seguro de que deseas eliminar este post?',
                  [
                    {
                      text: 'Cancelar',
                      onPress: () => console.log('Eliminación cancelada'),
                      style: 'cancel',
                    },
                    {
                      text: 'Eliminar',
                      onPress: async () => {
                        const response = await deletePost(post._id);
                        ToastAndroid.show('Post eliminado exitosamente', ToastAndroid.SHORT);
                        router.push('/feed');
                      },
                    },
                  ]
                );
              } catch (error) {
                console.error('Error en la eliminación del post:', error);
                Alert.alert('Error', error.message || 'Hubo un problema al eliminar el post.');
              }
            },
          },
          
          
        ]
      : []),
    {
      text: 'Compartir',
      icon: <Feather name="share" size={24} color="black" />,
      onPress: () => {
        setOptionsModalVisible(false);
        console.log('Compartir opción seleccionada');
      },
    },
  ];
  useEffect(() => {
    const fetchUserIdAndInitializeLikes = async () => {
      try {
        // Fetch the current user ID from SecureStore
        const fetchedUserId = await SecureStore.getItemAsync('userId');
        if (!fetchedUserId) {
          console.error("User ID not found in SecureStore");
          return;
        }
  
        // Set the user ID state
        setUserId(fetchedUserId);
  
        // Fetch likes data for the post
        
      } catch (error) {
        console.error("Error initializing likes:", error);
      }
    };
  
    // Ensure the function runs only if post._id exists
    if (post._id) {
      fetchUserIdAndInitializeLikes();
    }
  }, [post._id]);
  
  
  
  return (
    <View style={styles.container}>
      {/* Header del Post */}
      <View style={styles.header}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={{ uri: post._userId.profileImg?.secure_url || 'https://via.placeholder.com/100' }}
            style={styles.avatar}
          />
          <View style={{ marginLeft: 7 }}>
            <Text style={styles.text}>{post._userId.userName || 'Usuario desconocido'}</Text>
            <Text style={styles.minText}>{new Date(post.createdAt).toLocaleDateString()}</Text>
          </View>
        </TouchableOpacity>
        <Pressable onPress={() => setOptionsModalVisible(true)}>
          <Feather name="more-vertical" size={20} color="black" />
        </Pressable>
      </View>

      {/* Contenido del Post */}
      <Pressable
        onPress={() => {
          router.push({ pathname: '/post', params: { id: post._id } });
        }}
      >
        <View>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.description}>{post.content}</Text>
        </View>
        {post.media?.[0]?.secure_url && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: post.media[0].secure_url }} style={styles.postImage} />
          </View>
        )}
      </Pressable>

      {/* Reacciones */}
      <View style={styles.reactionsContainer}>
        <CommentCountButton postId={post._id} />

        <LikeButton 
         postId={post._id}
         currentUserId={userId}
        />

        <Pressable style={styles.reactions} onPress={() => setPoints(points + 1)}>
          <Feather name="star" size={20} color="black" />
          <Text style={styles.reactionsText}>{points}</Text>
        </Pressable>

        <Pressable>
          <Feather name="share" size={20} color="black" />
        </Pressable>
      </View>

      {/* Modal de opciones */}
      <ActionModal visible={optionsModalVisible} onClose={() => setOptionsModalVisible(false)} actions={optionsActions} />
    </View>
  );
};

export default FeedPost;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingVertical: 7,
    paddingHorizontal: 20,
    justifyContent: 'space-evenly',
    width: widthPercentage(90),
    borderCurve: 'continuous',
    borderRadius: theme.radius.xl,
    borderWidth: 2,
    borderColor: 'black',
    borderBottomWidth: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  text: {
    fontSize: heightPercentage(2),
    fontWeight: theme.fonts.bold,
  },
  minText: {
    fontSize: heightPercentage(1.4),
    fontWeight: theme.fonts.bold,
    color: 'gray',
  },
  title: {
    fontSize: heightPercentage(3.4),
    fontWeight: theme.fonts.bold,
  },
  description: {
    fontSize: heightPercentage(2.5),
    marginBottom: 10,
  },
  imageContainer: {
    justifyContent: 'center',
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
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
