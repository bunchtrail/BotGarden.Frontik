// src/App.tsx

import debounce from 'lodash.debounce';
import React, { useCallback, useMemo, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { AuthProvider } from './context/AuthContext';
import { FormProvider } from './context/FormContext';
import AppRoutes from './routes';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const debouncedSetSearchTerm = useMemo(
    () =>
      debounce((query: string) => {
        setSearchTerm(query);
      }, 300),
    []
  );

  const handleSearch = useCallback(
    (query: string) => {
      debouncedSetSearchTerm(query);
    },
    [debouncedSetSearchTerm]
  );

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <FormProvider>
      <Router>
        <AuthProvider>
          <Navbar
            onSearch={handleSearch}
            isEditing={isEditing}
            toggleEditing={toggleEditing}
          />
          <div className='app-container'>
            <AppRoutes searchTerm={searchTerm} />
          </div>
        </AuthProvider>
      </Router>
    </FormProvider>
  );
};

export default App;
