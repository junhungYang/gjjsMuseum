<template>
    <div class="companyListPage">
        <div class="companyListP_top">
            <SearchBoxFirst placeholder="请输入相关企业名称" @search="search"/>
        </div>
        <FilterCompany/>
        <ListCompany/>
        <FooterComp/>
    </div>
</template>

<script>
    import FooterComp from '../components/FooterComp'
    import SearchBoxFirst from '../components/SearchBoxFirst'
    import FilterCompany from '../components/FilterCompany'
    import ListCompany from '../components/ListCompany'
    export default {
        methods: {
            search (wd) {
                this.$router.push('/searchCompany?wd=' + wd)
            }
        },
        components: {
            FooterComp,
            FilterCompany,
            SearchBoxFirst,
            ListCompany,
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .companyListP_top {
        background: #f5f5f5;
        padding: 1rem 0;
    }
</style>
