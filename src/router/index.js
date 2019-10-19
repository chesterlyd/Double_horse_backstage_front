import Vue from 'vue'
import Router from 'vue-router'
import routes from './route'
import iView from 'iview'
import { setTitle } from '@/libs/util'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  routes,
})

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  next();
})

router.afterEach(to => {
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
