// src/api/authService.ts
import { setTokens } from '../services/tokenService'; // Добавленный импорт
import { LoginResponse } from '../types/authTypes';
import client from './client';

// Именованный экспорт функции login
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await client.post<LoginResponse>('/api/Account/login', {
    email,
    password,
  });
  return response.data;
};

// Именованный экспорт функции refreshToken
export const refreshToken = async (
  accessToken: string,
  refreshToken: string
): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  try {
    console.log(accessToken, refreshToken);
    const response = await client.post('/api/Account/refresh', {
      Token: accessToken || '',
      RefreshToken: refreshToken,
    });
    console.log('Refresh response:', response.data);

    // Сохраняем новые токены после успешного обновления
    setTokens(response.data.accessToken, response.data.refreshToken);

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Ошибка при обновлении токенов:', error.response.data);
    } else {
      console.error('Ошибка при обновлении токенов:', error.message);
    }
    throw error;
  }
};
