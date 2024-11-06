import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback, FlatList, TextInput, Image, KeyboardAvoidingView, Platform } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { theme } from '../constants/theme';

const CommentModal = ({ visible, onClose, comments }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidingView}
          >
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                {/* Modal Header */}
                <View style={styles.modalHeader}>
                  <View style={styles.modalHandle}></View>
                </View>

                {/* Comments List */}
                <FlatList
                  data={comments}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.commentWrapper}>
                      {/* Avatar, Date, and Check icon in a single row */}
                      <View style={styles.commentHeader}>
                        <Image source={require('../assets/images/avatar.png')} style={styles.avatar} />
                        <View style={styles.commentContent}>
                          <Text style={styles.dateText}>{item.date}</Text>
                          <Text style={styles.commentText}>{item.text}</Text>
                        </View>
                        {/* Custom Check Icon with Green Background and Black Border */}
                        <View style={styles.checkIconContainer}>
                          <MaterialCommunityIcons name="check" size={20} color="black" />
                        </View>
                      </View>

                      {/* Action Buttons outside the comment box */}
                      <View style={styles.commentActions}>
                        <TouchableWithoutFeedback>
                          <View style={styles.actionButton}>
                            <MaterialCommunityIcons name="comment-outline" size={16} color="black" />
                            <Text style={styles.actionText}>Comentar</Text>
                          </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                          <View style={styles.actionButton}>
                            <Octicons name="heart" size={16} color="black" />
                            <Text style={styles.actionText}>Me gusta</Text>
                          </View>
                        </TouchableWithoutFeedback>
                      </View>
                    </View>
                  )}
                  ListFooterComponent={
                    <View style={styles.commentInputContainer}>
                      <TextInput
                        style={styles.commentInput}
                        placeholder="Escribe un comentario..."
                        placeholderTextColor="gray"
                        multiline={true}
                      />
                      <TouchableWithoutFeedback>
                        <View style={styles.sendButton}>
                          <MaterialCommunityIcons name="comment-outline" size={24} color="black" />
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  }
                />
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CommentModal;

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
    backgroundColor: '#FFF6E5',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 5,
    borderColor: 'black',
    paddingVertical: 20,
    paddingHorizontal: 10,
    maxHeight: '100%',
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
  commentWrapper: {
    marginBottom: 20,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
    borderColor: theme.colors.dark,
    borderWidth: 1,
  },
  commentContent: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    borderColor: theme.colors.dark,
    borderWidth: 2,
  },
  dateText: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 3,
  },
  commentText: {
    fontSize: 16,
    color: theme.colors.dark,
  },
  checkIconContainer: {
    marginLeft: 10,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'black', // Borde negro alrededor
    backgroundColor: '#00C6AE', // Fondo verde
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginLeft: 46, // Aligns actions with avatar position
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    fontWeight: theme.fonts.ext,
  },
  actionText: {
    marginLeft: 5,
    fontSize: 14,
    color: theme.colors.dark,
    fontWeight: theme.fonts.extraBold,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginVertical: 10,
    borderColor: theme.colors.dark,
    borderWidth: 2,
    borderBottomWidth: 4,
  },
  commentInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 50,
    padding: 10,
    marginLeft: 10,
    borderColor: theme.colors.dark,
    borderWidth: 2,
    borderBottomWidth: 5,
  },
});
