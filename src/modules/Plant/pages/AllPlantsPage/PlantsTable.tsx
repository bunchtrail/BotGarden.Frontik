// src/components/AllPlantsPage/PlantsTable.tsx

import React from 'react';
import { Plant } from '../../../../types/types'; // Updated import path
import styles from './AllPlantsPage.module.css';
import PlantRow from './PlantRow.tsx';

interface PlantsTableProps {
  plants: Plant[];
  onPlantUpdate: (updatedPlant: Plant) => void;
}

const PlantsTable: React.FC<PlantsTableProps> = ({ plants, onPlantUpdate }) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.plantsTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Species</th>
            <th>Description</th>
            <th>Sector ID</th>
            <th>Название</th>
            <th>Вид</th>
            <th>Описание</th>
            <th>Экономическое Использование</th>
            <th>Статус Защиты</th>
            <th>Происхождение Растения</th>
            <th>Естественная Среда Обитания</th>
            <th>Экология и Биология</th>
            <th>Определено</th>
            <th>Широта</th>
            <th>Долгота</th>
            <th>Страна</th>
            <th>Инвентарный Номер</th>
            <th>Семейство</th>
            <th>Род</th>
            <th>Синонимы</th>
            <th>Разновидность</th>
            <th>Форма</th>
            <th>ID Биометрии</th>
            <th>Год Наблюдения</th>
            <th>Дата Фенофазы</th>
            <th>Год</th>
            <th>Тип Измерения</th>
            <th>Значение</th>
            <th>Дата Посадки</th>
            <th>Дата</th>
            <th>Инициатор</th>
            <th>Наличие Гербария</th>
            <th>Дубликат Гербария</th>
            <th>Заполнено</th>
            <th>Путь к Изображению</th>
            <th>Заметка</th>
          </tr>
        </thead>
        <tbody>
          {plants.map((plant) => (
            <PlantRow key={plant.id} plant={plant} onUpdate={onPlantUpdate} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlantsTable;
