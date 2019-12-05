import { loginByAccount, logoutByAccount } from '@/serves/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
const user = {
    state: {
        userInfo: {},
        token: getToken(),
    },
    getters: {
        getUserInfo: (state, getters) => {
            return state.userInfo
        },
        getMyToken: (state, getters) => {
            return state.token
        },
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_USERINFO: (state, userInfo) => {
            state.userInfo = userInfo
        },
    },
    actions: {
        // 用户名登录
        loginByAccount({ commit }, userInfo) {
            const userName = userInfo.userName.trim()
            return new Promise((resolve, reject) => {
                loginByAccount({userName: userName, password: userInfo.password, companyId: userInfo.companyId}).then(res => {
                    if (res.status.statusCode === 0) {
                        const data = res.result
                        commit('SET_TOKEN', data.token)
                        commit('SET_USERINFO', data)
                        setToken(data.token)
                        localStorage.setItem('userInfo', JSON.stringify(data))
                        resolve(res)
                    }
                    else {
                        resolve(res)
                    }
                    
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        // 登出
        logoutByAccount({ commit }, userInfo ) {
            return new Promise((resolve, reject) => {
                logoutByAccount({id: userInfo.userId}).then((res) => {
                    if (res.status.statusCode === 0) {
                        commit('SET_TOKEN', '')
                        commit('SET_USERINFO', {})
                        removeToken()
                        let toRoute = localStorage.getItem('toRoute')
                        localStorage.clear()
                        localStorage.setItem('toRoute', toRoute)
                        resolve(res)
                    }
                    else {
                        resolve(res)
                    }
                })
                .catch(error => {
                    reject(error)
                })
            })
        }
    }
}
  
export default user
  