import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { theme } from '../constants/theme';
import { heightPercentage, widthPercentage } from '../helpers/common';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Fontawesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as SecureStore from 'expo-secure-store';

import { useRouter, usePathname, useLocalSearchParams } from 'expo-router';

const MainPanel = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const { id } = useLocalSearchParams();

  const isActive = (path) => currentPath === path;

  const otherProfile = async () => {
    const userId = await SecureStore.getItemAsync('userId');
    return id !== userId;
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.push('/feed')} style={styles.button}>
      {isActive('/feed') ? (
          <Entypo name="home" size={23} color="black" />
        ) : (
          <SimpleLineIcons name="home" size={23} color="gray" />
        )}
        <Text style={[styles.text, isActive('/feed') && styles.active]}>Home</Text>
      </Pressable>
      <Pressable onPress={() => router.push('/searchProfile')} style={styles.button}>
      {(isActive('/searchProfile') || id) ? (
          <Ionicons name="search-sharp" size={28} color="black" />
        ) : (
          <Ionicons name="search-outline" size={23} color="gray" />
        )}
        <Text style={[styles.text, (isActive('/searchProfile') || id) && styles.active]}>Buscar</Text>
      </Pressable>
      <Pressable onPress={() => router.push('/favorites')} style={styles.button}>
      {isActive('/favorites') ? (
          <MaterialCommunityIcons name="bookmark" size={28} color="black" />
        ) : (
          <Feather name="bookmark" size={23} color="gray" />
        )}
        <Text style={[styles.text, isActive('/favorites') && styles.active]}>Favoritos</Text>
      </Pressable>
      <Pressable onPress={() => router.push('/profile')} style={styles.button}>
      {(isActive('/profile') && !id) ? (
          <Fontawesome name="user" size={28} color="black" />
        ) : (
          <Feather name="user" size={23} color="gray" />
        )}
        <Text style={[styles.text, (isActive('/profile') && !id) && styles.active]}>Perfil</Text>
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
