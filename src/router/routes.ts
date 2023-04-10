import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/alimentos',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/alimentos', component: () => import('pages/Alimentos/index.vue') },
      { path: '/perfil', component: () => import('pages/Perfil/index.vue') },
      { path: '/plan', component: () => import('pages/Plan/index.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
