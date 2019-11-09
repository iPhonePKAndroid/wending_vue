import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
let title = ' - IA'

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        auth: true,
        guest: false,
        tabar: true,
        title: '首页' + title,
      },
      component: Home,
    },
    {
      path: '/tops',
      name: 'tops',
      meta: {
        auth: false,
        guest: false,
        tabar: false,
        title: '服务协议' + title,
      },
      component: () => import(/* webpackChunkName: "about" */ './views/Tops.vue')
    },
    {
      path: '/help',
      name: 'help',
      meta: {
        auth: false,
        guest: false,
        tabar: false,
        title: '帮助关于' + title,
      },
      component: () => import(/* webpackChunkName: "about" */ './views/Help.vue')
    },
    {
      path: '/notice',
      name: 'notice',
      meta: {
        auth: false,
        guest: false,
        tabar: false,
        title: '平台公告' + title,
      },
      component: () => import(/* webpackChunkName: "about" */ './views/Notice.vue')
    },
    {
      path: '/upgrade',
      name: 'upgrade',
      meta: {
        auth: true,
        guest: false,
        tabar: true,
        title: '投单' + title,
      },
      component: () => import('./views/Upgrade.vue')
    },
    {
      path: '/upgrade/index',
      name: 'upgradeList',
      meta: {
        auth: true,
        guest: false,
        tabar: true,
        title: '投单记录' + title,
      },
      component: () => import('./views/UpgradeList.vue')
    },
    {
      path: '/password',
      name: 'password',
      meta: {
        auth: false,
        guest: false,
        tabar: true,
        title: '修改密码' + title,
      },
      component: () => import(/* webpackChunkName: "go" */ './views/Password.vue')
    },
    {
      path: '/app',
      name: 'app',
      meta: {
        auth: false,
        guest: false,
        tabar: false,
        title: 'APP下载' + title,
      },
      component: () => import(/* webpackChunkName: "go" */ './views/App.vue')
    },
    {
      path: '/exchange',
      name: 'exchange',
      meta: {
        auth: false,
        guest: false,
        tabar: false,
        title: '兑换' + title,
      },
      component: () => import(/* webpackChunkName: "go" */ './views/Exchange.vue')
    },
    {
      path: '/my',
      name: 'my',
      meta: {
        auth: false,
        guest: false,
        tabar: true,
        title: '我的' + title,
      },
      component: () => import(/* webpackChunkName: "my" */ './views/My.vue')
    },
    {
      path: '/my/aff',
      name: 'my.aff',
      meta: {
        auth: false,
        guest: false,
        tabar: true,
        title: '邀请好友' + title,
      },
      component: () => import(/* webpackChunkName: "my" */ './views/my/Aff.vue')
    },
    {
      path: '/my/team',
      name: 'my.team',
      meta: {
        auth: false,
        guest: false,
        tabar: true,
        title: '我的团队' + title,
      },
      component: () => import(/* webpackChunkName: "my" */ './views/my/team/Index.vue')
    },
    {
      path: '/recharge',
      name: 'recharge',
      meta: {
        auth: false,
        tabar: false,
        title: '充值' + title,
      },
      component: resolve => require(['./views/my/Recharge.vue'], resolve),
    },

    {
      path: '/trades',
      name: 'trades',
      meta: {
        auth: false,
        tabar: false,
        title: '交易记录' + title,
      },
      component: resolve => require(['./views/wallet/Trade.vue'], resolve),
    },


    {
      path: '/recharge/index',
      name: 'recharge.index',
      meta: {
        auth: false,
        tabar: false,
        title: '充值记录' + title,
      },
      component: resolve => require(['./views/my/recharge/index.vue'], resolve),
    },


    {
      path: '/withdraw',
      name: 'withdraw',
      meta: {
        auth: false,
        tabar: false,
        title: '提现' + title,
      },
      component: resolve => require(['./views/my/Withdraw.vue'], resolve),
    },

    {
      path: '/withdraw/index',
      name: 'withdraw.index',
      meta: {
        auth: false,
        tabar: false,
        title: '提现记录' + title,
      },
      component: resolve => require(['./views/my/withdraw/index.vue'], resolve),
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