// src/api/client.ts
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { clearTokens, getAccessToken, setAccessToken } from '../services/tokenService';
import { API_URL } from '../utils/data';
import { refreshToken as refreshService } from './authService';

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // Включаем передачу cookie при запросах
});

// Добавляем access-токен в заголовок Authorization, если он есть
client.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    console.error('Ошибка при добавлении заголовка Authorization:', error);
    return Promise.reject(error);
  }
);

// Перехватчик ответов: если 401 — пытаемся рефрешнуть токен
client.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Пытаемся получить новый access-токен
        const { accessToken } = await refreshService();
        setAccessToken(accessToken);
        client.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return client(originalRequest);
      } catch (refreshError) {
        // Если рефреш не удался — выходим из аккаунта
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default client;
