import { getSectorById } from '../../../../utils/data';
import { useParams } from 'react-router-dom';

interface AllPlantPageProp {
  sectorId: number;
}

const AllPlantsPage: React.FC<AllPlantPageProp> = ({ sectorId }) => {
  return (
    <>
      <h1>Изменение растения в секторе {getSectorById(sectorId)?.name}</h1>
      <p>{sectorId}</p>
    </>
  );
};

export default AllPlantsPage;
