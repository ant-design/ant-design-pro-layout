import { createContext } from 'react';
import { BreadcrumbListReturn } from './utils/getBreadcrumbProps';
import { ProSettings } from './defaultSettings';
import { MenuDataItem } from './typings';

export interface RouteContextType extends Partial<ProSettings> {
  breadcrumb?: BreadcrumbListReturn;
  menuData?: MenuDataItem[];
  isMobile?: boolean;
  prefixCls?: string;
  collapsed?: boolean;
  isChildrenLayout?: boolean;
}

const routeContext: React.Context<RouteContextType> = createContext({});

export default routeContext;
