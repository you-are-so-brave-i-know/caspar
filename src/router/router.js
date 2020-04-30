import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout/layout.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      redirect: 'home',
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('@/views/home/home')
        },
        {
          path: 'article/:id',
          name: 'article',
          component: () => import('@/views/article/index')
        },
        {
          path: 'homepage/:id',
          name: 'homepage',
          component: () => import('@/views/user/homepage')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/login')
    }
  ]
})
