import './index.less';
import Icon, { createFromIconfontCN } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import classNames from 'classnames';
import useMergeValue from 'use-merge-value';

import { MenuMode, MenuProps } from 'antd/es/menu';
import { MenuTheme } from 'antd/es/menu/MenuContext';
import defaultSettings, { ProSettings } from '../defaultSettings';
import { getSelectedMenuKeys } from './SiderMenuUtils';
import { isUrl, getOpenKeysFromMenuData } from '../utils/utils';

import {
  MenuDataItem,
  MessageDescriptor,
  Route,
  RouterTypes,
  WithFalse,
} from '../typings';
import MenuCounter from './Counter';

export interface BaseMenuProps
  extends Partial<RouterTypes<Route>>,
    Omit<MenuProps, 'openKeys' | 'onOpenChange'>,
    Partial<ProSettings> {
  className?: string;
  collapsed?: boolean;
  splitMenus?: boolean;
  handleOpenChange?: (openKeys: string[]) => void;
  isMobile?: boolean;
  menuData?: MenuDataItem[];
  mode?: MenuMode;
  onCollapse?: (collapsed: boolean) => void;
  openKeys?: WithFalse<string[]> | undefined;
  /**
   * 要给菜单的props, 参考antd-menu的属性。https://ant.design/components/menu-cn/
   */
  menuProps?: MenuProps;
  style?: React.CSSProperties;
  theme?: MenuTheme;
  formatMessage?: (message: MessageDescriptor) => string;
  subMenuItemRender?: WithFalse<
    (
      item: MenuDataItem & {
        isUrl: boolean;
      },
      defaultDom: React.ReactNode,
    ) => React.ReactNode
  >;
  menuItemRender?: WithFalse<
    (
      item: MenuDataItem & {
        isUrl: boolean;
      },
      defaultDom: React.ReactNode,
    ) => React.ReactNode
  >;
  postMenuData?: (menusData?: MenuDataItem[]) => MenuDataItem[];
}

const { SubMenu } = Menu;

let IconFont = createFromIconfontCN({
  scriptUrl: defaultSettings.iconfontUrl,
});

// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'icon-geren' #For Iconfont ,
//   icon: 'http://demo.com/icon.png',
//   icon: '/favicon.png',
//   icon: <Icon type="setting" />,
const getIcon = (icon?: string | React.ReactNode): React.ReactNode => {
  if (typeof icon === 'string' && icon !== '') {
    if (isUrl(icon)) {
      return (
        <Icon
          component={() => (
            <img src={icon} alt="icon" className="ant-pro-sider-menu-icon" />
          )}
        />
      );
    }
    if (icon.startsWith('icon-')) {
      return <IconFont type={icon} />;
    }
  }
  return icon;
};

class MenuUtil {
  constructor(props: BaseMenuProps) {
    this.props = props;
  }

  props: BaseMenuProps;

  getNavMenuItems = (
    menusData: MenuDataItem[] = [],
    isChildren: boolean,
  ): React.ReactNode[] =>
    menusData
      .filter((item) => item.name && !item.hideInMenu)
      .map((item) => this.getSubMenuOrItem(item, isChildren))
      .filter((item) => item);

  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = (
    item: MenuDataItem,
    isChildren: boolean,
  ): React.ReactNode => {
    if (
      Array.isArray(item.children) &&
      !item.hideChildrenInMenu &&
      item.children.some((child) => child && !!child.name && !child.hideInMenu)
    ) {
      const name = this.getIntlName(item);
      const { subMenuItemRender } = this.props;
      //  get defaultTitle by menuItemRender
      const defaultTitle = item.icon ? (
        <span>
          {!isChildren && getIcon(item.icon)}
          <span>{name}</span>
        </span>
      ) : (
        name
      );

      // subMenu only title render
      const title = subMenuItemRender
        ? subMenuItemRender({ ...item, isUrl: false }, defaultTitle)
        : defaultTitle;

      return (
        <SubMenu
          title={title}
          key={item.key || item.path}
          onTitleClick={item.onTitleClick}
        >
          {this.getNavMenuItems(item.children, true)}
        </SubMenu>
      );
    }

    return (
      <Menu.Item key={item.key || item.path}>
        {this.getMenuItemPath(item, isChildren)}
      </Menu.Item>
    );
  };

  getIntlName = (item: MenuDataItem) => {
    const { name, locale } = item;
    const {
      menu = {
        locale: false,
      },
      formatMessage,
    } = this.props;
    if (locale && menu.locale !== false && formatMessage) {
      return formatMessage({
        id: locale,
        defaultMessage: name,
      });
    }
    return name;
  };

  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  getMenuItemPath = (item: MenuDataItem, isChildren: boolean) => {
    const itemPath = this.conversionPath(item.path || '/');
    const {
      location = { pathname: '/' },
      isMobile,
      onCollapse,
      menuItemRender,
    } = this.props;
    const { target } = item;
    // if local is true formatMessage all name。
    const name = this.getIntlName(item);
    const icon = isChildren ? null : getIcon(item.icon);
    let defaultItem = (
      <>
        {icon}
        <span className="antd-menu-item-title">{name}</span>
      </>
    );
    const isHttpUrl = isUrl(itemPath);

    // Is it a http link
    if (isHttpUrl) {
      defaultItem = (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      );
    }

    if (menuItemRender) {
      return menuItemRender(
        {
          ...item,
          isUrl: isHttpUrl,
          itemPath,
          isMobile,
          replace: itemPath === location.pathname,
          onClick: () => onCollapse && onCollapse(true),
        },
        defaultItem,
      );
    }
    return defaultItem;
  };

