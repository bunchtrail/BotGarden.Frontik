// src/components/AllPlantsPage/PlantsTable.tsx

import React from 'react';
import { Plant } from '../../../../types/types';
import styles from './AllPlantsPage.module.css';
import PlantRow from './PlantRow';

interface PlantsTableProps {
  plants: Plant[];
  onPlantUpdate: (updatedPlant: Plant) => void;
  isEditing: boolean;
}

interface Column {
  field: keyof Plant;
  label: string;
}

const columns: Column[] = [
  // { field: 'plantId', label: 'ID Растения' }, // Опционально скрыть ID
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

const PlantsTable: React.FC<PlantsTableProps> = ({
  plants,
  onPlantUpdate,
  isEditing,
}) => {
  return (
    <div className={styles.tableWrapper}>
      <table
        className={`${styles.plantsTable} ${
          isEditing ? styles.editingTable : ''
        }`}
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.field}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {plants.map((plant) => (
            <PlantRow
              key={plant.id ?? plant.plantId}
              plant={plant}
              onUpdate={onPlantUpdate}
              isEditing={isEditing}
              columns={columns}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlantsTable;
export { PlantsTable };
