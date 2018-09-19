<template>
    <confirm-comp
            v-model="show"
            :class="className"
            :title="title"
            :text="text"
            :cancel-text="cancelText"
            :ok-text="okText"
            @ok="ok" @cancel="cancel" @close="close"
    />
</template>
<!-- 2018-1-20 -->
<script>
    import confirmComp from './ConfirmComp.vue'
    export default {
        computed: {
            show () {
                return this.$store.state.popup.confirm.show
            },
            className () {
                return this.$store.state.popup.confirm.className
            },
            title () {
                return this.$store.state.popup.confirm.title
            },
            text () {
                return this.$store.state.popup.confirm.text
            },
            okText () {
                let text = this.$store.state.popup.confirm.okText
                return typeof text === 'string' ? text : '确定'
            },
            cancelText () {
                let text = this.$store.state.popup.confirm.cancelText
                return typeof text === 'string' ? text : '取消'
            }
        },
        methods: {
            ok () {
                let val = this.$store.state.popup.confirm.ok()
                try {
                    return val.then(() => this.$store.commit('showConfirm'))
                } catch (e) {}
                this.$store.commit('hideConfirm')
            },
            cancel () {
                try {
                    this.$store.state.popup.confirm.cancel()
                } catch (e) {}
                this.$store.commit('hideConfirm')
            },
            close () {
                let confirm = this.$store.state.popup.confirm
                try {
                    confirm.close ? confirm.close() : confirm.cancel()
                } catch (e) {}
                this.$store.commit('hideConfirm')
            }
        },
        components: {
            confirmComp
        }
    }
</script>
