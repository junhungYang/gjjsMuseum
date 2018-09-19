<template>
    <div class="headerF">
        <h3>{{title}}</h3>
    </div>
</template>

<script>
    export default {
        props: ['title']
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .headerF {
        border-bottom: 0.5rem solid #f5f5f5;
        h3 {
            height: 3.1rem;
            line-height: 3.1rem;
            font-size: 1.3rem;
            text-align: center;
            font-weight: bold;
            border-bottom: 1px solid #e8e8e8;
        }
    }
</style>
