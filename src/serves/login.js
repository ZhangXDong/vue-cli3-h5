import reqFunc from './index.js'

//  刷卡登录
// export function loginByCard(data) {
//     return reqFunc.post('/user/loginByCard', data)
// }

// 账号登陆
export function loginByAccount(data) {
    return reqFunc.post('/user/loginSaasForMobile', data)
}

// 账号退出
export function logoutByAccount(data) {
    return reqFunc.get('/user/logout', data)
}