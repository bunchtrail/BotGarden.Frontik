// src/components/Form/FormGroup.tsx

import React from 'react';
import styles from '../../assets/styles/components/Form/FormGroup.module.css'

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

  const formGroupClass = styles.formGroup;
  const colClass = `col-md-${colSize}`;

  return (
    <div className={`${formGroupClass} ${colClass} ${styles.centerInputs}`}>
      <label htmlFor={htmlFor} className={styles.formLabel}>
        {label}
      </label>
      <div className={styles.formInput}>{children}</div>
    </div>
  );
};

export default FormGroup;
