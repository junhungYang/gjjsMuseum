/* eslint-disable no-undef */
import ajax from './ajax'
import { getUrlQuery, storage, session } from './utils'
import Cookies from 'js-cookie'
const OPTION = {
    appId: 'wxc443ae2839acf81d',
    reUrl: '', // 授权后的重定向url
    delOrder: 'common/signUp/cancelPayMent',
    getConfigParam: 'common/weChat/getweChatInfo',
    getOpenid: 'common/weChat/getOpenid',
    testOpenid: '',
    debug: false
}

let wechat = {
    appId: OPTION.appId,
    payParam: {
        timestamp: '',
        nonceStr: '',
        package: '',
        signType: '',
        paySign: '',
        orderCode: '' // 订单号
    },
    configParam: {
        debug: false,
        timestamp: '',
        nonceStr: '',
        signature: ''
    },
    openid: process.env.NODE_ENV === 'production'
        ? storage.get('openid')
        : OPTION.testOpenid,
    isWechat () {
        let ua = navigator.userAgent.toLowerCase()
        return Boolean(ua.match(/MicroMessenger/i))
    },
    /**
     * 获取微信授权的code，
     * @param clearQuery 是否重定向至url没有参数code和state的页面
     */
    getCode (clearQuery = true) {
        let code
        if (getUrlQuery('state') === 'wechat') {
            code = getUrlQuery('code')
            if (!clearQuery) return code
            // 授权后重定向回来，则将code存到session后，重定向至没有参数code和state的页面
            session.set('wechat_code', getUrlQuery('code'))
            let url = window.location.href
            window.location.href = url.replace(/[?|&]code=.*(?=[#|$])/, '')
            return
        }
        code = session.get('wechat_code')
        if (code) {
            session.remove('wechat_code')
            return code
        } else {
            this.wechatAuth()
        }
    },
    /**
     * PC 端授权登录
     * 重定向至 获取微信验证授权的url 并 重定向至reUrl，reUrl带code,state = wechat
     * authorize -> getCode
     */
    authorize (reUrl) {
        let redirectUri = encodeURIComponent(reUrl || OPTION.reUrl || window.location.href)
        window.location.href = 'https://open.weixin.qq.com/connect/qrconnect?' +
            'appid=' + this.appId +
            '&redirect_uri=' + redirectUri +
            '&response_type=code' +
            '&scope=snsapi_login' +
            '&state=' + 'wechat'
    },
    /**
     * 移动端
     * 重定向至 获取微信验证授权的url 并 重定向至reUrl，reUrl带code
     * reUrl默认为当前页
     * @param reUrl
     */
    wechatAuth (reUrl) {
        if (this.openid) storage.remove('openid') // 强制重新认证时，需清除openid
        let redirectUri = encodeURIComponent(reUrl || OPTION.reUrl || window.location.href)
        // let currentUrl = encodeURIComponent('http://16535j5e29.51mypc.cn/anlianExam/mobile/index.html#/signUp');
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + this.appId +
            '&redirect_uri=' + redirectUri +
            '&response_type=code&scope=snsapi_userinfo' +
            '&state=' + 'wechat' +
            '#wechat_redirect'
    },
    /**
     * 移动端获取openid
     * @return {*}
     */
    getOpenid () {
        if (this.openid) {
            return Promise.resolve(this.openid).then(res => {
                Cookies.set('openid', res)
            })
        }
        let code = this.getCode(true)
        if (!code) throw new Error('no Code')
        this.openid = new Promise(resolve => {
            ajax({
                url: OPTION.getOpenid,
                data: {
                    code: code
                },
                success: (data) => {
                    let openid = data.openid
                    this.openid = openid
                    storage.set('openid', openid)
                    Cookies.set('openid', openid)
                    resolve(openid)
                },
                error: (e) => {
                    alert(JSON.stringify(e))
                }
            })
        })
        return this.openid
    },
    paySubmit ({success, error}) {
        var This = this
        wx.chooseWXPay({
            timestamp: This.payParam.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: This.payParam.nonceStr, // 支付签名随机串，不长于 32 位
            package: This.payParam.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            signType: This.payParam.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: This.payParam.paySign, // 支付签名
            success: function (res) {
                if (res.errMsg === 'chooseWXPay:ok') {
                    success && success()
                }
            },
            fail: function () {
                error && error()
            },
            cancel: function () {
                error && error()
            }
        })
    },
    deleteOrder (orderCode, cb) {
        ajax({
            url: OPTION.delOrder,
            data: {
                orderCode: orderCode
            },
            success: () => {
                cb && cb()
            }
        })
    },
    /**
     * getConfigParam
     */
    getConfigParam (cb) {
        ajax({
            url: OPTION.getConfigParam,
            success: (data) => {
                this.configParam.timestamp = data.timestamp
                this.configParam.nonceStr = data.nonceStr
                this.configParam.signature = data.signature
                cb()
            }
        })
    },
    /**
     *
     * @param jsApiList 需要使用的JS接口列表
     * @param ready config完毕后的回调
     * @param error config出错后的回调
     */
    setWxConfig ({jsApiList, ready, error}) {
        let set = () => {
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: this.appId, // 必填，公众号的唯一标识
                timestamp: this.configParam.timestamp, // 必填，生成签名的时间戳
                nonceStr: this.configParam.nonceStr, // 必填，生成签名的随机串
                signature: this.configParam.signature, // 必填，签名，见附录1
                // jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表 https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
                jsApiList: jsApiList
            })
            ready && wx.ready(ready)
            wx.error(e => {
                if (OPTION.debug) alert(JSON.stringify(e))
                error && error()
            })
        }
        if (this.configParam.timeStamp) {
            set()
        } else {
            this.getConfigParam(set)
        }
    },
    /**
     * 设置微信分享内容
     * @param option
     * @param ways
     * timeline.option {title, link, imgUrl, success, cancel} 朋友圈
     * QQ,weibo,QZone  {title, desc, link, imgUrl,...}
     * appMessage {title, desc, link, imgUrl, type, dataUrl,...} 分享给朋友
     *      type - 分享类型,music、video或link，不填默认为link
     *      dataUrl - 如果type是music或video，则要提供数据链接，默认为空
     * link - 分享链接, timeline, appMessage, 该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
     */
    setShareOption (option, ways = ['timeline', 'appMessage', 'QQ', 'weibo', 'QZone']) {
        ways.indexOf('timeline') > -1 && wx.onMenuShareTimeline(option)
        ways.indexOf('appMessage') > -1 && wx.onMenuShareAppMessage(option)
        ways.indexOf('QQ') > -1 && wx.onMenuShareQQ(option)
        ways.indexOf('weibo') > -1 && wx.onMenuShareWeibo(option)
        ways.indexOf('QZone') > -1 && wx.onMenuShareQZone(option)
    }
}
export default wechat

/**
 *  imagePreview  vue指令
 *  v-image-preview
 *  检索绑定元素 或 其子元素的所有img标签，点击时触发微信jsdk的 previewImage
 */
const imagePreview = {
    bind (el, binding) {
        // 绑定元素为img时
        if (el.tagName.toLowerCase() === 'img') {
            el.addEventListener('click', () => {
                wx.previewImage({
                    current: el.getAttribute('src'),
                    urls: []
                })
            })
            return
        }
        // else
        let imgUrlList = []
        el.getElementsByTagName('img').forEach((el) => {
            imgUrlList.push(el.getAttribute('src'))
        })

        el.addEventListener('click', (event) => {
            let target = event.target
            if (target.tagName.toLowerCase() === 'img') {
                wx.previewImage({
                    current: target.getAttribute('src'), // 当前显示图片的http链接
                    urls: imgUrlList // 需要预览的图片http链接列表
                })
            }
        })
    }
}

/**
 // 微信选择图片
 wx.chooseImage({
     count: count,
     sizeType: sizeType, // 可以指定是原图还是压缩图，默认二者都有
     sourceType: sourceType, // 可以指定来源是相册还是相机，默认二者都有
     success: function (res) {
        // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
     },
     fail: function (res) {
        if (OPTION.debug) alert(JSON.stringify(res))
     }
 })
 */
/**
 * uploadImage   调用微信uploadImage
 * @param localIds
 * @param progress   default 1
 * @returns {Promise}  resolve(res)
 * res = {
 *     fail: 0,  // 上传失败的个数
 *     serverIds: [],
 *     localIds: [],
 * }
 */
function uploadImage (localIds, progress = 1) {
    let result = {
        fail: 0, // 上传失败的个数
        serverIds: [],
        localIds: [],
    }
    let chain = Promise.resolve()
    localIds.forEach(localId => {
        if (!localId) return
        chain = chain.then(() => {
            return new Promise(resolve => {
                wx.uploadImage({
                    localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: progress, // 默认为1，显示进度提示
                    success: function (res) {
                        // var serverId = res.serverId; // 返回图片的服务器端ID
                        // alert('upload success' + JSON.stringify(res))
                        result.serverIds.push(res.serverId)
                        result.localIds.push(localId)
                        resolve()
                    },
                    fail: function (res) {
                        if (OPTION.debug) alert(JSON.stringify(res))
                        result.fail++
                        resolve()
                    }
                })
            })
        })
    })
    return chain.then(() => result)
}

export {
    imagePreview,
    uploadImage,
}
