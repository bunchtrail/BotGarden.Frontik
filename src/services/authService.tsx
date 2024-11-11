// /src/services/authService.ts
import api from './api';

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/api/Account/login', {
      email,
      password,
    });

    return response.data;
  } catch (error) {}
};
