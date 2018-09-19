import axios from 'axios'
import qs from 'qs'
import store from '../../store'
import { interfaceUrl } from '../config'
// import router from '../router'
import {
    SUCCESS,
    NET_ERROR,
} from './statusCode.js'

/**
 * Error
 * @param state  错误码
 * @param message 错误提示用信息
 * @param response 接口返回值
 * @constructor
 */
let Error = function (state, message, response) {
    this.state = state || 0
    this.message = message || ''
    this.response = response
}
Error.prototype.handler = function () {
    switch (this.state) {
        case NET_ERROR: break
        default:
            store.commit('showError', {text: this.message})
    }
    this.state = ''
}

let sendRequest = (conf, successCallback, errorCallback) => {
    return axios(conf)
        .then((res) => {
            let code = res.data
            return new Promise((resolve, reject) => {
                if (code.status === SUCCESS) {
                    successCallback && successCallback(code.data)
                    resolve(code.data)
                } else {
                    let error = new Error(code.state, code.message, code)
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
    let params = json.data ? ('?' + qs.stringify(json.data)) : ''
    let conf = {
        url: interfaceUrl + json.url + params,
        method: json.method || 'post',
        params: json.params || null,
        // data: json.data || null,
        // withCredentials: true, // 异步维持session
        // transformRequest: [data => qs.stringify(data)],
    }
    return sendRequest(conf, json.success, json.error)
}

ajax.interfaceUrl = interfaceUrl

export default ajax
export {sendRequest}
