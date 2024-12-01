import React, { useState, useEffect } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import Octicons from '@expo/vector-icons/Octicons';
import { likePost, unlikePost, fetchPostLikes } from '../api/posts';

const LikeButton = ({ postId, currentUserId }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    useEffect(() => {

        const initializeLikes = async () => {
            try {
                const likes = await fetchPostLikes(postId);
                

                // Ensure likes is an array
                if (likes) {
                    const userHasLiked = likes.some((like) => like.userId?._id === String(currentUserId));
                    setIsLiked(userHasLiked);
                    setLikesCount(likes.length);
                } else {
                    setIsLiked(false);
                    setLikesCount(0);
                }
            } catch (error) {
                console.error('Error initializing likes:', error);
                setIsLiked(false);
                setLikesCount(0);
            }
        };
        initializeLikes();
      }, [postId, currentUserId]);
    const handleLike = async () => {
        try {
          if (isLiked) {
            await unlikePost(postId);
            setLikesCount((prevCount) => Math.max(0, prevCount - 1));
          } else {
            await likePost(postId);
            setLikesCount((prevCount) => prevCount + 1);
          }
          setIsLiked(!isLiked);
        } catch (error) {
          console.error("Error toggling like:", error);
        }
      };

    return (
        <Pressable onPress={handleLike} style={styles.container}>
            <Octicons
                name={isLiked ? 'heart-fill' : 'heart'}
                size={20}
                color={isLiked ? 'red' : 'black'} // Red if liked, black otherwise
            />
            <Text style={styles.likesText}>{likesCount}</Text>
        </Pressable>
    );
};

export default LikeButton;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    likesText: {
        marginLeft: 8,
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
});
