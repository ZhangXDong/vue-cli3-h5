import Vue from 'vue'
import Router from 'vue-router'
import { getToken } from '@/utils/auth'
import harley from './harley/index.js'

Vue.use(Router)

const router = new Router({
	routes: [
		{
			path: '/',
			name: 'main',
			component: () => import('@/views/main.vue'),
			children: [
                {
                    path: '/login',
                    name: 'login',
                    component: () =>
                        import('@/views/login.vue')
                },
                ...harley
            ]
		}
	]
})

// 路由守卫
let whiteList = ['/login']
router.beforeEach((to, from, next) => {
    let token = getToken()
    console.log(token);
    // !whiteList.includes(to.path)
    // if (!token && to.path != '/login') {
    //     return next('/login')
    // } else {
    //     return next()
    // }
    return next()
})


export default router