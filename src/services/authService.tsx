import axios from 'axios';
import API_URL from '../utils/data';

export const login = async (email: string, password: string) => {
  try {
    // Используем axios для выполнения POST-запроса
    const response = await axios.post(`${API_URL}/api/Account/login`, {
      email,
      password,
    });

    // Возвращаем данные ответа
    return response.data;
  } catch (error) {
    // Обрабатываем ошибку, если запрос не успешен
    throw new Error('Ошибка авторизации');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};
