import axios from 'axios'
import qs from 'qs'
import {
    SUCCESS,
} from './statusCode.js'
// import { storage } from './utils'
// import router from '../router/index'
// import Cookies from 'js-cookie'
// import wechat from './wechat'

let Error = function (status, message) {
    this.status = status || 0
    this.message = message || ''
}
// Error.prototype.handler = function () {
//     switch (this.status) {
//         case 100:
//             let current = router.name
//             if (storage.get('openid')) {
//                 Cookies.set('openid', storage.get('openid'))
//                 router.go({name: current})
//             } else {
//                 wechat.getOpenid(() => {
//                     router.go({name: current})
//                 })
//             }
//             break
//     }
//     this.state = ''
// }
let sendRequest = (conf, successCallback, errorCallback) => {
    return axios(conf)
        .then((res) => {
            let code = res.data
            return new Promise((resolve, reject) => {
                if (code.status === SUCCESS) {
                    successCallback && successCallback(code.data)
                    resolve(code.data)
                } else {
                    let error = new Error(code.status, code.message)
                    if (errorCallback) {
                        errorCallback(error)
                    } else {
                        error.handler()
                    }
                }
            })
        })
}
let ajax = function (json) {
    // console.log(json);
    // let interfaceUrl = 'http://192.168.3.152:8080/nfrb'
    // let interfaceUrl = 'http://192.168.3.5:8080/nfrb'
    let interfaceUrl = 'http://nfrb.ydcycloud.com/nfrb'
    // let interfaceUrl = 'http://muqin.free.ngrok.cc/nfrb'
    let conf = {
        url: interfaceUrl + json.url,
        method: json.method || 'post',
        params: json.params || null,
        data: json.data || null,
        // withCredentials: true,  // 异步维持session
        transformRequest: [data => qs.stringify(data)],
    }
    return sendRequest(conf, json.success, json.error)
}
export default ajax
