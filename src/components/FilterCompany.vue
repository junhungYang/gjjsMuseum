<template>
    <FilterBox :filters="filters" @change="change"></FilterBox>
</template>

<script>
    import FilterBox from './FilterBase'
    export default {
        computed: {
            tradeList () {
                return this.$store.state.tradeList
            },
            filters () {
                return this.tradeList.length > 0
                    ? { trade: this.tradeList }
                    : {}
            }
        },
        methods: {
            change (value) {
                this.$store.commit('find/addFilters', value)
            }
        },
        components: {
            FilterBox
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../css/_base.scss";

</style>
