import api from './api.ts'; // Вместо прямого импорта axios

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/api/Account/login', {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw new Error('Ошибка авторизации');
  }
};
