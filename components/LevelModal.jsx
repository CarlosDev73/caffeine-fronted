import React from 'react';
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

const LevelModal = ({ modalVisible, setModalVisible }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoidingView}
          >
            {/* Prevent TouchableWithoutFeedback from intercepting touch events */}
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                {/* Modal Header */}
                <View style={styles.modalHeader}>
                  <View style={styles.modalHandle}></View>
                  <Text style={styles.modalTitle}>Detalles del Nivel</Text>
                  <Text style={styles.modalText}>
                    Resuelve problemas de la comunidad, comenta, crea contenido y escala hasta el café más intenso
                  </Text>
                </View>

                {/* Scrollable Levels */}
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                  <LevelBar levelName={'Decaf'} progress={3000} maxProgress={3000} widthMultiplier={90} />
                  <LevelBar levelName={'Light Roast'} progress={3000} maxProgress={3000} widthMultiplier={90} />
                  <LevelBar levelName={'Latte'} progress={2500} maxProgress={3000} widthMultiplier={90} />
                  <LevelBar levelName={'Cappuccino'} progress={2500} maxProgress={3000} widthMultiplier={90} />
                  <LevelBar levelName={'Mocha'} progress={2500} maxProgress={3000} widthMultiplier={90} />
                  <LevelBar levelName={'Flat White'} progress={2500} maxProgress={3000} widthMultiplier={90} />
                  <LevelBar levelName={'Americano'} progress={2500} maxProgress={3000} widthMultiplier={90} />
                  <LevelBar levelName={'Espresso'} progress={2500} maxProgress={3000} widthMultiplier={90} />
                  <LevelBar levelName={'Lungo'} progress={2500} maxProgress={3000} widthMultiplier={90} />
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
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
    flex: 1,
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
    maxHeight: '70%',
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
    paddingBottom: 20,
  },
});
