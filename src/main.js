import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import Router from 'vue-router'
import './permission'
import './assets/styles/iconfont.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

new Vue({
	el: '#app',
	router,
	store,
  render: h => h(App),
}).$mount('#app')
