// /src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from '../services/tokenService';
import { login as loginService } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAccessToken();
    console.log('Проверка токена при загрузке:', token);
    if (token && !isTokenExpired(token)) {
      setIsAuthenticated(true);
      console.log('Токен валиден. Пользователь аутентифицирован.');
    } else {
      clearTokens();
      setIsAuthenticated(false);
      console.log(
        'Токен недействителен или отсутствует. Пользователь не аутентифицирован.'
      );
    }
    setLoading(false);
  }, []);

  const isTokenExpired = (token: string): boolean => {
    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      const expired = decodedToken.exp < currentTime;
      console.log('Проверка истечения токена:', expired);
      return expired;
    } catch (error) {
      console.error('Ошибка при декодировании токена:', error);
      return true;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const data = await loginService(email, password);
      console.log('Успешный логин. Получены токены:', data);
      setTokens(data.accessToken, data.refreshToken);
      setIsAuthenticated(true);
      navigate('/home');
    } catch (error) {
      console.error('Ошибка при логине:', error);
      throw new Error('Ошибка авторизации');
    }
  };

  const logout = () => {
    clearTokens();
    setIsAuthenticated(false);
    console.log('Пользователь вышел из системы.');
    navigate('/login');
  };

  // Подписка на изменения токенов
  useEffect(() => {
    const interval = setInterval(() => {
      const token = getAccessToken();
      console.log('Периодическая проверка токена:', token);
      if (token && !isTokenExpired(token)) {
        setIsAuthenticated(true);
        console.log('Токен всё ещё валиден.');
      } else {
        setIsAuthenticated(false);
        console.log('Токен истёк или отсутствует.');
      }
    }, 1000 * 60); // Проверка каждую минуту

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
};
