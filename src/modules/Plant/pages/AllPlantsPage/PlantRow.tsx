// PlantRow.tsx

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    let value: any = e.target.value;

    if (field === 'latitude' || field === 'longitude') {
      value = Number(value);
    } else if (field === 'herbariumPresence') {
      // Для чекбокса используем e.target.checked
      value = e.target.checked;
    } else if (field === 'yearOfObs' || field === 'year') {
      value = value ? Number(value) : undefined;
    }
    // Даты обрабатываем при сохранении, поэтому пока оставляем как есть (string)

    const updatedPlant = { ...editedPlant, [field]: value };
    setEditedPlant(updatedPlant);
    onUpdate(updatedPlant);
  };

  const fieldInputTypes: { [key in keyof Plant]?: string } = {
    plantId: 'number',
    familyId: 'number',
    biometricId: 'number',
    sectorId: 'number',
    genusId: 'number',
    latitude: 'number',
    longitude: 'number',
    dateOfPlanting: 'date',
    date: 'date',
    herbariumPresence: 'checkbox',
  };

  return (
    <tr className={`${styles.plantRow} ${isEditing ? styles.editingRow : ''}`}>
      {columns.map((column) => {
        const field = column.field;
        const inputType = fieldInputTypes[field] || 'text';
        const cellValue = editedPlant[field];

        return (
          <td key={String(field)}>
            {isEditing ? (
              inputType === 'checkbox' ? (
                <input
                  className={styles.editInput}
                  type='checkbox'
                  checked={!!cellValue}
                  onChange={(e) => handleChange(e, field)}
                />
              ) : (
                <input
                  className={styles.editInput}
                  type={inputType}
                  value={
                    cellValue !== undefined && cellValue !== null
                      ? String(cellValue)
                      : ''
                  }
                  onChange={(e) => handleChange(e, field)}
                  onBlur={() => onUpdate(editedPlant)}
                />
              )
            ) : cellValue !== undefined && cellValue !== null ? (
              String(cellValue)
            ) : (
              ''
            )}
          </td>
        );
      })}
    </tr>
  );
};

export default PlantRow;
