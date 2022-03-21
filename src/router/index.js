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
        path: '',
        component: () => import('@/views/front/Index.vue')
      },
      {
        path: '/login',
        component: () => import('@/views/front/Login.vue')
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
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
