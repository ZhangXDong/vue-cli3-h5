import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import user from './modules/user.js'

const store = new Vuex.Store({
	state: {
		...user.state
    },
    getters: {
		...user.getters
	},
	mutations: {
        ...user.mutations
	},
	actions: {
        ...user.actions
	}
})

export default store