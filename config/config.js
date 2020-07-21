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
    // when base url redirect to /news/all
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
            // /news endpoint will also be redirected to /news/all
            {
              path: '/news',
              redirect: '/news/all',
            },
            // ./news/all component form the pages directory loaded
            {
              name: 'search',
              icon: 'smile',
              path: '/news/all',
              component: './news/all',
            },
            // ./news/one component form the pages directory loaded
            {
              name: 'shops',
              icon: 'smile',
              path: '/news/one/:id?',
              component: './news/one',
            },
            // all the rest end points are now pointing to 404 page
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
