// src/components/Form/TextInput.tsx

import React from 'react';
import styles from '../../assets/styles/components/Form/TextInput.module.css';
import classNames from 'classnames';

interface TextInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hidden?: boolean;
  type?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  name,
  value,
  onChange,
  hidden = false,
  type = 'text',
}) => {
  const inputClass = classNames(styles.textInput, {
    [styles.hiddenInput]: hidden,
  });

  return (
    <input
      type={hidden ? 'hidden' : type}
      className={inputClass}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextInput;
