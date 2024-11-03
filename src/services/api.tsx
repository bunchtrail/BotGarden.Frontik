// /src/services/api.ts
import axios from 'axios';
import API_URL from '../utils/data';
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from './tokenService';

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

// Перехватчик ответов для обновления токенов при ошибке 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        const token = getAccessToken();

        console.log('Попытка обновления токенов:', { token, refreshToken });

        const { data } = await axios.post(`${API_URL}/api/Account/refresh`, {
          token: token,
          refreshToken: refreshToken,
        });

        console.log('Получены новые токены:', data);

        setTokens(data.accessToken, data.refreshToken);

        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
        console.log('Повторный запрос с новым токеном:', data.accessToken);

        return api(originalRequest);
      } catch (refreshError) {
        console.error('Не удалось обновить токены:', refreshError);
        clearTokens();
        window.location.href = '/login'; // Перенаправление при неудаче обновления токена
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
