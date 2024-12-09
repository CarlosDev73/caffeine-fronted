import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { checkTokenExpiration } from './auth';

const API_URL = process.env.EXPO_PUBLIC_API_URL; 


export const markAsFavorite = async (postId) => {
  checkTokenExpiration();

  try {
    const token = await SecureStore.getItemAsync('token'); // Retrieve token from SecureStore

    if (!token) {
      throw new Error('Token not found. Please login again.');
    }

    const response = await axios.post(
      `${API_URL}/${postId}/favorite`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error marking post as favorite:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Failed to mark post as favorite.' };
  }
};



export const unmarkAsFavorite = async (postId) => {
  checkTokenExpiration();

  try {
    const token = await SecureStore.getItemAsync('token'); // Retrieve token from SecureStore

    if (!token) {
      throw new Error('Token not found. Please login again.');
    }

    const response = await axios.delete(`${API_URL}/${postId}/unfavorite`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error unmarking post as favorite:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Failed to unmark post as favorite.' };
  }
};


export const fetchFavoritePostsByUser = async () => {
  checkTokenExpiration();

  try {
    const token = await SecureStore.getItemAsync('token'); // Retrieve token from SecureStore

    if (!token) {
      throw new Error('Token not found. Please login again.');
    }
    const response = await axios.get(`${API_URL}/favorites`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    //console.log('API Response:', response.data);
    return response.data.favorites; 
  } catch (error) {
    console.error('Error fetching favorite posts:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Failed to fetch favorite posts.' };
  }
};

export const fetchPostFavorites = async (postId) => {
  checkTokenExpiration();
  
    try {
      const token = await SecureStore.getItemAsync('token');
  
      if (!token) {
        throw new Error('Token not found. Please log in again.');
      }
  
      const response = await axios.get(`${API_URL}/${postId}/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      return response.data.favorites || [];
    } catch (error) {
      console.error('Error fetching post favorites:', error.response?.data || error.message);
      throw error.response?.data || { message: 'Failed to fetch post favorites.' };
    }
  };
  