// src/components/Form/Input/Input.tsx
import React from 'react';
import styles from '../../assets/styles/components/Form/TextInput.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, value, onChange, placeholder, ...props }) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.inputLabel} htmlFor={props.id}>
        {label}
      </label>
      <input
        className={`${styles.inputField} ${styles.uniformLength}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default Input;
