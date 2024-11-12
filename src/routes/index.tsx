// src/routes/index.tsx

import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { LoginPage } from '../modules/Auth';
import HomePage from '../pages/Home/HomePage';
import { AddPlantPage } from '../modules/Plants';
import ProtectedRoute from '../modules/Auth/components/misc/ProtectedRoute';

interface AppRoutesProps {
  sectorId?: number;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ sectorId }) => {
  return (
    <Routes>
      {/* Маршрут для страницы авторизации */}
      <Route path='/login' element={<LoginPage />} />

      {/* Защищённые маршруты с динамическим sectorId */}
      <Route
        path='/home'
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
            <AddPlantPage />
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

      {/* Другие маршруты, если необходимо */}

      {/* 404 Страница */}
      <Route path='*' element={<Navigate to='/home' replace />} />
    </Routes>
  );
};

export default AppRoutes;
