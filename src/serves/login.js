import reqFunc from './index.js'
import HOST_CONF from '../../build/config.js'
let loginURL = HOST_CONF.baseUrl

//	登录
export function login(data) {
    return reqFunc.post(`${loginURL}/user/login`, data)
}
//	退出
export function logout(data) {
    return reqFunc.get(`${loginURL}/user/logout`, data)
}