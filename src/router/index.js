import Vue from 'vue'
import Router from 'vue-router'
import Editor from '@/components/Editor'
import Signin from '@/components/Signin'
import ReSendEmailVerified from '@/components/ReSendEmailVerified'
import ResetPass from '@/components/ResetPass'
import UpdatePass from '@/components/UpdatePass'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: 'signin'
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/email_verified',
      name: 'ReSendEmailVerified',
      component: ReSendEmailVerified
    },
    {
      path: '/reset_pass',
      name: 'ResetPass',
      component: ResetPass
    },
    {
      path: '/',
      name: 'Editor',
      component: Editor,
      meta: { requiresAuth: true }
    },
    {
      path: '/update_pass',
      name: 'UpdatePass',
      component: UpdatePass,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    // このルートはログインされているかどうか認証が必要です。
    // もしされていないならば、ログインページにリダイレクトします。
    firebase.auth().onAuthStateChanged(user => {
      const cUser = firebase.auth().currentUser
      if (user && cUser.emailVerified) {
        next()
      } else {
        next({
          path: '/signin',
          query: { redirect: to.fullPath }
        })
      }
    })
  } else {
    next() // next() を常に呼び出すようにしてください!
  }
})

export default router
