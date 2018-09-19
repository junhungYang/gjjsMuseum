<template>
    <div class="jobListComp">
        <div class="list">
            <router-link v-for="item in jobList" class="job" :to="'/company/' + item.companyId + '/job?id=' + item.id"
                         :key="item.id">
                <div class="h">
                    <span class="name">{{item.jobName}}</span>
                    <span class="salary">{{item.salary}}</span>
                </div>
                <div class="h" v-if="showType === 1">
                    <span>{{item.companyName}}</span>
                    <span>{{item.area}}</span>
                </div>
                <div class="h">
                    <div class="labels">
                        <span>{{item.profession}}</span>
                        <span>{{expTimeMap[item.expTime]}}</span>
                        <span>{{item.personCount}}人</span>
                    </div>
                    <span class="datetime">{{item.datetime ? item.datetime.slice(0, 10) : ''}}</span>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    import { EXP_TIME_MAP, COMP_AREA_MAP } from '../js/constData'
    import DropLoad from '../js/dropLoad'

    export default {
        props: {
            // showType:   1 显示中间的公司名和地区 其他不显示
            showType: {
                type: Number,
                default: 1
            },
            filters: {
                type: Object,
            }
        },
        data () {
            return {
                expTimeMap: EXP_TIME_MAP,
                compAreaMap: COMP_AREA_MAP,
                dropLoadOption: {
                    callback: () => {
                        return new Promise((resolve) => {
                            setTimeout(resolve, 3000)
                        })
                    },
                    distance: 35,
                    loading: true,
                    listen: true
                }
            }
        },
        mounted () {
            console.log('-----------')
            this.$store.commit('find/setType', 'job')
            if (this.filters) this.$store.commit('find/setFilters', 'job')
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
            jobList () {
                if (this.$store.state.find.type !== 'job') return []
                if (this.filters && this.filters.companyId) {
                    let list = []
                    this.$store.state.find.list.forEach((i) => {
                        if (i.companyId === this.filters.companyId) {
                            list.push(i)
                        }
                    })
                    return list
                }
                return this.$store.state.find.list
            },
            professionMap () {
                return this.$store.getters['professionMap']
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .jobListComp {
        font-size: 1.1rem;
        line-height: 1;
        .job {
            display: block;
            padding: 1rem 1rem 0;
            border-bottom: 1px solid #e8e8e8;
            &:last-child {
                border-bottom: none;
            }
        }
        .h {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }
        .name {
            font-size: 1.3rem;
            font-weight: bold;
        }
        .salary {
            color: #0070bc;
            font-weight: bold;
            font-size: 1.3rem;
        }
        .labels {
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
        .datetime {
            color: #8e8e8e;
            font-size: 1.0rem;
        }
    }
</style>
