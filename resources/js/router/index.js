import Vue from 'vue';
import Router from 'vue-router';

/**
 * Layzloading will create many files and slow on compiling, so best not to use lazyloading on devlopment.
 * The syntax is lazyloading, but we convert to proper require() with babel-plugin-syntax-dynamic-import
 * @see https://doc.laravue.dev/guide/advanced/lazy-loading.html
 */

Vue.use(Router);

/* Layout */
import Layout from '@/layout';

/* Router for modules */
// import elementUiRoutes from './modules/element-ui';
// import componentRoutes from './modules/components';
// import chartsRoutes from './modules/charts';
// import tableRoutes from './modules/table';
// import adminRoutes from './modules/admin';
// import nestedRoutes from './modules/nested';
// import errorRoutes from './modules/error';
// import excelRoutes from './modules/excel';
// import permissionRoutes from './modules/permission';

/**
 * Sub-menu only appear when children.length>=1
 * @see https://doc.laravue.dev/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin', 'editor']   Visible for these roles only
    permissions: ['view menu zip', 'manage user'] Visible for these permissions only
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb (default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
**/

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register/index'),
    hidden: true,
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/AuthRedirect'),
    hidden: true,
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true,
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true,
  },
  // {
  //   path: '/admin',
  //   component: Layout,
  //   redirect: '/admin/dashboard',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: () => import('@/views/dashboard/index'),
  //       name: 'Dashboard',
  //       meta: { title: 'dashboard', icon: 'dashboard', noCache: false },
  //     },
  //   ],
  // },
  {
    path: '/client',
    component: Layout,
    redirect: '/client/setupEnvironment',
    children: [
      {
        path: 'setupEnvironment',
        component: () => import('@/views/client/environment/index'),
        name: 'SetupEnvironment',
        meta: { title: 'Setup Environment', icon: 'tab', noCache: false },
      },
    ],
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/tickets',
    meta: { roles: ['client'] },
    children: [
      {
        path: 'tickets',
        component: () => import('@/views/admin/tickets/index'),
        name: 'AdminTickets',
        meta: { title: 'Tickets', icon: 'tab' },
      },
    ],
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/payment',
    meta: { roles: ['admin'] },
    children: [
      {
        path: 'payment',
        component: () => import('@/views/admin/payment/index'),
        name: 'Payment',
        meta: { title: 'Payment', icon: 'documentation' },
      },
    ],
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/usersetting',
    meta: { roles: ['admin'] },
    children: [
      {
        path: 'usersetting',
        component: () => import('@/views/admin/usersetting/index'),
        name: 'UserSetting',
        meta: { title: 'User Setting', icon: 'international' },
      },
    ],
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/appsetting',
    meta: { roles: ['client'] },
    children: [
      {
        path: 'appsetting',
        component: () => import('@/views/client/appsetting/index'),
        name: 'AppSetting',
        meta: { title: 'App Setting', icon: 'admin' },
      },
    ],
  },
];

