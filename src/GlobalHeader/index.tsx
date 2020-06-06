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
import { ProSettings } from '../defaultSettings';

export interface GlobalHeaderProps extends Partial<ProSettings> {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  isMobile?: boolean;
  logo?: React.ReactNode;
  menuRender?: HeaderViewProps['menuRender'];
  rightContentRender?: HeaderViewProps['rightContentRender'];
  className?: string;
  prefixCls?: string;
  style?: React.CSSProperties;
  menuHeaderRender?: SiderMenuProps['menuHeaderRender'];
  collapsedButtonRender?: SiderMenuProps['collapsedButtonRender'];
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
      prefixCls,
    } = this.props;
    const baseClassName = `${prefixCls}-global-header`;
    const className = classNames(propClassName, baseClassName, {
      [`${baseClassName}-layout-${layout}`]: layout,
    });

    const logoDom = (
      <span className={`${baseClassName}-logo`} key="logo">
        <a>{defaultRenderLogo(logo)}</a>
      </span>
    );
    return (
      <div className={className} style={style}>
        {isMobile && renderLogo(menuHeaderRender, logoDom)}
        {layout === 'mix' && isMobile && collapsedButtonRender && (
          <a
            className={`${baseClassName}-collapsed-button`}
            onClick={() => {
              if (onCollapse) {
                onCollapse(!collapsed);
              }
            }}
          >
            {collapsedButtonRender(collapsed)}
          </a>
        )}
        {layout === 'mix' && !isMobile && (
          <div className={`${baseClassName}-logo`}>
            {defaultRenderLogoAndTitle(
              { ...this.props, collapsed: false },
              'headerTitleRender',
            )}
          </div>
        )}
        <div style={{ flex: 1 }}>{children}</div>
        {rightContentRender && rightContentRender(this.props)}
      </div>
    );
  }
}
