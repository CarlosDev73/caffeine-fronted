import axios from 'axios';
import { checkTokenExpiration } from './auth';
import * as SecureStore from 'expo-secure-store';

// Base URL configurada según tu backend
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
export const fetchLevels = async () => {
    checkTokenExpiration();

    try {
        const token = await SecureStore.getItemAsync('token'); // Obtén el token almacenado
        if (!token) throw new Error('Token de autenticación no encontrado');
    
        const response = await axios.get(`${API_BASE_URL}/levels`, {
          headers: {
            Authorization: `Bearer ${token}`, // Incluye el token en los encabezados
          },
        });
    
        return response.data.data; // Asume que los datos se devuelven en `response.data`
      } catch (error) {
        console.error('Error fetching levels:', error);
        throw error;
      }
    };

    export const fetchUserById = async (userId) => {
        try {
            const token = await SecureStore.getItemAsync('userToken');
            const response = await axios.get(`${API_BASE_URL}/users/${userId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
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