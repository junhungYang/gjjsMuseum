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
import axios from 'axios'




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
let ua = navigator.userAgent.toLowerCase()
let isWeixn = (ua && ua.match(/MicroMessenger/i) == "micromessenger") ? true : false
if (isWeixn) {
    wechat.getOpenid(() => {
        /* eslint-disable no-new */
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
    getInsideVersion(function (res) {
        if (!res) {
            window.openApp(12, false, true, Url, Url)
        } else {
            if (res >= 380) {
                getUserInfoFromInside(function (userInfo) {
                    // alert(`phone=${userInfo.phone}&userUuid=${userInfo.userUuid}&version=大于等于380`)
                    if (userInfo.userUuid) {
                        // axios.get(`http://nfrb.ydcycloud.com/common/user/addUserUuid?userUuid=${userInfo.userUuid}`).then(res => {
                        //     console.log(res)
                        // })
                         Vue.prototype.uphone = !!userInfo.phone;
                                setUserUuid({userUuid: userInfo.userUuid}).then((res) => {
                                    // alert(res)
                                    new Vue({
                                        el: '#app',
                                        router,
                                        store,
                                        template: '<App/>',
                                        components: {App}
                                    })
                                })
                        window.getLoginUserData = function (userData) {
                            // 进入登录回调方法需要先隐藏绑定手机号弹框
                            // 隐藏绑定手机号弹窗代码
                            // 获取登录信息
                            // 返回的是字符串，需要转换为Object
                            let data = JSON.parse(userData);
                            // alert(`data=${userData}&version=低于380`)
                            if (data.userUuid !== '') {
                                // 得到用户的userUuid
                                Vue.prototype.uphone = !!data.phone;
                                setUserUuid({userUuid: data.userUuid}).then((res) => {
                                    // alert(res)
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
                    } else {
                        window.location.href = 'getLoginPhoneInfo:///'
                        // 获取登录信息
                        // 该方法需要提前实现在全局下，当调用登录协议头时，客户端会调用该方法并传值
                        /*
						返回样例："{"userUuid":"fdfsafds-fdfsdfsdf-fdfasfsdf-fdsaff"}"
						*/
                        window.getLoginUserData = function (userData) {
                            // 进入登录回调方法需要先隐藏绑定手机号弹框
                            // 隐藏绑定手机号弹窗代码
                            // 获取登录信息
                            // 返回的是字符串，需要转换为Object
                            let data = JSON.parse(userData);
                            // alert(`data=${userData}&version=低于380`)
                            if (data.userUuid !== '') {
                                
                                // 得到用户的userUuid
                                Vue.prototype.uphone = !!data.phone;
                                setUserUuid({userUuid: data.userUuid}).then((res) => {
                                    // alert(res)
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
            } else {
                tips.show('请升级到最新版本')
            }
        }
    })
}

