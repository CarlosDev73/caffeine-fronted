import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { theme } from '../constants/theme';
import { useRouter } from 'expo-router';
import { heightPercentage, widthPercentage } from '../helpers/common';
import * as SecureStore from 'expo-secure-store';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';

const SimpleFeedPost = ({ post }) => {
  const router = useRouter();

  const [userId, setUserId] = useState(null);
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
    <Pressable
      onPress={() => {
        router.push({ pathname: '/post', params: { id: post._id } });
      }}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.imagePlaceholder}>
            {post.media?.[0]?.secure_url ? (
              <Image source={{ uri: post.media[0].secure_url }} style={styles.postImage} />
            ) : (
              <MaterialCommunityIcons name="image-outline" size={40} color="white" />
            )}
          </View>
          <View style={styles.textAndReactions}>
            <Text style={styles.dateText}>{new Date(post.createdAt).toLocaleDateString()}</Text>
            <Text style={styles.titleText}>{post.title}</Text>
            <View style={styles.reactions}>
              <View style={styles.reactionButton}>
                <CommentButton postId={post._id} />
              </View>
              <View style={styles.reactionButton}>
                <LikeButton style={styles.reactionButton}
                  postId={post._id}
                  currentUserId={userId}
                />
              </View>


            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default SimpleFeedPost;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 16,
    marginVertical: 8,
    backgroundColor: 'white',
    borderRadius: theme.radius.md,
    width: widthPercentage(90),
    alignSelf: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 90,
    height: 90, // Fixed dimensions for placeholder
    backgroundColor: theme.colors.primary, // Fallback background color
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderRadius: 8, // Optional: Add rounded corners
    overflow: 'hidden', // Ensures the image fits within rounded corners
  },
  postImage: {
    width: '100%',
    height: '100%', // Fill the placeholder completely
    resizeMode: 'cover', // Ensures the image scales proportionally
  },
  textAndReactions: {
    flex: 1,
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: heightPercentage(1.5),
    color: 'gray',
    marginBottom: 4,
  },
  titleText: {
    fontSize: heightPercentage(2.5),
    fontWeight: theme.fonts.semiBold,
    color: theme.colors.dark,
    marginBottom: 10,
  },
  reactions: {
    flexDirection: 'row', // Align buttons horizontally
  },
  reactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  likeButton: {
    marginRight: 0,
  },
  reactionText: {
    marginLeft: 4,
    fontSize: heightPercentage(1.8),
    fontWeight: theme.fonts.bold,
    color: theme.colors.dark,
  },
});
