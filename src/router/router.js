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
      redirect:'photography',
      children: [
        {
          path: 'photography',
          name: 'photography',
          component: () => import('@/views/photography/photography.vue')
        },
        {
          path: 'topic',
          name: 'topic',
          component: () => import('@/views/topic/topic.vue')
        },
        {
          path: 'news',
          name: 'news',
          component: () => import('@/views/news/news'),
        },
        {
          path:'article/:id',
          name:'article',
          component:()=>import('@/views/article/index'),
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
