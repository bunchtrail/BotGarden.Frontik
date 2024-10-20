import axios from 'axios';
import API_URL from '../utils/data';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/Account/login`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw new Error('Ошибка авторизации');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};
