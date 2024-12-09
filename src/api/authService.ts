// src/api/authService.ts
import client from './client';

interface LoginResponse {
  accessToken: string;
}

interface RefreshResponse {
  accessToken: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  // Сервер установит httpOnly cookie с refresh-токеном
  const response = await client.post<LoginResponse>('/api/Account/login', {
    email,
    password,
  });
  return response.data;
};

export const refreshToken = async (): Promise<RefreshResponse> => {

  const response = await client.post<RefreshResponse>('/api/Account/refresh', {});
  return response.data;
};
