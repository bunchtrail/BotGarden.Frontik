// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { AuthProvider } from './modules/Auth/contexts/AuthContext';
import Navbar from './components/Navbar/Navbar';
import AppRoutes from './routes';

const AppWrapper: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  const sectorMatch = location.pathname.match(/\/add-plant\/(\d+)/);
  const sectorId = sectorMatch ? parseInt(sectorMatch[1], 10) : undefined;

  return (
    <>
      {!isLoginPage && <Navbar sectorId={sectorId} />}
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
