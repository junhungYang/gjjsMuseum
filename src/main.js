// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store/store'
import './js/rem'
import wechat from './js/wechat'
import './js/html2canvas'
import { getInsideVersion, getUserInfoFromInside } from './js/appJuc'
import { setUserUuid } from './js/sendRequest'

Vue.config.productionTip = false

Vue.filter('formatDate', val => {  // 截取日期后两位
    return val.substr(val.length - 2, 2)
})
Vue.filter('formatDate1', val => {  // 判断上午下午
    if (val === '9:30-10:30' || val === '10:30-11:30' || val === '上午') {
        return '上午'
    } else {
        return '下午'
    }
})
Vue.filter('formatDate2', val => {
    if (val === '上午') {
        return '9:30-11:30'
    } else if (val === '下午') {
        return '15:00-17:00'
    } else {
        return val
    }
})
        /* eslint-disable no-new */
let ua = navigator.userAgent.toLowerCase()
let isWeixn = (ua && ua.match(/MicroMessenger/i) == "micromessenger") ? true : false
if (isWeixn) {
    wechat.getOpenid(() => {
        new Vue({
            el: '#app',
            router,
            store,
            template: '<App/>',
            components: {App}
        })
    })
    wechat.setWxConfig({
        jsApiList: ['scanQRCode', 'translateVoice', 'checkJsApi', 'chooseImage', 'previewImage', 'uploadImage']
    })
} else {
    let Url = 'http://nfrb.ydcycloud.com/nfrb/dist/index.html'
    //获取版本信息
    getInsideVersion(function (res) {
        if (!res) {
            //获取版本失败时 触发openApp方法进入应用宝下载链接
            window.openApp(12, false, true, Url, Url)
        } else {
            //获取版本成功，并且版本号大于或等于3.8.0时
            if (res >= 380) {
                if(res >= 460) {
                    getUserInfoFromInside(function (userInfo) {
                    //假如返回的数据中有phone以及userUuid时
                    if (userInfo.phone && userInfo.userUuid) {
                        setUserUuid({userUuid: userInfo.userUuid}).then(() => {
                            new Vue({
                                el: '#app',
                                router,
                                store,
                                template: '<App/>',
                                components: {App}
                            })
                        })
                    } else {
                        //假如没有phone或userUuid,触发以下代码跳转到登录页面
                        window.location.href = 'getLoginPhoneInfo:///'
                        window.getLoginUserData = function (userData) {
                            // 进入登录回调方法需要先隐藏绑定手机号弹框
                            // 隐藏绑定手机号弹窗代码
                            // 获取登录信息
                            // 返回的是字符串，需要转换为Object
                            let data = JSON.parse(userData);
                            if (data.userUuid !== '') {
                                // 得到用户的userUuid
                                setUserUuid({userUuid: data.userUuid}).then(() => {
                                    new Vue({
                                        el: '#app',
                                        router,
                                        store,
                                        template: '<App/>',
                                        components: {App}
                                    })
                                })
                            }
                        }
                    }
                    })
                }else {
                    // 低于4.6.0版本直接获取登录信息
                    // 进入登录协议头获取登录信息
                    window.location.href = 'getLoginPhoneInfo:///';
                    window.getLoginUserData = function (userData) {
                        // 进入登录回调方法需要先隐藏绑定手机号弹框
                        // 隐藏绑定手机号弹窗代码
                        // 获取登录信息
                        // 返回的是字符串，需要转换为Object
                        let data = JSON.parse(userData);
                        if (data.userUuid !== '') {
                            // 得到用户的userUuid
                            setUserUuid({userUuid: data.userUuid}).then(() => {
                                new Vue({
                                    el: '#app',
                                    router,
                                    store,
                                    template: '<App/>',
                                    components: {App}
                                })
                            })
                        }
                    }
                }
            } else {
                tips.show('请升级到最新版本')
            }
        }
    })
}
