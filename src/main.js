import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/store.js'
//  global scss
import '@/assets/style/index.scss'

// px2rem
import './utils/rem.js'

// 全局注册 vant组件
import './public/vantPublicCom.js'

// 全局注册 公共组件
import './public/publicComs.js'

// log
import Vconsole from 'vconsole';
const vConsole = new Vconsole();

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
