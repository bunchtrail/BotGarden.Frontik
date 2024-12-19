// src/api/authService.ts
import { setTokens } from '../services/tokenService';
import { LoginResponse } from '../types/authTypes';
import { AuthenticationError } from '../utils/errors';
import client from './client';

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await client.post<LoginResponse>('/api/Account/login', {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new AuthenticationError('Неверные учетные данные', 'unauthorized');
    }
    throw new AuthenticationError('Ошибка при входе в систему', 'general');
  }
};

export const refreshToken = async (
  accessToken: string,
  refreshToken: string
): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  try {
    const response = await client.post('/api/Account/refresh', {
      Token: accessToken || '',
      RefreshToken: refreshToken,
    });

    setTokens(response.data.accessToken, response.data.refreshToken);
    return response.data;
  } catch (error: any) {
    throw new AuthenticationError('Ошибка обновления сессии', 'general');
  }
};
