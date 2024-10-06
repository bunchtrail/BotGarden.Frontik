// /utils/helpers.ts
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token; // Возвращает true, если токен есть, и false, если его нет
  };
  