// 获取url参数
function getUrlQuery (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) return (r[2])
    return ''
}

// Storage
let Storage = function (storage) {
    return {
        set: (key, val) => {
            let str = typeof val !== 'string' ? JSON.stringify(val) : val
            storage.setItem(key, str)
        },
        get: (key) => {
            return storage.getItem(key)
        },
        getJSON: (key) => {
            return JSON.parse(storage.getItem(key))
        },
        remove: (key) => {
            storage.removeItem(key)
        }
    }
}
const storage = new Storage(window.localStorage)
const session = new Storage(window.sessionStorage)

/**
 * 解决输入文本框获取焦点后，输入法影响fixed布局问题
 * 元素需添加fixed类名
 */
function resolveFixed () {
    let timer
    document.querySelectorAll('input[type=text], textarea').forEach((el) => {
        el.addEventListener('focus', () => {
            clearTimeout(timer)
            document.getElementsByClassName('fixed').forEach((el2) => {
                el2.style.top = el2.offsetTop + 'px'
            })
        })
    })
    document.querySelectorAll('input[type=text], textarea').forEach((el) => {
        el.addEventListener('blur', () => {
            timer = setTimeout(() => {  // 延迟是等待输入法消失
                document.getElementsByClassName('fixed').forEach((el2) => {
                    el2.style.top = ''
                })
            }, 200)
        })
    })
}

// 获取当前时间，格式YYYY-MM-DD
function getNowFormatDate () {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let strDate = date.getDate()
    if (month >= 1 && month <= 9) {
        month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
    }
    let currentdate = year + '-' + month + '-' + strDate
    return currentdate
}

export {
    getUrlQuery,
    resolveFixed,
    storage,
    session,
    getNowFormatDate,
}
