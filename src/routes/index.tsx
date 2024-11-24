// src/routes/index.tsx

import React from 'react';
import { Route, Routes, Navigate, useParams } from 'react-router-dom';
import { LoginPage } from '../modules/Auth';
import HomePage from '../pages/Home/HomePage';
import ProtectedRoute from '../modules/Auth/components/misc/ProtectedRoute';
import NotFound from '../pages/Home/NotFound';
import { AddPlantPage } from '../modules/Plant';
import AllPlantsPage from '../modules/Plant/pages/AllPlantsPage/AllPlantsPage';

const PlantsRoute: React.FC<{ isAddPage: boolean }> = ({ isAddPage }) => {
  const { sectorId } = useParams<{ sectorId: string }>();

  const sectorIdNumber = Number(sectorId);
  const isValidSectorId = sectorIdNumber > 0 && sectorIdNumber <= 3;

  if (!isValidSectorId) {
    return <Navigate to='/404' replace />;
  }

  return isAddPage ? (
    <AddPlantPage sectorId={sectorIdNumber} />
  ) : (
    <AllPlantsPage sectorId={sectorIdNumber} />
  );
};

const AppRoutes: React.FC = () => {
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

      {/* Маршруты для добавления и просмотра всех растений */}
      <Route
        path='/add-plant/:sectorId'
        element={
          <ProtectedRoute>
            <PlantsRoute isAddPage={true} />
          </ProtectedRoute>
        }
      />
      <Route
        path='/all-plants/:sectorId'
        element={
          <ProtectedRoute>
            <PlantsRoute isAddPage={false} />
          </ProtectedRoute>
        }
      />

      {/* Маршрут для страницы 404 */}
      <Route path='/404' element={<NotFound />} />

      {/* Перенаправление всех неизвестных маршрутов на страницу 404 */}
      <Route path='*' element={<Navigate to='/404' replace />} />
    </Routes>
  );
};

export default AppRoutes;
