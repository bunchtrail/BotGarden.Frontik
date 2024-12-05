// src/routes/index.tsx

import React from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { LoginPage } from '../modules/Auth';
import ProtectedRoute from '../modules/Auth/components/misc/ProtectedRoute';
import { AddPlantPage } from '../modules/Plant';
import AllPlantsPage from '../modules/Plant/pages/AllPlantsPage/AllPlantsPage';
import HomePage from '../pages/Home/HomePage';
import NotFound from '../pages/Home/NotFound';

interface PlantsRouteProps {
  isAddPage: boolean;
  searchTerm: string;
}

const PlantsRoute: React.FC<PlantsRouteProps> = ({ isAddPage, searchTerm }) => {
  const { sectorId } = useParams<{ sectorId: string }>();

  const sectorIdNumber = Number(sectorId);
  const isValidSectorId = sectorIdNumber > 0 && sectorIdNumber <= 3; // Предполагается, что у вас 3 сектора

  if (!isValidSectorId) {
    return <Navigate to='/404' replace />;
  }

  return isAddPage ? (
    <AddPlantPage sectorId={sectorIdNumber} />
  ) : (
    <AllPlantsPage sectorId={sectorIdNumber} searchTerm={searchTerm} />
  );
};

interface AppRoutesProps {
  searchTerm: string;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ searchTerm }) => {
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

      {/* Маршруты для добавления и просмотра всех растений */}
      <Route
        path='/add-plant/:sectorId'
        element={
          <ProtectedRoute>
            <PlantsRoute isAddPage={true} searchTerm={searchTerm} />
          </ProtectedRoute>
        }
      />
      <Route
        path='/all-plants/:sectorId'
        element={
          <ProtectedRoute>
            <PlantsRoute isAddPage={false} searchTerm={searchTerm} />
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
