<template>
    <div class="searchJobPage">
        <SearchBoxSecond placeholder="请输入相关企业名称"/>
        <FilterCompany/>
        <ListCompany/>
    </div>
</template>

<script>
    import SearchBoxSecond from '../components/SearchBoxSecond'
    import FilterCompany from '../components/FilterCompany'
    import ListCompany from '../components/ListCompany'
    export default {
        components: {
            SearchBoxSecond,
            FilterCompany,
            ListCompany,
        }
    }
</script>
