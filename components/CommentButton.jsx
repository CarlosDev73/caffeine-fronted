import React, { useState, useEffect } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { fetchComments } from '../api/posts'; // Ensure this API endpoint exists

const CommentButton = ({ postId, onPress }) => {
    const [commentsCount, setCommentsCount] = useState(0);

    useEffect(() => {
        const initializeComments = async () => {
            try {
                const comments = await fetchComments(postId); // Fetch the comments from the API
                if (comments) {
                    setCommentsCount(comments.length);
                } else {
                    setCommentsCount(0);
                }
            } catch (error) {
                console.error('Error initializing comments:', error);
                setCommentsCount(0);
            }
        };
        initializeComments();
    }, [postId]);

    return (
        <Pressable style={styles.container} onPress={onPress}>
            <MaterialCommunityIcons name="comment-outline" size={20} color="black" />
            <Text style={styles.commentsText}>{commentsCount}</Text>
        </Pressable>
    );
};

export default CommentButton;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    commentsText: {
        marginLeft: 8,
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
});
