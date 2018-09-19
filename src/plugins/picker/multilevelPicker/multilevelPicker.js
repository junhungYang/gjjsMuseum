import Picker from '../picker/picker'

class MultilevelPicker extends Picker {
    /**
     * @overwrite
     */
    init () {
        this._currentRoute = []
        super.init()
        this.off('set', [this._changeCheckedElement, this._createValueElement])
    }

    /**
     * @overwrite
     */
    _getClasses (prefix) {
        prefix = prefix || 'mlPicker'
        let CLASSES = super._getClasses(prefix)
        CLASSES.valueItem = prefix + '_valueItem'
        return CLASSES
    }

    /**
     * @overwrite
     */
    _getDefaults () {
        Object.assign(super._getDefaults(), {
            showAllChecked: false // 显示路径： 广东省 佛山市 禅城区
        })
    }

    /**
     * @overwrite
     */
    static _getOptionsMap (options) {
        let map = {}
        getMap(options)
        function getMap (arr, parent) {
            arr.forEach(item => {
                let obj = map[item.value] = {
                    name: item.name,
                    value: item.value
                }
                if (parent) obj.parent = parent
                if (item.sub) {
                    obj.sub = item.sub.map(sub => ({
                        value: sub.value,
                        name: sub.name
                    }))
                    getMap(item.sub, item.value)
                }
            })
        }
        return map
    }

    /**
     * @overwrite
     */
    _createValueElement () {
        let html = ''
        let currentRoute = this._currentRoute

        currentRoute.forEach((item, index) => {
            html += Picker._createNode('div', { class: this.CLASSES.valueItem, 'data-level': index }, item.name)
        })
        if (!this.componentEl.getElementsByClassName(this.CLASSES.optionChecked).length) {
            html += Picker._createNode('div', { class: this.CLASSES.valueItem }, '请选择')
        }

        html = Picker._createNode('div', { class: this.CLASSES.value, style: `border-color: ${this.options.color}` }, html)
        this.componentEl.getElementsByClassName(this.CLASSES.valueWrap)[0].innerHTML = html

        this.componentEl.getElementsByClassName(this.CLASSES.value)[0].addEventListener('click', e => {
            if (typeof e.target.dataset.level === 'undefined') return
            let option = currentRoute[e.target.dataset.level]
            this._toRoute(option.value, false)
        })
    }

    /**
     * @overwrite
     */
    _setChecked (value) {
        super._setChecked(value)

        this.checked.route = this._getRoute(value)

        // 不在当前路径时
        let currentRoute = this._currentRoute
        if (currentRoute.length <= 0 || currentRoute[currentRoute.length - 1].value !== value) {
            this._toRoute(value)
        }
    }

    /**
     * set element value
     * @overwrite
     */
    _setElValue () {
        let valueStr = ''
        if (this.options.showAllChecked) {
            this.checked.route.forEach(function (item) {
                valueStr += item.name + ' '
            })
            valueStr = valueStr.slice(0, -1)
        } else {
            valueStr = this.checked.name
        }
        this.el.value = valueStr
    }

    /**
     *  进入某一路径，设置当前路径_currentRoute
     * @param value  进入的路径值，
     * @param toNext 是否进入下一级,   是显示该值所在的options还是显示其子选项
     * @private
     */
    _toRoute (value, toNext = true) {
        let nextOptions = this.optionsMap[value].sub

        if (toNext && nextOptions) {
            this._createOptionElements(nextOptions)
        } else {
            let parent = this.optionsMap[value].parent
            this._createOptionElements(parent ? this.optionsMap[parent].sub : this.options.options)
            this._changeCheckedElement(value)
        }

        this._currentRoute = this._getRoute(value)

        if (!nextOptions) { // 选择了无子项的值, 触发set
            this._setChecked(value)
            this.trigger('set', value)
            this.hide()
        }

        this._createValueElement()
    }

    /**
     * @overwrite
     */
    _bindListener () {
        // hide
        this.componentEl.getElementsByClassName(this.CLASSES.mask)[0].addEventListener('click', this.hide.bind(this))

        // show
        this.el.addEventListener('click', this.show.bind(this))

        // options
        this.componentEl.getElementsByClassName(this.CLASSES.options)[0].onclick =
            (e) => this._toRoute(e.target.dataset.value)
    }

    /**
     *  get route by value
     */
    _getRoute (value, route) {
        route = route || []
        let option = this.optionsMap[value]
        if (!option) return route
        route.unshift(option)
        return this._getRoute(option.parent, route)
    }
}

export default MultilevelPicker
