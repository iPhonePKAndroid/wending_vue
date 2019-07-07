import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

let title = ' - Selly'

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        auth: false,
        guest: false,
        tabar: true,
        title: '网站首页' + title,
      },
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        auth: false,
        guest: false,
        tabar: true,
        title: '关于我们' + title,
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        auth: false,
        tabar: false,
        title: '登录' + title,
      },
      component: resolve => require(['./views/auth/Login.vue'], resolve),
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        auth: false,
        tabar: false,
        title: '注册' + title,
      },
      component: resolve => require(['./views/auth/Register.vue'], resolve),
    },
  ]
})



router.beforeEach((to, from, next) => {

  // 网页标题处理
  if (to.meta.title) {
    document.title = to.meta.title
  }

  // 用户权限处理：已登录用户
  if (to.meta.auth) {
    // 获得 token
    let token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  }

  // 用户权限处理：未登录访客
  if (to.meta.guest) {
    // 获得 token
    let token = localStorage.getItem('token')
    if (token) {
      next('/')
    } else {
      next()
    }
  }


  next()

})

export default router