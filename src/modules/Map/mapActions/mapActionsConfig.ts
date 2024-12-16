// src/config/mapActionsConfig.ts

import { RefObject } from 'react';
import { MapViewRef } from '../components/MapView';
import addAreaHandler from './addAreaHandler';
import editAreaHandler from './editAreaHandler';
import removePlantHandler from './removePlantHandler';



// Определяем тип для обработчиков действий
type MapActionHandler = (mapViewRef: RefObject<MapViewRef>, ...args: any[]) => void;

// Создаем конфигурацию действий для карты
export const mapActionsConfig: Record<string, MapActionHandler> = {
  'add-area': addAreaHandler,
  'edit-area': editAreaHandler,
  'remove-plant': removePlantHandler,
  // Добавьте другие действия по необходимости
};
