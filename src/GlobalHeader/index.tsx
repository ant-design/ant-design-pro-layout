import './index.less';

import React, { Component } from 'react';
import classNames from 'classnames';
import { HeaderViewProps } from '../Header';
import {
  defaultRenderLogo,
  SiderMenuProps,
  defaultRenderLogoAndTitle,
  defaultRenderCollapsedButton,
} from '../SiderMenu/SiderMenu';
import { isBrowser } from '../utils/utils';
import { PureSettings } from '../defaultSettings';
import TopNavHeader from '../TopNavHeader';
import { MenuDataItem } from '../index';
import { WithFalse } from '../typings';

export interface GlobalHeaderProps extends Partial<PureSettings> {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  isMobile?: boolean;
  logo?: React.ReactNode;
  menuRender?: WithFalse<
    (props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode
  >;
  rightContentRender?: WithFalse<(props: HeaderViewProps) => React.ReactNode>;
  className?: string;
  prefixCls?: string;
  menuData?: MenuDataItem[];
  style?: React.CSSProperties;
  menuHeaderRender?: SiderMenuProps['menuHeaderRender'];
  collapsedButtonRender?: SiderMenuProps['collapsedButtonRender'];
  splitMenus?: boolean;
}

const renderLogo = (
  menuHeaderRender: SiderMenuProps['menuHeaderRender'],
  logoDom: React.ReactNode,
) => {
  if (menuHeaderRender === false) {
    return null;
  }
  if (menuHeaderRender) {
    return menuHeaderRender(logoDom, null);
  }
  return logoDom;
};

export default class GlobalHeader extends Component<GlobalHeaderProps> {
  triggerResizeEvent = () => {
    if (isBrowser()) {
      const event = document.createEvent('HTMLEvents');
      event.initEvent('resize', true, false);
      window.dispatchEvent(event);
    }
  };

  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    if (onCollapse) onCollapse(!collapsed);
    this.triggerResizeEvent();
  };

  render(): React.ReactNode {
    const {
      isMobile,
      logo,
      collapsed,
      onCollapse,
      collapsedButtonRender = defaultRenderCollapsedButton,
      rightContentRender,
      menuHeaderRender,
      className: propClassName,
      style,
      layout,
      children,
      splitMenus,
      menuData,
      prefixCls,
      headerStyle
    } = this.props;
    const baseClassName = `${prefixCls}-global-header`;
    const className = classNames(propClassName, baseClassName, {
      [`${baseClassName}-layout-${layout}`]: layout,
    });

    if (layout === 'mix' && !isMobile && splitMenus) {
      const noChildrenMenuData = (menuData || []).map((item) => ({
        ...item,
        children: undefined,
      }));
      return (
        <TopNavHeader
          mode="horizontal"
          {...this.props}
          splitMenus={false}
          menuData={noChildrenMenuData}
          navTheme="dark"
          theme="dark"
        />
      );
    }

    const logoDom = (
      <span className={`${baseClassName}-logo`} key="logo">
        <a>{defaultRenderLogo(logo)}</a>
      </span>
    );

    return (
      <div className={className} style={{ ...style, background: headerStyle?.background}}>
        {isMobile && renderLogo(menuHeaderRender, logoDom)}
        {isMobile && collapsedButtonRender && (
          <span
            className={`${baseClassName}-collapsed-button`}
            onClick={() => {
              if (onCollapse) {
                onCollapse(!collapsed);
              }
            }}
          >
            {collapsedButtonRender(collapsed)}
          </span>
        )}
        {layout === 'mix' && !isMobile && (
          <>
            <div className={`${baseClassName}-logo`}>
              {defaultRenderLogoAndTitle(
                { ...this.props, collapsed: false },
                'headerTitleRender',
              )}
            </div>
          </>
        )}
        <div style={{ flex: 1 }}>{children}</div>
        {rightContentRender && rightContentRender(this.props)}
      </div>
    );
  }
}
