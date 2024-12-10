import { StyleSheet, Text, View, ScrollView, Pressable, Alert } from 'react-native';
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
import { fetchPosts } from '../api/posts';
import Button from '../components/Button';
const Feed = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); 

  const loadPosts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const fetchedPosts = await fetchPosts(page); 
      if (fetchedPosts.posts.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...fetchedPosts.posts]);
        setPage((prevPage) => prevPage + 1); 
      } else {
        setHasMore(false); 
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts(); 
  }, []);

  return (
    <ScreenWrapper>
      <StatusBar style="dark" />
      <View>
        <Text
          style={{
            fontWeight: theme.fonts.bold,
            fontSize: heightPercentage(5),
            marginHorizontal: 16,
          }}
        >
          Posts
        </Text>
      </View>
      <View style={styles.container}>
        <ScrollView>
          {posts.length > 0 ? (
            posts.map((post) => <FeedPost key={post._id} post={post} />)
          ) : (
            <Text style={styles.noPostsText}>No hay posts disponibles</Text>
          )}
          {hasMore && !loading && (
           <Button
           title="Cargar más posts"
           onPress={loadPosts}
           buttonStyle={styles.loadMoreButton}
           textStyle={styles.loadMoreText}
           backgroundColor={theme.colors.primary}
           textColor="black"
         />
          )}
          {loading && <Text style={styles.loadingText}>Cargando posts...</Text>}
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

export default Feed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingHorizontal: widthPercentage(4),
  },
  noPostsText: {
    textAlign: 'center',
    color: theme.colors.text,
    marginTop: 20,
  },
  loadMoreButton: {
    marginVertical: 20,
    alignSelf: 'center',
    padding: heightPercentage(1),
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  loadMoreText: {
    fontWeight: 'bold',
    fontSize: widthPercentage(),
  },
  loadingText: {
    textAlign: 'center',
    color: theme.colors.text,
    marginVertical: 10,
  },
});
