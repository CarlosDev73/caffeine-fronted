import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { theme } from '../constants/theme';
import { heightPercentage, widthPercentage } from '../helpers/common';

const SimpleFeedPost = () => {
  const [comments, setComments] = useState(0);
  const [likes, setLikes] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Post Image Placeholder */}
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <MaterialCommunityIcons name="image-outline" size={24} color="white" />
          </View>
        </View>

        {/* Post Text */}
        <View style={styles.textContainer}>
          <Text style={styles.dateText}>12 Marzo, 20</Text>
          <Text style={styles.titleText}>I'm post title, Please 2 line only...</Text>
        </View>
      </View>

      {/* Reaction Icons */}
      <View style={styles.reactions}>
        <Pressable style={styles.reactionButton} onPress={() => setComments(comments + 1)}>
          <MaterialCommunityIcons name="comment-outline" size={20} color="black" />
          <Text style={styles.reactionText}>Comment</Text>
        </Pressable>
        <Pressable style={styles.reactionButton} onPress={() => setLikes(likes + 1)}>
          <Octicons name="heart" size={20} color="black" />
          <Text style={styles.reactionText}>Like</Text>
        </Pressable>
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
    borderColor: theme.colors.dark,
    borderWidth: 2,
    width: widthPercentage(90),
    alignSelf: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  imageContainer: {
    marginRight: 16,
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
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
  },
  reactions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  reactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reactionText: {
    marginLeft: 4,
    fontSize: heightPercentage(1.8),
    fontWeight: theme.fonts.bold,
    color: theme.colors.dark,
  },
});
