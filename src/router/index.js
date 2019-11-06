import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Home'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import SendPets from '@/pages/SendPets/SendPets'
import AdoptPets from '@/pages/AdoptPets'
import PetShow from '@/pages/PetShow'
import BBS from '@/pages/BBS'
import AdoptDetail from '@/components/AdoptDetail'
import ShowDetail from '@/pages/ShowDetail'
import sendArticle from '@/pages/sendArticle'
import ArticleDetail from '@/pages/ArticleDetail'
import Personal from '@/pages/Personal'
import Notice from '@/pages/Notice'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Index',
			component: Index,
			meta: {
				module: '/'
			}
		},
		{
			path: '/register',
			name: 'Register',
			component: Register,
			meta: {
				module: '/register'
			}
		},
		{
			path: '/login',
			name: 'Login',
			component: Login,
			meta: {
				module: '/login'
			}
		},
		{
			path: '/create',
			name: 'SendPets',
			component: SendPets,
			meta: {
				module: '/create'
			}
		},
		{
			path: '/adopt',
			name: 'AdoptPets',
			component: AdoptPets,
			meta: {
				module: '/adopt'
			}
		},
		// 动态路由
		{
			path: '/adopt/:id',
			name: 'AdoptDetail',
			component: AdoptDetail,
			meta: {
				module: '/adopt'
			}
		},
		{
			path: '/show',
			name: 'PetShow',
			component: PetShow,
			meta: {
				module: '/show'
			}
		},
		{
			path: '/show/:id',
			name: 'ShowDetail',
			component: ShowDetail,
			meta: {
				module: '/show'
			}
		},
		{
			path: '/article',
			name: 'BBS',
			component: BBS,
			meta: {
				module: '/article'
			}
		},
		{
			path: '/article/sendArticle',
			name: 'sendArticle',
			component: sendArticle,
			meta: {
				module: '/article'
			}
		},
		{
			path: '/article/:id',
			name: 'ArticleDetail',
			component: ArticleDetail,
			meta: {
				module: '/article'
			}
		},
		{
			path: '/my',
			name: 'Personal',
			component: Personal,
			meta: {
				module: '/my'
			}
		},
		{
			path: '/notice',
			name: 'Notice',
			component: Notice,
			meta: {
				module: '/notice'
			}
		}
	],
	// 每次切换页面 回到顶部
  scrollBehavior (to, from, savaPosition) {
    return {x: 0, y: 0}
  }
})