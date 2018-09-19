import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Cookies from 'js-cookie'

const index = () => import('@/views/index')
const companyList = () => import('@/views/companyList')
const personal = () => import('@/views/personal')
const searchCompany = () => import('@/views/searchCompany')
const searchJob = () => import('@/views/searchJob')
const infoInput = () => import('@/views/infoInput')
const certificate = () => import('@/views/certificate')
const applyRecord = () => import('@/views/applyRecord')
const company = () => import('@/views/company/company')
const companyIntroduction = () => import('@/views/company/introduction')
const companyJob = () => import('@/views/company/job')
const companyJobList = () => import('@/views/company/jobList')
const changePassword = () => import('@/views/changePassword')
Vue.use(Router)

let router = new Router({
    routes: [
        {
            path: '/',
            component: index,
            name: 'index',
        },
        {
            path: '/companyList',
            component: companyList,
            name: 'companyList'
        },
        {
            path: '/personal',
            component: personal,
            name: 'personal',
            meta: {
                // checkAuth: true
            }
        },
        {
            path: '/searchCompany',
            component: searchCompany,
            name: 'searchCompany'
        },
        {
            path: '/searchJob',
            component: searchJob,
            name: 'searchJob'
        },
        {
            path: '/personal/register',
            component: infoInput,
            name: 'register'
        },
        {
            path: '/personal/infoModify',
            component: infoInput,
            name: 'infoModify',
            meta: {
                checkAuth: true
            }
        },
        {
            path: '/personal/certificate',
            component: certificate,
            name: 'certificate',
            meta: {
                checkAuth: true
            }
        },
        {
            path: '/personal/applyRecord',
            component: applyRecord,
            name: 'applyRecord',
            meta: {
                checkAuth: true
            }
        },
        {
            path: '/personal/changePassword',
            component: changePassword,
            name: 'changePassword',
            meta: {
                checkAuth: true
            }
        },
        {
            path: '/company/:id',
            component: company,
            name: 'company',
            redirect: '/company/:id/introduction',
            children: [
                {
                    path: 'job',
                    component: companyJob,
                    name: 'companyJob'
                },
                {
                    path: 'jobList',
                    component: companyJobList,
                    name: 'companyJobList'
                },
                {
                    path: 'introduction',
                    component: companyIntroduction,
                    name: 'companyIntroduction'
                }
            ]
        },
    ]
})

/*
 *   验证是否需要登录，控制路由跳转
 * */
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.checkAuth)) { // 是否需要登录
        if (!logined()) {
            store.commit('showError', '请先登录')
            next({
                path: '/personal'
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

function logined () {
    if (store.state.userInfo.name) {
        return true
    }
    let userInfo = Cookies.getJSON('userInfo')
    if (userInfo) {
        store.commit('setUserInfo', userInfo)
        return true
    }
    return false
}

export default router
