import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity,Image } from 'react-native';
import Svg, { ClipPath, Defs, Image as SvgImage, Polygon, Rect } from 'react-native-svg';
import Feather from '@expo/vector-icons/Feather';
import { theme } from '../constants/theme';
import { widthPercentage } from '../helpers/common';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import LevelBar from './LevelBar';

// StarAvatar Component
export const CircularAvatar = ({ avatarSource, size = 150 }) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2, // Hace que la vista sea un círculo
        overflow: "hidden", // Recorta la imagen dentro del círculo
        borderWidth: 2, // Ancho del borde
        borderColor: "black", // Color del borde
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={avatarSource}
        style={{
          width: size,
          height: size,
          resizeMode: "cover", // Ajusta la imagen para llenar el círculo
        }}
      />
    </View>
  );
};


// Follow Button Component
export const FollowButton = ({ following, onPress }) => (
  <TouchableOpacity style={styles.followButton} onPress={onPress}>
    {following ? (
      <FontAwesome5 name="user-friends" size={24} color="black" />
    ) :(
      <Feather name="plus" size={24} color="black" />
    )} 
  </TouchableOpacity>
);

// LevelBar Component with Follow Button Alignment
export const LevelBarWrapper = ({ levelName, progress, maxProgress, widthMultiplier, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.levelBarWrapper}>
      <View style={styles.levelContainer}>
        <LevelBar levelName={levelName} progress={progress} maxProgress={maxProgress} widthMultiplier={widthMultiplier}  isNextLevel={true}/>
      </View>
      <FollowButton following={false} onPress={() => console.log('Follow Button Pressed')} />
    </TouchableOpacity>
  );
};

// Stats Component
export const Stats = ({ posts, followers, following }) => (
  <View style={styles.stats}>
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{posts}</Text>
      <Text style={styles.statLabel}>Posts</Text>
    </View>
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{followers}</Text>
      <Text style={styles.statLabel}>Seguidores</Text>
    </View>
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{following}</Text>
      <Text style={styles.statLabel}>Siguiendo</Text>
    </View>
  </View>
);

// Tags Component with Dynamic Background Color
export const Tags = ({ tags }) => (
  <View style={styles.tags}>
    {tags.map((tag, index) => (
      <View
        key={`tag-${index}-${tag}`} // Genera una clave única para cada etiqueta
        style={[
          styles.tag,
          { backgroundColor: generateColor(index) }, // Genera un color dinámico
        ]}
      >
        <Text style={styles.tagText}>{tag}</Text>
      </View>
    ))}
  </View>
);
const styles = StyleSheet.create({
  starContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Follow Button Styles
  followButton: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },

  // LevelBar Wrapper to position FollowButton next to it
  levelBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: widthPercentage(90),
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  levelContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: theme.radius.xl,
    borderWidth: 2,
    borderBottomWidth: 5,
    borderColor: 'black',
    flex: 1,
    alignItems: 'center',
    minWidth: 200,
  },

  // Stats Component Styles
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '70%',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 27,
    fontWeight: '800',
    color: theme.colors.dark,
  },
  statLabel: {
    fontSize: 18,
    color: theme.colors.text,
  },

  // Tags Component Styles
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tag: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'black',
    marginRight: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  tagText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default {
  CircularAvatar,
  FollowButton,
  LevelBarWrapper,
  Stats,
  Tags,
};
