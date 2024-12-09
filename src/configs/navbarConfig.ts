// src/configs/navbarConfig.ts
export interface NavbarLink {
    to: string;
    label: string;
    icon?: string;
  }
  
  export interface NavbarElementBase {
    type: string;
  }
  
  export interface NavbarLinksElement extends NavbarElementBase {
    type: 'links';
    links: NavbarLink[];
  }
  
  export interface NavbarSearchElement extends NavbarElementBase {
    type: 'search';
  }
  
  export interface NavbarButtonGroupElement extends NavbarElementBase {
    type: 'buttonGroup';
  }
  
  export interface NavbarMobileActionsElement extends NavbarElementBase {
    type: 'mobileActions';
  }
  
  export type NavbarElement =
    | NavbarLinksElement
    | NavbarSearchElement
    | NavbarButtonGroupElement
    | NavbarMobileActionsElement;
  
  export interface NavbarPageConfig {
    exclude?: boolean;
    elements?: NavbarElement[];
  }
  
  export const navbarConfig: Record<string, NavbarPageConfig> = {
    '/login': { exclude: true },
    '/404': { exclude: true },
    '/': {
      elements: [
        {
          type: 'links',
          links: [
            { to: '/all-plants/1', label: 'Дендрология - все записи', icon: 'fas fa-tree' },
            { to: '/all-plants/2', label: 'Флора - все записи', icon: 'fas fa-leaf' },
            { to: '/all-plants/3', label: 'Цветоводство - все записи', icon: 'fas fa-seedling' },
            { to: '/map', label: 'Карта', icon: 'fas fa-map' }
          ]
        }
      ]
    },
    '/all-plants': {
      elements: [
        { type: 'search' },
        { type: 'buttonGroup' }
      ]
    },
    '/add-plant': {
      elements: [
        { type: 'buttonGroup' }
      ]
    }
  };
  