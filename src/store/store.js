import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)
const debug = process.env.NODE_ENV === 'development'

const store = new Vuex.Store({
    state: {
        selectedInfo: {    // 已选择的报名信息
            daySltActive: 0, // 选择的日期下标
            ticketType: 2, // 1个人票  2团体票
            selectedSpec: -1, // 进场人数下标
            selectedTime: -1, // 时间段下标
            contactName: '',  // 联系名
            contactPhone: '',  // 电话
            sex: 1,  // 1男  2女
            area: '',  // 地址
            areaCode: '', // 地区码
            singleCount: 1, // 单人票数
        },
        Store_formMapByGroup:  null,
        scanStatus: 300, // 核销状态
        showMessage: false, // 显示报名后页面弹出消息
        visitNotice: '', // 参观须知
        pullupshow:false //弹窗显示
    },
    mutations,
    actions,
    strict: debug
})
export default store
