<template>
    <FilterBox :filters="filters" @change="change"></FilterBox>
</template>

<script>
    import FilterBox from './FilterBase'
    export default {
        data () {
            return {
                sortType: [
                    {
                        name: '按时间排序',
                        value: 1
                    }
                ]
            }
        },
        computed: {
            professionList () {
                return this.$store.state.professionList
            },
            filters () {
                return this.professionList.length > 0
//                    ? { sortType: this.sortType, profession: this.professionList }
                    ? { profession: this.professionList }
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
