import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/layout/home'
import cart from '@/views/layout/cart'
import category from '@/views/layout/category'
import user from '@/views/layout/user'
import store from '@/store'

import layout from '@/views/layout'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: layout,
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/cart', component: cart },
        { path: '/category', component: category },
        { path: '/user', component: user }
      ]
    },
    { path: '/login', component: () => import('@/views/login') },
    { path: '/myorder', component: () => import('@/views/myorder') },
    { path: '/pay', component: () => import('@/views/pay') },
    { path: '/prodetail:id', component: () => import('@/views/prodetail') },
    { path: '/search', component: () => import('@/views/search') },
    { path: '/searchlist', component: () => import('@/views/search/list') }
  ]
})

const authUrl = ['/pay', '/myorder']

router.beforeEach((to, from, next) => {
  if (!authUrl.includes(to.path)) {
    next()
    return
  }

  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
