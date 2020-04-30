import { PageHeader, Tabs } from 'antd';
import React, { useContext } from 'react';
import classNames from 'classnames';
import { TabsProps, TabPaneProps } from 'antd/es/tabs';
import { PageHeaderProps } from 'antd/es/page-header';
import './index.less';
import GridContent from '../GridContent';
import RouteContext, { RouteContextType } from '../RouteContext';

export interface PageHeaderTabConfig {
  tabList?: TabPaneProps[];
  tabActiveKey?: TabsProps['activeKey'];
  onTabChange?: TabsProps['onChange'];
  tabBarExtraContent?: TabsProps['tabBarExtraContent'];
  tabProps?: TabsProps;
}

export interface PageContainerProps
  extends PageHeaderTabConfig,
    Omit<PageHeaderProps, 'title'> {
  title?: React.ReactNode | false;
  content?: React.ReactNode;
  extraContent?: React.ReactNode;
  prefixCls?: string;
  pageHeaderRender?: (props: PageContainerProps) => React.ReactNode;
}

/**
 * render Footer tabList
 * In order to be compatible with the old version of the PageHeader
 * basically all the functions are implemented.
 */
const renderFooter: React.SFC<Omit<
  PageContainerProps & {
    prefixedClassName: string;
  },
  'title'
>> = ({
  tabList,
  tabActiveKey,
  onTabChange,
  tabBarExtraContent,
  tabProps,
  prefixedClassName,
}) => {
  if (tabList && tabList.length) {
    return (
      <Tabs
        className={`${prefixedClassName}-tabs`}
        activeKey={tabActiveKey}
        onChange={(key) => {
          if (onTabChange) {
            onTabChange(key);
          }
        }}
        tabBarExtraContent={tabBarExtraContent}
        {...tabProps}
      >
        {tabList.map((item) => (
          <Tabs.TabPane {...item} tab={item.tab} key={item.key} />
        ))}
      </Tabs>
    );
  }
  return null;
};

const renderPageHeader = (
  content: React.ReactNode,
  extraContent: React.ReactNode,
  prefixedClassName: string,
): React.ReactNode => {
  if (!content && !extraContent) {
    return null;
  }
  return (
    <div className={`${prefixedClassName}-detail`}>
      <div className={`${prefixedClassName}-main`}>
        <div className={`${prefixedClassName}-row`}>
          {content && (
            <div className={`${prefixedClassName}-content`}>{content}</div>
          )}
          {extraContent && (
            <div className={`${prefixedClassName}-extraContent`}>
              {extraContent}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const defaultPageHeaderRender = (
  props: PageContainerProps,
  value: RouteContextType & { prefixedClassName: string },
): React.ReactNode => {
  const {
    title,
    content,
    pageHeaderRender,
    extraContent,
    style,
    prefixCls,
    ...restProps
  } = props;

  if (pageHeaderRender) {
    return pageHeaderRender({ ...props, ...value });
  }
  let pageHeaderTitle = title;
  if (!title && title !== false) {
    pageHeaderTitle = value.title;
  }
  console.log(value);
  return (
    <PageHeader
      {...value}
      title={pageHeaderTitle}
      {...restProps}
      footer={renderFooter({
        ...restProps,
        prefixedClassName: value.prefixedClassName,
      })}
      prefixCls={prefixCls}
    >
      {renderPageHeader(content, extraContent, value.prefixedClassName)}
    </PageHeader>
  );
};

const PageContainer: React.SFC<PageContainerProps> = (props) => {
  const { children, style, prefixCls = 'ant-pro' } = props;
  const value = useContext(RouteContext);

  const prefixedClassName = `${prefixCls}-page-container`;

  const className = classNames(prefixedClassName, props.className);

  return (
    <div style={style} className={className}>
      <div className={`${prefixedClassName}-warp`}>
        <GridContent>
          {defaultPageHeaderRender(props, {
            ...value,
            prefixCls: undefined,
            prefixedClassName,
          })}
        </GridContent>
      </div>
      {children ? (
        <GridContent>
          <div className={`${prefixedClassName}-children-content`}>
            {children}
          </div>
        </GridContent>
      ) : null}
    </div>
  );
};

export default PageContainer;
