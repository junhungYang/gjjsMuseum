// import store from './store'
export default {
    selectedDay (state, day) {
        state.selectedInfo.daySltActive = day
    },
    ticketType (state, type) {
        state.selectedInfo.ticketType = type
    },
    selectSpec (state, payload) {
        state.selectedInfo.selectedSpec = payload
    },
    selectSingleCount (state, payload) {
        state.selectedInfo.singleCount = payload
    },
    selectTime (state, payload) {
        state.selectedInfo.selectedTime = payload
    },
    addContactInfo (state, payload) {
        state.selectedInfo.contactName = payload.contactName
        state.selectedInfo.contactPhone = payload.contactPhone
        state.selectedInfo.area = payload.area
        state.selectedInfo.sex = payload.sex
        state.selectedInfo.areaCode = payload.areaCode
        state.selectedInfo.remark = payload.remark
    },
    setScanStatus (state, status) {
        state.scanStatus = status
    },
    showMessage (state, payload) {
        state.showMessage = payload
    },
    setVisitNotice (state, payload) {
        state.visitNotice = payload
    },
    changepullup(state,payload){
        state.pullupshow = payload
    },
    Store_setFormMapByGroup(state, payload) {
        state.Store_formMapByGroup = payload

    }
}
