import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { checkTokenExpiration } from './auth';

const API_URL = process.env.EXPO_PUBLIC_API_URL; 

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data.data.listUsers;
  } catch (error) {
    console.error('Error al obtener los usuarios:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al obtener los usuarios.' };
  }
};

export const fetchUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    const { singleUser, nextLevelRequirements } = response.data.data;
    return {
      ...singleUser,
      nextLevelRequirements, 
    };
  } catch (error) {
    console.error('Error al obtener el usuario:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al obtener el usuario.' };
  }
};

export const changeUserPassword = async (userId, currentPassword, newPassword) => {
  try {
    const response = await axios.put(`${API_URL}/users/changePassword/${userId}`, {
      currentPassword,
      newPassword,
    });
    return response.data.message;
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al cambiar la contraseña.' };
  }
};

export const updateUser = async (userId, updateData) => {
  try {
    const formData = new FormData();

    Object.keys(updateData).forEach((key) => {
      formData.append(key, updateData[key]);
    });

    const response = await axios.put(`${API_URL}/users/update/${userId}`, updateData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log("Respuesta de la API:", response.data);
    return response.data.updatedUser;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al actualizar el usuario.' };
  }
};

export const followUser = async (targetId) => {
  checkTokenExpiration();
  try {
    const token = await SecureStore.getItemAsync('token');

    if (!token) {
      throw new Error('Token not found. Please login again.');
    }

    const response = await axios.post(
      `${API_URL}/users/follow/${targetId}`,
      {}, 
      {
        headers: { Authorization: `Bearer ${token}` }, 
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error following user:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error following user.' };
  }
};

export const unfollowUser = async (targetId) => {
  checkTokenExpiration();
  try {
    const token = await SecureStore.getItemAsync('token');

    if (!token) {
      throw new Error('Token not found. Please login again.');
    }

    const response = await axios.post(
      `${API_URL}/users/unfollow/${targetId}`,
      {}, 
      {
        headers: { Authorization: `Bearer ${token}` }, 
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error unfollowing user:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error unfollowing user.' };
  }
};
