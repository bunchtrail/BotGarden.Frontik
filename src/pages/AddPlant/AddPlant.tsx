import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface AddPlantPageProps {
  sectorId: number;
}

const AddPlantPage: React.FC<AddPlantPageProps> = ({ sectorId }) => {
  const { isAuthenticated } = useAuth();
  console.log('sectorId:', sectorId);
  console.log('isAuthenticated:', isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      // Если пользователь не авторизован, перенаправляем на страницу логина
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Можно вернуть лоадер или пустую разметку, пока проверяется авторизация
  }

  return (
    <div>
      <h1>Добавить растение</h1>
      <form>
        <div>
          <label htmlFor='name'>Название</label>
          <input type='text' id='name' />
        </div>
        <div>
          <label htmlFor='description'>Описание</label>
          <textarea id='description' />
        </div>
        <div>
          <label htmlFor='watering'>Полив</label>
          <input type='text' id='watering' />
        </div>
        <div>
          <label htmlFor='fertilizing'>Удобрение</label>
          <input type='text' id='fertilizing' />
        </div>
        <div>
          <label htmlFor='pruning'>Обрезка</label>
          <input type='text' id='pruning' />
        </div>
      </form>
    </div>
  );
};

export default AddPlantPage;
