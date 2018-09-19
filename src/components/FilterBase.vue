<template>
    <div class="filterBox">
        <div class="item hide-select" v-for="filterItem, key in filterList">
            <span class="checkedName" :style="{ maxWidth: checkedNameMaxLength }">{{checked[key].name}}</span><i
            class="downArrow-i_01"></i>
            <select @change="check(key, $event)">
                <option v-for="option in filterItem" :value="option.value">{{option.name}}</option>
            </select>
        </div>
    </div>
</template>

<script>
    import { COMP_AREA_LIST } from '../js/constData'

    export default {
        props: {
            filters: {
                type: Object,
            }
        },
        data () {
            return {
                checkedIndex: {},
                checkedValue: {},
                checked: {},
                filterList: {},
                areaFilterKey: 'area'
            }
        },
        watch: {
            filters () {
                this.init()
            },
            checked () {
                Object.keys(this.checked).forEach(key => {
                    this.checkedValue[key] = this.checked[key].value
                })
                this.$emit('change', this.checkedValue)
            },
            '$store.state.find.clearState' () {
                this.init()
            }
        },
        created () {
            this.init()
        },
        computed: {
            checkedNameMaxLength () {
                return 32 / (Object.keys(this.filterList).length || 1) - 2 + 'rem' // 1.5是 箭头图片所占宽度
            }
        },
        methods: {
            init () {
                this.filterList = Object.assign({areaCode: COMP_AREA_LIST}, this.filters) // 添加area
                Object.keys(this.filterList).forEach(key => {
                    this.checked[key] = {
                        index: 0,
                        name: this.filterList[key][0].name,
                        value: this.filterList[key][0].value
                    }
                })
            },
            check (key, event) {
                let index = event.target.selectedIndex
                let option = this.filterList[key][index]
                let temp = {}
                temp[key] = {
                    index: index,
                    value: option.value,
                    name: option.name
                }
                this.checked = Object.assign({}, this.checked, temp)
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .filterBox {
        display: flex;
        font-size: 1.3rem;
        height: 3rem;
        border-top: 1px solid #e8e8e8;
        border-bottom: 1px solid #e8e8e8;
        .item {
            flex: auto;
            height: 100%;
            text-align: center;
            line-height: 3rem;
            border-right: 1px solid #e8e8e8;
            width: 1px;
            display: flex;
            align-items: center;
            justify-content: center;
            &:last-child {
                border-right: none;
            }
            .checkedName {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                display: inline-block;
            }
        }
        i {
            margin-left: 0.3rem;
        }
    }
</style>
