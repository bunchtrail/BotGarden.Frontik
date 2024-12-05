// src/components/AllPlantsPage/PlantRow.tsx

import React, { useState } from 'react';
import { Plant } from '../../../../types/types';
import styles from './AllPlantsPage.module.css';

interface Column {
  field: keyof Plant;
  label: string;
}

interface PlantRowProps {
  plant: Plant;
  onUpdate: (updatedPlant: Plant) => void;
  isEditing: boolean;
  columns: Column[];
}

const PlantRow: React.FC<PlantRowProps> = ({
  plant,
  onUpdate,
  isEditing,
  columns,
}) => {
  const [editedPlant, setEditedPlant] = useState<Plant>(plant);

  const handleSaveClick = () => {
    onUpdate(editedPlant);
  };

  const handleCancelClick = () => {
    setEditedPlant(plant);
  };

  const handleChange = (key: keyof Plant, value: any) => {
    setEditedPlant((prev) => ({ ...prev, [key]: value }));
  };

  const fieldInputTypes: { [key in keyof Plant]?: string } = {
    plantId: 'number',
    familyId: 'number',
    biometricId: 'number',
    genusId: 'number',
    latitude: 'number',
    longitude: 'number',
    dateOfPlanting: 'date',
    date: 'date',
    herbariumPresence: 'checkbox',
  };

  return (
    <tr className={styles.plantRow}>
      {columns.map((column) => {
        const field = column.field;
        const value = plant[field];
        const inputType = fieldInputTypes[field] || 'text';

        return (
          <td key={field}>
            {isEditing ? (
              inputType === 'checkbox' ? (
                <input
                  type='checkbox'
                  checked={editedPlant[field] as boolean}
                  onChange={(e) => handleChange(field, e.target.checked)}
                />
              ) : (
                <input
                  className={styles.editInput}
                  type={inputType}
                  value={
                    editedPlant[field] !== undefined
                      ? String(editedPlant[field])
                      : ''
                  }
                  onChange={(e) => handleChange(field, e.target.value)}
                />
              )
            ) : inputType === 'checkbox' ? (
              value ? (
                'Да'
              ) : (
                'Нет'
              )
            ) : value !== undefined ? (
              String(value)
            ) : (
              ''
            )}
          </td>
        );
      })}
      {isEditing && (
        <td>
          <button onClick={handleSaveClick}>Сохранить</button>
          <button onClick={handleCancelClick}>Отмена</button>
        </td>
      )}
    </tr>
  );
};

export default PlantRow;

// Нет изменений необходимы, если PlantRow корректно обрабатывает динамические колонки
