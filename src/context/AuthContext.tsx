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
  refreshToken as refreshService,
} from '../api/authService';
import {
  clearTokens,
  getAccessToken,
  setAccessToken,
} from '../services/tokenService';
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
  const hasCheckedAuth = useRef(false);

  const isTokenExpired = (token: string): boolean => {
    try {
      const decodedToken: DecodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      return true;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const data = await loginService(email, password);
      // Сервер возвращает accessToken, а refresh-токен устанавливается в httpOnly cookie.
      setAccessToken(data.accessToken);
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

  const logout = () => {
    clearTokens();
    setIsAuthenticated(false);
    navigate('/login');
  };

  const attemptRefresh = async () => {
    try {
      const data = await refreshService();
      // Сервер вернет новый access-токен.
      setAccessToken(data.accessToken);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      // Если refresh не удался, выходим из системы.
      logout();
      return false;
    }
  };

  useEffect(() => {
    if (hasCheckedAuth.current) return;
    hasCheckedAuth.current = true;

    const checkAuth = async () => {
      const token = getAccessToken();
      if (!token) {
        // Нет access-токена — не авторизованы
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      if (isTokenExpired(token)) {
        // Токен истек — пробуем рефреш
        const refreshed = await attemptRefresh();
        setLoading(false);
        if (!refreshed) {
          // Не удалось рефрешнуть, остаемся неавторизованными
          setIsAuthenticated(false);
        }
      } else {
        // Токен валиден
        setIsAuthenticated(true);
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
