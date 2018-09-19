import {
    getProfessionList,
    getTradeList,
    getCompanyInfo,
    getUserInfo,
    saveUserInfo,
    logout,
    login,
    register
} from '../js/sendRequest/sendRequest'
import { autoLogin } from '../js/config'
import Cookies from 'js-cookie'

export default {
    getProfessionList ({commit}) {
        getProfessionList().then(data => {
            commit('setProfessionList', data.map(item => ({
                value: item.id,
                name: item.profession
            })))
        })
    },
    getTradeList ({commit}) {
        getTradeList().then(data => commit('setTradeList', data.map(item => ({
            value: item.id,
            name: item.tradeName
        }))))
    },
    getCompanyInfo ({commit}, id) {
        getCompanyInfo(id).then(data => commit('setCompanyInfo', data))
    },
    getUserInfo ({commit}) {
        getUserInfo().then(data => commit('setUserInfo', data))
    },
    saveUserInfo ({commit}, payload) {
        if (payload.areaCode) {
            payload.area = payload.areaCode
        }
        if (payload.education) {
            payload.educatin = payload.education
        }
        saveUserInfo(payload).then(() => commit('setUserInfo', payload))
    },
    logout ({commit}) {
        logout().then(() => commit('setUserInfo', null))
    },
    login ({commit}, payload) {
        if (!payload && autoLogin) {
            payload = Cookies.getJSON('loginInfo')
        }
        login(payload).then(data => {
            if (autoLogin) Cookies.set('loginInfo', payload)
            commit('setUserInfo', data)
        })
    },
    register ({commit}, payload) {
        register(payload).then()
    }
}
