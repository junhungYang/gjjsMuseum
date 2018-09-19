// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './css/_base.scss'
import './css/_icons.scss'
import 'swiper/dist/css/swiper.min.css'
import './js/rem'
import wechat from './js/wechat'
Vue.config.productionTip = false
// if (process.env.NODE_ENV === 'production') {
//     wechat.setWxConfig({
//         jsApiList: ['chooseImage', 'previewImage', 'uploadImage']
//     })
// }
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
