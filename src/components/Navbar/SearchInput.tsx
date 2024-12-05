
import React from 'react';
import styles from './Navbar.module.css';

interface SearchInputProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <input
      type='text'
      placeholder='Поиск...'
      value={searchQuery}
      onChange={onSearchChange}
      className={styles.navbarSearch}
    />
  );
};

export default SearchInput;