  conversionPath = (path: string) => {
    if (path && path.indexOf('http') === 0) {
      return path;
    }
    return `/${path || ''}`.replace(/\/+/g, '/');
  };
}

/**
 * 生成openKeys 的对象，因为设置了openKeys 就会变成受控，所以需要一个空对象
 * @param BaseMenuProps
 */
const getOpenKeysProps = (
  openKeys: string[] | false = [],
  { layout, collapsed }: BaseMenuProps,
): {
  openKeys?: undefined | string[];
} => {
  let openKeysProps = {};
  if (openKeys && !collapsed && ['side', 'mix'].includes(layout || 'mix')) {
    openKeysProps = {
      openKeys,
    };
  }
  return openKeysProps;
};

const BaseMenu: React.FC<BaseMenuProps> = (props) => {
  const {
    theme,
    mode,
    location = {
      pathname: '/',
    },
    className,
    handleOpenChange,
    style,
    menuData,
    menu = { locale: true },
    iconfontUrl,
    splitMenus,
    selectedKeys: propsSelectedKeys,
    onSelect,
    openKeys: propsOpenKeys,
  } = props;
  const openKeysRef = useRef<string[]>([]);
  // 用于减少 defaultOpenKeys 计算的组件
  const defaultOpenKeysRef = useRef<string[]>([]);
  const [postMenuData, setPostMenuData] = useState(() => menuData);

  const { pathname } = location;

  const { flatMenuKeys } = MenuCounter.useContainer();
  const [defaultOpenAll, setDefaultOpenAll] = useState(menu.defaultOpenAll);

  const [openKeys, setOpenKeys] = useMergeValue<
    WithFalse<string[] | undefined>
  >(
    () => {
      if (menu.defaultOpenAll) {
        return getOpenKeysFromMenuData(menuData) || [];
      }
      if (propsOpenKeys === false) {
        return false;
      }
      return [];
    },
    {
      value: propsOpenKeys === false ? undefined : propsOpenKeys,
      onChange: handleOpenChange as any,
    },
  );

  const [selectedKeys, setSelectedKeys] = useMergeValue<string[] | undefined>(
    [],
    {
      value: propsSelectedKeys,
      onChange: onSelect
        ? (keys) => {
            if (onSelect && keys) {
              onSelect(keys as any);
            }
          }
        : undefined,
    },
  );

  useEffect(() => {
    if (menu.defaultOpenAll || propsOpenKeys === false || flatMenuKeys.length) {
      return;
    }
    const keys = getSelectedMenuKeys(location.pathname || '/', menuData || []);
    if (keys) {
      openKeysRef.current = keys;
      setOpenKeys(keys);
      setSelectedKeys(keys);
    }
  }, [flatMenuKeys.join('-')]);

  useEffect(() => {
    // reset IconFont
    if (iconfontUrl) {
      IconFont = createFromIconfontCN({
        scriptUrl: iconfontUrl,
      });
    }
  }, [iconfontUrl]);

  useEffect(() => {
    // if pathname can't match, use the nearest parent's key
    const keys = getSelectedMenuKeys(location.pathname || '/', menuData || []);
    const animationFrameId = requestAnimationFrame(() => {
      if (keys.join('-') !== (selectedKeys || []).join('-')) {
        setSelectedKeys(keys);
      }
      if (
        !defaultOpenAll &&
        propsOpenKeys !== false &&
        keys.join('-') !== (openKeysRef.current || []).join('-')
      ) {
        setOpenKeys(keys);
        openKeysRef.current = keys;
      } else if (flatMenuKeys.length > 0) {
        setDefaultOpenAll(false);
      }
    });
    return () =>
      window.cancelAnimationFrame &&
      window.cancelAnimationFrame(animationFrameId);
  }, [pathname]);

  const openKeysProps = useMemo(() => getOpenKeysProps(openKeys, props), [
    openKeys,
    props.layout,
    props.collapsed,
  ]);
  const cls = classNames(className, {
    'top-nav-menu': mode === 'horizontal',
  });

  const [menuUtils] = useState(() => new MenuUtil(props));

  useEffect(() => {
    if (splitMenus && openKeys) {
      const key = [...openKeys].shift();
      if (key) {
        const postData =
          menuData?.find((item) => item.key === key)?.children || [];
        setPostMenuData(postData);
        return;
      }
    }
    if (!splitMenus) {
      setPostMenuData(menuData);
    }
  }, [(openKeys || []).join('-'), splitMenus]);

  // 这次 openKeys === false 的时候的情况，这种情况下帮用户选中一次
  // 第二次以后不再关系，所以用了 defaultOpenKeys
  if (props.openKeys === false && !props.handleOpenChange) {
    const keys = getSelectedMenuKeys(location.pathname || '/', menuData || []);
    defaultOpenKeysRef.current = keys;
    if (keys.length < 1) {
      return null;
    }
  }

  return (
    <Menu
      {...openKeysProps}
      key="Menu"
      mode={mode}
      defaultOpenKeys={defaultOpenKeysRef.current}
      theme={theme}
      inlineIndent={16}
      selectedKeys={selectedKeys}
      style={style}
      className={cls}
      onOpenChange={setOpenKeys}
      {...props.menuProps}
    >
      {menuUtils.getNavMenuItems(
        props.postMenuData ? props.postMenuData(postMenuData) : postMenuData,
        false,
      )}
    </Menu>
  );
};

BaseMenu.defaultProps = {
  postMenuData: (data) => data || [],
};

export default BaseMenu;
