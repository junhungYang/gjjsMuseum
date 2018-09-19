import Cookies from 'js-cookie'
export default {
    setProfessionList (state, payload) {
        state.professionList = payload
    },
    setTradeList (state, payload) {
        state.tradeList = payload
    },
    setCompanyInfo (state, payload) {
        state.companyInfo = payload
    },
    setUserInfo (state, payload) {
        if (!payload) {
            Cookies.remove('userInfo')
            state.userInfo = {}
        } else {
            Cookies.set('userInfo', payload)
            state.userInfo = payload
        }
    }
}
