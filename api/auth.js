import axios from 'axios';

const API_URL = "http://192.168.50.78:3000/api/v1/";

export const loginProccess = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // Token and user info
  } catch (error) {
    throw error.response?.data || { error: "Login failed" };
  }
};
