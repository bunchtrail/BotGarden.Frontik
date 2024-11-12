// src/components/Form/FormRow.tsx

import React from 'react';
import '../../assets/styles/formRow.css';

interface FormRowProps {
  children: React.ReactNode;
  hidden?: boolean;
}

const FormRow: React.FC<FormRowProps> = ({ children, hidden = false }) => {
  const rowClass = hidden ? 'form-row hide' : 'form-row show';
  return <div className={rowClass}>{children}</div>;
};

export default FormRow;