export const asyncRoutes = [
  // client routes
  // {
  //   path: '/client/setupEnvironment',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   meta: { roles: ['client'] },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/theme/index'),
  //       name: 'SetupEnvironment',
  //       meta: { title: 'Setup Environment', icon: 'theme' },
  //     },
  //   ],
  // },
  // {
  //   path: '/client/appSetting',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   meta: { roles: ['client'] },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/client/appsetting/index'),
  //       name: 'AppSetting',
  //       meta: { title: 'App Setting', icon: 'admin' },
  //     },
  //   ],
  // },
  {
    path: '/client/payment',
    component: Layout,
    redirect: 'noredirect',
    meta: { roles: ['client'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/client/payment/index'),
        name: 'Payment',
        meta: { title: 'Payment', icon: 'documentation' },
      },
    ],
  },
  {
    path: '/client/appSetting',
    component: Layout,
    redirect: 'noredirect',
    meta: { roles: ['client'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/client/appsetting/index'),
        name: 'AppSetting',
        meta: { title: 'App Setting', icon: 'admin' },
      },
    ],
  },
  {
    path: '/client/userSetting',
    component: Layout,
    redirect: 'noredirect',
    meta: { roles: ['client'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/client/usersetting/index'),
        name: 'UserSetting',
        meta: { title: 'User Setting', icon: 'user' },
      },
    ],
  },

  // admin routes
  // {
  //   path: '/admin/tickets',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   meta: { roles: ['admin'] },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/admin/tickets/index'),
  //       name: 'AdminTickets',
  //       meta: { title: 'Tickets', icon: 'tab' },
  //     },
  //   ],
  // },
  {
    path: '/admin/migelPereira',
    component: Layout,
    redirect: 'noredirect',
    meta: { roles: ['admin'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/admin/migelPereira/index'),
        name: 'AdminMigelpereira',
        meta: { title: 'MIGUEL PEREIRA', icon: 'admin' },
      },
    ],
  },
  {
    path: '/admin/user',
    component: Layout,
    redirect: 'noredirect',
    meta: { roles: ['admin'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/admin/user/index'),
        name: 'AdminUser',
        meta: { title: 'User', icon: 'user' },
      },
    ],
  },
  {
    path: '/admin/payment',
    component: Layout,
    redirect: 'noredirect',
    meta: { roles: ['admin'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/admin/payment/index'),
        name: 'Payment',
        meta: { title: 'Payment', icon: 'documentation' },
      },
    ],
  },
  {
    path: '/admin/userSetting',
    component: Layout,
    redirect: 'noredirect',
    meta: { roles: ['admin'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/admin/usersetting/index'),
        name: 'UserSetting',
        meta: { title: 'User Setting', icon: 'international' },
      },
    ],
  },
  // {
  //   path: '/admin/user',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   meta: { roles: ['admin'] },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/admin/user/index'),
  //       name: 'AdminUser',
  //       meta: { title: 'User', icon: 'user' },
  //     },
  //   ],
  // },
  // {
  //   path: '/admin/payment',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   meta: { roles: ['admin'] },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/admin/payment/index'),
  //       name: 'Payment',
  //       meta: { title: 'Payment', icon: 'documentation' },
  //     },
  //   ],
  // },
  // {
  //   path: '/admin/userSetting',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   meta: { roles: ['admin'] },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/admin/usersetting/index'),
  //       name: 'UserSetting',
  //       meta: { title: 'User Setting', icon: 'international' },
  //     },
  //   ],
  // },
  // {
  //   path: '/profile',
  //   component: Layout,
  //   redirect: '/profile/edit',
  //   meta: { roles: ['admin'] },
  //   children: [
  //     {
  //       path: 'edit',
  //       component: () => import('@/views/users/SelfProfile'),
  //       name: 'SelfProfile',
  //       meta: { title: 'userProfile', icon: 'user', noCache: true },
  //     },
  //   ],
  // },
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   meta: { roles: ['admin'] },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/guide/index'),
  //       name: 'Guide',
  //       meta: { title: 'guide', icon: 'guide', noCache: true },
  //     },
  //   ],
  // },
  // elementUiRoutes,
  // permissionRoutes,
  // componentRoutes,
  // chartsRoutes,
  // nestedRoutes,
  // tableRoutes,
  // adminRoutes,
  // {
  //   path: '/theme',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   meta: { roles: ['admin'] },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/theme/index'),
  //       name: 'Theme',
  //       meta: { title: 'theme', icon: 'theme' },
  //     },
  //   ],
  // },
  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   meta: { roles: ['admin'] },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/clipboard/index'),
  //       name: 'ClipboardDemo',
  //       meta: { title: 'clipboardDemo', icon: 'clipboard', roles: ['admin', 'manager', 'editor', 'user'] },
  //     },
  //   ],
  // },
  // errorRoutes,
  // excelRoutes,
  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   meta: { roles: ['admin'] },
  //   children: [
  //     {
  //       path: 'download',
  //       component: () => import('@/views/zip'),
  //       name: 'ExportZip',
  //       meta: { title: 'exportZip' },
  //     },
  //   ],
  // },
  // {
  //   path: '/pdf',
  //   component: Layout,
  //   redirect: '/pdf/index',
  //   meta: { roles: ['admin'] },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/pdf'),
  //       name: 'Pdf',
  //       meta: { title: 'pdf' },
  //     },
  //   ],
  // },
  // {
  //   path: '/pdf/download',
  //   component: () => import('@/views/pdf/Download'),
  //   hidden: true,
  // },
  // {
  //   path: '/i18n',
  //   component: Layout,
  //   meta: { roles: ['admin'] },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/i18n'),
  //       name: 'I18n',
  //       meta: { title: 'i18n', icon: 'international' },
  //     },
  //   ],
  // },
  // {
  //   path: '/external-link',
  //   component: Layout,
  //   meta: { roles: ['admin'] },
  //   children: [
  //     {
  //       path: 'https://github.com/tuandm/laravue',
  //       meta: { title: 'externalLink', icon: 'link' },
  //     },
  //   ],
  // },
  { path: '*', redirect: '/404', hidden: true },
];

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  base: process.env.MIX_LARAVUE_PATH,
  routes: constantRoutes,
});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
