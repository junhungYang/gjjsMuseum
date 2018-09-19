<template>
    <div class="toast-wrap">
        <transition name="toast-fade">
            <div class="toast-content" v-show="show">
                <div>
                    <p class="toast-title" v-text="title"></p>
                    <p class="toast-text" v-if="content" v-text="content"></p>
                </div>
            </div>
        </transition>
    </div>
</template>
<!--2018-1-19-->
<script>
    export default {
        data () {
            return {
                show: false,
                timer: -1,
                title: '',
                content: '',
            }
        },
        watch: {
            '$store.state.popup.toast' (val) {
                this.show = val.show
                if (val.show) {
                    this.title = val.title
                    this.content = val.content
                    clearTimeout(this.timer)
                    this.timer = setTimeout(() => this.$store.commit('showToast'), 1500)
                }
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .toast-wrap {
        position: fixed;
        z-index: 5000;
    }
    .toast-content {
        position: fixed;
        top: 40%;
        left: 50%;
        z-index: 2000;
        min-width: 16rem;
        min-height: 8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0,0,0,0.4);
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        padding: 0 2rem;
        /*border-radius: 6px;*/
        opacity: 1;
        white-space: nowrap;
        box-sizing: border-box;
    }
    .toast-title {
        color: #fff;
        font-size: 1.6rem;
        text-align: center;
        padding: 0.5rem 0;
    }
    .toast-text {
        color: #fff;
        font-size: 1.4rem;
        text-align: center;
        padding: 1.2rem 0;
    }
    .toast-fade-enter-active,
    .toast-fade-leave-active {
        opacity: 1;
        -webkit-transition: opacity .3s linear;
        transition: opacity .3s linear;
    }
    .toast-fade-enter, .toast-fade-leave-active{
        opacity: 0;
    }

</style>
