import { StyleSheet, Text, View, Image, ScrollView, Pressable, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import { StatusBar } from 'expo-status-bar';
import { widthPercentage, heightPercentage } from '../helpers/common.js';
import { theme } from '../constants/theme.js';
import { useRouter } from 'expo-router';
import MainPanel from '../components/MainPanel.jsx';
import FeedPost from '../components/FeedPost.jsx';
import AbsoluteButton from '../components/AbsoluteButton.jsx';
import Feather from '@expo/vector-icons/Feather';
import { fetchFavoritePostsByUser } from '../api/favorites';

const Favorites = () => {
  const router = useRouter();
  const [favoritePosts, setFavoritePosts] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favorites = await fetchFavoritePostsByUser();
        //console.log('Raw API Response:', favorites);
        // Filter and map valid posts
        const validPosts = favorites.map((favorite) => ({
          _id: favorite._id,
          ...favorite,
        }));
        //console.log('Valid Posts:', validPosts);

        setFavoritePosts(validPosts);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch favorite posts.');
        console.error('Error fetching favorite posts:', error);
      }
    };

    loadFavorites();
  }, []);

  return (
    <ScreenWrapper>
      <StatusBar style="dark" />
      <View>
        <Text style={{ fontWeight: theme.fonts.bold, fontSize: heightPercentage(5), marginHorizontal: 16 }}>
          Favoritos
        </Text>
      </View>
      <View style={styles.container}>
        <ScrollView>
        {favoritePosts.length > 0 ? (
            favoritePosts.map((post) => (
              <FeedPost key={post._id} post={post} />
            ))
          ) : (
            <Text style={styles.noPostsText}>No posts available.</Text>
          )}
        </ScrollView>
        <View style={{ width: widthPercentage(100), flexDirection: 'row', justifyContent: 'flex-end' }}>
          <AbsoluteButton
            child={<Feather name="plus" size={35} color="black" />}
            color={theme.colors.primary}
            buttonStyle={{ bottom: 5, right: -5 }}
            onPress={() => {
              router.push('createPost');
            }}
          />
        </View>
        <MainPanel />
      </View>
    </ScreenWrapper>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingHorizontal: widthPercentage(4),
  },
  noPostsText: {
    fontSize: heightPercentage(2.5),
    color: 'gray',
    textAlign: 'center',
    marginTop: heightPercentage(10),
  },
});
