import wx from 'weixin-js-sdk'
import ajax from './ajax'
import { getUrlQuery, session, storage } from './utils'
import Cookies from 'js-cookie'

let wechat = {
    // appId: 'wxc74dc9f02674b0a7', // 测试号
    appId: 'wx039f3ef5e9976eb1',  // 服务器
    openid: storage.get('openid'),
    configParam: {
        debug: false,
        timestamp: '',
        nonceStr: '',
        signature: ''
    },
    authCode: getUrlQuery('code'),
    scanQrCode (cb) {
        // console.log(this.configParam)
        wx.scanQRCode({
            desc: 'scanQRCode desc',
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
            success (res) {
                let result = res.resultStr
                cb && cb(result)
            },
            error (res) {
                if (res.errMsg.indexOf('function_not_exist') > 0) {
                    alert('版本过低请升级')
                }
            }
        })
    },
    chooseImage (cb) {
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                let localIds = res.localIds   // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                wx.uploadImage({
                    localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: function (res) {
                        let serverId = res.serverId   // 返回图片的服务器端ID
                        cb && cb(serverId)
                    }
                })
            }
        })
    },
    getConfigParam (cb) {
        ajax({
            url: '/common/weChat/getweChatInfo',
            success: (data) => {
                this.configParam.timestamp = data.timestamp
                this.configParam.nonceStr = data.nonceStr
                this.configParam.signature = data.signature
                cb()
            }
        })
    },
    setWxConfig ({jsApiList, ready, error}) {
        let set = () => {
            wx.config({
                debug: this.configParam.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: this.appId, // 必填，公众号的唯一标识
                timestamp: this.configParam.timestamp, // 必填，生成签名的时间戳
                nonceStr: this.configParam.nonceStr, // 必填，生成签名的随机串
                signature: this.configParam.signature, // 必填，签名，见附录1
                // jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                jsApiList: jsApiList
            })
            ready && wx.ready(ready)
            error && wx.fail(error)
        }
        if (this.configParam.timestamp) {
            set()
        } else {
            this.getConfigParam(set)
        }
    },
    /**
     * 获取微信授权的code，
     * @param clearQuery 是否重定向至url没有参数code和state的页面
     * @returns {String} code || ''
     */
    getCode (clearQuery = true) {
        if (clearQuery) {
            if (getUrlQuery('state') === 'wechat') { // 授权后重定向回来，则将code存到session后，重定向至没有参数code和state的页面
                session.set('wechat_code', getUrlQuery('code'))
                let url = window.location.href
                window.location.href = url.substring(0, url.indexOf('?'))
            } else {    // 判断session中是否已经有code
                let code = session.get('wechat_code')
                if (code) {
                    session.remove('wechat_code')
                    return code
                }
            }
        } else {
            if (getUrlQuery('state') === 'wechat') {
                return getUrlQuery('code')
            }
        }
        return ''
    },
    /**
     * 移动端
     * 重定向至 获取微信验证授权的url 并 重定向至reUrl，reUrl带code
     * reUrl默认为当前页
     * @param reUrl
     */
    wechatAuth (reUrl) {
        if (session.get('wechat_code')) return
        let redirectUri = encodeURIComponent(reUrl || window.location.href)
        // let currentUrl = encodeURIComponent('http://16535j5e29.51mypc.cn/anlianExam/mobile/index.html#/signUp');
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + this.appId +
            '&redirect_uri=' + redirectUri +
            '&response_type=code&scope=snsapi_userinfo' +
            '&state=' + 'wechat' +
            '#wechat_redirect'
    },
    /**
     * 移动端获取openid
     * @param cb
     */
    getOpenid (cb) {
        if (this.openid) {
            if (!Cookies.get('openid')) {
                Cookies.set('openid', this.openid)
            }
            cb && cb()
            return
        }
        let code = this.getCode(true)
        if (!code) {
            this.wechatAuth()
            return
        }
        ajax({
            url: '/common/weChat/getOpenid',
            data: {
                code: code
            },
            success: (data) => {
                this.openid = data.openid
                storage.set('openid', data.openid)
                Cookies.set('openid', data.openid)
                cb && cb()
            },
            error: (e) => {
                alert(e.message)
            }
        })
    },
}
export default wechat
