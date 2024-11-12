// src/components/Form/FormRow.tsx

import React from 'react';
import styles from './FormRow.module.css';

interface FormRowProps {
  children: React.ReactNode;
  hidden?: boolean;
}

const FormRow: React.FC<FormRowProps> = ({ children, hidden = false }) => {
  const rowClass = hidden ? styles.hide : styles.show;
  return <div className={`${styles.formRow} ${rowClass}`}>{children}</div>;
};

export default FormRow;
