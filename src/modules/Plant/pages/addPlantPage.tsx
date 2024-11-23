import { useParams } from 'react-router-dom';

const AddPlantPage = () => {
  const { sectorId } = useParams<{ sectorId: string }>();
  return (
    <h1>
      Добавление растения в сектор{' '}
      {sectorId ? parseInt(sectorId, 10) : 'неизвестно'}
    </h1>
  );
};

export default AddPlantPage;
