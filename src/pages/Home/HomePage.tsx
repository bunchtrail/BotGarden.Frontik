import { useNavigate } from 'react-router-dom';
import Button from '../../components/Misc/Button';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Добро пожаловать!</h1>
      <p>
        Это защищённая страница, доступная только авторизованным пользователям.
      </p>
      <Button onClick={() => navigate('/add-plant')}>Добавить растение</Button>
    </div>
  );
};

export default HomePage;
