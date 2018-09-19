<template>
    <div class="companyJobList">
        <ListJob :show-type="2"  :filters="{ companyId: $store.state.companyInfo.id }"/>
    </div>
</template>

<script>
    import ListJob from '../../components/ListJob'
    export default {
        components: {
            ListJob,
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
