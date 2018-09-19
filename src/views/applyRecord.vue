<template>
    <div class="applyRecordPage">
        <HeaderF title="简历投放记录"/>
        <ul class="arp_list">
            <li v-for="item in list">
                <router-link :to="{ name: 'companyJob', query: { id: item.jobId }, params: { id: item.companyId } }" class="arp_i">
                    <div class="time">{{item.create_date ? item.create_date.slice(0, 10) : ''}}<br/>{{item.create_date ? item.create_date.slice(10) : ''}}</div>
                    <div class="right">
                        <p class="jobName">{{item.jobName}}</p>
                        <p>{{item.companyName}}</p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import HeaderF from '../components/HeaderF'
    import { getApplyRecord } from '../js/sendRequest/sendRequest'
    import DropLoad from '../js/dropLoad'
    export default {
        data () {
            return {
                list: [],
                pageNo: 0,
                pageSize: 20,
                pageCount: 1,
                dropLoad: null
            }
        },
        mounted () {
            this.dropLoad = new DropLoad(this.$el, {
                load: this.getApplyRecord,
                preLoad: true
            })
        },
        methods: {
            getApplyRecord () {
                return getApplyRecord({
                    pageNo: this.pageNo + 1,
                    pageSize: this.pageSize
                }).then(data => {
                    this.list = this.list.concat(data.list)
                    this.pageCount = data.pageCount
                    this.pageNo = data.pageNo
                    if (data.pageCount === data.pageNo) {
                        this.dropLoad.stop()
                    }
                })
            }
        },
        destroyed () {
            this.dropLoad.destroy()
        },
        components: {
            HeaderF,
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .arp_i {
        display: flex;
        align-items: center;
        padding: 0.5rem 1rem;
        font-size: 1.2rem;
        line-height: 2rem;
        border-bottom: 1px solid #e8e8e8;
        &:after {
            content: '>';
            font-weight: bold;
            font-family: simsun;
            margin-left: 0.7rem;
        }
        .time {
            font-size: 1.0rem;
        }
        .jobName {
            font-weight: bold;
        }
        .right {
            flex: 1;
            p {
                text-align: right;
            }
        }
    }
</style>
