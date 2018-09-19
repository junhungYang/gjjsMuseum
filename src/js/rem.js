(function () {
    let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
    let reset = function () {
        let html = document.documentElement
        let clientWidth = html.clientWidth
        if (!clientWidth) return
        html.style.fontSize = (clientWidth / 32 > 20 ? 20 : clientWidth / 32) + 'px'
    }
    window.addEventListener(resizeEvt, reset)
    reset()
    document.addEventListener('DOMContentLoaded', reset)
}())
