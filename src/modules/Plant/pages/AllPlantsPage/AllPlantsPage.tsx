// src/components/AllPlantsPage/AllPlantsPage.tsx

import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlantsBySector, updatePlants } from '../../../../api/plantService';
import Button from '../../../../components/Button/Button';
import Navbar from '../../../../components/Navbar/Navbar';
import { Plant, PlantUpdateDto } from '../../../../types/types';
import styles from './AllPlantsPage.module.css';
import PlantsTable from './PlantsTable';
import equal from 'fast-deep-equal'; // Добавляем библиотеку для глубокой оптимизированной проверки
import useDebounce from '../../../../hooks/useDebounce';
interface AllPlantPageProp {
  sectorId: number;
  searchTerm: string;
}

const AllPlantsPage: React.FC<AllPlantPageProp> = ({
  sectorId,
  searchTerm,
}) => {
  const navigate = useNavigate();
  const [plants, setPlants] = useState<Plant[]>([]);
  const [originalPlants, setOriginalPlants] = useState<Plant[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  
  // Состояния для поиска
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  useEffect(() => {
    const fetchPlants = async () => {
      const fetchedPlants = await getPlantsBySector(sectorId);
      setPlants(fetchedPlants);
      setOriginalPlants(fetchedPlants);
    };
    fetchPlants();
  }, [sectorId]);

  // Формируем Map для быстрого доступа к исходным растениям по plantId
  const originalPlantsMap = useMemo(() => {
    const map = new Map<number, Plant>();
    for (const p of originalPlants) {
      map.set(p.plantId, p);
    }
    return map;
  }, [originalPlants]);

  const handlePlantUpdate = (updatedPlant: Plant) => {
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === updatedPlant.id ? updatedPlant : plant
      )
    );
  };

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSave = async () => {
    try {
      // Отбираем только изменённые растения
      const modifiedPlants = plants.filter((plant) => {
        const originalPlant = originalPlantsMap.get(plant.plantId);
        if (!originalPlant) return false;
        return !equal(plant, originalPlant);
      });

      if (modifiedPlants.length === 0) {
        console.log('Нет изменений для сохранения.');
        setIsEditing(false);
        return;
      }

      const plantUpdates: PlantUpdateDto[] = modifiedPlants.map((plant) => ({
        plantId: plant.plantId,
        familyId: plant.familyId,
        biometricId: plant.biometricId,
        sectorId: plant.sectorId,
        genusId: plant.genusId,
        inventorNumber: plant.inventorNumber,
        species: plant.species,
        variety: plant.variety,
        form: plant.form,
        determined: plant.determined,
        dateOfPlanting: plant.dateOfPlanting
          ? new Date(plant.dateOfPlanting)
          : undefined,
        protectionStatus: plant.protectionStatus,
        filledOut: plant.filledOut,
        herbariumDuplicate: plant.herbariumDuplicate,
        synonyms: plant.synonyms,
        plantOrigin: plant.plantOrigin,
        naturalHabitat: plant.naturalHabitat,
        ecologyBiology: plant.ecologyBiology,
        economicUse: plant.economicUse,
        originator: plant.originator,
        date: plant.date ? new Date(plant.date) : undefined,
        country: plant.country,
        imagePath: plant.imagePath,
        note: plant.note,
        yearOfObs: plant.yearOfObs ? Number(plant.yearOfObs) : undefined,
        phenophaseDate: plant.phenophaseDate
          ? new Date(plant.phenophaseDate)
          : undefined,
        year: plant.year ? Number(plant.year) : undefined,
        measurementType: plant.measurementType,
        value: plant.value,
        latitude: plant.latitude,
        longitude: plant.longitude,
        herbariumPresence: plant.herbariumPresence,
      }));

      const response = await updatePlants(plantUpdates);
      if (response.success) {
        setIsEditing(false);
        setOriginalPlants(plants); // Обновляем исходный список после сохранения
      } else {
        console.error('Ошибка при сохранении:', response.message);
      }
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
    }
  };

  // Обработчик поиска
  const handleSearch = (query: string, columns: string[]) => {
    setSearchQuery(query);
    setSelectedColumns(columns);
  };

  // Определение столбцов, доступных для поиска
  const searchableColumns = useMemo(() => {
    // Список полей, по которым можно осуществлять поиск
    // Исключаем скрытые поля, например, sectorId
    return [
      'familyId',
      'biometricId',
      'genusId',
      'inventorNumber',
      'species',
      'variety',
      'form',
      'determined',
      'yearOfObs',
      'phenophaseDate',
      'year',
      'measurementType',
      'value',
      'dateOfPlanting',
      'protectionStatus',
      'filledOut',
      'herbariumDuplicate',
      'synonyms',
      'plantOrigin',
      'naturalHabitat',
      'ecologyBiology',
      'economicUse',
      'latitude',
      'longitude',
      'originator',
      'date',
      'country',
      'imagePath',
      'herbariumPresence',
      'note',
    ];
  }, []);

  // Фильтрация растений на основе поискового запроса и выбранных столбцов
  const filteredPlants = useMemo(() => {
  if (!debouncedSearchQuery.trim() || selectedColumns.length === 0) {
    return plants;
  }

  const lowerCaseQuery = debouncedSearchQuery.toLowerCase();

  return plants.filter((plant) =>
    selectedColumns.some((col) => {
      const value = plant[col as keyof Plant];
      if (value === null || value === undefined) return false;
      return String(value).toLowerCase().includes(lowerCaseQuery);
    })
  );
}, [plants, debouncedSearchQuery, selectedColumns]);

  return (
    <div
      className={`app-container ${styles.plantsAllContainer} ${
        isEditing ? 'full-width' : ''
      }`}
    >
      <Navbar
        sectorId={sectorId}
        pageType='all-plants'
        onSearch={handleSearch}
        isEditing={isEditing}
        toggleEditing={toggleEditing}
        handleSave={handleSave}
        searchableColumns={searchableColumns} // Передаём список доступных для поиска столбцов
      />
      {filteredPlants.length === 0 ? (
        <>
          <h1>Растения в данном разделе отсутствуют</h1>
          <Button
            key={sectorId}
            onClick={() => navigate(`/add-plant/${sectorId}`)}
          >
            Добавить растение
          </Button>
        </>
      ) : (
        <PlantsTable
          plants={filteredPlants} // Передаём отфильтрованные растения
          onPlantUpdate={handlePlantUpdate}
          isEditing={isEditing}
        />
      )}
    </div>
  );
};

export default AllPlantsPage;
