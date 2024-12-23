// src/components/AllPlantsPage/AllPlantsPage.tsx

import equal from 'fast-deep-equal'; // Добавляем библиотеку для глубокой оптимизированной проверки
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  deletePlant,
  getPlantsBySector,
  updatePlants,
} from '../../../../api/plantService';
import Button from '../../../../components/Button/Button';
import ConfirmationModal from '../../../../components/ConfirmationModal/ConfirmationModal';
import Loader from '../../../../components/Loader/Loader'; // Если у вас есть компонент лоадера
import Navbar from '../../../../components/Navbar/Navbar';
import useDebounce from '../../../../hooks/useDebounce';
import { Plant, PlantUpdateDto } from '../../../../types/types';
import TableHints from '../../components/TableHints/TableHints';
import styles from './AllPlantsPage.module.css';
import PlantsTable from './PlantsTable';

interface AllPlantPageProp {
  sectorId: number;
  // Удалили 'searchTerm', так как он не используется
}

interface SearchableColumn {
  field: string;
  label: string;
}

const AllPlantsPage: React.FC<AllPlantPageProp> = ({ sectorId }) => {
  const navigate = useNavigate();
  const [plants, setPlants] = useState<Plant[]>([]);
  const [originalPlants, setOriginalPlants] = useState<Plant[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  // Состояния для поиска
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  // Заменяем состояние selectedPlantId на selectedPlantIds
  const [selectedPlantIds, setSelectedPlantIds] = useState<number[]>([]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [plantsToDelete, setPlantsToDelete] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlants = async () => {
      setIsLoading(true);
      try {
        const fetchedPlants = await getPlantsBySector(sectorId);
        setPlants(fetchedPlants);
        setOriginalPlants(fetchedPlants);
      } catch (error) {
        console.error('Ошибка при загрузке растений:', error);
      } finally {
        setIsLoading(false);
      }
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
        familyId: plant.familyId ?? undefined,
        biometricId: plant.biometricId ?? undefined,
        sectorId: plant.sectorId ?? undefined,
        genusId: plant.genusId ?? undefined,
        inventorNumber: plant.inventorNumber ?? undefined,
        species: plant.species ?? undefined,
        variety: plant.variety ?? undefined,
        form: plant.form ?? undefined,
        determined: plant.determined ?? undefined,
        dateOfPlanting: plant.dateOfPlanting
          ? new Date(plant.dateOfPlanting)
          : undefined,
        protectionStatus: plant.protectionStatus ?? undefined,
        filledOut: plant.filledOut ?? undefined,
        herbariumDuplicate: plant.herbariumDuplicate ?? undefined,
        synonyms: plant.synonyms ?? undefined,
        plantOrigin: plant.plantOrigin ?? undefined,
        naturalHabitat: plant.naturalHabitat ?? undefined,
        ecologyBiology: plant.ecologyBiology ?? undefined,
        economicUse: plant.economicUse ?? undefined,
        originator: plant.originator ?? undefined,
        date: plant.date ? new Date(plant.date) : undefined,
        country: plant.country ?? undefined,
        imagePath: plant.imagePath ?? undefined,
        note: plant.note ?? undefined,
        yearOfObs: plant.yearOfObs ?? undefined,
        phenophaseDate: plant.phenophaseDate
          ? new Date(plant.phenophaseDate)
          : undefined,
        year: plant.year ?? undefined,
        measurementType: plant.measurementType ?? undefined,
        value: plant.value ?? undefined,
        latitude: plant.latitude ?? undefined,
        longitude: plant.longitude ?? undefined,
        herbariumPresence: plant.herbariumPresence ?? undefined,
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

  // Определение столбцов, доступных для поиска с русскими метками
  const searchableColumns: SearchableColumn[] = useMemo(() => {
    return [
      { field: 'familyId', label: 'Семейство' },
      { field: 'biometricId', label: 'ID Биометрии' },
      { field: 'genusId', label: 'Род' },
      { field: 'inventorNumber', label: 'Инвентарный Номер' },
      { field: 'species', label: 'Вид' },
      { field: 'variety', label: 'Разновидность' },
      { field: 'form', label: 'Форма' },
      { field: 'determined', label: 'Определено' },
      { field: 'yearOfObs', label: 'Год Наблюдения' },
      { field: 'phenophaseDate', label: 'Дата Фенофазы' },
      { field: 'year', label: 'Год' },
      { field: 'measurementType', label: 'Тип Измерения' },
      { field: 'value', label: 'Значение' },
      { field: 'dateOfPlanting', label: 'Дата Посадки' },
      { field: 'protectionStatus', label: 'Статус Защиты' },
      { field: 'filledOut', label: 'Заполнено' },
      { field: 'herbariumDuplicate', label: 'Дубликат Гербария' },
      { field: 'synonyms', label: 'Синонимы' },
      { field: 'plantOrigin', label: 'Происхождение Растения' },
      { field: 'naturalHabitat', label: 'Естественная Среда Обитания' },
      { field: 'ecologyBiology', label: 'Экология и Биология' },
      { field: 'economicUse', label: 'Экономическое Использование' },
      { field: 'latitude', label: 'Широта' },
      { field: 'longitude', label: 'Долгота' },
      { field: 'originator', label: 'Инициатор' },
      { field: 'date', label: 'Дата' },
      { field: 'country', label: 'Страна' },
      { field: 'imagePath', label: 'Путь к Изображению' },
      { field: 'herbariumPresence', label: 'Наличие Гербария' },
      { field: 'note', label: 'Заметка' },
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

  // Обновляем функцию handleSelectPlant для работы с событиями React
  const handleSelectPlant = (plantId: number, event: React.MouseEvent) => {
    setSelectedPlantIds((prev) => {
      if (prev.includes(plantId)) {
        // Если строка уже выделена - убираем её из выделения
        return prev.filter((id) => id !== plantId);
      } else {
        // Если строка не выделена - добавляем её к выделенным
        // При зажатом Shift выделяем все строки между последней выделенной и текущей
        if (event.shiftKey && prev.length > 0) {
          const allPlantIds = plants.map((p) => p.plantId);
          const lastSelectedIndex = allPlantIds.indexOf(prev[prev.length - 1]);
          const currentIndex = allPlantIds.indexOf(plantId);
          const start = Math.min(lastSelectedIndex, currentIndex);
          const end = Math.max(lastSelectedIndex, currentIndex);
          const newSelection = allPlantIds.slice(start, end + 1);
          return [...new Set([...prev, ...newSelection])];
        }
        // При зажатом Ctrl (или Cmd на Mac) добавляем строку к существующему выделению
        if (event.ctrlKey || event.metaKey) {
          return [...prev, plantId];
        }
        // Без модификаторов - выделяем только текущую строку
        return [plantId];
      }
    });
  };

  // Добавляем функцию для очистки выделения
  const clearSelection = () => {
    setSelectedPlantIds([]);
  };

  const handleDeleteConfirmation = (plantId: number) => {
    const idsToDelete = selectedPlantIds.includes(plantId)
      ? selectedPlantIds
      : [plantId];

    setPlantsToDelete(idsToDelete);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      for (const id of plantsToDelete) {
        const response = await deletePlant(id);
        if (response.success) {
          setPlants((prev) => prev.filter((plant) => plant.plantId !== id));
        } else {
          alert(`Ошибка при удалении растения ${id}: ${response.message}`);
        }
      }
      setSelectedPlantIds([]);
    } catch (error) {
      console.error('Ошибка при удалении растений:', error);
      alert('Произошла ошибка при удалении растений');
    } finally {
      setIsDeleteModalOpen(false);
      setPlantsToDelete([]);
    }
  };

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        clearSelection();
      } else if (event.key === 'Delete' && selectedPlantIds.length > 0) {
        event.preventDefault();
        handleDeleteConfirmation(selectedPlantIds[0]);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPlantIds]);

  return (
    <>
      <Navbar
        sectorId={sectorId}
        pageType='all-plants'
        onSearch={handleSearch}
        isEditing={isEditing}
        toggleEditing={toggleEditing}
        handleSave={handleSave}
        searchableColumns={searchableColumns}
      />
      <div className={styles.plantsAllContainer}>
        {isLoading ? (
          <Loader /> // Или любой другой индикатор загрузки
        ) : plants.length === 0 ? (
          <>
            <h1>Растения в данном разделе отсутствуют</h1>
            <Button
              key={sectorId}
              onClick={() => navigate(`/add-plant/${sectorId}`)}
            >
              Добавить растение
            </Button>
          </>
        ) : filteredPlants.length === 0 && debouncedSearchQuery ? (
          <h1>По вашему запросу ничего не найдено</h1>
        ) : (
          <PlantsTable
            plants={filteredPlants}
            onPlantUpdate={handlePlantUpdate}
            isEditing={isEditing}
            selectedPlantIds={selectedPlantIds}
            onSelectPlant={handleSelectPlant}
            onDeletePlant={handleDeleteConfirmation}
            onClearSelection={clearSelection}
          />
        )}
        {plants.length > 0 && <TableHints />}
      </div>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title='Подтверждение удаления'
        message={`Вы уверены, что хотите удалить ${
          plantsToDelete.length > 1
            ? `выбранные растения (${plantsToDelete.length} шт.)?`
            : 'это растение?'
        }`}
        onConfirm={handleDeleteConfirmed}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setPlantsToDelete([]);
        }}
      />
    </>
  );
};

export default AllPlantsPage;
