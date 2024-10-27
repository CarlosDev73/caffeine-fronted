import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { StatusBar } from 'expo-status-bar'
import { widthPercentage, heightPercentage } from '../helpers/common.js'
import { theme } from '../constants/theme.js'
import { useRouter } from 'expo-router'
import AbsoluteButton from '../components/AbsoluteButton.jsx'

import Feather from '@expo/vector-icons/Feather';

const post = () => {

  const router = useRouter();

  return (
    <View>
      <StatusBar style='dark' />
      <ScreenWrapper style={styles.container}>
        <View style={{width: widthPercentage(100), flexDirection:'row', justifyContent:'center'}}>
          <AbsoluteButton child={<Feather name="x" size={30} color="black" />} buttonStyle={{top: -10}}/>
        </View>
        <View style={{ backgroundColor: 'red'}}>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={require('../assets/images/avatar.png')} style={{ borderRadius: 100, borderWidth: 10}}/>
            <Text style={[styles.text, {marginLeft: 7}]}>Lamborci Mona</Text>
            <Text style={[styles.minText]}>12 Mar</Text>
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    </View>
  )
}

export default post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#18191F',
    paddingHorizontal: widthPercentage(4)
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