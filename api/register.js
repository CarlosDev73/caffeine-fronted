import axios from 'axios';

// URL de tu API
const API_URL = 'http://192.168.50.78:3000/api/v1';

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Retorna la respuesta del backend
  } catch (error) {
    // Lanza un error con el mensaje desde el backend o un mensaje genérico
    throw error.response?.data?.message || 'Error en el registro';
  }
};
