import { login, logout } from '@/serves/login.js'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
    state: {
        token: getToken(),
        userInfo: '',

    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        }
    },
    actions: {
        login({ state, commit }, loginInfo) {
            return new Promise((resolve, reject) => {
                login(loginInfo).then((res) => {
                    if (res.status.statusCode === 0) {
                        const data = res.result
                        commit('SET_TOKEN', data.token)
                        setToken(data.token)
                        localStorage.setItem('userInfo', JSON.stringify(data))
                        resolve()
                    } else {
                        resolve(res.status.statusReason)
                    }
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        logout({ state, commit }, userId) {
            return new Promise((resolve, reject) => {
                logout({id: userId}).then((res) => {
                    if (res.status.statusCode === 0) {
                        removeToken()
                        localStorage.clear()
                        resolve()
                    } else {
                        resolve(res.status.statusReason)
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