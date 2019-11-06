import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const blackList = ['SendPets', 'sendArticle', 'Personal', 'Notice'] 

router.beforeEach((to, from, next) => {
  NProgress.start()
  const { username } = store.getters.getUser
  if (username) {
    if (to.name === 'login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (blackList.includes(to.name)) {
      next({ path: '/login' })
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
