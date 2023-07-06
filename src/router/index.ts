import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/layouts/DefaultLayout.vue'),

      children: [
        {
          path: '',
          component: () => import('@/views/PostsPage.vue'),
          name: 'Posts',

          alias: ['/posts']
        },

        {
          path: ':id',
          name: 'Post',
          component: () => import('@/views/PostPage.vue'),
          alias: ['posts/:id']
        },
        {
          path: 'users',
          component: () => import('@/views/UsersPage.vue'),
          name: 'Users'
        },
        {
          path: 'users/:id',
          name: 'User',
          component: () => import('@/views/UserPage.vue')
        },
        {
          path: '/:pathMatch(.*)*',
          name: 'NotFound',
          component: () => import('@/views/PageError.vue')
        }
      ]
    }
  ]
})

export default router
