import './Header.less';

import React, { Component } from 'react';

import { Layout } from 'antd';
import { MenuProps } from 'antd/lib/menu';
import { BasicLayoutProps } from './BasicLayout';
import GlobalHeader, { GlobalHeaderProps } from './GlobalHeader';
import { Settings } from './defaultSettings';
import TopNavHeader from './TopNavHeader';
import { WithFalse, MenuDataItem } from './typings';

const { Header } = Layout;

export interface HeaderViewProps extends Partial<Settings>, GlobalHeaderProps {
  isMobile?: boolean;
  collapsed?: boolean;
  logo?: React.ReactNode;
  autoHideHeader?: boolean;
  menuRender?: BasicLayoutProps['menuRender'];
  headerRender?: BasicLayoutProps['headerRender'];
  rightContentRender?: WithFalse<(props: HeaderViewProps) => React.ReactNode>;
  siderWidth?: number;
  headerMenuData?: MenuDataItem[];
  /**
   * 要给头部菜单的props, 参考antd-menu的属性。https://ant.design/components/menu-cn/
   */
  headerMenuProps?: MenuProps;
}

interface HeaderViewState {
  visible: boolean;
}

class HeaderView extends Component<HeaderViewProps, HeaderViewState> {
  static getDerivedStateFromProps(
    props: HeaderViewProps,
    state: HeaderViewState,
  ): HeaderViewState | null {
    if (!props.autoHideHeader && !state.visible) {
      return {
        visible: true,
      };
    }
    return null;
  }

  state = {
    visible: true,
  };

  ticking: boolean = false;

  oldScrollTop: number = 0;

  componentDidMount(): void {
    document.addEventListener('scroll', this.handScroll, { passive: true });
  }

  componentWillUnmount(): void {
    document.removeEventListener('scroll', this.handScroll);
  }

  getHeadWidth = () => {
    const {
      isMobile,
      collapsed,
      fixedHeader,
      layout,
      siderWidth = 256,
    } = this.props;
    if (isMobile || !fixedHeader || layout !== 'sidemenu') {
      return '100%';
    }
    return collapsed ? 'calc(100% - 80px)' : `calc(100% - ${siderWidth}px)`;
  };

  handScroll = () => {
    const { autoHideHeader } = this.props;
    const { visible } = this.state;
    if (!autoHideHeader) {
      return;
    }
    const scrollTop =
      document.body.scrollTop + document.documentElement.scrollTop;
    if (!this.ticking) {
      this.ticking = true;
      requestAnimationFrame(() => {
        if (this.oldScrollTop > scrollTop) {
          this.setState({
            visible: true,
          });
        } else if (scrollTop > 300 && visible) {
          this.setState({
            visible: false,
          });
        } else if (scrollTop < 300 && !visible) {
          this.setState({
            visible: true,
          });
        }
        this.oldScrollTop = scrollTop;
        this.ticking = false;
      });
    }
  };

  renderContent = () => {
    const { isMobile, onCollapse, navTheme, layout, headerRender } = this.props;
    const isSide = layout === 'sidemenu';
    let defaultDom = <GlobalHeader onCollapse={onCollapse} {...this.props} />;
    if (!isSide && !isMobile) {
      defaultDom = (
        <TopNavHeader
          theme={navTheme}
          mode="horizontal"
          onCollapse={onCollapse}
          {...this.props}
        />
      );
    }
    if (headerRender) {
      return headerRender(this.props);
    }
    return defaultDom;
  };

  render(): React.ReactNode {
    const { fixedHeader, layout } = this.props;
    const { visible } = this.state;
    const width = this.getHeadWidth();
    const isBoth = layout === 'bothmenu';
    return visible ? (
      <Header
        style={{ padding: 0, width, zIndex: isBoth ? 11 : 2 }}
        className={fixedHeader ? 'ant-pro-fixed-header' : ''}
      >
        {this.renderContent()}
      </Header>
    ) : null;
  }
}

export default HeaderView;
