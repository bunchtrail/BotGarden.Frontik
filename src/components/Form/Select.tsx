// src/components/Form/Select/Select.tsx
import React from 'react';
import styles from './Select.module.css';

interface SelectProps {
  label: string;
  id: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ id: number; name: string }>;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  id,
  value,
  onChange,
  options = [],
  placeholder,
}) => {
  const validOptions = Array.isArray(options) ? options : [];

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id} className={styles.inputLabel}>
        {label}
      </label>
      <select 
        id={id} 
        value={value} 
        onChange={onChange}
        className={styles.inputField}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {validOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
