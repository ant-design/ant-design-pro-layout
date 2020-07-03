import { PageHeader, Tabs } from 'antd';
import React, { useContext, ReactNode } from 'react';
import classNames from 'classnames';
import { TabsProps, TabPaneProps } from 'antd/es/tabs';
import { PageHeaderProps } from 'antd/es/page-header';
import './index.less';
import RouteContext, { RouteContextType } from '../RouteContext';
import GridContent from '../GridContent';
import FooterToolbar from '../FooterToolbar';

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
  footer?: ReactNode[];
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
        {tabList.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Tabs.TabPane {...item} tab={item.tab} key={item.key || index} />
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

const PageContainer: React.FC<PageContainerProps> = (props) => {
  const { children, style, footer, prefixCls = 'ant-pro' } = props;
  const value = useContext(RouteContext);

  const prefixedClassName = `${prefixCls}-page-container`;

  const className = classNames(prefixedClassName, props.className);

  return (
    <div style={style} className={className}>
      <div className={`${prefixedClassName}-warp`}>
        {defaultPageHeaderRender(props, {
          ...value,
          prefixCls: undefined,
          prefixedClassName,
        })}
      </div>
      <GridContent>
        {children ? (
          <div>
            <div className={`${prefixedClassName}-children-content`}>
              {children}
            </div>
            {footer && (
              <div
                style={{
                  height: 48,
                  marginTop: 24,
                }}
              />
            )}
          </div>
        ) : null}
      </GridContent>
      {footer && <FooterToolbar>{footer}</FooterToolbar>}
    </div>
  );
};

export default PageContainer;
