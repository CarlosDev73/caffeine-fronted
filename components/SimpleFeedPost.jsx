import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { theme } from '../constants/theme';
import { heightPercentage, widthPercentage } from '../helpers/common';

const SimpleFeedPost = ({ post }) => {
  const [comments, setComments] = useState(0);
  const [likes, setLikes] = useState(0);
  return (
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
            <Pressable style={styles.reactionButton} onPress={() => setComments(comments + 1)}>
              <MaterialCommunityIcons name="comment-outline" size={20} color="black" />
              <Text style={styles.reactionText}>1.5k</Text>
            </Pressable>
            <Pressable style={[styles.reactionButton, styles.likeButton]} onPress={() => setLikes(likes + 1)}>
              <Octicons name="heart" size={20} color="black" />
              <Text style={styles.reactionText}>2k</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
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
    fontWeight: theme.fonts.bold,
    color: theme.colors.dark,
    marginBottom: 10,
  },
  reactions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
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
