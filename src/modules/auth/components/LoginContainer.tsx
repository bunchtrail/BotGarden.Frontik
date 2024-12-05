// src/components/LoginPage/LoginContainer.tsx
import React, { ReactNode } from 'react';
import './login.css';

interface LoginContainerProps {
  children: ReactNode;
}

const LoginContainer: React.FC<LoginContainerProps> = ({ children }) => {
  return <div className='login-container'>{children}</div>;
};

export default LoginContainer;
