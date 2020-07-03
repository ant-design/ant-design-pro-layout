import React, { useContext, useMemo } from 'react';
import { RouteContext } from '@ant-design/pro-layout';
import classNames from 'classnames';
import './index.less';
import { Space } from 'antd';

export interface FooterToolbarProps {
  extra?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  prefixCls?: string;
}
const FooterToolbar: React.FC<FooterToolbarProps> = (props) => {
  const {
    children,
    prefixCls = 'ant-pro',
    className,
    extra,
    ...restProps
  } = props;

  const baseClassName = `${prefixCls}-global-footer-bar`;
  const value = useContext(RouteContext);
  const width = useMemo(() => {
    const { hasSiderMenu, isMobile, siderWidth } = value;
    if (!hasSiderMenu) {
      return undefined;
    }
    return isMobile ? undefined : `calc(100% - ${siderWidth}px)`;
  }, [value.collapsed, value.hasSiderMenu, value.isMobile, value.siderWidth]);
  return (
    <div
      className={classNames(className, `${baseClassName}`)}
      style={{ width }}
      {...restProps}
    >
      <div className={`${baseClassName}-left`}>{extra}</div>
      <div className={`${baseClassName}-right`}>
        <Space>{children}</Space>
      </div>
    </div>
  );
};

export default FooterToolbar;
