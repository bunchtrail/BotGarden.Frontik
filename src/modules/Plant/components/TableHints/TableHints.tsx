import React, { useEffect, useRef, useState } from 'react';
import styles from './TableHints.module.css';

const TableHints: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleHints = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.hintsContainer} ref={containerRef}>
      <div className={styles.hintsHeader} onClick={toggleHints}>
        <h4 className={styles.hintsTitle}>Подсказки</h4>
        <button
          className={`${styles.toggleButton} ${
            !isExpanded ? styles.collapsed : ''
          }`}
          aria-label={
            isExpanded ? 'Свернуть подсказки' : 'Развернуть подсказки'
          }
        >
          ▼
        </button>
      </div>
      <ul
        className={`${styles.hintsList} ${isExpanded ? styles.expanded : ''}`}
      >
        <li className={styles.hintItem}>
          <span className={styles.keyboardKey}>Shift + Click</span>
          <span>Выделить несколько строк подряд</span>
        </li>
        <li className={styles.hintItem}>
          <span className={styles.keyboardKey}>Ctrl + Click</span>
          <span>Выделить отдельные строки</span>
        </li>
        <li className={styles.hintItem}>
          <span className={styles.keyboardKey}>Esc</span>
          <span>Снять выделение</span>
        </li>
        <li className={styles.hintItem}>
          <span className={styles.keyboardKey}>Del</span>
          <span>Удалить выбранные строки</span>
        </li>
      </ul>
    </div>
  );
};

export default TableHints;
