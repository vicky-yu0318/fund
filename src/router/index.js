import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/Front.vue'),
    name: 'index',
    children: [
      {
        path: '/search',
        component: () => import('@/views/front/Search.vue'),
        name: 'search'
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
        path: '',
        component: () => import('@/views/front/Index.vue')
      }
    ]
  },
  {
    path: '/memberFavorite',
    name: 'memberFavorite',
    component: () => import('@/views/MemberFavorite.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFound.vue')
  },
  {
    path: '/external',
    component: () => import('@/views/External.vue')
  },
  {
    name: 'apply',
    path: '/apply',
    component: () => import('@/views/Apply.vue')
  },
  {
    name: 'note',
    path: '/note',
    component: () => import('@/views/Note.vue')
  },
  {
    name: 'order',
    path: '/order',
    component: () => import('@/views/Order.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
