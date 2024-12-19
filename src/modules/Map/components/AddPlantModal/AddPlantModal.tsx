import React, { useEffect, useState } from 'react';
import { fetchFamilies, fetchGenera } from '../../../../api/plantService';
import styles from './AddPlantModal.module.css';

interface AddPlantModalProps {
  position: [number, number];
  onSave: (data: {
    species: string;
    variety: string;
    note: string;
    familyId: number;
    genusId: number;
    biometricId: number;
    sectorId: number;
  }) => void;
  onCancel: () => void;
}

export const AddPlantModal: React.FC<AddPlantModalProps> = ({
  position,
  onSave,
  onCancel,
}) => {
  const [families, setFamilies] = useState<{ id: number; name: string }[]>([]);
  const [genera, setGenera] = useState<{ id: number; name: string }[]>([]);
  const [formData, setFormData] = useState({
    species: '',
    variety: '',
    note: '',
    familyId: 0,
    genusId: 0,
    biometricId: 1,
    sectorId: 1,
  });

  useEffect(() => {
    const loadData = async () => {
      const [familiesData, generaData] = await Promise.all([
        fetchFamilies(),
        fetchGenera()
      ]);
      setFamilies(familiesData);
      setGenera(generaData);
    };
    loadData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className={styles.modal}>
      <form onSubmit={handleSubmit}>
        <h3>Добавить растение</h3>
        
        <div>
          <label>Семейство:</label>
          <select
            value={formData.familyId}
            onChange={(e) => setFormData(prev => ({ ...prev, familyId: Number(e.target.value) }))}
            required
          >
            <option value="">Выберите семейство</option>
            {families.map(family => (
              <option key={family.id} value={family.id}>{family.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Род:</label>
          <select
            value={formData.genusId}
            onChange={(e) => setFormData(prev => ({ ...prev, genusId: Number(e.target.value) }))}
            required
          >
            <option value="">Выберите род</option>
            {genera.map(genus => (
              <option key={genus.id} value={genus.id}>{genus.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Вид:</label>
          <input
            type="text"
            value={formData.species}
            onChange={(e) => setFormData(prev => ({ ...prev, species: e.target.value }))}
            required
          />
        </div>

        <div>
          <label>Сорт:</label>
          <input
            type="text"
            value={formData.variety}
            onChange={(e) => setFormData(prev => ({ ...prev, variety: e.target.value }))}
          />
        </div>

        <div>
          <label>Примечание:</label>
          <textarea
            value={formData.note}
            onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
          />
        </div>

        <div className={styles.coordinates}>
          <p>Широта: {position[0]}</p>
          <p>Долгота: {position[1]}</p>
        </div>

        <div className={styles.buttons}>
          <button type="submit">Сохранить</button>
          <button type="button" onClick={onCancel}>Отмена</button>
        </div>
      </form>
    </div>
  );
};