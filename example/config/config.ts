import { IConfig, IPlugin } from 'umi-types';
import slash from 'slash2';
import defaultSettings from './defaultSettings';
import themePluginConfig from './themePluginConfig';

const plugins: IPlugin[] = [
  ['umi-plugin-antd-icon-config', {}],
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];

// plugins.push(['umi-plugin-antd-theme', themePluginConfig]);

export default {
  plugins,
  // base: 'prefix',
  block: {
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
  },
  hash: true,
  targets: {
    ie: 11,
  },
  theme: {
    '@primary-color': defaultSettings.primaryColor,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [
        {
          path: 'https://github.com/ant-design/ant-design-pro-layout/issues',
          name: 'site',
          icon: 'smile',
          locale: false,
          target: '_blank',
          component: './Welcome',
        },
        {
          name: 'flex 布局测试',
          icon: 'smile',
          path: 'flex',
          component: './FlexDemo',
        },
        {
          name: '分析页',
          icon: 'smile',
          path: '/dashboardanalysis',
          component: './DashboardAnalysisTwo',
        },
        {
          name: '个人设置',
          icon: 'smile',
          path: '/accountsettings',
          component: './AccountSettings',
        },
        {
          name: '高级表单',
          icon: 'smile',
          path: 'formadvancedform',
          component: './FormAdvancedForm',
        },

        {
          path: 'single',
          name: 'Single',
          routes: [
            {
              path: 'welcome',
              name: 'two',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: 'welcome2',
              name: 'two2',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: 'welcome3/:id?',
              name: 'two3',
              hideInMenu: true,
              icon: 'smile',
              component: './Welcome',
            },
          ],
        },
        {
          path: '/',
          name: 'welcome',
          icon: 'smile',
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              redirect: '/welcome/welcome',
            },
            {
              path: 'welcome',
              name: 'one',
              component: './Welcome',
              routes: [
                {
                  path: 'repertoryFw',
                  name: 'two',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'repertory',
                  name: 'two2',
                  icon: 'smile',
                  component: './Welcome',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string,
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less') ||
        !context.resourcePath.includes('example')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
} as IConfig;
