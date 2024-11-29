import { StyleSheet, Text, View, Image, ScrollView, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { StatusBar } from 'expo-status-bar'
import { widthPercentage, heightPercentage } from '../helpers/common.js'
import { theme } from '../constants/theme.js'
import { useRouter } from 'expo-router'
import MainPanel from '../components/MainPanel.jsx'
import FeedPost from '../components/FeedPost.jsx'
import AbsoluteButton from '../components/AbsoluteButton.jsx'
import Feather from '@expo/vector-icons/Feather';
import { fetchPosts } from '../api/posts'

const feed = () => {

  const router = useRouter();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        //console.log('API Response:', fetchedPosts);
        setPosts(fetchedPosts.posts || []); // Assuming `data` contains posts
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch posts.');
      }
    };
    loadPosts();
  }, []);
  return (
    <ScreenWrapper>
      <StatusBar style='dark' />
      <View>
        <Text style={{ fontWeight: theme.fonts.bold, fontSize: heightPercentage(5), marginHorizontal: 16, }}>Posts</Text>
      </View>
      <View style={styles.container}>
        <ScrollView>
          {posts.length > 0 ? (
            posts.map((post) => (
              <FeedPost key={post._id} post={post} />
            ))
          ) : (
            <Text style={styles.noPostsText}>No posts available.</Text>
          )}
        </ScrollView>
        <View style={{ width: widthPercentage(100), flexDirection: 'row', justifyContent: 'flex-end', }}>
          <AbsoluteButton
            child={<Feather name="plus" size={35} color="black" />}
            color={theme.colors.primary}
            buttonStyle={{ bottom: 5, right: -5 }}
            onPress={() => { router.push('createPost') }}
          />
        </View>
        <MainPanel />
      </View>
    </ScreenWrapper>
  )
}

export default feed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingHorizontal: widthPercentage(4)
  },
  welcomeImage: {
    height: heightPercentage(30),
    width: widthPercentage(100),
    alignSelf: 'center',
  },
  circle: {
    width: 300,
    height: 300,
    borderRadius: 200,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: theme.colors.textTitles, //esto viene de nuestra carpeta constants
    fontSize: heightPercentage(4),
    textAlign: 'center',
    fontWeight: theme.fonts.extraBold
  },
  punchline: {
    textAlign: 'center',
    paddingHorizontal: widthPercentage(10),
    fontSize: heightPercentage(2.5),
    color: theme.colors.text
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }

})