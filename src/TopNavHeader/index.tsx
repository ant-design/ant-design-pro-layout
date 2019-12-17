import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';

import {
  SiderMenuProps,
  defaultRenderLogoAndTitle,
} from '../SiderMenu/SiderMenu';
import './index.less';

import BaseMenu from '../SiderMenu/BaseMenu';
import { HeaderViewProps } from '../Header';

export interface TopNavHeaderProps extends SiderMenuProps {
  logo?: React.ReactNode;
  onCollapse?: (collapse: boolean) => void;
  rightContentRender?: HeaderViewProps['rightContentRender'];
}

const TopNavHeader: React.FC<TopNavHeaderProps> = props => {
  const ref = useRef(null);
  const {
    theme,
    onMenuHeaderClick,
    contentWidth,
    rightContentRender,
    logo,
    title,
    menuHeaderRender,
    className: propsClassName,
    style,
  } = props;
  const baseClassName = 'ant-pro-top-nav-header';
  const headerDom = defaultRenderLogoAndTitle(logo, title, menuHeaderRender);

  const className = classNames(baseClassName, propsClassName, {
    light: theme === 'light',
  });
  const [rightSize, setRightSize] = useState<number | string>(0);
  return (
    <div className={className} style={style}>
      <div
        ref={ref}
        className={`${baseClassName}-main ${
          contentWidth === 'Fixed' ? 'wide' : ''
        }`}
      >
        {headerDom && (
          <div className={`${baseClassName}-left`} onClick={onMenuHeaderClick}>
            <div className={`${baseClassName}-logo`} key="logo" id="logo">
              {headerDom}
            </div>
          </div>
        )}
        <div
          style={{ flex: 1, overflow: 'hidden' }}
          className={`${baseClassName}-menu`}
        >
          <BaseMenu {...props} {...props.menuProps} />
        </div>
        <ResizeObserver
          onResize={({ width }) => {
            setRightSize(width);
          }}
        >
          <div
            style={{
              width: rightSize,
            }}
          >
            {rightContentRender &&
              rightContentRender({
                ...props,
              })}
          </div>
        </ResizeObserver>
      </div>
    </div>
  );
};

export default TopNavHeader;
