import React, { useState, useEffect } from 'react';
import { followUser, unfollowUser } from '../api/users';
import { theme } from '../constants/theme';
import { heightPercentage, widthPercentage } from '../helpers/common';
import  Button  from './Button.jsx'; 
import { ToastAndroid, StyleSheet } from 'react-native';

const FollowButton = ({ targetId, initialFollowStatus }) => {
  const [isFollowing, setIsFollowing] = useState(initialFollowStatus);
  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    try {
      setLoading(true);
      if (isFollowing) {
        await unfollowUser(targetId);
        ToastAndroid.show('Dejaste de seguir al usuario.', ToastAndroid.SHORT);
      } else {
        await followUser(targetId);
        ToastAndroid.show('Has comenzado a seguir al usuario.', ToastAndroid.SHORT);
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('Error handling follow/unfollow:', error);
      ToastAndroid.show(
        error.message || 'Error al procesar la acción de seguimiento.',
        ToastAndroid.SHORT
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      title={isFollowing ? 'Dejar de seguir' : 'Seguir'}
      buttonStyle={styles.followBtn}
      onPress={handleFollow}
      disabled={loading}
      backgroundColor={theme.colors.primary}
      textColor="black"
      textStyle={{ fontSize: heightPercentage(1.5) }}
    />
  );
};

export default FollowButton;
const styles = StyleSheet.create({
followBtn: {
    width: 'fit-content',
    paddingVertical: 3,
    paddingHorizontal: 10,
    height: heightPercentage(5),
    borderRadius: theme.radius.md,
    borderBottomWidth: 3
  },
});