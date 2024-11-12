// src/components/Form/FormGroup.tsx

import React from 'react';
import './formGroup.css';

interface FormGroupProps {
  label: string;
  htmlFor: string;
  colSize: 4 | 6 | 12;
  children: React.ReactNode;
  hidden?: boolean;
}

const FormGroup: React.FC<FormGroupProps> = ({
  label,
  htmlFor,
  colSize,
  children,
  hidden = false,
}) => {
  if (hidden) return null;

  const className = `form-group col-md-${colSize}`;
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className='form-label'>
        {label}
      </label>
      <div className='form-input'>{children}</div>
    </div>
  );
};

export default FormGroup;
