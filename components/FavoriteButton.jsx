import React, { useState, useEffect } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import Octicons from '@expo/vector-icons/Octicons';
import { markAsFavorite, unmarkAsFavorite, fetchPostFavorites} from '../api/favorites';

const FavoriteButton = ({ postId, currentUserId }) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const [favoritesCount, setFavoritesCount] = useState(0);

    useEffect(() => {
        const initializeFavorites = async () => {
            try {
                const favorites = await fetchPostFavorites(postId);

                // Ensure favorites is an array
                if (favorites && Array.isArray(favorites)) {
                    const userHasFavorited = favorites.some((favorite) => favorite.userId === String(currentUserId));
                    setIsFavorited(userHasFavorited);
                    setFavoritesCount(favorites.length);
                } else {
                    setIsFavorited(false);
                    setFavoritesCount(0);
                }
            } catch (error) {
                console.error('Error initializing favorites:', error);
                setIsFavorited(false);
                setFavoritesCount(0);
            }
        };
        initializeFavorites();
    }, [postId, currentUserId]);

    const handleFavorite = async () => {
        try {
            if (isFavorited) {
                await unmarkAsFavorite(postId);
                setFavoritesCount((prevCount) => Math.max(0, prevCount - 1));
            } else {
                await markAsFavorite(postId);
                setFavoritesCount((prevCount) => prevCount + 1);
            }
            setIsFavorited(!isFavorited);
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    return (
        <Pressable onPress={handleFavorite} style={styles.container}>
            <Octicons
                name={isFavorited ? 'star-fill' : 'star'}
                size={20}
                color={isFavorited ? 'gold' : 'black'} // Gold if favorited, black otherwise
            />
            <Text style={styles.favoritesText}>{favoritesCount}</Text>
        </Pressable>
    );
};

export default FavoriteButton;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    favoritesText: {
        marginLeft: 8,
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
});
