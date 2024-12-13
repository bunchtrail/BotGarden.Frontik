// src/api/client.ts
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from '../services/tokenService';
import { API_URL } from '../utils/data';
import { refreshToken } from './authService'; // Убедитесь, что этот импорт существует

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Перехватчик запросов для добавления токена авторизации
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

// Механизм очереди для запросов, ожидающих обновления токена
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: string) => void;
  reject: (error: any) => void;
}> = [];

// Функция для обработки очереди
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Перехватчик ответов для обновления токенов при ошибке 401
client.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        try {
          const token = await new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return client(originalRequest);
        } catch (err) {
          clearTokens();
          window.location.href = '/login';
          return Promise.reject(err);
        }
      }

      isRefreshing = true;

      try {
        const currentAccessToken = getAccessToken() || '';
        const currentRefreshToken = getRefreshToken();
        if (!currentRefreshToken) {
          throw new Error('No refresh token available');
        }

        const data = await refreshToken(currentAccessToken, currentRefreshToken); // Pass both tokens
        setTokens(data.AccessToken, data.RefreshToken);

        originalRequest.headers['Authorization'] = `Bearer ${data.AccessToken}`;
        processQueue(null, data.AccessToken);

        return client(originalRequest);
      } catch (err) {
        processQueue(err, null);
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default client;
