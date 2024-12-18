import { MapControl, MapMode } from '../types/mapControls';

// Базовые контролы, доступные во всех режимах
const baseControls: MapControl[] = [
  {
    id: 'zoomIn',
    icon: 'fas fa-plus',
    title: 'Приблизить',
    action: (map) => map.zoomIn(),
  },
  {
    id: 'zoomOut',
    icon: 'fas fa-minus',
    title: 'Отдалить',
    action: (map) => map.zoomOut(),
  },
  {
    id: 'fitBounds',
    icon: 'fas fa-expand',
    title: 'Показать всю карту',
    action: (map) => map.fitBounds(map.options.maxBounds || [[0,0], [0,0]]),
  }
];

// Специфичные контролы для каждого режима
const modeSpecificControls: Record<MapMode, MapControl[]> = {
  [MapMode.VIEW]: [],
  [MapMode.ADD_PLANT]: [
    {
      id: 'confirm-plant',
      icon: 'fas fa-check',
      title: 'Подтвердить размещение',
      action: () => {},
    }
  ],
  [MapMode.ADD_AREA]: [
    {
      id: 'draw-area',
      icon: 'fas fa-draw-polygon',
      title: 'Нарисовать область',
      action: () => {},
    }
  ],
  [MapMode.EDIT_AREA]: [
    {
      id: 'save-area',
      icon: 'fas fa-save',
      title: 'Сохранить изменения',
      action: () => {},
    }
  ],
  [MapMode.EDIT_PLANT]: [
    {
      id: 'move-plant',
      icon: 'fas fa-arrows-alt',
      title: 'Переместить растение',
      action: () => {},
    }
  ],
  [MapMode.REMOVE_PLANT]: [
    {
      id: 'confirm-remove',
      icon: 'fas fa-trash-alt',
      title: 'Подтвердить удаление',
      action: () => {},
    }
  ]
};

export const getMapControls = (currentMode: MapMode) => [
  ...baseControls,
  ...(modeSpecificControls[currentMode] || [])
];
