import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { theme } from '../constants/theme';
import { widthPercentage } from '../helpers/common';

const LevelBar = ({ levelName, progress, maxProgress, widthMultiplier }) => {
  const progressPercentage = (progress / maxProgress) * 100;

  return (
    <View>
      {/* Header: Level Name and Points */}
      <View style={styles.header}>
        <Text style={styles.levelName}>{levelName}</Text>
        <Text style={styles.pointsText}>
          {progress}/{maxProgress}
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={[styles.progressBarContainer, { width: widthPercentage(widthMultiplier) }]}>
        <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
 
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
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 12,
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    borderWidth: 1, // Borde visible en toda la barra
    borderColor: 'black', // Color del borde
    overflow: 'hidden', // Asegura que la barra no sobresalga
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFA07A',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});

export default LevelBar;