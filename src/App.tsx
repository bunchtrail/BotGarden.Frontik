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

  // Проверка, нужно ли исключить навбар для текущего маршрута
  const isExcluded = useMemo(() => {
    return location.pathname !== '/home';
  }, [location.pathname]);

  // Извлекаем тип страницы и ID сектора из пути
  const path = location.pathname;
  let pageType: 'home' | 'add-plant' | 'all-plants' | undefined;
  let sectorId: number | undefined;

  if (path === '/') {
    pageType = 'home';
  } else if (path.startsWith('/add-plant/')) {
    const match = path.match(/^\/add-plant\/(\d+)$/);
    if (match) {
      sectorId = parseInt(match[1], 10);
      pageType = 'add-plant';
    }
  } else if (path.startsWith('/all-plants/')) {
    const match = path.match(/^\/all-plants\/(\d+)$/);
    if (match) {
      sectorId = parseInt(match[1], 10);
      pageType = 'all-plants';
    }
  }

  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <>
      {!isExcluded && (
        <Navbar
          sectorId={sectorId}
          pageType={pageType}
          onSearch={handleSearch}
          isEditing={isEditing}
          toggleEditing={toggleEditing}
        />
      )}
      <AppRoutes searchTerm={searchTerm} />
    </>
  );
};

const App: React.FC = () => {
  return (
    <FormProvider>
      <Router>
        <AuthProvider>
          <AppWrapper />
        </AuthProvider>
      </Router>
    </FormProvider>
  );
};

export default App;
