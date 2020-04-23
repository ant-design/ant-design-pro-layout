import './Header.less';

import React, { Component } from 'react';
import classNames from 'classnames';
import { Layout } from 'antd';

import { BasicLayoutProps } from './BasicLayout';
import GlobalHeader, { GlobalHeaderProps } from './GlobalHeader';
import { ProSettings } from './defaultSettings';
import TopNavHeader from './TopNavHeader';
import { WithFalse } from './typings';

const { Header } = Layout;

export interface HeaderViewProps
  extends Partial<ProSettings>,
    GlobalHeaderProps {
  isMobile?: boolean;
  collapsed?: boolean;
  logo?: React.ReactNode;
  menuRender?: BasicLayoutProps['menuRender'];
  headerRender?: BasicLayoutProps['headerRender'];
  headerTitleRender?: BasicLayoutProps['headerTitleRender'];
  headerContentRender?: BasicLayoutProps['headerContentRender'];
  rightContentRender?: WithFalse<(props: HeaderViewProps) => React.ReactNode>;
  siderWidth?: number;
  hasSiderMenu?: boolean;
}

interface HeaderViewState {
  visible: boolean;
}

class HeaderView extends Component<HeaderViewProps, HeaderViewState> {
  renderContent = () => {
    const {
      isMobile,
      onCollapse,
      navTheme,
      layout,
      headerRender,
      headerContentRender,
    } = this.props;
    const isTop = layout === 'top';
    let defaultDom = (
      <GlobalHeader onCollapse={onCollapse} {...this.props}>
        {headerContentRender && headerContentRender(this.props)}
      </GlobalHeader>
    );
    if (isTop && !isMobile) {
      defaultDom = (
        <TopNavHeader
          theme={navTheme as 'light' | 'dark'}
          mode="horizontal"
          onCollapse={onCollapse}
          {...this.props}
        />
      );
    }
    if (headerRender) {
      return headerRender(this.props, defaultDom);
    }
    return defaultDom;
  };

  render(): React.ReactNode {
    const {
      fixedHeader,
      layout,
      className: propsClassName,
      style,
      collapsed,
      siderWidth = 208,
      hasSiderMenu,
      headerRender,
      isMobile,
    } = this.props;
    const needFixedHeader = fixedHeader || layout === 'mix';
    const isTop = layout === 'top';

    const needSettingWidth =
      needFixedHeader && hasSiderMenu && !isTop && !isMobile;

    const className = classNames(propsClassName, {
      'ant-pro-fixed-header': needFixedHeader,
      'ant-pro-top-menu': isTop,
    });

    if (headerRender === false) {
      return null;
    }
    return (
      <>
        {needFixedHeader && (
          <Header
            style={{
              height: 48,
            }}
          />
        )}
        <Header
          style={{
            padding: 0,
            height: 48,
            width:
              layout !== 'mix' && needSettingWidth
                ? `calc(100% - ${collapsed ? 40 : siderWidth}px)`
                : '100%',
            zIndex: layout === 'mix' ? 100 : 9,
            right: needFixedHeader ? 0 : undefined,
            ...style,
          }}
          className={className}
        >
          {this.renderContent()}
        </Header>
      </>
    );
  }
}

export default HeaderView;
