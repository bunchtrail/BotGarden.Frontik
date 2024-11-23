import React from 'react';
import styles from './CollapsibleSection.module.css';

interface CollapsibleSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  isOpen,
  onToggle,
  children,
}) => (
  <div>
    <h2 onClick={onToggle} className={styles.collapsible}>
      {title}
      <span className={`${styles.caret} ${isOpen ? styles.rotate : ''}`}></span>
    </h2>
    <div
      className={`${styles.content} ${isOpen ? styles.open : styles.closed}`}
    >
      {children}
    </div>
  </div>
);

export default CollapsibleSection;
