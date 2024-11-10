import { useNavigate } from 'react-router-dom';
import Button from './Button.';
import '../../assets/styles/button.css';
const ButtonGroup_Main = () => {
  const navigate = useNavigate();

  return (
    <div className='btn-main'>
      <Button text='Дендрология' onClick={() => navigate('add-dendrology')} />
      <Button text='Флора' onClick={() => navigate('add-dendrology')} />
      <Button text='Цветоводство' onClick={() => navigate('add-dendrology')} />
    </div>
  );
};

export default ButtonGroup_Main;
