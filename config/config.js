// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;
export default defineConfig({
  // 多页面应用
  history: { type: 'hash' },
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
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
      component: '../layouts/BlankLayout',
      routes: [
        // 个人中心单独采用user布局,此布局没有全局导航菜单等组件
        {
          path: '/user',
          component: '../layouts/UserLayout',
          // hideInMenu:true,
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
              component: '404',
            },
          ],
        },
        // 其余页面采用basic布局
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['admin', 'user'],
          
          routes: [
            {
              path: '/',
              redirect: '/dashboard/workplace',
            },
            {
              path: '/dashboard',
              name: 'dashboard',
              icon: 'dashboard',
              hideInMenu:true,
              routes: [
                {
                  name: 'analysis',
                  icon: 'smile',
                  path: '/dashboard/analysis',
                  component: './dashboard/analysis',
                },
                {
                  name: 'monitor',
                  icon: 'smile',
                  path: '/dashboard/monitor',
                  component: './dashboard/monitor',
                },
                {
                  name: 'workplace',
                  icon: 'smile',
                  path: '/dashboard/workplace',
                  component: './dashboard/workplace',
                },
              ],
            },
            {
              path: '/form',
              icon: 'form',
              name: 'form',
              hideInMenu:true,
              routes: [
                {
                  name: 'basic-form',
                  icon: 'smile',
                  path: '/form/basic-form',
                  component: './form/basic-form',
                },
                {
                  name: 'step-form',
                  icon: 'smile',
                  path: '/form/step-form',
                  component: './form/step-form',
                },
                {
                  name: 'advanced-form',
                  icon: 'smile',
                  path: '/form/advanced-form',
                  component: './form/advanced-form',
                },
              ],
            },
            {
              path: '/list',
              icon: 'table',
              name: 'list',
              hideInMenu:true,
              routes: [
                {
                  path: '/list/search',
                  name: 'search-list',
                  component: './list/search',
                  routes: [
                    {
                      path: '/list/search',
                      redirect: '/list/search/articles',
                    },
                    {
                      name: 'articles',
                      icon: 'smile',
                      path: '/list/search/articles',
                      component: './list/search/articles',
                    },
                    {
                      name: 'projects',
                      icon: 'smile',
                      path: '/list/search/projects',
                      component: './list/search/projects',
                    },
                    {
                      name: 'applications',
                      icon: 'smile',
                      path: '/list/search/applications',
                      component: './list/search/applications',
                    },
                  ],
                },
                {
                  name: 'table-list',
                  icon: 'smile',
                  path: '/list/table-list',
                  component: './list/table-list',
                },
                {
                  name: 'basic-list',
                  icon: 'smile',
                  path: '/list/basic-list',
                  component: './list/basic-list',
                },
                {
                  name: 'card-list',
                  icon: 'smile',
                  path: '/list/card-list',
                  component: './list/card-list',
                },
              ],
            },
            {
              path: '/profile',
              name: 'profile',
              icon: 'profile',
              hideInMenu:true,
              routes: [
                {
                  name: 'basic',
                  icon: 'smile',
                  path: '/profile/basic',
                  component: './profile/basic',
                },
                {
                  name: 'advanced',
                  icon: 'smile',
                  path: '/profile/advanced',
                  component: './profile/advanced',
                },
              ],
            },
            {
              name: 'result',
              icon: 'CheckCircleOutlined',
              path: '/result',
              hideInMenu:true,
              routes: [
                {
                  name: 'success',
                  icon: 'smile',
                  path: '/result/success',
                  component: './result/success',
                },
                {
                  name: 'fail',
                  icon: 'smile',
                  path: '/result/fail',
                  component: './result/fail',
                },
              ],
            },
            {
              name: 'exception',
              icon: 'warning',
              path: '/exception',
              hideInMenu:true,
              routes: [
                {
                  name: '403',
                  icon: 'smile',
                  path: '/exception/403',
                  component: './exception/403',
                },
                {
                  name: '404',
                  icon: 'smile',
                  path: '/exception/404',
                  component: './exception/404',
                },
                {
                  name: '500',
                  icon: 'smile',
                  path: '/exception/500',
                  component: './exception/500',
                },
              ],
            },
            {
              name: 'account',
              icon: 'user',
              path: '/account',
              hideInMenu:true,
              routes: [
                {
                  name: 'center',
                  icon: 'smile',
                  path: '/account/center',
                  component: './account/center',
                },
                {
                  name: 'settings',
                  icon: 'smile',
                  path: '/account/settings',
                  component: './account/settings',
                },
              ],
            },
            {
              name: 'editor',
              icon: 'highlight',
              path: '/editor',
              hideInMenu:true,
              routes: [
                {
                  name: 'flow',
                  icon: 'smile',
                  path: '/editor/flow',
                  component: './editor/flow',
                },
                {
                  name: 'mind',
                  icon: 'smile',
                  path: '/editor/mind',
                  component: './editor/mind',
                },
                {
                  name: 'koni',
                  icon: 'smile',
                  path: '/editor/koni',
                  component: './editor/koni',
                },
              ],
            },
            {
              path: '/myStudioSpace',
              name: 'dashboard',
              icon: 'dashboard',
              component: './dashboard/workplace',
              // routes: [
              //   {
              //     name: '我的任务',
              //     icon: 'smile',
              //     path: '/missions/missionList',
              //     component: './list/basic-list',
              //   },
              // ],
            },
            {
              name: 'missions',
              icon: 'BarsOutlined',
              path: '/missions',
              component: './list/basic-list',

              // routes: [
              //   {
              //     name: '我的任务',
              //     icon: 'smile',
              //     path: '/missions/missionList',
              //     component: './list/basic-list',
              //   },
              // ],
            },
            {
              name: 'callStudio',
              icon: 'highlight',
              path: '/callStudio',
              hideInMenu:true,
              // 新窗口打开
              target:'_blank',
              component: './profile/advanced',

            },
            {
              name: 'knowledge',
              icon: 'BookOutlined',
              path: '/myBookStore',
              hideChildrenInMenu:true,
              component: './list/search',
              routes: [
                {
                  
                  path: '/myBookStore',
                  redirect: '/list/search/articles',
                },
                {
                  name: 'children',
                  icon: 'smile',
                  path: '/myBookStore/articles',
                  component: './list/search/articles',
                },
                {
                  name: 'adult',
                  icon: 'smile',
                  path: '/myBookStore/projects',
                  component: './list/search/projects',
                },
                {
                  name: 'oldMan',
                  icon: 'smile',
                  path: '/myBookStore/applications',
                  component: './list/search/applications',
                },
              ],

            },
            // 404要放在最后
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
    // 'primary-color': defaultSettings.primaryColor,
    // ucall绿色健康色
    'primary-color': "#5dbe8a", // 全局主色
    'link-color': '#5dbe8a', // 链接色
    'success-color': '#52c41a', // 成功色
    'warning-color': '#faad14', // 警告色
    'error-color': '#f5222d', // 错误色
    'font-size-base': '14px', // 主字号
    'heading-color': 'rgba(0, 0, 0, 0.85)', // 标题色
    'text-color': 'rgba(0, 0, 0, 0.65)', // 主文本色
    'text-color-secondary': 'rgba(0, 0, 0, 0.45)', // 次文本色
    'disabled-color': 'rgba(0, 0, 0, 0.25)', // 失效色
    'border-radius-base': '2px', // 组件/浮层圆角
    'border-color-base': '#5dbe8a', // 边框色
    'box-shadow-base': '0 3px 6px -4px rgba(0,0,0,.12),0 6px 16px 0 rgba(0,0,0,.08),0 9px 28px 8px rgba(0,0,0,.05)' // 浮层阴影

  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
