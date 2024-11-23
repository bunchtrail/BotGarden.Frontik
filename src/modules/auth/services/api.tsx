// src/services/api.ts
import axios from 'axios';
import { API_URL } from '../../../utils/data';
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from './tokenService';
import refreshApi from './refreshApi';

const api = axios.create({
  baseURL: API_URL,
});

// Перехватчик запросов для добавления токена
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('Добавлен Authorization header:', token);
    }
    return config;
  },
  (error) => {
    console.error('Ошибка при добавлении заголовка Authorization:', error);
    return Promise.reject(error);
  }
);

// Механизм очереди для запросов, ожидающих обновления токена
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Перехватчик ответов для обновления токенов при ошибке 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const currentRefreshToken = getRefreshToken();
      const currentAccessToken = getAccessToken();
      if (!currentRefreshToken || !currentAccessToken) {
        isRefreshing = false;
        return Promise.reject(error);
      }

      return new Promise(function (resolve, reject) {
        refreshApi
          .post('/api/Account/refresh', {
            token: currentAccessToken,
            refreshToken: currentRefreshToken,
          })
          .then(({ data }) => {
            console.log('Получены новые токены:', data);
            setTokens(data.accessToken, data.refreshToken);
            api.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${data.accessToken}`;
            originalRequest.headers[
              'Authorization'
            ] = `Bearer ${data.accessToken}`;
            processQueue(null, data.accessToken);
            resolve(api(originalRequest));
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

export default api;
