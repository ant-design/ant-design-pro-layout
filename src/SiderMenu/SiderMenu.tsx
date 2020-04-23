import React, { CSSProperties } from 'react';
import { Layout, Menu } from 'antd';
import classNames from 'classnames';
import { SiderProps } from 'antd/es/layout/Sider';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import './index.less';
import { WithFalse } from '../typings';
import BaseMenu, { BaseMenuProps } from './BaseMenu';
import MenuCounter from './Counter';

const { Sider } = Layout;

export const defaultRenderLogo = (logo: React.ReactNode): React.ReactNode => {
  if (typeof logo === 'string') {
    return <img src={logo} alt="logo" />;
  }
  if (typeof logo === 'function') {
    return logo();
  }
  return logo;
};

export const defaultRenderLogoAndTitle = (
  props: SiderMenuProps,
  renderKey: string = 'menuHeaderRender',
): React.ReactNode => {
  const {
    logo = 'https://gw.alipayobjects.com/zos/antfincdn/PmY%24TNNDBI/logo.svg',
    title,
  } = props;
  const renderFunction = props[renderKey || ''];
  if (renderFunction === false) {
    return null;
  }
  const logoDom = defaultRenderLogo(logo);
  const titleDom = <h1>{title}</h1>;

  if (renderFunction) {
    // when collapsed, no render title
    return renderFunction(logoDom, props.collapsed ? null : titleDom, props);
  }
  return (
    <a href="/">
      {logoDom}
      {props.collapsed ? null : titleDom}
    </a>
  );
};

export interface SiderMenuProps
  extends Pick<BaseMenuProps, Exclude<keyof BaseMenuProps, ['onCollapse']>> {
  logo?: React.ReactNode;
  siderWidth?: number;
  menuHeaderRender?: WithFalse<
    (
      logo: React.ReactNode,
      title: React.ReactNode,
      props?: SiderMenuProps,
    ) => React.ReactNode
  >;
  menuExtraRender?: WithFalse<(props: SiderMenuProps) => React.ReactNode>;
  collapsedButtonRender?: WithFalse<(collapsed?: boolean) => React.ReactNode>;
  breakpoint?: SiderProps['breakpoint'] | false;
  onMenuHeaderClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  hide?: boolean;
  className?: string;
  style?: CSSProperties;
  links?: React.ReactNode[];
  onOpenChange?: (openKeys: WithFalse<string[]>) => void;
}

const defaultRenderCollapsedButton = (collapsed?: boolean) =>
  collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />;

const SiderMenu: React.FC<SiderMenuProps> = props => {
  const {
    collapsed,
    fixSiderbar,
    onCollapse,
    theme,
    siderWidth = 208,
    isMobile,
    onMenuHeaderClick,
    breakpoint = 'lg',
    style,
    layout,
    menuExtraRender = false,
    collapsedButtonRender = defaultRenderCollapsedButton,
    links,
    prefixCls = 'ant-pro',
    onOpenChange,
  } = props;
  const baseClassName = `${prefixCls}-sider`;
  const { flatMenus } = MenuCounter.useContainer();
  const siderClassName = classNames(`${baseClassName}`, {
    [`${baseClassName}-fixed`]: fixSiderbar,
    [`${baseClassName}-layout-${layout}`]: layout,
    [`${baseClassName}-light`]: theme === 'light',
  });
  const headerDom = defaultRenderLogoAndTitle(props);
  const extraDom = menuExtraRender && menuExtraRender(props);
  return (
    <Sider
      collapsible
      trigger={null}
      collapsed={collapsed}
      breakpoint={breakpoint === false ? undefined : breakpoint}
      onCollapse={collapse => {
        if (!isMobile) {
          if (onCollapse) {
            onCollapse(collapse);
          }
        }
      }}
      collapsedWidth={40}
      style={{
        ...style,
      }}
      width={siderWidth}
      theme={theme}
      className={siderClassName}
    >
      {headerDom && (
        <div
          className={`${baseClassName}-logo`}
          onClick={onMenuHeaderClick}
          id="logo"
        >
          {headerDom}
        </div>
      )}
      {extraDom && <div className={`${baseClassName}-extra`}>{extraDom}</div>}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {flatMenus && (
          <BaseMenu
            {...props}
            mode="inline"
            handleOpenChange={onOpenChange}
            style={{
              width: '100%',
            }}
          />
        )}
      </div>
      {links && links.length > 0 && (
        <div className={`${baseClassName}-links`}>
          <Menu
            theme={theme}
            className={`${baseClassName}-link-menu`}
            selectedKeys={[]}
            openKeys={[]}
            mode="inline"
          >
            {(links || []).map((node, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Menu.Item key={index}>{node}</Menu.Item>
            ))}
            <Menu.Item
              className={`${baseClassName}-collapsed-button`}
              onClick={() => {
                if (onCollapse) {
                  onCollapse(!collapsed);
                }
              }}
            >
              {collapsedButtonRender && collapsedButtonRender(collapsed)}
            </Menu.Item>
          </Menu>
        </div>
      )}
    </Sider>
  );
};

export default SiderMenu;
