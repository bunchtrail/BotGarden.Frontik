// src/components/Form/SelectInput.tsx

import React from 'react';
import styles from '../../assets/styles/components/Form/SelectInput.module.css';

interface Option {
  value: string;
  label: string;
}

interface SelectInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
}

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  name,
  value,
  onChange,
  options,
}) => {
  return (
    <select
      id={id}
      className={styles.selectInput}
      name={name}
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
