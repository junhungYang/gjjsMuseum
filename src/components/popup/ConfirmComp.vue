<template>
    <popup-comp position="center" :lazy-close-emit="false" v-model="show" @close="emit('close')">
        <div class="confirm-wrap">
            <div class="confirm-content" v-if="text || title">
                <div>
                    <div class="confirm-title">{{title}}</div>
                    <div class="confirm-text" v-html="text"></div>
                </div>
            </div>
            <slot></slot>
            <div class="btnBox">
                <a v-if="cancelText" @click="emit('cancel')" class="cancelBtn" :class="cancelBtnCls">{{cancelText}}</a>
                <a v-if="okText" @click="emit('ok')" class="okBtn" :class="okBtnCls">{{okText}}</a>
            </div>
        </div>
    </popup-comp>
</template>
<!-- 2018-1-20 -->
<script>
    import popupComp from './PopupCompSimplify.vue'
    export default {
        props: {
            value: Boolean,
            title: String,
            text: String,
            cancelText: {
                type: String,
                default: '取消'
            },
            okText: {
                type: String,
                default: '确定'
            },
            okBtnCls: {
                type: String
            },
            cancelBtnCls: {
                type: String
            },
            lazyCloseEmit: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                show: this.value
            }
        },
        watch: {
            value (val) {
                this.show = val
            }
        },
        methods: {
            emit (event) {
                this.show = false
                if (this.lazyCloseEmit) {
                    setTimeout(() => {
                        this.$emit(event)
                    }, 500)
                } else {
                    this.$emit(event)
                }
            }
        },
        components: {
            popupComp: popupComp
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .confirm-wrap {
        background: #fff;
        border-radius: 1rem;
        overflow: hidden;
        color: inherit;
    }
    .confirm-content {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 1.2rem 2rem;
        width: 20.0rem;
        min-height: 7rem;
        box-sizing: border-box;
    }
    .confirm-title {
        font-size: 1.6rem;
        font-weight: bold;
        margin-bottom: 0.8rem;
    }
    .confirm-text {
        font-size: 1.4rem;
    }
    .confirm-wrap .btnBox {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
    }
    .confirm-wrap .btnBox a {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        line-height: 3.5rem;
        font-size: 1.4rem;
        text-align: center;
        border-top: 1px solid #e8e8e8;
    }

    .confirm-wrap .btnBox .okBtn {
        background: #fff;
        color: #353535;
        border-top: 1px solid #e8e8e8;
        border-left: 1px solid #e8e8e8;
    }
</style>
