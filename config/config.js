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
      redirect: '/news/all',
    },
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/news',
          component: '../layouts/BlankLayout',
          routes: [
            {
              path: '/news',
              redirect: '/news/all',
            },
            {
              name: 'search',
              icon: 'smile',
              path: '/news/all',
              component: './news/all',
            },
            {
              name: 'shops',
              icon: 'smile',
              path: '/news/one/:id?',
              component: './news/one',
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
