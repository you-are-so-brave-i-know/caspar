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
      redirect:'home',
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('@/views/home/home.vue')
        },
        {
          path: 'one',
          name: 'one',
          component: () => import('@/views/one/one.vue')
        },
        {
          path: 'two',
          name: 'two',
          component: () => import('@/views/two/two.vue'),
          hidden: true
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/loginSystem/login')
    }
  ]
})
