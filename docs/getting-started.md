---
title: 快速开始
order: 9
sidemenu: false
nav:
  title: 快速开始
  order: 0
---

Layout 作为协助进行页面级整体布局工具，在每个项目中都必不可少，而且在中后台中是非常雷同的。所以我们抽象了 ProLayout 来减少重复代码，并且吃掉其中的脏逻辑。

## 布局

Layout 的基础能力就是布局，在 ProLayout 中我们抽象了三种布局方式，分别的 `side`,`top` 和 `mix`。 我们可以使用 layout 属性来切换他们,在[这里](http://localhost:8000/_demos/base)可以做一个简单的尝试。

### side 模式

![side](https://gw.alipayobjects.com/zos/antfincdn/gXkuc%26RmT7/64038246-E2BF-4840-8898-5AF531897A44.png)

### stop 模式

![top](https://gw.alipayobjects.com/zos/antfincdn/d39gv%26sKfC/F12A0CEC-3DBC-4815-851C-1120B91827A5.png)

### mix 模式

![mix](https://gw.alipayobjects.com/zos/antfincdn/n7u4rg4HRd/BECE52FC-BD40-4F2A-AE40-8E7ECD02760F.png)

## 自定义布局

ProLayout 提供一些 api 删除用户不需要的区域。在 SettingDrawer 也提供一些配置来进行设置。

![setting-drawer-render](https://gw.alipayobjects.com/zos/antfincdn/mCXDkK2pJ0/60298863-F5A5-4af2-923A-13EF912DB0E1.png)

- `headerRender` 可以自定义顶栏
- `footerRender` 可以自定义页脚
- `menuRender` 可以自定义菜单区域
- `menuHeaderRender` 自定义的菜单头区域
- `menuExtraRender` 可以为菜单增加一个额外内容，在菜单头和菜单之间

> 在 layout 中所有的 xxxRender 都可以传入 false，来关闭渲染。

## 自定义菜单

ProLayout 会自动生成菜单，同时根据 pathname 进行自动选中。配合 PageContainer 可以实现自动推算面包屑和页面标题。如果和 umi 配置使用，只需要将 Page 的 props 交个 ProLayout 就根据 config 中的 routers 的配置 可以自动生成菜单的配置。

为了提供更多的功能，我们扩展了 routers 配置，增加了几个配置方便自定义，数据结构定义如下:

```ts | pure
// 可以通过 import { MenuDataItem } from '@ant-design/pro-layout'
// 来获取这个类型
export interface MenuDataItem {
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

- name 用于配置在菜单中的名称，同时会修改为浏览器标签页标题
- icon 代表菜单的体表，只 antd 的图表，iconfont 需要自己定义
- locale 可以设置菜单名称的国际化表示
- hideInMenu 会把这个路由配置在 menu 中隐藏这个路由，name 不填会有相同的效果
- hideChildrenInMenu 会把这个路由的子节点在 menu 中隐藏

### 从服务器获取
