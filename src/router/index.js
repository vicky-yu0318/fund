import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/Front.vue'),
    name: 'index',
    children: [
      {
        path: '/pra',
        component: () => import('@/views/front/Pra.vue'),
        name: 'pra'
      },
      {
        path: '/dynamic',
        component: () => import('@/views/front/Dynamic.vue'),
        name: 'dynamic'
      },
      {
        path: '/search',
        component: () => import('@/views/front/Search.vue'),
        name: 'search'
      },
      {
        path: '/container',
        component: () => import('@/views/front/Container.vue')
      },
      {
        path: '/compare',
        component: () => import('@/views/front/Compare.vue'),
        name: 'compare'
      },
      {
        path: '/favorite',
        component: () => import('@/views/front/Favorite.vue'),
        name: 'favorite'
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
    path: '/memberFavorite',
    name: 'memberFavorite',
    component: () => import('@/views/MemberFavorite.vue'),
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
