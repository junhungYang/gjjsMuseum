<template>
    <div class="searchJobPage">
        <SearchBoxSecond placeholder="请输入相关职业名称"/>
        <FilterJob/>
        <ListJob/>
    </div>
</template>

<script>
    import SearchBoxSecond from '../components/SearchBoxSecond'
    import FilterJob from '../components/FilterJob'
    import ListJob from '../components/ListJob'
    export default {
        components: {
            SearchBoxSecond,
            FilterJob,
            ListJob,
        }
    }
</script>
