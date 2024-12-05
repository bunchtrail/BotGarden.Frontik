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

  // Реализуем debounce с помощью lodash.debounce
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

  // Извлечение ID сектора и pageType из URL, если он присутствует
  const addPlantMatch = location.pathname.match(/^\/add-plant\/(\d+)$/);
  const allPlantsMatch = location.pathname.match(/^\/all-plants\/(\d+)$/);

  const sectorId = addPlantMatch
    ? parseInt(addPlantMatch[1], 10)
    : allPlantsMatch
    ? parseInt(allPlantsMatch[1], 10)
    : undefined;

  const pageType = addPlantMatch
    ? 'add-plant'
    : allPlantsMatch
    ? 'all-plants'
    : undefined;

  return (
    <>
      {!isExcluded && (
        <Navbar
          sectorId={sectorId}
          pageType={pageType}
          onSearch={handleSearch}
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
