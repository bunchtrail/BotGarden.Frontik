// src/components/Navbar/SearchInput.tsx

import React from 'react';
import styles from './Navbar.module.css';

interface SearchInputProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className={styles.searchWrapper}>
      <input
        type='text'
        className={styles.searchInput}
        placeholder='Поиск...'
        value={searchQuery}
        onChange={onSearchChange}
      />
      <i className={`fas fa-search ${styles.searchIcon}`} />
    </div>
  );
};

export default SearchInput;
