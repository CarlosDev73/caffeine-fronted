import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable, FlatList, TextInput, Image } from 'react-native';
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
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.modalContainer}>
          <Pressable onPress={() => {}} style={{ flex: 1 }}>
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
                    <Image source={{ uri: item.avatar }} style={styles.avatar} />
                    <View style={styles.commentContent}>
                      <Text style={styles.dateText}>{item.date}</Text>
                      <Text style={styles.commentText}>{item.text}</Text>
                    </View>
                    <MaterialCommunityIcons name="check-circle" size={24} color="green" style={styles.checkIcon} />
                  </View>

                  {/* Action Buttons outside the comment box */}
                  <View style={styles.commentActions}>
                    <Pressable style={styles.actionButton}>
                      <MaterialCommunityIcons name="comment-outline" size={16} color="black" />
                      <Text style={styles.actionText}>Comentar</Text>
                    </Pressable>
                    <Pressable style={styles.actionButton}>
                      <Octicons name="heart" size={16} color="black" />
                      <Text style={styles.actionText}>Me gusta</Text>
                    </Pressable>
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
                  <Pressable style={styles.sendButton}>
                    <MaterialCommunityIcons name="message-text" size={24} color="white" />
                  </Pressable>
                </View>
              }
            />
          </Pressable>
        </View>
      </Pressable>
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
  modalContainer: {
    backgroundColor: '#FFF6E5',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 5,
    borderColor: 'black',
    paddingVertical: 20,
    paddingHorizontal: 10,
    maxHeight: '80%',
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
  },
  commentContent: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    borderColor: theme.colors.dark,
    borderWidth: 1,
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
  checkIcon: {
    marginLeft: 10,
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
  },
  actionText: {
    marginLeft: 5,
    fontSize: 14,
    color: theme.colors.dark,
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
    borderWidth: 1,
  },
  commentInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
  },
});
