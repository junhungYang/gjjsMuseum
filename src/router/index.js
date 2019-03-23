import Vue from 'vue'
import Router from 'vue-router'
// import wechat from '../js/wechat'

const index = r => require.ensure([], () => r(require('../pages/index.vue')), 'index')  // 按需加载
const enlistRecord = r => require.ensure([], () => r(require('../pages/enlistRecord.vue')), 'enlistRecord')
const login = r => require.ensure([], () => r(require('../pages/login.vue')), 'login')
const shortcut = r => require.ensure([], () => r(require('../pages/shortcut.vue')), 'shortcut')
const scan = r => require.ensure([], () => r(require('../pages/scan.vue')), 'scan')
const addInfo = r => require.ensure([], () => r(require('../pages/addInfo.vue')), 'addInfo')
const formMapByGroup = r => require.ensure([], () => r(require('../pages/formMapByGroup.vue')), 'formMapByGroup')

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            component: index,
            name: index
        },
        {
            path: '/formMapByGroup',
            name: 'formMapByGroup',
            component: formMapByGroup
        },
        {
            path: '/enlistRecord',
            component: enlistRecord,
            name: enlistRecord
        },
        {
            path: '/login',
            component: login,
            name: login
        },
        {
            path: '/shortcut',
            component: shortcut,
            name: shortcut
        },
        {
            path: '/scan',
            component: scan,
            name: scan,
            meta: {
                requiresLogin: true
            }
        },
        {
            path: '/addInfo',
            component: addInfo,
            name: addInfo
        }
    ]
})
router.beforeEach((to, from, next) => {
    // wechat.wechatAuth()
    // let timestamp = new Date().getTime()
    let isLogin = window.sessionStorage.getItem('isLogin')
    if (to.meta.requiresLogin) {
        isLogin === 'true' ? next() : next({path: '/login'})
    } else {
        next()
    }
})

export default router
