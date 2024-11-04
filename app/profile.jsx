import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import ScreenWrapper from '../components/ScreenWrapper';
import { theme } from '../constants/theme';
import ProfileComponents from '../components/ProfileComponents';
import FeedPost from '../components/FeedPost';
import MainPanel from '../components/MainPanel';

const Profile = () => {
  const router = useRouter();

  const tagsData = [
    { text: 'C++', color: '#E0E0E0' },
    { text: 'JavaScript', color: '#FFD700' },
    { text: 'Python', color: '#A7FFEB' },
    { text: 'Visual Basic', color: '#FFCCBC' },
    { text: 'POO', color: '#CFD8DC' },
  ];

  return (
    <ScreenWrapper style={styles.screenWrapper}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <ProfileComponents.StarAvatar avatarSource={require('../assets/images/pic.png')} size={100} />
          </View>
          <Text style={styles.name}>Katrisa Feona</Text>
          <Text style={styles.username}>@katiness</Text>

          {/* Level Bar */}
          <ProfileComponents.LevelBar levelName="Capuchino" progress={2500} maxProgress={3000} />

          {/* Stats Section with Follow Button */}
          <View style={styles.statsContainer}>
            <ProfileComponents.Stats posts={276} followers="62k" following={23} />
          </View>
        </View>

        {/* Bio Section */}
        <View style={styles.bioSection}>
          <Text style={styles.sectionTitle}>Bio</Text>
          <Text style={styles.bioText}>
            Soy una desarrolladora apasionada del desarrollo web y me gustaría compartir mis conocimientos con todos
          </Text>
        </View>

        {/* Last Post Section */}
        <View style={styles.lastPostSection}>
          <Text style={styles.sectionTitle}>Último post</Text>
          <FeedPost onPress={() => router.push('/postDetails')} />
        </View>

        {/* Tags Section */}
        <View style={styles.tagsSection}>
          <Text style={styles.sectionTitle}>Tags</Text>
          <ProfileComponents.Tags tags={tagsData} />
        </View>
      </ScrollView>

      {/* Bottom Menu */}
      <MainPanel />
    </ScreenWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
    screenWrapper: {
        flex: 1,
        paddingTop: 0, // Overrides any default padding
        marginTop: 0, // Ensures no margin at the top
      },
      scrollContent: {
        flexGrow: 1,
        paddingTop: 0,
        paddingBottom: 20,
        marginTop: 0,
      },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
    paddingTop: 0,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: theme.colors.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatarContainer: {
    position: 'relative',
  },
  name: {
    fontSize: 36,
    fontWeight: 800,
    color: theme.colors.dark,
  },
  username: {
    fontSize: 16,
    color: theme.colors.text,
  },
  statsContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  followButton: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  followButtonText: {
    color: 'white',
    fontSize: 14,
  },
  bioSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: 800,
    color: theme.colors.dark,
  },
  bioText: {
    fontSize: 16,
    color: theme.colors.text,
    marginTop: 5,
  },
  lastPostSection: {
    padding: 20,
  },
  tagsSection: {
    padding: 20,
  },
});
