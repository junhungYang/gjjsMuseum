<template>
    <div class="companyIntro" v-html="introduction"></div>
</template>

<script>
    export default {
        computed: {
            introduction () {
                return this.$store.state.companyInfo.content
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
