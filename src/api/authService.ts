// src/api/authService.ts

import { LoginResponse } from '../types/authTypes';
import client from './client';

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await client.post<LoginResponse>('/api/Account/login', {
    email,
    password,
  });
  return response.data;
};

export const logout = async (): Promise<void> => {
  await client.post('/api/Account/logout');
};
