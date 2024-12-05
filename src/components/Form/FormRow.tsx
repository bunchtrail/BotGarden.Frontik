// src/components/Form/FormRow.tsx

import React from 'react';
import styles from '../../assets/styles/components/Form/FormRow.module.css';

interface FormRowProps {
  children: React.ReactNode;
  hidden?: boolean;
  className?: string;
}

const FormRow: React.FC<FormRowProps> = ({ children, hidden = false, className }) => {
  const rowClass = hidden ? styles.hide : styles.show;
  return <div className={`${styles.formRow} ${rowClass} ${className}`}>{children}</div>;
};

export default FormRow;
