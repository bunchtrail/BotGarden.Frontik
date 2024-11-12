// src/components/Misc/HeaderTitle.tsx

import React from 'react';
import styles from '../../assets/styles/components/Misc/HeaderTitle.module.css';

interface HeaderTitleProps {
  title: string;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({ title }) => {
  return <h1 className={styles.headerTitle}>{title}</h1>;
};

export default HeaderTitle;
