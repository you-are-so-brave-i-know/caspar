import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout/layout.vue'
Vue.use(Router)
export const constantRoutes = [{
  path: '/login',
  name: 'login',
  component: () => import('@/views/login/login'),
  hidden: true
},
{
  path: '/signup',
  name: 'signup',
  component: () => import('../views/signup/signup.vue'),
  hidden: true
},
{
  path: '/404',
  component: () => import('@/views/error-page/404'),
  hidden: true
},

{
  path: '/',
  component: Layout,
  redirect: '/login',
  children: [
    {
      component: () => import('@/views/home/home'),
      path: 'home',
      name: 'home',
      meta: {
        title: '首页',
      }
    },
    {
      path: 'article/:id',
      name: 'article',
      component: () => import('@/views/main/article/index')
    },
    {
      path: '/homepage/:id',
      name: 'homepage',
      component: () => import('@/views/main/user/homepage')
    },
    {
      path: '/newArticle',
      name: 'newArticle',
      component: () => import('@/views/main/article/new_article')
    },
    {
      path: '/manage',
      name: 'manage',
      component: () => import('@/views/main/manage/manage'),
      hidden: true
    },
    {
      path: '/userManage',
      name: 'userManage',
      component: () => import('../views/main/manage/userManage.vue'),
      hidden: true
    },
    {
      path: '/articleManage',
      name: 'articleManage',
      component: () => import('@/views/main/manage/articleManage'),
      hidden: true
    },
    {
      path: '/commentManage',
      name: 'commentManage',
      component: () => import('@/views/main/manage/commentManage'),
      hidden: true
    },
    {
      path: '/attentionManage',
      component: () => import('@/views/main/manage/attentionManage'),
      hidden: true
    },
  ]
}
]
export const asyncRoutes = [{
  path: '/error',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ErrorPages',
  meta: {
    title: 'Error Pages',
    icon: '404'
  },
  children: [{
    path: '404',
    component: () => import('@/views/error-page/404'),
    name: 'Page404',
    meta: {
      title: '404',
      noCache: true
    }
  }]
},

// 404 page must be placed at the end !!!
{
  path: '*',
  redirect: '/404',
  hidden: true
}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()


export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router