import axios from 'axios';

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
    return response.data.data.singleUser;
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

    const response = await axios.put(`${API_URL}/users/update/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.data.updatedUser;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al actualizar el usuario.' };
  }
};
