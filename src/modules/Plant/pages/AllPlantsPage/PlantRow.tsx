// src/components/AllPlantsPage/PlantRow.tsx

import React, { useState } from 'react';
import { Plant } from '../../../../types/types';
import styles from './AllPlantsPage.module.css';

interface PlantRowProps {
  plant: Plant;
  onUpdate: (updatedPlant: Plant) => void;
  isEditing: boolean; // Новое свойство
}

const PlantRow: React.FC<PlantRowProps> = ({ plant, onUpdate, isEditing }) => {
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

  const fieldsToDisplay: Array<keyof Plant> = [
    'plantId',
    'familyId',
    'biometricId',
    'sectorId',
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
    <tr className={styles.plantRow}>
      {fieldsToDisplay.map((field) => (
        <td key={field}>
          {isEditing ? (
            fieldInputTypes[field] === 'checkbox' ? (
              <input
                type='checkbox'
                checked={editedPlant[field] as boolean}
                onChange={(e) => handleChange(field, e.target.checked)}
              />
            ) : (
              <input
                className={styles.editInput}
                type={fieldInputTypes[field] || 'text'}
                value={
                  editedPlant[field] !== undefined
                    ? String(editedPlant[field])
                    : ''
                }
                onChange={(e) => handleChange(field, e.target.value)}
              />
            )
          ) : fieldInputTypes[field] === 'checkbox' ? (
            plant[field] ? (
              'Да'
            ) : (
              'Нет'
            )
          ) : plant[field] !== undefined ? (
            plant[field]
          ) : (
            ''
          )}
        </td>
      ))}
      {isEditing && (
        <td>
          {isEditing ? (
            <>
              <button onClick={handleSaveClick}>Сохранить</button>
              <button onClick={handleCancelClick}>Отмена</button>
            </>
          ) : (
            <button onClick={handleSaveClick}>Редактировать</button>
          )}
        </td>
      )}
    </tr>
  );
};

export default PlantRow;
