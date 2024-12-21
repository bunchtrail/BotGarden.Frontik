// src/components/AllPlantsPage/PlantsTable.tsx

import React, { useState } from 'react';
import { Plant } from '../../../../types/types';
import styles from './AllPlantsPage.module.css';

interface PlantsTableProps {
  plants: Plant[];
  onPlantUpdate: (plant: Plant) => void;
  isEditing: boolean;
  selectedPlantIds: number[];
  onSelectPlant: (plantId: number, event: React.MouseEvent) => void;
  onDeletePlant: (plantId: number) => void;
  onClearSelection: () => void;
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
  selectedPlantIds,
  onSelectPlant,
  onDeletePlant,
  onClearSelection,
}) => {
  const [editingCell, setEditingCell] = useState<{
    plantId: number;
    field: keyof Plant;
  } | null>(null);

  const handleTableClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClearSelection();
    }
  };

  const handleCellClick = (plantId: number, field: keyof Plant) => {
    if (isEditing) {
      setEditingCell({ plantId, field });
    }
  };

  const handleCellChange = (
    plantId: number,
    field: keyof Plant,
    value: any
  ) => {
    const plant = plants.find((p) => p.plantId === plantId);
    if (plant) {
      const updatedPlant = {
        ...plant,
        [field]: value,
      };
      onPlantUpdate(updatedPlant);
    }
  };

  const renderCell = (plant: Plant, field: keyof Plant) => {
    const isEditing =
      editingCell?.plantId === plant.plantId && editingCell?.field === field;
    const value = plant[field];

    if (isEditing) {
      if (typeof value === 'boolean') {
        return (
          <div className={styles.booleanCell}>
            <input
              type='checkbox'
              className={styles.booleanToggle}
              checked={value}
              onChange={(e) => {
                handleCellChange(plant.plantId, field, e.target.checked);
                setEditingCell(null);
              }}
              autoFocus
            />
          </div>
        );
      }

      if (
        field === 'dateOfPlanting' ||
        field === 'phenophaseDate' ||
        field === 'date'
      ) {
        return (
          <input
            type='date'
            className={styles.editInput}
            value={value ? new Date(value).toISOString().split('T')[0] : ''}
            onChange={(e) => {
              handleCellChange(plant.plantId, field, e.target.value);
            }}
            onBlur={() => setEditingCell(null)}
            autoFocus
          />
        );
      }

      if (typeof value === 'number') {
        return (
          <input
            type='number'
            className={styles.editInput}
            value={value || ''}
            onChange={(e) => {
              handleCellChange(
                plant.plantId,
                field,
                parseFloat(e.target.value)
              );
            }}
            onBlur={() => setEditingCell(null)}
            autoFocus
          />
        );
      }

      return (
        <input
          type='text'
          className={styles.editInput}
          value={value || ''}
          onChange={(e) => {
            handleCellChange(plant.plantId, field, e.target.value);
          }}
          onBlur={() => setEditingCell(null)}
          autoFocus
        />
      );
    }

    if (typeof value === 'boolean') {
      return value ? 'Да' : 'Нет';
    }

    return value || '—';
  };

  return (
    <div className={styles.tableWrapper} onClick={handleTableClick}>
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
            <th className={styles.actionColumn}>
              {selectedPlantIds.length > 0 ? (
                <button
                  className={styles.deleteButton}
                  onClick={() => onDeletePlant(selectedPlantIds[0])}
                >
                  Удалить выбранные
                </button>
              ) : (
                'Действия'
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {plants.map((plant) => (
            <tr
              key={plant.plantId}
              className={`${styles.tableRow} ${
                selectedPlantIds.includes(plant.plantId)
                  ? styles.selectedRow
                  : ''
              }`}
              onClick={(event) =>
                !isEditing && onSelectPlant(plant.plantId, event)
              }
            >
              {columns.map((col) => (
                <td
                  key={col.field}
                  className={`${
                    editingCell?.plantId === plant.plantId &&
                    editingCell?.field === col.field
                      ? styles.editing
                      : ''
                  }`}
                  onClick={() => handleCellClick(plant.plantId, col.field)}
                >
                  {renderCell(plant, col.field)}
                </td>
              ))}
              <td className={styles.actionColumn}>
                <button
                  className={styles.deleteButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeletePlant(plant.plantId);
                  }}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlantsTable;
export { PlantsTable };
