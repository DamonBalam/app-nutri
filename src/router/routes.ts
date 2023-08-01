import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('layouts/AuthLayout.vue'),
    children: [{ path: '', name: 'Login', component: () => import('pages/Auth/Index.vue') }]
  },
  {
    path: '/',
    redirect: '/alimentos',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/alimentos',
        meta: { requiresAuth: true },
        component: () => import('pages/Alimentos/index.vue')
      },
      {
        path: '/perfil',
        meta: { requiresAuth: true },
        component: () => import('pages/Perfil/index.vue')
      },
      {
        path: '/plan',
        meta: { requiresAuth: true },
        component: () => import('pages/Plan/index.vue')
      },
      {
        path: '/nosotros',
        meta: { requiresAuth: true },
        component: () => import('pages/Nosotros/index.vue')
      },
      {
        path: '/update-password',
        meta: { requiresAuth: true },
        component: () => import('pages/Config/index.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
