<template>
    <div class="companyPage" v-if="i.id">
        <div class="cp_header">
            <div class="top">
                <img :src="i.logoUrl" class="logo">
                <div class="name">{{i.companyName}}</div>
                <div class="labels">{{tradeMap[i.tradeId]}} · {{compScaleMap[i.personCount]}}</div>
            </div>
            <dl>
                <dt>详细地址：</dt><dd>{{i.addressDetail}}</dd>
            </dl>
            <dl>
                <dt>客服热线：</dt><dd>{{i.companyPhone}}</dd>
            </dl>
        </div>
        <div class="tabs" v-if="noJobPage">
            <router-link to="introduction">公司简介</router-link>
            <router-link to="jobList">招聘职位 ({{i.jobCount}})</router-link>
        </div>
        <router-view/>
    </div>
</template>

<script>
    import { COMP_SCALE_MAP } from '../../js/constData'

    export default {
        data () {
            return {
                compScaleMap: COMP_SCALE_MAP,
            }
        },
        created () {
            this.$store.dispatch('getCompanyInfo', this.id)
        },
        computed: {
            tradeMap () {
                return this.$store.getters.tradeMap
            },
            id () {
                return this.$route.params.id
            },
            noJobPage () {
                return this.$route.name !== 'companyJob'
            },
            i () {
                return this.$store.state.companyInfo
            }
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .companyPage {
        .tabs {
            font-size: 1.2rem;
            font-weight: bold;
            height: 3.5rem;
            display: flex;
            border-bottom: 1px solid #e8e8e8;
            a {
                flex: 1;
                height: 100%;
                line-height: 3.5rem;
                text-align: center;
                position: relative;
                &:first-child:before {
                    content: '';
                    display: block;
                    border-right: 1px solid #e8e8e8;
                    height: 70%;
                    position: absolute;
                    right: 0;
                    top: 16%;
                }
            }
            .router-link-exact-active {
                color: #0070ba;
            }
        }
    }
    .cp_header {
        border-bottom: 0.5rem solid #f5f5f5;
        .top {
            padding: 0 1.9rem;
            height: 8.4rem;
            background: #0070ba;
        }
        .name {
            padding: 2.1rem 0 1.6rem;
            font-size: 1.3rem;
            color: #fff;
            font-weight: bold;
        }
        .labels {
            font-size: 1.0rem;
            color: #fff;
        }
        .logo {
            display: block;
            float: right;
            margin-top: 1.6rem;
            width: 5rem;
            height: 5rem;
            border-radius: 1rem;
            overflow: hidden;
            border: 1px solid #e8e8e8;
        }
        dl {
            display: flex;
            padding: 0.9rem 1.9rem;
            font-size: 1.2rem;
            line-height: 1.5rem;
            border-bottom: 1px solid #e8e8e8;
        }
        dt {
            font-weight: bold;
            min-width: 6.5rem;
        }
    }
</style>
