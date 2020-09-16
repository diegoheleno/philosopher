// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default pt-BR
    default: 'pt-BR',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'Welcome',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/dashboard/workplace',
            },
            {
              path: '/dashboard/workplace',
              icon: 'HomeOutlined',
              name: 'Home',
              component: './dashboard/workplace',
            },
            {
              path: '/sellers',
              icon: 'TeamOutlined',
              name: 'sellers',
              authority: ['admin'],
              routes: [
                {
                  name: 'all-sellers',
                  path: '/sellers/list',
                  component: './sellers/list',
                },
                {
                  name: 'new-seller',
                  path: '/sellers/new',
                  component: './sellers/new',
                },
              ],
            },
            {
              path: '/product/list',
              name: 'product',
              icon: 'ContainerOutlined',
              component: './product/list',
            },

            // {
            //   path: '/admin',
            //   name: 'admin',
            //   icon: 'crown',
            //   component: './Admin',
            //   authority: ['admin'],
            //   routes: [
            //     {
            //       path: '/admin/sub-page',
            //       name: 'sub-page',
            //       icon: 'smile',
            //       component: './dashboard/workplace',
            //       authority: ['admin'],
            //     },
            //   ],
            // },
            // {
            //   name: 'approval',
            //   path: '/approval/list',
            //   icon: 'IdcardOutlined',
            //   component: './approval/list',
            // },
            {
              path: '/product/screen',
              component: './product/screen',
            },
            // {
            //   name: 'LAYOUT DE EXEMPLO',
            //   path: '/layout/example',
            //   component: './ListTableList',
            // },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
