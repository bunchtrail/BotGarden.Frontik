import React, { useState } from 'react';
import styles from './Section.module.css';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={styles.section}>
      <button
        className={styles.sectionHeader}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2>{title}</h2>
        <span
          className={`${styles.arrow} ${isExpanded ? styles.expanded : ''}`}
        >
          ▼
        </span>
      </button>
      <div className={`${styles.content} ${isExpanded ? styles.expanded : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default Section;
