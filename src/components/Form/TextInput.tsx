// src/components/Form/TextInput.tsx

import React from 'react';

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
  const inputType = hidden ? 'hidden' : type;

  return (
    <input
      type={inputType}
      className='form-control'
      id={id}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextInput;
