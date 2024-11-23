// src/App.tsx

import React, { useMemo } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { AuthProvider } from './modules/Auth/contexts/AuthContext';
import Navbar from './components/Navbar/Navbar';
import AppRoutes from './routes';

const AppWrapper: React.FC = () => {
  const location = useLocation();

  const navbarExcludedRoutes = useMemo(() => ['/login', '/404'], []);

  // Проверка, нужно ли исключить навбар для текущего маршрута
  const isExcluded = useMemo(() => {
    return navbarExcludedRoutes.includes(location.pathname);
  }, [location.pathname, navbarExcludedRoutes]);

  // Извлечение ID сектора из URL, если он присутствует
  const sectorMatch = location.pathname.match(/\/add-plant\/(\d+)/);
  const sectorId = sectorMatch ? parseInt(sectorMatch[1], 10) : undefined;

  return (
    <>
      {!isExcluded && <Navbar sectorId={sectorId} />}
      <div className='app-container'>
        <AppRoutes sectorId={sectorId} />
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppWrapper />
      </AuthProvider>
    </Router>
  );
};

export default App;