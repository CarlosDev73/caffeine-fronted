import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const loginProccess = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // Token and user info
  } catch (error) {
    throw error.response?.data || { error: "Login failed" };
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
    return response.data;
  } catch (error) {
    console.error('Error en forgotPassword:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al procesar la solicitud.' };
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/auth/reset-password`, {
      token,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al restablecer la contraseña.' };
  }
};