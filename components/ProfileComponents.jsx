import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Svg, { ClipPath, Defs, Image as SvgImage, Polygon, Rect } from 'react-native-svg';
import Feather from '@expo/vector-icons/Feather';
import { theme } from '../constants/theme';
import { widthPercentage } from '../helpers/common';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import LevelBar from './LevelBar';

// StarAvatar Component
export const StarAvatar = ({ avatarSource, size = 150 }) => {
    const starSize = size * 1.5;
    const starPoints = `
    ${starSize * 0.5},0 
    ${starSize * 0.62},${starSize * 0.35} 
    ${starSize},${starSize * 0.38} 
    ${starSize * 0.7},${starSize * 0.6} 
    ${starSize * 0.82},${starSize} 
    ${starSize * 0.5},${starSize * 0.75} 
    ${starSize * 0.18},${starSize} 
    ${starSize * 0.3},${starSize * 0.6} 
    0,${starSize * 0.38} 
    ${starSize * 0.38},${starSize * 0.35}
  `;


  return (
    <View style={[styles.starContainer, { width: starSize, height: starSize }]}>
      <Svg width={starSize} height={starSize} viewBox={`0 0 ${starSize} ${starSize}`}>
        <Defs>
          {/* Define the star clip path */}
          <ClipPath id="starClip">
            <Polygon points={starPoints} />
          </ClipPath>
        </Defs>

        {/* Orange filled star with black border */}
        <Polygon points={starPoints} fill="#F95A2C" stroke="black" strokeWidth="2" />

        {/* Clipped profile image inside the star */}
        <SvgImage
          href={avatarSource}
          width={starSize * 0.6} // Keep the image at 60% of the new star size
          height={starSize * 0.6}
          x={(starSize - starSize * 0.6) / 2} // Center the image horizontally
          y={(starSize - starSize * 0.6) / 2} // Center the image vertically
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#starClip)"
        />
      </Svg>
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
        <LevelBar levelName={levelName} progress={progress} maxProgress={maxProgress} widthMultiplier={widthMultiplier} />
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
      <Text style={styles.statLabel}>Followers</Text>
    </View>
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{following}</Text>
      <Text style={styles.statLabel}>Following</Text>
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
const generateColor = (index) => {
  const colors = ['#FFD700', '#A7FFEB', '#FFCCBC', '#CFD8DC', '#FFABAB'];
  return colors[index % colors.length]; // Selecciona un color de forma cíclica
};

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
  StarAvatar,
  FollowButton,
  LevelBarWrapper,
  Stats,
  Tags,
};
