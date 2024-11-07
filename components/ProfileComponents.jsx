// components/ProfileComponents.jsx
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Svg, { ClipPath, Defs, Image as SvgImage, Polygon, Rect } from 'react-native-svg';
import Feather from '@expo/vector-icons/Feather';
import { theme } from '../constants/theme';
import { widthPercentage } from '../helpers/common';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

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
export const LevelBar = ({ levelName, progress, maxProgress }) => {
  const progressPercentage = (progress / maxProgress) * 100;
  const [following, setFollowing] = useState(false);

  return (
    <View style={styles.levelBarWrapper}>
      <View style={styles.levelContainer}>
        {/* Header: Level Name and Points */}
        <View style={styles.header}>
          <Text style={styles.levelName}>{levelName}</Text>
          <Text style={styles.pointsText}>{progress}/{maxProgress}</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
        </View>
      </View>

      {/* Follow Button aligned next to LevelBar */}
      <FollowButton following={following} onPress={() => setFollowing(!following)} />
    </View>
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
    {tags.map(tag => (
      <View key={tag.text} style={[styles.tag, { backgroundColor: tag.color || theme.colors.background }]}>
        <Text style={styles.tagText}>{tag.text}</Text>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  levelName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.dark,
  },
  pointsText: {
    fontSize: 14,
    color: theme.colors.text,
  },
  progressBarBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 12,
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFA07A',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
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
  LevelBar,
  Stats,
  Tags,
};
