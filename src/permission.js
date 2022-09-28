// 项目拉下来时已经在main.js里引入过了
// 引入路由
import router from '@/router'
import store from './store'

// 定义一个数组，专门用来放未登录时路由白名单
const whiteList = ['/login', '/404']

router.beforeEach(async(to, from, next) => {
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
