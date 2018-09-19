<template>
    <div class="searchBox_2">
        <SearchBoxFirst ref="search" :placeholder="placeholder" @search="search"></SearchBoxFirst>
        <a class="clearBtn" @click="clear">重置</a>
    </div>
</template>

<script>
    import SearchBoxFirst from './SearchBoxFirst'

    export default {
        props: ['placeholder'],
        methods: {
            search (wd) {
                this.$store.commit('find/addFilters', {jobName: wd})
            },
            clear () {
                this.$refs.search.clear()
                this.$store.commit('find/clear')
            }
        },
        components: {
            SearchBoxFirst,
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../css/_base.scss";

    .searchBox_2 {
        background: #0070ba;
        padding: 1rem;
        padding-right: 0.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .searchBox_1 {
            border-color: #0070ba;
            width: 26.7rem;
            margin: 0;
        }
        .clearBtn {
            display: block;
            min-width: 3rem;
            height: 2.6rem;
            line-height: 2.6rem;
            padding: 0 0.5rem;
            color: #fff;
            font-size: 1.2rem;
        }
    }
</style>
