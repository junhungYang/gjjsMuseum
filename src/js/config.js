const baseUrl = process.env.NODE_ENV === 'production'
    ? 'http://zp.tootgroups.com'
    // ? 'http://192.168.1.9:8081'
    // ? 'http://192.168.1.21:10086'
    // : 'http://192.168.0.101:10086'
    : 'http://192.168.1.18:8080'
    // : 'http://192.168.1.21:10086'
    // : 'http://192.168.43.116:8080'

const interfaceUrl = baseUrl + '/deqingRecruit/'

const autoLogin = false // 是否开启自动登录

export {
    interfaceUrl,
    autoLogin,
}
