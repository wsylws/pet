import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const blackList = ['SendPets', 'sendArticle', 'Personal', 'Notice'] 

router.beforeEach((to, from, next) => {
  NProgress.start()
  // 判断是否登录
  const { username } = store.getters.getUser
  if (username) {
    // 已登录
    if (to.name === 'login') {
      next('/')
    } else {
      next()
    }
  } else {
    // 未登录，并且访问blackList数组中这四个页面时，跳转到登录页面
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
