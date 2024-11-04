// components/ProfileComponents.jsx
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { theme } from '../constants/theme';
import { widthPercentage } from '../helpers/common';
import Feather from '@expo/vector-icons/Feather';

const ProfileComponents = {
  // Star Icon Component
  StarIcon: ({ style }) => (
    <View style={[styles.starContainer, style]}>
      <Image source={require('../assets/images/star.png')} style={styles.starIcon} />
    </View>
  ),

  // Follow Button Component
  FollowButton: ({ onPress }) => (
    <TouchableOpacity style={styles.followButton} onPress={onPress}>
      <Feather name="plus" size={24} color="black" />
    </TouchableOpacity>
  ),

  // Updated LevelBar Component with Follow Button Alignment
  LevelBar: ({ levelName, progress, maxProgress }) => {
    const progressPercentage = (progress / maxProgress) * 100;

    return (
      <View style={styles.levelBarWrapper}>
        <View style={styles.levelContainer}>
          {/* Header: Level Name and Points */}
          <View style={styles.header}>
            <Text style={styles.levelName}>{levelName}</Text>
            <Text style={styles.pointsText}>{progress}/{maxProgress}</Text>
          </View>

          {/* Progress Bar with Star Icon */}
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
            <View style={styles.starAtEnd}>
              <ProfileComponents.StarIcon />
            </View>
          </View>
        </View>

        {/* Follow Button aligned next to LevelBar */}
        <ProfileComponents.FollowButton onPress={() => console.log("Follow button pressed")} />
      </View>
    );
  },

  // Stats Component
  Stats: ({ posts, followers, following }) => (
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
  ),

  // Tags Component with Dynamic Background Color
  Tags: ({ tags }) => (
    <View style={styles.tags}>
      {tags.map(tag => (
        <View key={tag.text} style={[styles.tag, { backgroundColor: tag.color || theme.colors.background }]}>
          <Text style={styles.tagText}>{tag.text}</Text>
        </View>
      ))}
    </View>
  ),
};

const styles = StyleSheet.create({
  // LevelBar Wrapper to position FollowButton next to it
  levelBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: widthPercentage(90),
    marginVertical: 10,
  },

  // LevelBar Styles with Double Border Effect
  levelContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: theme.radius.xl,
    borderWidth: 2,         // Outer border width
    borderBottomWidth: 5,   // Increased bottom border width for double border effect
    borderColor: 'black',   // Border color
    flex: 1,                // Allows LevelBar to take up available space
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
  starAtEnd: {
    position: 'absolute',
    right: -12,
    top: -6,
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 20,
    borderColor: '#333',
    borderWidth: 1,
  },
  
  // Follow Button Styles
  followButton: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderBottomWidth: 4, // Adds a double border effect at the bottom
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  
  // StarIcon Styles
  starContainer: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 1,
  },
  starIcon: {
    width: 20,
    height: 20,
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
    fontSize: 20,
    fontWeight: theme.fonts.bold,
    color: theme.colors.dark,
  },
  statLabel: {
    fontSize: 14,
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

export default ProfileComponents;
