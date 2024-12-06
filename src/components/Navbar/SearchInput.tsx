// src/components/Navbar/SearchInput.tsx

import React from 'react';
import styles from './SearchInput.module.css'; // Создайте соответствующий CSS модуль

interface SearchInputProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <input
      type='text'
      value={searchQuery}
      onChange={onSearchChange}
      placeholder='Поиск...'
      className={styles.searchInput}
    />
  );
};

export default SearchInput;
