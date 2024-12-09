// Теперь сохраняем только accessToken
export const setAccessToken = (accessToken: string): void => {
  localStorage.setItem('accessToken', accessToken);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

export const clearTokens = (): void => {
  localStorage.removeItem('accessToken');
  // refreshToken не храним на клиенте
};
