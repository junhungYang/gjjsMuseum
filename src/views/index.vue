<template>
    <div class="indexPage">
        <div class="indexP_top">
            <SearchBoxFirst placeholder="请输入相关职业名称" @search="search"/>
            <div class="slideshow">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="item in slideshow">
                        <a class="li" :style="'background-image: url(' + item.imageUrl + ')'"></a>
                    </div>
                </div>
            </div>
        </div>
        <FilterJob/>
        <ListJob/>
        <FooterComp/>
    </div>
</template>

<script>
    import Swiper from 'swiper'
    import FooterComp from '../components/FooterComp'
    import SearchBoxFirst from '../components/SearchBoxFirst'
    import FilterJob from '../components/FilterJob'
    import ListJob from '../components/ListJob'
    import { getSlideshow } from '../js/sendRequest/sendRequest'
    export default {
        data () {
            return {
                slideshow: []
            }
        },
        methods: {
            getSlideshow () {
                getSlideshow().then(data => {
                    this.slideshow = data
                    this.$store.commit('find/setType', 'job')
                    this.$store.dispatch('find/getNextPage')
                    this.$nextTick(() => {
                        /* eslint-disable no-new */
                        new Swiper('.slideshow', {
                            speed: 1500,
                            effect: 'fade',
                            loop: true,
                            autoplay: {
                                delay: 3000,
                            }
                        })
                    })
                })
            },
            search (wd) {
                this.$router.push('/searchJob?wd=' + wd)
            }
        },
        created () {
            this.getSlideshow()
        },
//        mounted () {
//            alert(JSON.stringify(this.$store.state.find.pageInfo))
//        },
        components: {
            FooterComp,
            FilterJob,
            ListJob,
            SearchBoxFirst,
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .indexP_top {
        background: #f5f5f5;
        padding: 1rem 0;
        .slideshow {
            width: 30rem;
            height: 15rem;
            margin: 1rem auto 0;
            .li {
                width: 30rem;
                display: block;
                height: 15rem;
                background: center no-repeat;
                background-size: 100%;
            }
        }
    }
</style>
