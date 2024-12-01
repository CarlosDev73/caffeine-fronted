import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback, FlatList, TextInput, Image, KeyboardAvoidingView, Platform } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { theme } from '../constants/theme';
import { fetchComments, createComment } from '../api/posts';

const CommentModal = ({ visible, onClose, postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (visible && postId) {
      const loadComments = async () => {
        try {
          const fetchedComments = await fetchComments(postId);
          setComments(fetchedComments);
        } catch (error) {
          console.error('Error al cargar los comentarios:', error);
        } finally {
          setLoading(false);
        }
      };
      loadComments();
    }
  }, [visible, postId, refreshKey]);
  const handleCreateComment = async () => {
    if (!newComment.trim()) {
      Alert.alert('Error', 'El comentario no puede estar vacío.');
      return;
    }

    try {
      const createdComment = await createComment(postId, { content: newComment });
      console.log('Nuevo comentario creado:', createdComment);
      setNewComment(''); // Clear the input field
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error('Error al crear comentario:', error);
      Alert.alert('Error', 'No se pudo crear el comentario.');
    }
  };

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
                  keyExtractor={(item, index) => item._id || `${index}-${Date.now()}`}
                  renderItem={({ item }) => (
                    <View style={styles.commentWrapper}>
                      {/* Avatar, Date, and Check icon in a single row */}
                      <View style={styles.commentHeader}>
                        <Image
                          source={{ uri: item._userId?.profileImg?.secure_url || 'https://via.placeholder.com/150' }}
                          style={styles.avatar}
                        />
                        <View style={styles.commentContent}>
                          <Text style={styles.commentMeta}>
                            {item._userId?.userName || 'Usuario desconocido'}
                          </Text>
                          <Text style={styles.commentText}>{item.content}</Text>

                        </View>
                        {/* Custom Check Icon with Green Background and Black Border */}
                        <View style={styles.checkIconContainer}>
                          <MaterialCommunityIcons name="check" size={20} color="black" />
                        </View>
                      </View>
                      <Text style={styles.dateText}>
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Fecha no disponible'}
                      </Text>

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
                  ListEmptyComponent={
                    !loading && (
                      <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Aun no hay comentarios</Text>
                      </View>
                    )
                  }
                />
                  <View style={styles.commentInputContainer}>
                    <TextInput
                      style={styles.commentInput}
                      placeholder="Escribe un comentario..."
                      placeholderTextColor="gray"
                      multiline={true}
                      value={newComment}
                      onChangeText={setNewComment}
                    />
                    <TouchableWithoutFeedback onPress={handleCreateComment}>
                      <View style={styles.sendButton}>
                        <MaterialCommunityIcons name="comment-outline" size={24} color="black" />
                      </View>
                    </TouchableWithoutFeedback>
                  </View>

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
    maxHeight: '65%',
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
  commentMeta: {
    fontSize: 12,
    color: 'black',
    marginBottom: 3,
  },
  dateText: {
    fontSize: 12,
    color: 'gray',
    marginLeft: 50,
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
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
});
