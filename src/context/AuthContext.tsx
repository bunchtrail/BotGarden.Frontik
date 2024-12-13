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
import {
  login as loginService,
  refreshToken as refreshTokenService,
} from '../api/authService';
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from '../services/tokenService';
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

  // Проверка истечения токена
  const isTokenExpired = (token: string): boolean => {
    try {
      const decodedToken: DecodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      return true;
    }
  };

  // Попытка обновления токена
  const attemptTokenRefresh = async () => {
    const token = getAccessToken(); // This might be null or an expired token
    const refreshTokenValue = getRefreshToken();

    if (!refreshTokenValue) {
      return false;
    }

    try {
      const data = await refreshTokenService(token || '', refreshTokenValue);
      setTokens(data.AccessToken, data.RefreshToken);
      return true;
    } catch {
      return false;
    }
  };

  // Логин
  const login = async (email: string, password: string) => {
    try {
      const data: LoginResponse = await loginService(email, password);
      setTokens(data.accessToken, data.refreshToken);
      setIsAuthenticated(true);
      navigate('/home');
    } catch (error) {
      const authError = new AuthenticationError(
        'Неверные учетные данные',
        'unauthorized'
      );
      authError.stack = '';
      throw authError;
    }
  };

  // Выход
  const logout = () => {
    clearTokens();
    setIsAuthenticated(false);
    navigate('/login');
  };

  const hasCheckedAuth = useRef(false);

  // Проверка при загрузке приложения
  useEffect(() => {
    if (hasCheckedAuth.current) return;
    hasCheckedAuth.current = true;

    const checkAuth = async () => {
      try {
        const token = getAccessToken();
        const refreshTokenValue = getRefreshToken();

        if (!token && !refreshTokenValue) {
          // Нет токенов - сразу выходим
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        if (token && !isTokenExpired(token)) {
          // Токен действителен
          setIsAuthenticated(true);
          setLoading(false);
          return;
        }

        // Пытаемся обновить токен
        if (refreshTokenValue) {
          const refreshed = await attemptTokenRefresh();
          setIsAuthenticated(refreshed);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Перехват запросов или попытка обновления перед критичными операциями (опционально)
  // Можно добавить сюда эффекты или использовать перехватчики запросов, но для упрощения
  // мы не будем это делать прямо сейчас.

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
