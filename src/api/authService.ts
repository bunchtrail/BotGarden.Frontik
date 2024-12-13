import { LoginResponse } from '../types/authTypes';
import client from './client';

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await client.post<LoginResponse>('/api/Account/login', {
    email,
    password,
  });
  return response.data;
};

export const refreshToken = async (accessToken: string, refreshToken: string): Promise<{
  AccessToken: string;
  RefreshToken: string;
}> => {
  const response = await client.post('/api/Account/refresh', {
    Token: accessToken || '',
    RefreshToken: refreshToken,
  });
  return response.data;
};

export const logout = async (): Promise<void> => {
  await client.post('/api/Account/logout');
};
