const ENV_LIST = {
    // 测试环境
    test: { 
        baseUrl: 'ws://127.0.0.1:22011',
        loginUrl: 'http://42.159.7.11:8083' // 登录
    }
}

//没有设置环境，则默认为第一个
const env = process.env.ENV
const HOST_CONF = ENV_LIST[env] || {} // {baseUrl: '', loginUrl: ''}

export default HOST_CONF