import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path:'/HomePage',
    redirect:'/'
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/HomePage.vue') }],
  },

  {
    path: '/AboutAlgorithms',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/AboutAlgorithmsPage.vue') }],
  },

  {
    path: '/Problems',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/ProblemsPage.vue') }],
  },

  {
    path: '/History',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/HistoryPage.vue') }],
  },



  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
