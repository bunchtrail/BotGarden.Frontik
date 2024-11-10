// src/components/ButtonGroup_Main.tsx
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import '../../assets/styles/button.css';

const ButtonGroup_Main = () => {
  const navigate = useNavigate();

  const sectors = [
    { name: 'Дендрология', id: 1 },
    { name: 'Флора', id: 2 },
    { name: 'Цветоводство', id: 3 },
  ];

  return (
    <div className='btn-main'>
      {sectors.map((sector) => (
        <Button
          key={sector.id}
          text={sector.name}
          onClick={() => navigate(`/add-plant/${sector.id}`)}
        />
      ))}
    </div>
  );
};

export default ButtonGroup_Main;
