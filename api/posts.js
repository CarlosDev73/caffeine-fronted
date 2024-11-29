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


export const createPost = async (postData, imageFile = null) => {
  try {
    const token = await getToken();
    const formData = new FormData();
    Object.keys(postData).forEach((key) => formData.append(key, postData[key]));

    if (imageFile) {
      formData.append("postImg", {
        uri: imageFile.uri,
        name: imageFile.name,
        type: "image/jpeg",
      });
    }

    const response = await axios.post(`${API_URL}/post`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create post" };
  }
};

export const updatePost = async (postId, updateData) => {
  try {
    const token = await getToken();
    const response = await axios.put(`${API_URL}/post/${postId}`, updateData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update post" };
  }
};

export const deletePost = async (postId) => {
  try {
    const token = await getToken();
    const response = await axios.delete(`${API_URL}/post/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to delete post" };
  }
};