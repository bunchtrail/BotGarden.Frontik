import { ReactNode } from 'react';

interface LoginContainerProps {
  children: ReactNode;
}

const LoginContainer: React.FC<LoginContainerProps> = ({ children }) => {
  return <div className='login-container'>{children}</div>;
};

export default LoginContainer;