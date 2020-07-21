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
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
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
      path: '/',
      redirect: '/user/login',
    },
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'login',
              icon: 'smile',
              path: '/user/login',
              component: './user/login',
            },
            {
              name: 'register-result',
              icon: 'smile',
              path: '/user/register-result',
              component: './user/register-result',
            },
            {
              name: 'register',
              icon: 'smile',
              path: '/user/register',
              component: './user/register',
            },
            {
              name: 'profile',
              icon: 'smile',
              path: '/user/profile',
              component: './user/profile',
            },
            {
              name: 'checkout',
              icon: 'smile',
              path: '/user/checkout',
              component: './user/checkout',
            },
            {
              name: 'order-all',
              icon: 'smile',
              path: '/user/order/all',
              component: './user/all_orders',
            },
            {
              name: 'order',
              icon: 'smile',
              path: '/user/order',
              component: './user/order',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/grocery',
          component: '../layouts/BlankLayout',
          routes: [
            {
              path: '/grocery',
              redirect: '/grocery/search',
            },
            {
              name: 'search',
              icon: 'smile',
              path: '/grocery/search',
              component: './grocery/search',
            },
            {
              name: 'shops-all',
              icon: 'smile',
              path: '/grocery/shops/all',
              component: './grocery/all_shops',
            },
            {
              name: 'shops',
              icon: 'smile',
              path: '/grocery/shops/:id?',
              component: './grocery/shop',
            },
            {
              component: '404',
            },
          ],
        },
      ],
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
