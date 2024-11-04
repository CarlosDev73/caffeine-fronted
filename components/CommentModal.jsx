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
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <View style={styles.modalHandle}></View>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>Cerrar</Text>
            </Pressable>
          </View>

          {/* Comments List */}
          <FlatList
            data={comments}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.commentWrapper}>
                {/* Avatar and Date outside the comment box */}
                <View style={styles.commentHeader}>
                  <Image source={{ uri: item.avatar }} style={styles.avatar} />
                  <Text style={styles.dateText}>{item.date}</Text>
                  <MaterialCommunityIcons name="check-circle" size={32} color="green" style={styles.checkIcon} />
                </View>

                {/* Comment Box */}
                <View style={styles.commentContainer}>
                  <Text style={styles.commentText}>{item.text}</Text>
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
                />
                <Pressable style={styles.sendButton}>
                  <MaterialCommunityIcons name="send" size={24} color="white" />
                </Pressable>
              </View>
            }
          />
        </View>
      </View>
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
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
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
  closeButton: {
    position: 'absolute',
    right: 20,
  },
  closeText: {
    fontSize: 16,
    color: theme.colors.dark,
  },
  commentWrapper: {
    marginBottom: 20,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  dateText: {
    fontSize: 14,
    color: 'gray',
    marginRight: 5,
  },
  checkIcon: {
    marginLeft: 'auto',
  },
  commentContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    borderColor: theme.colors.dark,
    borderWidth: 1,
    marginHorizontal: 50, // Adds space to align with avatar and icons outside
  },
  commentText: {
    fontSize: 16,
    color: theme.colors.dark,
  },
  commentActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginLeft: 50, // Aligns actions with avatar position
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  actionText: {
    marginLeft: 5,
    fontSize: 16,
    color: theme.colors.dark,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginTop: 10,
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
  },
});
