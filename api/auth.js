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
