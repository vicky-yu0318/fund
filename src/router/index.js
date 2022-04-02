import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/Front.vue'),
    children: [
      {
        path: '/fundResearch',
        component: () => import('@/views/front/fundResearch.vue')
      },
      {
        path: '/container',
        component: () => import('@/views/front/Container.vue')
      },
      {
        path: '/compare',
        component: () => import('@/views/front/Compare.vue')
      },
      {
        path: '/favorite',
        component: () => import('@/views/front/Favorite.vue')
      },
      {
        path: '/favorite-login',
        component: () => import('@/views/front/Favorite-login.vue')
      },
      {
        path: '/mainchart',
        component: () => import('@/views/front/mainchart.vue')
      },
      {
        path: '',
        component: () => import('@/views/front/Index.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/Dashboard.vue'),
    children: [
      {
        path: 'products',
        name: 'dashboardProducts',
        component: () => import('@/views/admin/DashboardProducts')
      },
      {
        path: 'orders',
        name: 'dashboardOrders',
        component: () => import('@/views/admin/DashboardOrders')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
