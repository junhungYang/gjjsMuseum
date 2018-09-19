<template>
    <div class="companyListComp">
        <div class="list">
            <router-link v-for="item in companyList" class="company" :to="'/company/' + item.id" :key="item.id">
                <div class="left">
                    <img :src="item.logoUrl" class="logo">
                    <p class="name">{{item.companyName}}</p>
                    <p class="area">{{compAreaMap[item.areaCode]}}</p>
                    <div class="labels">
                        <span>{{tradeMap[item.tradeId]}}</span>
                        <span>{{compScaleMap[item.personCount]}}</span>
                    </div>
                </div>
                <div class="right">
                    <span>招聘职位</span>
                    <div class="jobCount">{{item.jobCount}}种</div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    import { COMP_SCALE_MAP, COMP_AREA_MAP } from '../js/constData'
    import DropLoad from '../js/dropLoad'

    export default {
        data () {
            return {
                compScaleMap: COMP_SCALE_MAP,
                compAreaMap: COMP_AREA_MAP,
                dropLoad: null
            }
        },
        mounted () {
            this.$store.commit('find/setType', 'company')
            this.dropLoad = new DropLoad(this.$el, {
                load: () => {
                    return new Promise(resolve => {
                        this.$store.dispatch('find/getNextPage').then(resolve)
                    })
                },
                preLoad: true
            })
        },
        destroyed () {
            this.dropLoad.destroy()
        },
        computed: {
            companyList () {
                if (this.$store.state.find.type !== 'company') return []
                return this.$store.state.find.list
            },
            tradeMap () {
                return this.$store.getters['tradeMap']
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../css/_base.scss";

    .companyListComp {
        .company {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem;
            border-bottom: 1px solid #e8e8e8;
            font-size: 1.2rem;
            &:last-child {
                border-bottom: none;
            }
        }
        .left {
            width: 23.5rem;
        }
        .logo {
            float: left;
            width: 5rem;
            height: 5rem;
            border: 1px solid #e8e8e8;
            border-radius: 1rem;
            overflow: hidden;
            margin-right: 1rem;
            box-sizing: border-box;
        }
        .name {
            font-size: 1.3rem;
            font-weight: bold;
            max-width: 18.5rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 2.5rem;
        }
        .area {
            line-height: 2.0rem;
            padding-bottom: 0.5rem;
        }
        .labels {
            margin-top: 0.45rem;
            font-size: 0;
            span {
                display: inline-block;
                height: 1.8rem;
                margin-right: 0.5rem;
                padding: 0 0.5rem;
                font-size: 1.0rem;
                color: #8e8e8e;
                background: #e8e8e8;
                line-height: 1.8rem;
            }
        }
        .right {
            text-align: center;
            line-height: 1.6rem;
        }
        .jobCount {
            color: #0070ba;
            font-size: 1.3rem;
            font-weight: bold;
        }
    }
</style>
