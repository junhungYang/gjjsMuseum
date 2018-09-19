import { findJob, findCompany } from '../js/sendRequest/sendRequest'

const PAGE_INIT_INFO = {
    pageNo: 0,
    pageSize: 20,
    pageCount: 1
}
let getCount = 0 // 调用getNextPage的次数

export default {
    namespaced: true,
    state: {
        filters: {},
        list: [],
        pageInfo: Object.assign({}, PAGE_INIT_INFO),
        type: '',
        getMethod: null,
        clearState: 0, // 有变化代表重置所有参数
    },
    mutations: {
        setType (state, payload) {
            this.commit('find/reset')
            state.type = payload
            switch (payload) {
                case 'job':
                    state.getMethod = findJob
                    break
                case 'company':
                    state.getMethod = findCompany
            }
        },
        setList (state, payload) {
            state.list = payload
        },
        setPageInfo (state, payload) {
            state.pageInfo = payload
        },
        initPageInfo (state, payload) {
            state.pageInfo = Object.assign({}, PAGE_INIT_INFO)
        },
        setFilters (state, payload) {
            state.filter = payload
        },
        addFilters (state, payload) {
            Object.assign(state.filters, payload)
            state.list = []
            this.commit('find/initPageInfo')
            this.dispatch('find/getNextPage')
        },
        clear (state) { // 清空数据和过滤参数，不包括type
            state.clearState++
            state.list = []
            state.filters = {}
            this.commit('find/initPageInfo')
        },
        reset (state) { // 重置所有
            state.type = ''
            state.getMethod = null
            state.list = []
            state.filters = {}
            this.commit('find/initPageInfo')
        }
    },
    actions: {
        /**
         *  return {Boolean} true 有下一页， false 没有下一页
         */
        getNextPage ({ commit, state }) {
            if (state.pageInfo.pageCount === state.pageInfo.pageNo) return false

            let params = Object.assign({}, state.filters, state.pageInfo)
            params.pageNo++

            let getIndex = getCount++
            return state.getMethod(params).then(data => {
                if (getIndex + 1 !== getCount) {
                    return '这次数据已失效'
                }
                commit('setList', state.list.concat(data.list))
                commit('setPageInfo', {
                    pageCount: data.pageCount,
                    pageSize: data.pageSize,
                    pageNo: data.pageNo
                })
                return data.pageCount > data.pageNo
            })
        }
    }
}
