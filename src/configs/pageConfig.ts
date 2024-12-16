// src/config/pageConfig.ts

export interface PageNavLink {
  to: string;
  iconClass: string;
  label: string;
}

export interface DropdownItem {
  pathSuffix: string;
  iconClass: string;
  label: string;
}

export interface ButtonConfig {
  action: string;
  icon: string;
  label: string;
  condition?: string; // Новое поле для условия отображения
}

interface PageConfig {
  showSearch: boolean;
  showButtonGroup: boolean;
  showColumnsDropdown: boolean;
  dropdownBasePath?: string;
  dropdownItems?: DropdownItem[];
  navLinks: PageNavLink[];
  staticButtons?: ButtonConfig[];
  dynamicButtons?: ButtonConfig[]; // Добавляем динамические кнопки
}

export const pageConfig: Record<string, PageConfig> = {
  home: {
    showSearch: false,
    showButtonGroup: false,
    showColumnsDropdown: false,
    navLinks: [
      { to: '/all-plants/1', iconClass: 'fas fa-tree', label: 'Дендрология - все записи' },
      { to: '/all-plants/2', iconClass: 'fas fa-leaf', label: 'Флора - все записи' },
      { to: '/all-plants/3', iconClass: 'fas fa-seedling', label: 'Цветоводство - все записи' },
      { to: '/map', iconClass: 'fas fa-map', label: 'Карта' },
    ],
    staticButtons: [], // Нет статических кнопок
    dynamicButtons: [], // Нет динамических кнопок
  },
  'all-plants': {
    showSearch: true,
    showButtonGroup: true,
    showColumnsDropdown: true,
    dropdownBasePath: '/all-plants',
    dropdownItems: [
      { pathSuffix: '/1', iconClass: 'fas fa-tree', label: 'Дендрология' },
      { pathSuffix: '/2', iconClass: 'fas fa-leaf', label: 'Флора' },
      { pathSuffix: '/3', iconClass: 'fas fa-seedling', label: 'Цветоводство' },
    ],
    navLinks: [
      { to: '/home', iconClass: 'fas fa-home', label: 'Вернуться на главный экран' },
    ],
    staticButtons: [
      { action: 'back', icon: 'backward', label: 'Назад' },
      { action: 'toggleEditing', icon: 'pencil', label: 'Редактировать' }, // Удалили условие
    ],
    dynamicButtons: [
      { action: 'save', icon: 'save', label: 'Сохранить', condition: 'isEditing' },
      { action: 'reset', icon: 'undo', label: 'Сбросить', condition: 'isEditing' },
    ],
  },
  'add-plant': {
    showSearch: false,
    showButtonGroup: true,
    showColumnsDropdown: false,
    dropdownBasePath: '/add-plant',
    dropdownItems: [
      { pathSuffix: '/1', iconClass: 'fas fa-tree', label: 'Дендрология' },
      { pathSuffix: '/2', iconClass: 'fas fa-leaf', label: 'Флора' },
      { pathSuffix: '/3', iconClass: 'fas fa-seedling', label: 'Цветоводство' },
    ],
    navLinks: [
      { to: '/home', iconClass: 'fas fa-home', label: 'Вернуться на главный экран' },
    ],
    staticButtons: [
      { action: 'back', icon: 'backward', label: 'Назад' },
      { action: 'save', icon: 'save', label: 'Сохранить' },
    ],
    dynamicButtons: [],
  },
  map: {
    showSearch: false,
    showButtonGroup: true,
    showColumnsDropdown: false,
    dropdownBasePath: '/map',
    dropdownItems: [
      { pathSuffix: '/upload-image', iconClass: 'fas fa-image', label: 'Загрузить изображение' },
    ],
    navLinks: [
      { to: '/home', iconClass: 'fas fa-home', label: 'Вернуться на главный экран' },
    ],
    staticButtons: [
      { action: 'add-plant', icon: 'seedling', label: 'Добавить растение' },
      { action: 'add-area', icon: 'map-marked-alt', label: 'Добавить область' },
      { action: 'edit-area', icon: 'edit', label: 'Редактировать область' },
      { action: 'edit-plant', icon: 'pencil-alt', label: 'Редактировать растение' },
      { action: 'remove-plant', icon: 'trash', label: 'Удалить растение' },
    ],
    dynamicButtons: [], // Для карты, возможно, нет динамических кнопок
  },
};

type PageType = keyof typeof pageConfig;
export default PageType;
