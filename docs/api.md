---
title: Layout Render API
order: 9
side: false
nav:
  title: API
  order: 1
---

# Layout API

ProLayout 提供了丰富的 API 来自定义各种行为，我们可以在下面的 demo 中做一个简单地了解。

## Demo

<code src="./demo/api.tsx" />

## API

> 所有以 `Render` 后缀的方法都可以通过传入 `false` 来使其不渲染。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| pure | 是否删除掉所有的自带界面 | boolean | - |
| title | layout 的 左上角 的 title | ReactNode | `'Ant Design Pro'` |
| logo | layout 的 左上角 logo 的 url | ReactNode \| ()=>ReactNode | - |
| loading | layout 的加载态 | boolean | - |
| menuHeaderRender | 渲染 logo 和 title | ReactNode \| (logo,title)=>ReactNode | - |
| onMenuHeaderClick | menu 菜单的头部点击事件 | `(e: React.MouseEvent<HTMLDivElement>) => void` | - |
| contentStyle | layout 的 内容区 style | CSSProperties | - |
| layout | layout 的菜单模式,side：右侧导航，top：顶部导航 mix：混合模式 | 'side' \| 'top' \| 'mix' | `'side'` |
| splitMenus | 是否自动切分 menuData，只有 mix 模式会生效 | boolean | false |
| contentWidth | layout 的内容模式,Fluid：定宽 1200px，Fixed：自适应 | 'Fluid' \| 'Fixed' | `'Fluid'` |
| navTheme | 导航的主题 | 'light' \| 'dark' | `'dark'` |
| fixedHeader | 是否固定 header 到顶部 | boolean | `false` |
| fixSiderbar | 是否固定导航 | boolean | `false` |
| breakpoint | 触发响应式布局的[断点](https://ant.design/components/grid-cn/#Col) | `Enum { 'xs', 'sm', 'md', 'lg', 'xl', 'xxl' }` | `lg` |
| menu | 关于 menu 的配置，暂时只有 locale,locale 可以关闭 menu 的自带的全球化 | { locale: boolean, defaultOpenAll: boolean } | `{ locale: true }` |
| iconfontUrl | 使用 [IconFont](https://ant.design/components/icon-cn/#components-icon-demo-iconfont) 的图标配置 | string | - |
| locale | 当前 layout 的语言设置 | 'zh-CN' \| 'zh-TW' \| 'en-US' | navigator.language |
| settings | layout 的设置 | [`Settings`](#Settings) | [`Settings`](#Settings) | - |
| siderWidth | 侧边菜单宽度 | number | 256 |
| collapsed | 控制菜单的收起和展开 | boolean | true |
| onCollapse | 菜单的折叠收起事件 | (collapsed: boolean) => void | - |
| headerRender | 自定义头的 render 方法 | (props: BasicLayoutProps) => ReactNode | - |
| itemRender | 自定义面包屑的子节点,默认使用了 a 节点 | `(route: Route, params: any, routes: Array<Route>, paths: Array<string>) => React.ReactNode` | - |
| rightContentRender | 自定义头右部的 render 方法 | (props: HeaderViewProps) => ReactNode | - |
| collapsedButtonRender | 自定义 collapsed button 的方法 | (collapsed: boolean) => ReactNode | - |
| footerRender | 自定义页脚的 render 方法 | (props: BasicLayoutProps) => ReactNode | - |
| pageTitleRender | 自定义页面标题的显示方法 | (props: BasicLayoutProps) => ReactNode | - |
| menuRender | 自定义菜单的 render 方法 | (props: HeaderViewProps) => ReactNode | - |
| menuContentRender | 菜单内容的 render 方法 | (props: HeaderViewProps) => ReactNode | - |
| menuItemRender | 自定义菜单项的 render 方法 | [(itemProps: MenuDataItem) => ReactNode](#MenuDataItem) | - |  | subMenuItemRender | 自定义拥有子菜单菜单项的 render 方法 | [(itemProps: MenuDataItem) => ReactNode](#MenuDataItem) | - |  | menuDataRender | menuData 的 render 方法，用来自定义 menuData | `(menuData: MenuDataItem[]) => MenuDataItem[]` | - |  | breadcrumbRender | 自定义面包屑的数据 | (route)=>route | - |  | route | 用于生成菜单和面包屑。umi 的 Layout 会自动带有 | [route](#Route) | - |  | disableMobile | 禁止自动切换到移动页面 | boolean | false |  | links | 显示在菜单右下角的快捷操作 | ReactNode[] | - |  | menuProps | 传递到 antd menu 组件的 props, 参考 (https://ant.design/components/menu-cn/) | MenuProps | undefined |

在 4.5.13 以后 Layout 通过 `menuProps` 支持 [Menu](https://ant.design/components/menu-cn/#Menu) 的大部分 props。

### SettingDrawer

> SettingDrawer 提供了一个图形界面来设置 layout 的配置。不建议在正式环境中使用。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| settings | layout 的设置 | [`Settings`](#Settings) | [`Settings`](#Settings) | - |
| onSettingChange | [`Settings`](#Settings) 发生更改事件 | (settings: [`Settings`](#Settings) ) => void | - |
| hideHintAlert | 删除下方的提示信息 | boolean | - |
| hideLoading | 删除主题切换时的 message 提示 | boolean | - |
| hideCopyButton | 删除下方的拷贝设置按钮 | boolean | - |

### PageContainer

PageContainer 封装了 ant design 的 PageHeader 组件，增加了 tabList 和 content。 根据当前的路由填入 title 和 breadcrumb。它依赖 Layout 的 route 属性。当然你可以传入参数来复写默认值。 PageContainer 支持 [Tabs](https://ant.design/components/tabs-cn/) 和 [PageHeader](https://ant.design/components/page-header-cn/) 的所有属性。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 内容区 | ReactNode | - |
| extraContent | 额外内容区，位于 content 的右侧 | ReactNode | - |
| tabList | tab 标题列表 | `Array<{key: string, tab: ReactNode}>` | - |
| tabActiveKey | 当前高亮的 tab 项 | string | - |
| onTabChange | 切换面板的回调 | `(key) => void` | - |
| tabBarExtraContent | tab bar 上额外的元素 | React.ReactNode | - |
| footer | 底部的操作栏，会一直浮动到底部 | React.ReactNode[] | - |

### FooterToolbar

与 PageContainer 的 footer 配置相同，但是支持更多更灵活的设置。此操作栏会一直浮动到底部。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| extra | 左侧内容区 | ReactNode | - |
| children | 右侧内容区 | ReactNode[] | - |
| renderContent | 自定义内容区，可以进行更加自定义的设置 | `renderContent?: (props,dom) => ReactNode;` | - |

### PageLoading

一个简单的加载页面

| 参数 | 说明         | 类型      | 默认值 |
| ---- | ------------ | --------- | ------ |
| tip  | 加载的小说明 | ReactNode | -      |

### RouteContext

RouteContext 可以提供 Layout 的内置的数据。例如 isMobile 和 collapsed，你可以消费这些数据来自定义一些行为。

```tsx | pure
import { RouteContext, RouteContextType } from '@ant-design/pro-layout';

const Page = () => (
  <RouteContext.Consumer>
    {(value: RouteContextType) => {
      return value.title;
    }}
  </RouteContext.Consumer>
);
```

### GridContent

GridContent 封装了 [等宽](https://preview.pro.ant.design/dashboard/analysis?layout=top&contentWidth=Fixed)和 [流式](https://preview.pro.ant.design/dashboard/analysis?layout=top) 的逻辑。你可以在 [preview](https://preview.pro.ant.design/dashboard/analysis) 中查看预览效果。

| 参数         | 说明     | 类型               | 默认值 |
| ------------ | -------- | ------------------ | ------ |
| contentWidth | 内容模式 | 'Fluid' \| 'Fixed' | -      |

### getMenuData

根据 router 信息来生成 menuData 和 breadcrumb。

```js
import { getMenuData } from '@ant-design/pro-layout';

const { breadcrumb, menuData } = getMenuData(
  routes,
  menu,
  formatMessage,
  menuDataRender,
);
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| routes | 路由的配置信息 | [route[]](#Route) | - |
| menu | menu 的配置项，默认 `{locale: true}` | `{ locale: boolean }` | - |
| menuDataRender | menuData 的 render 方法，用来自定义 menuData | `(menuData: MenuDataItem[]) => MenuDataItem[]` | - |
| formatMessage | react-intl 的 formatMessage 方法 | `(data: { id: any; defaultMessage?: string }) => string;` | - |

### getPageTitle

getPageTitle 封装了根据 menuData 上生成的 title 的逻辑。

```js
import { getPageTitle } from '@ant-design/pro-layout';

const title = getPageTitle({
  pathname,
  breadcrumb,
  menu,
  title,
  formatMessage,
});
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| pathname | 当前的 pathname | location.pathname | - |
| breadcrumb | MenuDataItem 的合集 | `{ [path: string]: MenuDataItem }` | - |
| menu | menu 的配置项，默认 `{locale: true}` | `{ locale: boolean }` | - |
| title | title 的类型 | string | 'Ant Design Pro' |
| formatMessage | react-intl 的 formatMessage 方法 | `(data: { id: any; defaultMessage?: string }) => string;` | - |

## 数据结构

> 为了方便查看和使用，这里使用了 Typescript 的 方式来书写。

### Settings

```ts | pure
// 可以通过 import { Settings } from '@ant-design/pro-layout/defaultSettings'
// 来获取这个类型
export interface Settings {
  /**
   * theme for nav menu
   */
  navTheme: 'light' | 'dark';
  /**
   * primary color of ant design
   */
  primaryColor: string;
  /**
   * nav menu position: `side` or `top`
   */
  layout: 'side' | 'top';
  /**
   * layout of content: `Fluid` or `Fixed`, only works when layout is top
   */
  contentWidth: 'Fluid' | 'Fixed';
  /**
   * sticky header
   */
  fixedHeader: boolean;
  /**
   * sticky siderbar
   */
  fixSiderbar: boolean;
  menu: { locale: boolean };
  title: string;
  pwa: boolean;
  // Your custom iconfont Symbol script Url
  // eg：//at.alicdn.com/t/font_1039637_btcrd5co4w.js
  // Usage: https://github.com/ant-design/ant-design-pro/pull/3517
  iconfontUrl: string;
  colorWeak: boolean;
  direction: 'ltr' | 'rtl';
}
```

### MenuDataItem

```ts | pure
// 可以通过 import { MenuDataItem } from '@ant-design/pro-layout'
// 来获取这个类型

export interface MenuDataItem {
  authority?: string[] | string;
  children?: MenuDataItem[];
  hideChildrenInMenu?: boolean;
  hideInMenu?: boolean;
  icon?: string;
  locale?: string;
  name?: string;
  path: string;
  [key: string]: any;
}
```

### Route

```ts | pure
// 可以通过 import { RouterTypes } from '@ant-design/pro-layout/typings'
// 来获取这个类型
export interface Route {
  path: string;
  routes: Array<{
    exact?: boolean;
    icon: string;
    name: string;
    path: string;
    // 可选二级菜单
    children?: Route['routes'];
  }>;
}
```
