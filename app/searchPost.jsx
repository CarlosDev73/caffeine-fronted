import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import { theme } from '../constants/theme';
import { heightPercentage, widthPercentage } from '../helpers/common';
import ScreenWrapper from '../components/ScreenWrapper';
import { StatusBar } from 'expo-status-bar';
import SearchBar from '../components/SearchBar';
import MainPanel from '../components/MainPanel';
import SearchPopUp from '../components/SearchPopUp';
import SimpleFeedPost from '../components/SimpleFeedPost';
import FeedPost from '../components/FeedPost.jsx';
import { useRouter } from 'expo-router';
import { searchAllPosts } from '../api/posts.js';

const searchPost = () => {

  const router = useRouter();

  const [search, setSearch] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  const searchPosts = async (text) => {
    setSearch(text);
    setFilteredPosts(await searchAllPosts(search));
  };

  const renderPosts = ({ item }) => (
    <TouchableOpacity onPress={
      () => router.push(`post/${item._id}`)}
    >
      <View style={styles.itemContainer}>
        <SimpleFeedPost post={ item } />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper>
      <StatusBar style='dark'/>
      <View style={styles.header}>
        <Text style={{ fontWeight: theme.fonts.bold, fontSize: heightPercentage(5)}}>Buscar</Text>
        <SearchPopUp backgroundColor={theme.colors.primary}/>
      </View>
      <View style={styles.container}>
        <SearchBar 
        placeholder="Buscar Posts"
        handleSearch={ () => { searchPosts(search) }} 
        searchVal={search} 
        setSearchVal={setSearch}
        />
        <FlatList
          data={filteredPosts}
          keyExtractor={(item) => item._id}
          renderItem={renderPosts}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginVertical: 7 }}>No hay resultados</Text>}
        />
        <View style={styles.mainPanel}>
        <MainPanel />
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default searchPost

const styles = StyleSheet.create({
  header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: widthPercentage(4)
  },
  container:{
    flex:1,
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingHorizontal: widthPercentage(4),
    marginTop: heightPercentage(2)
  },
  itemContainer:{
    flexDirection: "row",
    alignItems: "center",
    marginLeft: widthPercentage(2.5),
    marginTop: heightPercentage(4)
  },
  mainPanel:{
    alignItems: "center",
  },
})