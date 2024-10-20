import axios from 'axios';
import API_URL from '../utils/data';
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from './tokenService';

const api = axios.create({
  baseURL: API_URL,
});

// Добавляем перехватчик запросов, чтобы автоматически добавлять access token к каждому запросу
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Добавляем перехватчик ответов для обновления токенов при ошибке 401
api.interceptors.response.use(
  (response) => response, // Пропускаем успешные ответы
  async (error) => {
    const originalRequest = error.config;

    // Если ошибка 401 и это не повторный запрос
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();

        // Делаем запрос на обновление access token с помощью refresh token
        const { data } = await axios.post(`${API_URL}/api/Account/refresh`, {
          refreshToken: refreshToken,
        });

        // Сохраняем новые токены
        setTokens(data.AccessToken, data.RefreshToken);

        // Обновляем заголовок авторизации с новым токеном
        originalRequest.headers['Authorization'] = `Bearer ${data.AccessToken}`;

        // Повторяем исходный запрос
        return api(originalRequest);
      } catch (refreshError) {
        clearTokens();
        window.location.href = '/login'; // Перенаправляем на страницу логина, если обновление не удалось
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
