// src/components/Button/Button.tsx

import classNames from 'classnames';
import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className,
  ...props
}) => {
  const btnClass = classNames(
    styles.button,
    {
      [styles.primary]: variant === 'primary',
      [styles.danger]: variant === 'danger',
    },
    className
  );

  return (
    <button className={btnClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
