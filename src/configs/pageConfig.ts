// src/config/pageConfig.ts
// Здесь храним конфигурацию для разных pageType
export interface PageNavLink {
    to: string;
    iconClass: string;
    label: string;
  }
  
  interface PageConfig {
    showSearch: boolean;
    showButtonGroup: boolean;
    showColumnsDropdown: boolean;
    navLinks: PageNavLink[];
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
        { to: '/map', iconClass: 'fas fa-map', label: 'Карта' }
      ]
    },
    'all-plants': {
      showSearch: true,
      showButtonGroup: true,
      showColumnsDropdown: true,
      navLinks: [
        { to: '/home', iconClass: 'fas fa-home', label: 'Вернуться на главный экран' }
      ]
    },
    'add-plant': {
      showSearch: false,
      showButtonGroup: true,
      showColumnsDropdown: false,
      navLinks: [
        { to: '/home', iconClass: 'fas fa-home', label: 'Вернуться на главный экран' }
      ]
    },
    'map': {
      showSearch: false,
      showButtonGroup: false,
      showColumnsDropdown: false,
      navLinks: [
        { to: '/home', iconClass: 'fas fa-home', label: 'Вернуться на главный экран' }
      ]
    },
    'asd': {
      showSearch: false,
      showButtonGroup: false,
      showColumnsDropdown: false,
      navLinks: [
        { to: '/home', iconClass: 'fas fa-home', label: 'Вернуться на главный экран' }
      ]
    }
  };

  type PageType = keyof typeof pageConfig;

  export default PageType;
  