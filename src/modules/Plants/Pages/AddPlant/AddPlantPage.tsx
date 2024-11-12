import { useParams } from 'react-router-dom';

const AddPlantPage = () => {
  const { sectorId } = useParams<{ sectorId: string }>();

  return (
    <div className='add-page-container'>
      <h1>Добавить растение в сектор: {sectorId}</h1>
    </div>
  );
};

export default AddPlantPage;
