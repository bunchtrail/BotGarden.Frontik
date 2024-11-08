import { useNavigate } from 'react-router-dom';
import Button from '../../components/Misc/Button';
import HeaderTitle from '../../components/Misc/headerTitle';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className='homeContainer'>
        <HeaderTitle title='Выберите раздел для дальнейшей работы' />
      </div>
    </div>
  );
};

export default HomePage;
