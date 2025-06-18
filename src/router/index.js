import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/store/user/index'
import { signUp } from '@/api/user'
import { dispatchCustomEvent } from '@/utils'
import { noLoginRouterList } from './whiteList'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home/index.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/register/index.vue')
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: () => import('../views/recharge/index.vue')
    },
    {
      path: '/securityCenter',
      name: 'securityCenter',
      component: () => import('../views/securityCenter/index.vue')
    },
    {
      path: '/cashflow',
      name: 'cashflow',
      component: () => import('../views/cashflow/index.vue')
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      component: () => import('../views/withdraw/index.vue')
    },
    {
      path: '/flashExchange',
      name: 'flashExchange',
      component: () => import('../views/flashExchange/index.vue')
    },
    {
      path: '/exchange',
      name: 'exchange',
      component: () => import('../views/exchange/index.vue')
    },
    {
      path: '/invaite',
      name: 'invaite',
      component: () => import('../views/invaite/index.vue')
    },
    {
      path: '/message',
      name: 'message',
      component: () => import('../views/message/index.vue')
    },
    {
      path: '/message/detail',
      name: 'messageDetail',
      component: () => import('../views/message/detail.vue')
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: () => import('../views/wallet/index.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/about/index.vue')
    },
    {
      path: '/emailAuthentication',
      name: 'emailAuthentication',
      component: () => import('../views/emailAuthentication/index.vue')
    },
    {
      path: '/fund-password',
      name: 'fund-password',
      component: () => import('../views/fund-password/index.vue')
    },
    {
      path: '/changePassword',
      name: 'changePassword',
      component: () => import('../views/changePassword/index.vue')
    },
    {
      path: '/phoneAuth',
      name: 'phoneAuth',
      component: () => import('../views/phoneAuth/index.vue')
    },
    {
      path: '/userauth',
      name: 'userauth',
      component: () => import('../views/userauth/index.vue')
    },
    {
      path: '/loan',
      name: 'loan',
      component: () => import('../views/loan/index.vue')
    }
    // {
    //   path: '/forget',
    //   name: 'forget',
    //   component: () => import('../views/forget/index.vue')
    // },
  ]
})
router.beforeEach(async (to, from, next) => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
  const userStore = useUserStore()
  if (userStore.isSign) {
    // 已登录
    await userStore.getUserInfo()
    if (to.path.indexOf('/i&') > -1) {
      next({ path: '/', replace: true })
    } else {
      next()
    }
  } else {
    if (!noLoginRouterList.includes(to.path)) {
      next('/login')
    } else {
      next()
    }

    try {
      const singUpRes = await signUp(params)
      if (singUpRes.code == 200 && singUpRes.data.satoken) {
        // 登录成功
        dispatchCustomEvent('event_toastChange', { name: 'login_success' })
        let token = singUpRes.data.satoken
        userStore.setIsSign(true)
        userStore.setToken(token)
        userStore.getUserInfo()
        next('/')
      } else {
        showToast(singUpRes.msg)
      }
      next()
    } catch (error) {
      next()
    }
  }
})
export default router
