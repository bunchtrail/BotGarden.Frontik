export const login = async (email: string, password: string) => {
  const response = await fetch('https://localhost:7076/api/Account/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Ошибка авторизации');
  }
  return response.json();
};

export const logout = () => {
  localStorage.removeItem('token');
};
