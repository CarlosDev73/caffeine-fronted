import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { theme } from '../constants/theme';
import { heightPercentage, widthPercentage } from '../helpers/common';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';

const MainPanel = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.push('/feed')} style={styles.button}>
        <SimpleLineIcons name="home" size={23} color="black" />
        <Text style={styles.text}>Home</Text>
      </Pressable>
      <Pressable onPress={() => router.push('/searchProfile')} style={styles.button}>
        <Fontisto name="search" size={23} color="black" />
        <Text style={styles.text}>Buscar</Text>
      </Pressable>
      <Pressable onPress={() => router.push('/favorites')} style={styles.button}>
        <Feather name="heart" size={23} color="black" />
        <Text style={styles.text}>Favoritos</Text>
      </Pressable>
      <Pressable onPress={() => router.push('/profile')} style={styles.button}>
        <Feather name="user" size={24} color="black" />
        <Text style={styles.text}>Perfil</Text>
      </Pressable>
    </View>
  );
};

export default MainPanel;

const styles = StyleSheet.create({
  container: {
    borderTopColor: 'black',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: widthPercentage(100),
    paddingBottom: 10,
  },
  button: {
    height: heightPercentage(7, 7),
    width: widthPercentage(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  text: {
    fontSize: heightPercentage(2),
    fontWeight: theme.fonts.bold,
    marginTop: 4,
    color: 'gray',
  },
  active: {
    color: 'black',
  },
});
