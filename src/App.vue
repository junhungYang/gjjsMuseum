<template>
    <div id="app">
        <router-view/>
        <Toast/>
        <Confirm/>
    </div>
</template>

<script>
    import Confirm from './components/popup/Confirm'
    import Toast from './components/popup/Toast'
    import { autoLogin } from './js/config'

    export default {
        name: 'App',
        created () {
            this.$store.dispatch('getProfessionList')
            this.$store.dispatch('getTradeList')
            if (autoLogin) this.$store.dispatch('login')
        },
        components: {
            Confirm,
            Toast,
        }
    }
</script>

