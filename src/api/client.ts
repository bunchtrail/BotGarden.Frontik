// src/api/client.ts
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from '../services/tokenService';
import { API_URL } from '../utils/data';

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
  resolve: (value?: AxiosResponse<any>) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve({ data: { token } } as AxiosResponse);
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
      if (isRefreshing) {
        try {
          const token = await new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return await client(originalRequest);
        } catch (err) {
          return await Promise.reject(err);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const currentRefreshToken = getRefreshToken();
      const currentAccessToken = getAccessToken();

      if (!currentRefreshToken || !currentAccessToken) {
        isRefreshing = false;
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      return new Promise((resolve, reject) => {
        client
          .post('/api/Account/refresh', {
            token: currentAccessToken,
            refreshToken: currentRefreshToken,
          })
          .then(({ data }) => {
            console.log('Получены новые токены:', data);
            setTokens(data.accessToken, data.refreshToken);
            client.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
            processQueue(null, data.accessToken);
            resolve(client(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            clearTokens();
            window.location.href = '/login';
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);

export default client;
