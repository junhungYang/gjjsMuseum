const popup = {
    state: {
        confirm: {
            show: false,
            className: '',
            title: '',
            text: '',
            ok: null,
            cancel: null,
            close: null,
            okText: null,
            cancelText: null
        },
        toast: {
            show: false,
            title: '',
            content: '',
        },
    },
    mutations: {
        showToast (state, payload = {title: ''}) { // @param payload {String} || {title,content}
            let {title, content} = payload
            typeof payload === 'string' && (title = payload)
            state.toast = { title, content, show: Boolean(title) }
        },
        showError (state, payload = {text: ''}) { // @param payload {String} || {text, cb}
            let {text, cb} = payload
            typeof payload === 'string' && (text = payload)
            this.commit('showConfirm', { text, cancel: cb, cancelText: '确定', okText: '' })
        },
        showConfirm (state, payload) {
            payload.show = true
            state.confirm = payload
        },
        hideConfirm (state) {
            state.confirm.ok =
            state.confirm.cancel =
            state.confirm.show =
            state.confirm.close =
            state.confirm.okText =
            state.confirm.cancelText =
            state.confirm.className =
                false
        },
    },
}
export default popup
