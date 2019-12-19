/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */

import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
  SettingDrawer,
  DefaultFooter,
} from '../../../src/';
import React, { useState } from 'react';
import { Icon } from 'antd';

import Link from 'umi/link';
import history from 'umi/router';
import RightContent from '@/components/GlobalHeader/RightContent';
import logo from '../assets/logo.svg';

export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
}
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const [collapsed, handleMenuCollapse] = useState<boolean>(false);
  const [settings, setSettings] = useState<Partial<Settings>>({
    fixSiderbar: true,
    fixedHeader: true,
    navTheme: 'light',
  });
  return (
    <>
      <ProLayout
        layout="topmenu"
        className="chenshuai2144"
        disableMobile
        fixSiderbar
        rightContentRender={rightProps => (
          <RightContent {...rightProps} {...settings} />
        )}
        pageTitleRender={(props, pageName, info) => {
          if (info) {
            return info.pageName;
          }
          return pageName || 'ant';
        }}
        collapsed={collapsed}
        disableContentMargin
        {...props}
      >
        <ProLayout
          menuHeaderRender={false}
          logo={logo}
          siderWidth={200}
          breakpoint={false}
          links={[
            <>
              <Icon type="heart" theme="twoTone" twoToneColor="red" />
              <span>name</span>
            </>,
          ]}
          onCollapse={handleMenuCollapse}
          menuItemRender={(menuItemProps, defaultDom) =>
            menuItemProps.isUrl ? (
              defaultDom
            ) : (
              <Link className="qixian-menuItem" to={menuItemProps.path}>
                {defaultDom}
              </Link>
            )
          }
          onMenuHeaderClick={() => history.push('/')}
          footerRender={() => <DefaultFooter />}
          {...props}
          {...settings}
        >
          {props.children}
        </ProLayout>
        <SettingDrawer
          // settings={settings}
          onSettingChange={config => setSettings(config)}
        />
      </ProLayout>
    </>
  );
};

export default BasicLayout;
