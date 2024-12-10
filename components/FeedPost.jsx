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
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';
import VerticalDots from './VerticalDots';

const FeedPost = ({ post }) => {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const isOwner = post._userId._id?.toString() === userId?.toString();
  const [isExpanded, setIsExpanded] = useState(false);
  const charLimit = 150;

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

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
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={ () => router.push({ pathname: 'profile', params: { id: post._userId._id }})}>
          <Image
            source={{ uri: post._userId.profileImg?.secure_url || 'https://via.placeholder.com/100' }}
            style={styles.avatar}
          />
          <View style={{ marginLeft: 7 }}>
            <Text style={styles.text}>{post._userId.userName || 'Usuario desconocido'}</Text>
            <Text style={styles.minText}>
              {post.createdAt
                ? `${new Date(post.createdAt).toLocaleDateString()} ${new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                : 'Fecha no disponible'}
            </Text>
          </View>
        </TouchableOpacity>
        <VerticalDots isOwner={isOwner} postId={post._id} router={router} />
      </View>

      {/* Contenido del Post */}
      <Pressable
        onPress={() => {
          router.push({ pathname: '/post', params: { id: post._id } });
        }}
      >
        <View>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.description}>
            {isExpanded || post.content.length <= charLimit
              ? post.content
              : `${post.content.substring(0, charLimit)}...`}
          </Text>
          {post.content.length > charLimit && (
            <TouchableOpacity onPress={toggleContent}>
              <Text style={styles.readMoreText}>
                {isExpanded ? 'Mostrar menos' : 'Leer más'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {post.type === 'issue' ? (
          <View style={styles.codeContainer}>
            <Text style={styles.codeContent}>{post.codeContent || 'No code available'}</Text>
          </View>
        ) : (
          post.media?.[0]?.secure_url && (
            <View style={styles.imageContainer}>
              <Image source={{ uri: post.media[0].secure_url }} style={styles.postImage} />
            </View>
          )
        )}
      </Pressable>

      {/* Reacciones */}
      <View style={styles.reactionsContainer}>
        <CommentCountButton postId={post._id} />

        <LikeButton
          postId={post._id}
          currentUserId={userId}
        />

        <ShareButton post={post} />

        <FavoriteButton
          postId={post._id}
          currentUserId={userId}
        />

      </View>
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
    fontWeight: theme.fonts.semibold,
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
  codeContainer: {
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  codeContent: {
    fontFamily: 'monospace', // Use a monospaced font for code
    fontSize: heightPercentage(2),
    color: 'black',
  },
});
