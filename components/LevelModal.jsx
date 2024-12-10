import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LevelBar from './LevelBar';
import * as SecureStore from 'expo-secure-store';
import { heightPercentage } from '../helpers/common';

import { fetchLevels, fetchUserById } from '../api/levels';

const LevelModal = ({ modalVisible, setModalVisible }) => {
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userPoints, setUserPoints] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [nextLevel, setNextLevel] = useState(null);


  useEffect(() => {
    const loadLevels = async () => {
      try {
        const userId = await SecureStore.getItemAsync('userId');
        const [fetchedLevels, userData] = await Promise.all([fetchLevels(), fetchUserById(userId)]);
        console.log(fetchedLevels);

        setLevels(fetchedLevels || []);
        setUserPoints(userData?.points);

        const userLevelId = userData?.level?._id;
        const userLevel = fetchedLevels.find((level) => level._id === userLevelId);
        setCurrentLevel(userLevel);

        const userLevelIndex = fetchedLevels.findIndex((level) => level._id === userLevelId);
        const nextLevel = fetchedLevels[userLevelIndex + 1] || null;
        setNextLevel(nextLevel);

      } catch (error) {
        console.error('Error loading levels:', error);
      } finally {
        setLoading(false);
      }
    };

    if (modalVisible) {
      loadLevels();
    }
  }, [modalVisible]);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
        </View>

        </TouchableWithoutFeedback>

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoidingView}
          >
            {/* Prevent TouchableWithoutFeedback from intercepting touch events */}
              <View style={styles.modalContainer}>
                {/* Modal Header */}
                <View style={styles.modalHeader}>
                  <View style={styles.modalHandle}></View>
                  <Text style={styles.modalTitle}>Adquiere puntos y sube de nivel</Text>
                  <Text style={styles.modalText}>
                    Resuelve problemas de la comunidad, comenta, crea contenido y escala hasta el café más intenso
                  </Text>
                </View>

                {/* Scrollable Levels */}
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                  {Array.isArray(levels) && levels.map((level, index) => (
                    <LevelBar
                      key={index}
                      levelName={level.name}
                      progress={userPoints}
                      maxProgress={level.requirements}
                      description={level.description}
                      widthMultiplier={90}
                      isNextLevel={nextLevel?._id === level._id}
                    />
                  ))}
                </ScrollView>
              </View>
          </KeyboardAvoidingView>
    </Modal>
  );
};

export default LevelModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  keyboardAvoidingView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 5,
    borderColor: 'black',
    paddingVertical: 20,
    paddingHorizontal: 10,
    maxHeight: heightPercentage(70),
    borderWidth: 2,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 10,
  },
  modalHandle: {
    width: 60,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'black',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 10,
  },
  modalText: {
    fontSize: 16,
    fontWeight: '300',
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollContainer: {
    flexGrow: 1, // Ensures the ScrollView content expands
    paddingBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
});