import { PageHeader, Tabs } from 'antd';
import React from 'react';
import { Helmet } from 'react-helmet';
import { TabsProps, TabPaneProps } from 'antd/es/tabs';
import { PageHeaderProps } from 'antd/es/page-header';
import './index.less';
import GridContent from '../GridContent';
import RouteContext from '../RouteContext';

interface PageHeaderTabConfig {
  tabList?: TabPaneProps[];
  tabActiveKey?: TabsProps['activeKey'];
  onTabChange?: TabsProps['onChange'];
  tabBarExtraContent?: TabsProps['tabBarExtraContent'];
}

interface PageHeaderWrapperProps
  extends PageHeaderTabConfig,
    Omit<PageHeaderProps, 'title'> {
  title?: React.ReactNode | false;
  content?: React.ReactNode;
  extraContent?: React.ReactNode;
  pageHeaderRender?: (props: PageHeaderWrapperProps) => React.ReactNode;
}

const prefixedClassName = 'ant-pro-page-header-wrap';

/**
 * render Footer tabList
 * In order to be compatible with the old version of the PageHeader
 * basically all the functions are implemented.
 */
const renderFooter: React.SFC<Omit<PageHeaderWrapperProps, 'title'>> = ({
  tabList,
  tabActiveKey,
  onTabChange,
  tabBarExtraContent,
}) => {
  if (tabList && tabList.length) {
    return (
      <Tabs
        className={`${prefixedClassName}-tabs`}
        activeKey={tabActiveKey}
        onChange={key => {
          if (onTabChange) {
            onTabChange(key);
          }
        }}
        tabBarExtraContent={tabBarExtraContent}
      >
        {tabList.map(item => (
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
  props: PageHeaderWrapperProps,
): React.ReactNode => {
  const {
    title,
    content,
    pageHeaderRender,
    extraContent,
    ...restProps
  } = props;

  return (
    <RouteContext.Consumer>
      {value => {
        if (pageHeaderRender) {
          return pageHeaderRender({ ...props, ...value });
        }
        let pageHeaderTitle = title;
        if (!title && title !== false) {
          pageHeaderTitle = value.title;
        }
        return (
          <>
            <Helmet>
              <meta name="description" content={value.title} />
              {typeof props.content === 'string' && (
                <meta name="description" content={props.content} />
              )}
            </Helmet>
            <PageHeader
              {...value}
              title={pageHeaderTitle}
              {...restProps}
              footer={renderFooter(restProps)}
            >
              {renderPageHeader(content, extraContent)}
            </PageHeader>
          </>
        );
      }}
    </RouteContext.Consumer>
  );
};

const PageHeaderWrapper: React.SFC<PageHeaderWrapperProps> = props => {
  const { children } = props;
  return (
    <div style={{ margin: '-24px -24px 0' }}>
      <div className={`${prefixedClassName}-page-header-warp`}>
        <GridContent>{defaultPageHeaderRender(props)}</GridContent>
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

export default PageHeaderWrapper;
