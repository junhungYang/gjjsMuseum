<template>
    <div id="app">
        <!--<address-slt></address-slt>-->
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'app',
    }
</script>

<style lang="scss">
    @import "./css/_base.scss";
    #app{
        width: 100%;
        min-height: 100vh;
        background: url("./assets/images/bgImg.png") #e4dfcb;
        background-size: 100%;
        position: relative;
    }
</style>
