import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainPage from '../views/MainPage.vue'
import SearchPage from '../views/SearchPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/mainpage',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/searchpage/:init_message',
      name: 'SearchPage',
      component: SearchPage,
      props: true
    },
    {
      path: '/GraphViz',
      name: 'GraphViz',
      component: () => import('../views/GraphViz.vue')
    }
  ]
})

export default router
