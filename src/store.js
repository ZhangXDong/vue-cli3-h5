import Vue from 'vue'
import Vuex from 'vuex'

import {
	getTaskByTaskOrRobotNO,
} from '@/serves/walMart/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		showLoading: false,
        taskInfo: {},
        scanVal: ''
	},
	mutations: {

	},
	actions: {
		getTaskByTaskOrRobotNO({ state }, reqData) {
            return new Promise((resolve, reject) => {
                getTaskByTaskOrRobotNO(reqData).then((res)=>{
                    if(res.status.statusCode === 0) {
                        if(res.result){
                            const data = res.result
                            state.taskInfo = data
                        }
                        resolve(res)
                    } else {
                        resolve(res)
                    }
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
	}
})
