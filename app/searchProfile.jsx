import { StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import React from 'react';
import { theme } from '../constants/theme';
import { heightPercentage, widthPercentage } from '../helpers/common';
import ScreenWrapper from '../components/ScreenWrapper';
import { StatusBar } from 'expo-status-bar';
import SearchBar from '../components/SearchBar';
import MainPanel from '../components/MainPanel';
import SearchPopUp from '../components/SearchPopUp'

const searchProfile = () => {
  return (
    <ScreenWrapper>
      <StatusBar style='dark'/>
      <View style={styles.header}>
        <Text style={{ fontWeight: theme.fonts.bold, fontSize: heightPercentage(5)}}>Buscar</Text>
        <SearchPopUp backgroundColor={theme.colors.primary}/>
      </View>
      <View style={styles.container}>
        <SearchBar 
        placeholder="Buscar Perfil"
        />
        <ScrollView>
          <View style={styles.itemContainer}>
            <Image
              source={require('../assets/images/charlie.jpg')}
              style={styles.imageProfile}
            />
            <View>
              <Text style={styles.textName}>Charli Two</Text>
              <Text style={styles.userName}>@Charlitos</Text>
            </View>
          </View>

          <View style={styles.itemContainer}>
            <Image
              source={require('../assets/images/sheldon.jpg')}
              style={styles.imageProfile}
            />
            <View>
              <Text style={styles.textName}>Sheldon Cooper</Text>
              <Text style={styles.userName}>@Cooper1</Text>
            </View>
          </View>

          <View style={styles.itemContainer}>
            <Image
              source={require('../assets/images/chan.jpeg')}
              style={styles.imageProfile}
            />
            <View>
              <Text style={styles.textName}>Jackie Chan</Text>
              <Text style={styles.userName}>@JC1</Text>
            </View>
          </View>

          <View style={styles.itemContainer}>
            <Image
              source={require('../assets/images/leonard.jpg')}
              style={styles.imageProfile}
            />
            <View>
              <Text style={styles.textName}>Leonard Hofstadter</Text>
              <Text style={styles.userName}>@Leo</Text>
            </View>
          </View>

          <View style={styles.itemContainer}>
            <Image
              source={require('../assets/images/messi.png')}
              style={styles.imageProfile}
            />
            <View>
              <Text style={styles.textName}>Lionel Messi</Text>
              <Text style={styles.userName}>@TheGoat</Text>
            </View>
          </View>

          <View style={styles.itemContainer}>
            <Image
              source={require('../assets/images/bill.jpg')}
              style={styles.imageProfile}
            />
            <View>
              <Text style={styles.textName}>Bill Gates</Text>
              <Text style={styles.userName}>@Gates</Text>
            </View>
          </View>

          <View style={styles.itemContainer}>
            <Image
              source={require('../assets/images/bob.jpg')}
              style={styles.imageProfile}
            />
            <View>
              <Text style={styles.textName}>Bob Esponja</Text>
              <Text style={styles.userName}>@Esponja</Text>
            </View>
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
  imageProfile:{
    width: heightPercentage(7,7),
    height: heightPercentage(7,7),
    borderRadius: heightPercentage(7,7)/2,
  },
  textName:{
    fontSize:heightPercentage(2.7),
    marginLeft:heightPercentage(1.2),
    fontWeight: theme.fonts.bold
  },
  userName:{
    fontSize: heightPercentage(2.1),
    marginLeft:heightPercentage(1.2),
    color: "grey"
  },
  mainPanel:{
    alignItems: "center",
  }
})