// src/hooks/useNavbarConfig.ts
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { navbarConfig, NavbarPageConfig } from '../configs/navbarConfig';

interface NavbarConfigResult {
  config: NavbarPageConfig;
  pageType?: 'home' | 'add-plant' | 'all-plants';
  sectorId?: number;
}

export function useNavbarConfig(): NavbarConfigResult {
  const location = useLocation();
  const pathname = location.pathname;

  const { pageType, sectorId } = useMemo(() => {
    let pageType: 'home' | 'add-plant' | 'all-plants' | undefined;
    let sectorId: number | undefined;

    if (pathname === '/') {
      pageType = 'home';
    } else if (pathname.startsWith('/add-plant/')) {
      const match = pathname.match(/^\/add-plant\/(\d+)$/);
      if (match) {
        sectorId = parseInt(match[1], 10);
        pageType = 'add-plant';
      }
    } else if (pathname.startsWith('/all-plants/')) {
      const match = pathname.match(/^\/all-plants\/(\d+)$/);
      if (match) {
        sectorId = parseInt(match[1], 10);
        pageType = 'all-plants';
      }
    }

    return { pageType, sectorId };
  }, [pathname]);

  let configKey = '/';
  if (pageType === 'all-plants') configKey = '/all-plants';
  if (pageType === 'add-plant') configKey = '/add-plant';
  if (pathname === '/login') configKey = '/login';
  if (pathname === '/404') configKey = '/404';

  const config = navbarConfig[configKey] || {};

  return { config, pageType, sectorId };
}
