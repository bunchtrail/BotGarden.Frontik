// src/App.tsx

import debounce from 'lodash.debounce'; // Импортируем debounce
import React, { useCallback, useMemo, useState } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { AuthProvider } from './context/AuthContext';
import { FormProvider } from './context/FormContext';
import AppRoutes from './routes';

const AppWrapper: React.FC = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSetSearchTerm = useCallback(
    debounce((query: string) => {
      setSearchTerm(query);
    }, 300),
    []
  );

  const handleSearch = (query: string) => {
    debouncedSetSearchTerm(query);
  };

  const navbarExcludedRoutes = useMemo(() => ['/login', '/404'], []);

  // Проверка, нужно ли исключить навбар для текущего маршрута
  const isExcluded = useMemo(() => {
    return navbarExcludedRoutes.includes(location.pathname);
  }, [location.pathname, navbarExcludedRoutes]);

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

  // Check if the user is on '/all-plants/1'
  const isAllPlantsOne = path === '/all-plants/1';

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
      <div className='app-container'>
        <AppRoutes searchTerm={searchTerm} />
      </div>
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
