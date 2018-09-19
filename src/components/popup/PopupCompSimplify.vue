<template>
    <div class="popup-wrap" :class="{noFixed: noFixed}">
        <transition name="popup-mask-fade">
            <div class="popup-mask" v-show="show && isMaskShow" @click="close()" :style="!isMaskShow ? { backgroundColor: 'transparent'} : ''"></div>
        </transition>
        <transition :name="'popup-' + position" >
            <div  class="popup-content fixed" :class="'popup-' + position" v-show="show">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>
<!-- update 取消 滚动限制-->
<!--延迟数据清空 建议在数据所在组件中用setTimeout(,300)-->
<!-- 2018-1-20 -->
<script>
    export default {
        props: {
            value: Boolean,
            isMaskShow: {
                type: Boolean,
                default: true
            },
            position: {
                type: String,
                default: 'center'
            },
            noFixed: { // 非fixed 布局
                type: Boolean,
                default: false
            },
            lazyCloseEmit: {
                type: Boolean,
                default: true
            }
        },
        data: function () {
            return {
                show: this.value
            }
        },
        watch: {
            value: function (val) {
                this.show = val
                // if (val) {
                //     document.querySelector('body').style.overflow = 'hidden'
                // } else {
                //     document.querySelector('body').style.overflow = ''
                // }
            },
            show (val) {
                if (!val) {
                    if (this.lazyCloseEmit) {
                        setTimeout(() => {
                            this.$emit('close')
                        }, 500)
                    } else {
                        this.$emit('close')
                    }
                }
            }
        },
        methods: {
            close: function () {
                // if (this.lazyCloseEmit) {
                //     setTimeout(() => {
                //         this.$emit('close')
                //     }, 500)
                // } else {
                //     this.$emit('close')
                // }
                this.show = false
            }
        },
        // destroyed () {
        //     this.show && (document.querySelector('body').style.overflow = '')
        // }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    /* popup-wrap */
    .popup-wrap{
        position: fixed;
        z-index: 501;
        max-width: 640px;
        width: 100%;
        margin: 0 auto;
        color: inherit;
    }
    .popup-wrap.noFixed {
        position: relative;
        z-index: 0;
    }

    .popup-mask{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: -1;
        background:rgba(0,0,0,0.2);
        opacity: 1;
        transition: opacity .3s;
    }
    .popup-mask-fade-enter-active,
    .popup-mask-fade-leave-active {
        opacity: 1;
    }
    .popup-mask-fade-enter,
    .popup-mask-fade-leave-active{
        opacity: 0;
    }
    .popup-content {
        position: fixed;
        z-index: 103;
        max-width: inherit;
        opacity: 1;
        transition-duration: .3s;
        transition-property: transform,-webkit-transform;
    }

    .noFixed .popup-content {
        position: relative;
    }
    .popup-bottom {
        bottom: 0;
        width: 100%;
    }
    .popup-top {
        top: 0;
        width: 100%;
    }
    .popup-left {
        left: 0;
        height: 100%;
        top: 0;
    }
    .popup-right {
        right: 0;
        height: 100%;
        top: 0;
    }
    .popup-center {
        top: 45%;
        left: 50%;
        opacity: 1;
        -webkit-transform: translate3d(-50%, -60%, 0);
        transform: translate3d(-50%, -60%, 0);
        transition-duration: .3s;
        transition-property: opacity;
    }
    .popup-bottom-enter,
    .popup-bottom-leave-active{
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
    }
    .popup-top-enter,
    .popup-top-leave-active{
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
    }
    .popup-right-enter,
    .popup-right-leave-active{
        -webkit-transform: translate3d(100%, 0, 0);
        transform: translate3d(100%, 0, 0);
    }
    .popup-left-enter,
    .popup-left-leave-active{
        -webkit-transform: translate3d(-100%, 0, 0);
        transform: translate3d(-100%, 0, 0);
    }
    .popup-center-enter,
    .popup-center-leave-active{
        opacity: 0;
    }
</style>
