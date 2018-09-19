<template>
    <div class="footerComp-cont">
        <div class="footerComp">
            <router-link to="/" :class="{ on: routeName === 'index' }">
                <i class="necktie-i_01"></i>
                首页
            </router-link>
            <router-link to="companyList" :class="{ on: routeName === 'companyList' }">
                <i class="building-i_01"></i>
                企业
            </router-link>
            <router-link to="personal" :class="{ on: routeName === 'personal' }">
                <i class="user-i_01"></i>
                个人中心
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            routeName () {
                return this.$route.name
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .footerComp-cont {
        height: 5rem;
    }
    .footerComp {
        display: flex;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 4.4rem;
        box-shadow: 0 0.2rem 1rem #a8a8a8;
        background: #fff;
        z-index: 10;
        > a {
            flex: 1;
            display: block;
            position: relative;
            text-align: center;
            font-size: 1.2rem;
            color: #8e8e8e;
            font-weight: bold;
            &.on {
                color: #0070bc;
            }
            &:after {
                content: '';
                display: block;
                position: absolute;
                height: 3rem;
                border-right: 1px solid #e8e8e8;
                right: 0;
                top: 50%;
                margin-top: -1.5rem;
            }
            &:last-child:after {
                display: none;
            }
            i {
                display: block;
                height: 2rem;
                margin: 0.5rem auto 0.2rem;
            }

        }
    }
</style>
