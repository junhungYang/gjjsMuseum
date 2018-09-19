import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import find from './find'
import popup from './popup'
Vue.use(Vuex)
// const debug = process.env.NODE_ENV === 'development'

const store = new Vuex.Store({
    state: {
        professionList: [],
        tradeList: [],
        companyInfo: {},
        userInfo: {}
    },
    getters: {
        professionMap (state) {
            let map = {}
            state.professionList.forEach(item => {
                map[item.value] = item.name
            })
            return map
        },
        tradeMap (state) {
            let map = {}
            state.tradeList.forEach(item => {
                map[item.value] = item.name
            })
            return map
        }
    },
    mutations,
    actions,
    modules: {
        find,
        popup,
    }
    // strict: debug
})
export default store
