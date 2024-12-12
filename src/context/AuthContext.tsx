// src/context/AuthContext.tsx
import { jwtDecode } from 'jwt-decode';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginService } from '../api/authService';
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from '../services/tokenService'
import { LoginResponse } from '../types/authTypes';
import { AuthenticationError } from '../utils/errors';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

interface DecodedToken {
  exp: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Функция для проверки срока действия токена
  const isTokenExpired = (token: string): boolean => {
    try {
      const decodedToken: DecodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      return true;
    }
  };

  // Функция для логина
  const login = async (email: string, password: string) => {
    try {
      const data: LoginResponse = await loginService(email, password);
      setTokens(data.accessToken, data.refreshToken);
      setIsAuthenticated(true);
      navigate('/home');
    } catch (error) {
      // Предотвращение вывода ошибки в консоль
      const authError = new AuthenticationError(
        'Неверные учетные данные',
        'unauthorized'
      );
      authError.stack = ''; // Очистка стека вызовов
      throw authError;
    }
  };

  // Функция для выхода из системы
  const logout = () => {
    clearTokens();
    setIsAuthenticated(false);
    navigate('/login');
  };

  const hasCheckedAuth = useRef(false);

  // Проверка токена при загрузке
  useEffect(() => {
    if (hasCheckedAuth.current) return;
    hasCheckedAuth.current = true;

    const checkAuth = async () => {
      const token = getAccessToken();
      const refreshTokenValue = getRefreshToken();

      if (token && !isTokenExpired(token)) {
        setIsAuthenticated(true);
        setLoading(false);
      } else if (refreshTokenValue) {
        try {
          setIsAuthenticated(false);
        } catch (error) {
          clearTokens();
          setIsAuthenticated(false);
        } finally {
          setLoading(false);
        }
      } else {
        clearTokens();
        setIsAuthenticated(false);
        setLoading(false);
      }
    };

    checkAuth();
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
