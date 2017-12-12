// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import goods from './components/goods'
import ratings from './components/ratings'
import seller from './components/seller'

// 这样引入，common.less会当模块处理，被编译成style标签加入head中
import './assets/less/common.less'

Vue.use(VueRouter)
Vue.use(VueResource)

let routes = { 
	mode: 'history',
	//linkActiveClass: 'active', // 全局配置链接激活时使用的 CSS 类名默认值。
	routes: [ 
		{ path: '/', component: goods, redirect: '/goods' },
		{ path: '/goods', component: goods },
		{ path: '/ratings', component: ratings },
		{ path: '/seller', component: seller }
	]
}
  
var router = new VueRouter(routes);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})