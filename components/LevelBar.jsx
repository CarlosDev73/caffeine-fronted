import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';
import { widthPercentage } from '../helpers/common';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';


const LevelBar = ({ levelName, progress, maxProgress, description, widthMultiplier, isNextLevel }) => {
  const adjustedProgress = progress > maxProgress ? maxProgress : progress;
  const progressPercentage = progress > maxProgress ? 100 : (adjustedProgress / maxProgress) * 100;
  return (
    <View style={styles.container}>
      {/* Header: Level Name and Points */}
      <View style={styles.header}>
        <Text style={styles.levelName}>{levelName}</Text>
        <Text style={styles.pointsText}>
          {adjustedProgress}/{maxProgress}
        </Text>

      </View>
      <View style={styles.descriptionContainer}>

        <Text style={styles.descriptionText}>
          {description}
        </Text>

      </View>

      {/* Progress Bar and Icon */}
      <View style={styles.progressBarRow}>
        <View style={[styles.progressBarContainer, { width: widthPercentage(widthMultiplier) }]}>
          <View
            style={[
              styles.progressBar,
              {
                width: isNextLevel
                  ? `${progressPercentage}%` 
                  : `${progressPercentage}%`, 
                backgroundColor: isNextLevel
                  ? '#FFA07A' 
                  : progress > maxProgress
                    ? '#00C6AE' 
                    : '#CCCCCC', 
              },
            ]}
          />
        </View>
        <View style={styles.iconContainer}>
          {isNextLevel ? (
            <MaterialIcons
              name={'check-circle-outline'}
              size={24}
              color={'#000000'} // Green if complete, black otherwise
            />
          ) : (
            <MaterialIcons
              name={progress > maxProgress ? 'check-circle' : 'lock'}
              size={24}
              color={progress > maxProgress ? '#00C6AE' : '#CCCCCC'} // Green if complete, black otherwise
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
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
  descriptionText: {
    fontSize: 14,
    color: theme.colors.text,
  },
  progressBarRow: {
    flexDirection: 'row', // Coloca la barra de progreso y el ícono horizontalmente
    alignItems: 'center',
  },
  progressBarContainer: {
    flex: 1, // Ocupa todo el espacio disponible
    height: 12,
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFA07A',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionContainer: {
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
});

export default LevelBar;
