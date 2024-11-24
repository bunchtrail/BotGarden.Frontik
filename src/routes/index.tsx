// src/routes/index.tsx

import React from 'react';
import { Route, Routes, Navigate, useParams } from 'react-router-dom';
import { LoginPage } from '../modules/Auth';
import HomePage from '../pages/Home/HomePage';
import ProtectedRoute from '../modules/Auth/components/misc/ProtectedRoute';
import NotFound from '../pages/Home/NotFound';
import { AddPlantPage } from '../modules/Plant';

interface AppRoutesProps {
  sectorId?: number;
}

const AddPlantRoute = () => {
  const { sectorId } = useParams<{ sectorId: string }>();
  const sectorIdNumber = Number(sectorId);
  return sectorIdNumber > 3 ? (
    <Navigate to='/404' replace />
  ) : (
    <AddPlantPage sectorId={sectorIdNumber} />
  );
};

const AppRoutes: React.FC<AppRoutesProps> = ({}) => {
  return (
    <Routes>
      {/* Маршрут для страницы авторизации */}
      <Route path='/login' element={<LoginPage />} />

      {/* Защищённые маршруты */}
      <Route
        path='/home'
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path='/map'
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />

      <Route
        path='/add-plant/:sectorId'
        element={
          <ProtectedRoute>
            <AddPlantRoute />
          </ProtectedRoute>
        }
      />
      <Route path='*' element={<Navigate to='/404' replace />} />

      {/* Маршрут 404 Страницы */}
      <Route path='/404' element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
