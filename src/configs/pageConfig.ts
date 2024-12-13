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
}

interface PageConfig {
  showSearch: boolean;
  showButtonGroup: boolean;
  showColumnsDropdown: boolean;
  dropdownBasePath?: string;
  dropdownItems?: DropdownItem[];
  navLinks: PageNavLink[];
  buttonGroup?: ButtonConfig[];
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
    buttonGroup: [],
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
    buttonGroup: [
      { action: 'toggleEditing', icon: 'pencil', label: 'Редактировать' },
      { action: 'save', icon: 'save', label: 'Сохранить' },
      { action: 'reset', icon: 'undo', label: 'Сбросить' },
      { action: 'back', icon: 'backward', label: 'Назад' },
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
    buttonGroup: [
      { action: 'save', icon: 'save', label: 'Сохранить' },
      { action: 'back', icon: 'backward', label: 'Назад' },
    ],
  },
  map: {
    showSearch: false,
    showButtonGroup: true,
    showColumnsDropdown: false,
    navLinks: [
      { to: '/home', iconClass: 'fas fa-home', label: 'Вернуться на главный экран' },
    ],
    buttonGroup: [
      { action: 'add-plant', icon: 'seedling', label: 'Добавить растение' },
      { action: 'add-area', icon: 'map-marked-alt', label: 'Добавить область' },
      { action: 'edit-area', icon: 'edit', label: 'Редактировать область' },
      { action: 'edit-plant', icon: 'pencil-alt', label: 'Редактировать растение' },
      { action: 'remove-plant', icon: 'trash', label: 'Удалить растение' },
      { action: 'upload-image', icon: 'image', label: 'Загрузить изображение' },
    ],
    dropdownItems: [
      { pathSuffix: '/settings', iconClass: 'fas fa-cog', label: 'Настройки' },
      { pathSuffix: '/help', iconClass: 'fas fa-question-circle', label: 'Помощь' },
    ],
  },
};

type PageType = keyof typeof pageConfig;
export default PageType;
