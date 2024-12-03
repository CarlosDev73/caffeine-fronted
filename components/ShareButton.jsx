import React from 'react';
import { Pressable, StyleSheet, Share } from 'react-native';
import Octicons from '@expo/vector-icons/Octicons';

const ShareButton = ({ post }) => {
  const handleSharePost = async () => {
    try {
      const result = await Share.share({
        message: `Check out this post:\n\n${post.title}\n\n${post.content}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Post shared successfully!');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing post:', error.message);
    }
  };

  return (
    <Pressable style={styles.container} onPress={handleSharePost}>
      <Octicons name="share" size={20} color="black" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ShareButton;
