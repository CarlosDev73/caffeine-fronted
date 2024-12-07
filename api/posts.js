import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const fetchPosts = async (page = 1, limit = 10) => {
  try {
    const token = await SecureStore.getItemAsync('token'); // Retrieve token from SecureStore

    if (!token) {
      throw new Error('Token not found. Please login again.');
    }

    const response = await axios.get(`${API_URL}/posts`, {
      params: { page, limit },
      headers: {
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-cache',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    throw error;
  }
};
export const fetchPostById = async (postId) => {
  try {
    const token = await SecureStore.getItemAsync('token');

    if (!token) {
      throw new Error('Token not found. Please login again.');
    }

    const response = await axios.get(`${API_URL}/post/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('Error in fetchPostById:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Failed to fetch post' };
  }
};
export const fetchUserPosts = async (userId) => {
  try {
    const token = await SecureStore.getItemAsync('token');
    const response = await axios.get(`${API_URL}/user/${userId}/posts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.posts;
  } catch (error) {
    console.error('Error en fetchUserPosts:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al obtener los posts del usuario.' };
  }
};


export const createPost = async (formData) => {
  try {
    const token = await SecureStore.getItemAsync('token');

    if (!token) {
      throw new Error('Token not found. Please login again.');
    }
    
    const response = await axios.post(`${API_URL}/post`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Respuesta de la API:", response.data);

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create post" };
  }
};

export const updatePost = async (postId, updateData) => {
  try {
    const token = await SecureStore.getItemAsync('token');

    if (!token) {
      throw new Error('Token not found. Please login again.');
    }
    
    const response = await axios.put(`${API_URL}/post/${postId}`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Asegúrate de usar multipart para datos con imágenes
      },
    });
    console.log("Respuesta de la API:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error in updatePost:", error.response?.data || error.message);
  }
};

export const deletePost = async (postId) => {
  try {
    const token = await SecureStore.getItemAsync('token');
    if (!token) {
      throw new Error('Token no encontrado. Por favor, inicia sesión nuevamente.');
    }

    const response = await axios.delete(`${API_URL}/post/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Respuesta del servidor:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error en deletePost:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Fallo al eliminar el post' };
  }
};

export const fetchComments = async (postId) => {
  try {
    const token = await SecureStore.getItemAsync('token');

    if (!token) {
      throw new Error('Token no encontrado. Por favor, inicia sesión nuevamente.');
    }

    const response = await axios.get(`${API_URL}/post/${postId}/comments`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data.message === 'No se encontraron comentarios para este post.') {
      return []; 
  }

    return response.data.comments;
  } catch (error) {
    if (error.response) {
      console.error('Error en fetchComments:', error.response.data);
      throw error.response.data;
    }
    console.error('Unexpected error in fetchComments:', error.message);
    throw error.response?.data || { message: 'Error al obtener los comentarios.' };
  }
};
export const createComment = async (postId, data) => {
  try {
    const token = await SecureStore.getItemAsync('token');

    if (!token) {
      throw new Error('Token not found. Please login again.');
    }

    const response = await axios.post(`${API_URL}/post/${postId}/comment`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data; // Return created comment
  } catch (error) {
    console.error('Error in createComment:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Failed to create comment' };
  }
};

export const likePost = async (postId) => {
  try {
    const token = await SecureStore.getItemAsync('token');
    const response = await axios.post(`${API_URL}/post/${postId}/like`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error liking post:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Failed to like post.' };
  }
};

export const unlikePost = async (postId) => {
  try {
    const token = await SecureStore.getItemAsync('token');
    const response = await axios.delete(`${API_URL}/post/${postId}/like`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error unliking post:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Failed to unlike post.' };
  }
};

export const fetchPostLikes = async (postId, currentUserId) => {
  try {
    const token = await SecureStore.getItemAsync('token');
    const response = await axios.get(`${API_URL}/post/${postId}/likes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const likes = Array.isArray(response.data) ? response.data : []; // Ensure `likes` is always an array

    
    return likes;
  } catch (error) {
    console.error('Error fetching post likes:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Failed to fetch post likes' };
  }
};

export const likeComment = async (commentId) => {
  try {
    const token = await SecureStore.getItemAsync('token');
    if (!token) {
      throw new Error('Token no encontrado. Inicia sesión nuevamente.');
    }
    const response = await axios.put(
      `${API_URL}/like/${commentId}`, 
      {}, 
      {
        headers: { Authorization: `Bearer ${token}` }, 
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error liking comment:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error liking comment.' };
  }
};

export const markCommentAsCorrect = async (commentId) => {
  try {
    const token = await SecureStore.getItemAsync('token');
    if (!token) {
      throw new Error('Token not found. Please login again.');
    }

    const response = await axios.put(
      `${API_URL}/correct/${commentId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error marking comment as correct:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error marking comment as correct.' };
  }
};