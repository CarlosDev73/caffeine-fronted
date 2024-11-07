import { StyleSheet, Text, View, ScrollView, Image, Pressable} from 'react-native';
import React from 'react';
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

const searchProfile = () => {

  const router = useRouter();

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
        />
        <ScrollView>

        
          <View style={styles.itemContainer}>
          <Pressable onPress={()=> router.push('post')}>
            <SimpleFeedPost/>
          </Pressable>
          </View>
        

          <View style={styles.itemContainer}>
            <SimpleFeedPost/>
          </View>

          <View style={styles.itemContainer}>
            <SimpleFeedPost/>
          </View>

          <View style={styles.itemContainer}>
            <SimpleFeedPost/>
          </View>

          <View style={styles.itemContainer}>
            <SimpleFeedPost/>
          </View>

        </ScrollView>

        <View style={styles.mainPanel}>
        <MainPanel />
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default searchProfile

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