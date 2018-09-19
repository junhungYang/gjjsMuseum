class Picker {
    constructor (element, name, options) {
        this.el = element
        this.name = name
        this.options = Object.assign({}, this._getDefaults(), options)
        this.CLASSES = this._getClasses()
        this.checked = {}
        this.componentEl = ''
        this.STATE = {
            selected: false,
            methods: {},
        }
        this.init()
    }

    init () {
        let options = this.options
        this._elementInit()
        this.componentEl = this._createPickerComponent()
        this._checkedIcon = this.componentEl.getElementsByClassName(this.CLASSES.checkedIcon)[0]
        this._bindListener()
        this._animationDuration = this._getAnimationDuration()
        this.setOptions(options.options)

        this.on({
            set: [this._changeCheckedElement, this._createValueElement, this._setElValue]
        })

        // set default value
        if (this.options.value) {
            this.set(this.options.value)
        }

        this.on({
            set: options.onSet,
            show: options.onShow,
            hide: options.onHide
        })

        this.trigger('init')
    }

    /**
     * destroy picker
     */
    destroy () {
        this.componentEl.parentNode.removeChild(this.componentEl)
        this.trigger('destroy')
    }

    show () {
        let el = this.componentEl
        el.style.display = 'block'
        el.classList.remove(this.CLASSES.hide)

        if (this.STATE.selected) {
            // set checked middle
            let checked = el.getElementsByClassName(this.CLASSES.optionChecked)[0],
                options = checked.parentNode
            options.scrollTop = checked.offsetTop - (options.offsetHeight - checked.offsetHeight) / 2
        }

        setTimeout(() => {
            el.classList.add(this.CLASSES.active)
            this.trigger('show')
        }, 0)
    }

    hide () {
        let el = this.componentEl
        el.classList.remove(this.CLASSES.active)
        el.classList.add(this.CLASSES.hide)
        setTimeout(() => {
            el.style.display = 'none'
            this.trigger('hide')
        }, this._animationDuration)
    }

    /**
     * get value
     */
    get () {
        return this.checked.value
    }

    /**
     * set value
     */
    set (value) {
        if (value === this.checked.value) return

        this.STATE.selected = Boolean(value)

        this._setChecked(value)

        this.trigger('set', value)
    }

    /**
     * clear value
     */
    clear () {
        this.set()
    }

    /**
     * bind events
     */
    on (event, method) {
        let eventName, eventObj = {}, methods = this.STATE.methods, eventMethods

        if (typeof event !== 'object') {
            eventObj[event] = method
        } else {
            eventObj = event
        }

        for (eventName in eventObj) {
            methods[eventName] = methods[eventName] || []
            eventMethods = eventObj[eventName]
            if (!(eventMethods instanceof Array)) {
                eventMethods = [eventMethods]
            }
            eventMethods.forEach(function (method) {
                typeof method === 'function' && methods[eventName].push(method)
            })
        }

        return this
    }

    /**
     * unbind events
     */
    off (event, methods) {
        let originMethods = this.STATE.methods, name = event

        if (typeof methods === 'undefined') {
            if (name in originMethods) {
                delete originMethods[name]
            }
            return this
        }

        if (typeof methods === 'function') {
            methods = [methods]
        }

        originMethods[name] = originMethods[name].filter(val => methods.indexOf(val) < 0)

        return this
    }

    /**
     * fire off method events
     */
    trigger (name, data) {
        let methods = this.STATE.methods[name] || []
        methods.forEach(method => method.call(this, data))
        return this
    }

    /**
     * set picker options
     */
    setOptions (options) {
        if (this.checked.value) this.clear()
        this.options.options = options
        this.optionsMap = this.constructor._getOptionsMap(options)
        this._createOptionElements(options)
    }

    /**
     * get optionsMap
     */
    static _getOptionsMap (options) {
        let map = {}
        options.forEach(function (option) {
            map[option.value] = {
                value: option.value,
                name: option.name
            }
        })
        return map
    }

    /**
     * get default options
     */
    _getDefaults () {
        return {
            title: '请选择',
            color: '#f00',
            value: '', // default value
            onSet: undefined,
            onShow: undefined,
            onHide: undefined,
            options: []
        }
    }

    /**
     * get classes name
     */
    _getClasses (prefix) {
        prefix = prefix || 'myPicker'
        return {
            picker: prefix,
            active: prefix + '-active',
            input: prefix + '_input',
            inputActive: prefix + '_input-active',
            hide: prefix + '--hide',
            mask: prefix + '_mask',
            wrap: prefix + '_wrap',
            header: prefix + '_header',
            title: prefix + '_title',
            valueWrap: prefix + '_valueWrap',
            value: prefix + '_value',
            options: prefix + '_options',
            option: prefix + '_option',
            optionChecked: prefix + '_option-checked',
            checkedIcon: prefix + '_checked-i'
        }
    }

    /**
     * element init
     */
    _elementInit () {
        let el = this.el
        el.classList.add(this.CLASSES.input)
        el.readOnly = true

        this.on({
            show: function () {
                el.classList.add(this.CLASSES.inputActive)
            },
            hide: function () {
                el.classList.remove(this.CLASSES.inputActive)
            }
        })
    }

    /**
     * create picker elements
     */
    _createPickerComponent () {
        let color = this.options.color
        let wrapHtml =
            Picker._createNode('div', { class: this.CLASSES.wrap }, [
                Picker._createNode('div', { class: this.CLASSES.header },
                    Picker._createNode('div', { class: this.CLASSES.title }, this.options.title)),
                Picker._createNode('div', { class: this.CLASSES.valueWrap }),
                Picker._createNode('div', { class: this.CLASSES.options, style: `color:${color}` })
            ])

        let maskHtml = Picker._createNode('div', { class: this.CLASSES.mask })

        let checkedIcon = document.createElement('i')
        checkedIcon.classList.add(this.CLASSES.checkedIcon)
        checkedIcon.innerHTML = '<svg t="1526463705672" viewBox="200 200 624 624" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2861" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%"><defs></defs>' +
            '<path d="M464.247574 677.487844C474.214622 686.649009 489.665824 686.201589 499.086059 676.479029L798.905035 367.037898C808.503379 357.131511 808.253662 341.319801 798.347275 331.721456 788.44089 322.12311 772.62918 322.372828 763.030833 332.279215L463.211858 641.720346 498.050342 640.711531 316.608839 473.940462C306.453341 464.606085 290.653676 465.271736 281.319299 475.427234 271.984922 485.582733 272.650573 501.382398 282.806071 510.716775L464.247574 677.487844Z"' +
            'p-id="2862" fill="' + this.options.color + '">' +
            '</path></svg>'

        let el = document.createElement('div')
        el.setAttribute('id', this.name)
        el.classList.add(this.CLASSES.picker, this.CLASSES.hide)
        el.innerHTML = maskHtml + wrapHtml
        el.appendChild(checkedIcon)
        document.body.appendChild(el)

        return el
    }

    /**
     * create option elements
     */
    _createOptionElements (options) {
        let html = ''
        options.forEach(item => {
            html += Picker._createNode('span', { 'data-value': item.value }, item.name)
        })

        this.componentEl.getElementsByClassName(this.CLASSES.options)[0].innerHTML = html
    }

    /**
     * create value element
     */
    _createValueElement () {
        this.componentEl.getElementsByClassName(this.CLASSES.valueWrap)[0].innerHTML =
            Picker._createNode('div', { class: this.CLASSES.value }, this.checked.name)
    }

    /**
     * change checked option element
     */
    _changeCheckedElement (value) {
        let oldChecked = this.componentEl.getElementsByClassName(this.CLASSES.optionChecked)[0]
        let optionEl

        // remove old checked
        if (oldChecked) {
            oldChecked.classList.remove(this.CLASSES.optionChecked)
            oldChecked.removeChild(oldChecked.getElementsByClassName(this.CLASSES.checkedIcon)[0])
        }

        if (value) {
            optionEl = this.componentEl.querySelector(`[data-value="${value}"]`)
            optionEl.classList.add(this.CLASSES.optionChecked)
            optionEl.appendChild(this._checkedIcon.cloneNode(true))
        }
    }

    /**
     * set checked option by value
     */
    _setChecked (value) {
        this.checked = value ? Object.assign({}, this.optionsMap[value]) : { value: '', name: '' }
    }

    /**
     * set element value
     */
    _setElValue () {
        this.el.value = this.checked.name
    }

    /**
     * bind listener
     * mask, options, el
     */
    _bindListener () {
        // hide
        this.componentEl.getElementsByClassName(this.CLASSES.mask)[0].addEventListener('click', this.hide.bind(this))

        // show
        this.el.addEventListener('click', this.show.bind(this))

        // options
        this.componentEl.getElementsByClassName(this.CLASSES.options)[0].addEventListener('click', (e) => this.set(e.target.dataset.value))
    }

    /**
     * wrap animation duration (ms)
     */
    _getAnimationDuration () {
        try {
            let wrap = this.componentEl.getElementsByClassName(this.CLASSES.wrap)[0]
            let duration = document.defaultView.getComputedStyle(wrap, null)['transitionDuration']
            return duration.indexOf('ms') > 0 ? parseFloat(duration) : (parseFloat(duration) * 1000)
        } catch (e) {
            return 2000
        }
    }

    /**
     *
     * @param tagName
     * @param attrs {Object}
     * @param items {Array, String} 内部元素
     * @returns {string}
     */
    static _createNode (tagName, attrs, items) {
        let attributes = ''
        for (let [k, v] of Object.entries(attrs)) {
            attributes += ` ${k}="${v}"`
        }
        items = items instanceof Array ? items.join('') : (items || '')
        return '<' + tagName + attributes + '>' + items + '</' + tagName + '>'
    }
}

export default Picker
