import Vue from 'vue'//导入vue模块
import VueRouter from 'vue-router'//导入vue-router模块
import Home from './rHome'
import Audio from './rAudio'
import Search from './rSearch'
import Mylist from './rMylist'


Vue.use(VueRouter)//注册路由模块
// 创建VueRouter实例
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  // 配置路由对象
  routes:[
    Home,
    Audio,
    Search,
    Mylist,
		{ //重定向
			path: '/*',
			redirect: '/home'
		}
  ]
})

export default router
