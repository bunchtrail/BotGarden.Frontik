import { LoginResponse } from '../types/authTypes';
import client from './client';

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await client.post<LoginResponse>('/api/Account/login', {
    email,
    password,
  });
  return response.data;
};

export const refreshToken = async (
  accessToken: string,
  refreshToken: string
): Promise<{
  AccessToken: string;
  RefreshToken: string;
}> => {
  try {
    const response = await client.post('/api/Account/refresh', {
      Token: accessToken || '',
      RefreshToken: refreshToken,
    });
    console.log('Refresh response:', response.data);
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

