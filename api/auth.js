import axios from 'axios';
import * as SecureStore from 'expo-secure-store'

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const loginProccess = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
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

export const checkTokenExpiration = async () => {
  const token = await SecureStore.getItemAsync('token');
  if (!token) return;

  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  if (decoded.exp - currentTime < 86400) {
    try {
      const response = await fetch(`${API_URL}/auth/renew-token`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to renew token');

      const resp = await response.json();
      const token = resp.data?.token;
      if (!token) {
        throw new Error('Login failed: Token not provided');
      }

      if (typeof token !== 'string') {
        token = JSON.stringify(token);
      }
      await SecureStore.setItemAsync('token', token);

    } catch (error) {
      console.error('Error renewing token:', error);
    }
  }
};