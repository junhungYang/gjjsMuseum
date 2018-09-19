/**
 * 构造函数{ showTips: false }
 * DropLoad(el, options)
 * el: loadingTips append 的元素，如设置了overflowY 则同是滚动的监听元素
 * options:
 *      load: 下拉后触发的回调函数, 该函数需返回Promise
 *      distance: Number，则以px为单位，可以为带rem的字符串。default: 35px
 *      showTips: Boolean 是否显示正在加载的提示 default: true
 *      preLoad: Boolean / Object 是否预先加载一次，即在构造实例时执行1次load，为对象时即默认预加载。
 *          preLoad 为对象时,可设置的属性：{
 *                  showTips: 是否在预加载时显示提示，default: false
 *              }
 */

/**
 * 实例的属性：
 *   el：绑定的元素,
 *   options： 当前配置,
 *   isLoading：是否正在加载
 *
 * 实例的方法：
 *   start: 开始监听
 *   stop: 停止监听
 *   destroy: 销毁实例,会移除提示的html节点元素
 */
class DropLoad {
    constructor (el, options) {
        this.el = el
        this.options = this._getOptions(options)
        this.isLoading = false
        this._loadingTipsEl = this._createLoadingEl()
        this._isWindowScroll = isWindowScroll(el)
        this._scrollEl = this._isWindowScroll ? window : el
        this._scrollFunc = this._getScrollFunc()
        this.start()
        // bind this
        this._endLoading = this._endLoading.bind(this)
        this._startLoading = this._startLoading.bind(this)
        this._preLoad()
    }

    start () {
        this._scrollEl.addEventListener('scroll', this._scrollFunc)
    }

    stop () {
        this._scrollEl.removeEventListener('scroll', this._scrollFunc)
    }

    destroy () {
        this.stop()
        if (this.isLoading) this._endLoading()
        this.el.removeChild(this._loadingTipsEl)
    }

    /**
     * start loading
     */
    _startLoading () {
        this.isLoading = true
        if (this.options.showTips) {
            this._loadingTipsEl.style.visibility = 'visible'
        }
    }

    /**
     * end loading
     */
    _endLoading () {
        this.isLoading = false

        if (this.options.showTips) {
            this._loadingTipsEl.style.visibility = 'hidden'
        }
    }

    /**
     * 处理预加载
     */
    _preLoad () {
        if (!this.options.preLoad.ifDo) return
        if (!this.options.preLoad.showTips) {
            let temp = this.options.showTips
            this.options.showTips = false
            Promise.resolve(this._scrollFunc()).then(() => (this.options.showTips = temp))
        } else {
            this._scrollFunc()
        }
    }

    /**
     * get scroll listener function
     * @return {Function}
     */
    _getScrollFunc () {
        let el = this._isWindowScroll ? document.documentElement : this.el

        let getScrollTop = () => {
            getScrollTop = this._isWindowScroll
                ? () => document.body.scrollTop || document.documentElement.scrollTop
                : () => el.scrollTop
            return getScrollTop()
        }

        let func = function () {
            if ((el.scrollHeight - el.clientHeight - getScrollTop()) <= this.options.distance) { // 判断是否滚动到底部阈值
                if (this.isLoading) return
                this._startLoading()
                return Promise.resolve(this.options.load()).then(this._endLoading)
            }
        }
        return func.bind(this)
    }

    /**
     * handle options
     */
    _getOptions (options) {
        let res = Object.assign({
            load: null,
            distance: 35,
            showTips: true,
        }, options)

        // preLoad 配置
        let preLoad = {
            ifDo: false,
            showTips: false
        }
        if (typeof res.preLoad === 'object') {
            Object.assign(preLoad, res.preLoad, { ifDo: true })
        } else if (res.preLoad === true) {
            preLoad.ifDo = true
        }
        res.preLoad = preLoad

        // 若distance为rem转为px
        if ((options.distance + '').indexOf('rem') > 0) {
            res.distance = parseFloat(options.distance) * parseFloat(document.documentElement.style.fontSize)
        }

        return res
    }

    /**
     * return loading tips element
     */
    _createLoadingEl () {
        if (!this.options.showTips) return

        let div, i, span, text
        div = document.createElement('div')
        i = document.createElement('i')
        span = document.createElement('span')
        text = document.createTextNode('正在加载')
        div.setAttribute('class', 'dropLoading')
        i.setAttribute('class', 'dropLoading-i')
        span.appendChild(text)
        div.appendChild(i)
        div.appendChild(span)

        this.el.appendChild(div)
        return div
    }
}

// 根据元素是否设置overflowY 判断滚动元素是window还是el
function isWindowScroll (el) {
    let overflowY = el.currentStyle
        ? el.currentStyle['overflow-y']
        : document.defaultView.getComputedStyle(el, null)['overflow-y']
    return overflowY !== 'scroll'
}

export default DropLoad
