<template>
    <div class="jobPage">
        <div class="jp_info block">
            <div class="top">
                <div class="name">{{i.jobName}}</div>
                <div class="salary">{{i.salary}}</div>
            </div>
            <dl>
                <dt>所属行业：</dt>
                <dd>{{i.profession}}</dd>
            </dl>
            <dl>
                <dt>经验需求：</dt>
                <dd>{{expTimeMap[i.expTime]}}</dd>
                <dt>学历要求：</dt>
                <dd>{{educationMap[i.educatin]}}</dd>
            </dl>
            <dl>
                <dt>报名截止：</dt>
                <dd>{{i.endDate ? i.endDate.slice(0, 10) : ''}}</dd>
                <dt>招募人数：</dt>
                <dd>{{i.personCount}}人</dd>
            </dl>
        </div>
        <div class="block">
            <h6>职位描述</h6>
            <p class="content">{{i.introduce}}</p>
        </div>
        <div class="block">
            <h6>职位要求</h6>
            <p class="content">{{i.requirement}}</p>
        </div>
        <a class="btn" v-if="i.state === jobState.enable" @click="submit">立即投递</a>
        <a class="btn disabled" v-else>{{i.state === jobState.disabled ? '已暂停招聘' : '你已投递'}}</a>
    </div>
</template>

<script>
    import { getJobDetail, applyJob } from '../../js/sendRequest/sendRequest'
    import { EXP_TIME_MAP, EDUCATION_MAP, JOB_STATE } from '../../js/constData'

    export default {
        data () {
            return {
                i: {},
                expTimeMap: EXP_TIME_MAP,
                educationMap: EDUCATION_MAP,
                jobState: JOB_STATE
            }
        },
        created () {
            this.getJobDetail()
        },
        computed: {
            id () {
                return this.$route.query.id
            },
            professionMap () {
                return this.$store.getters.professionMap
            }
        },
        methods: {
            getJobDetail () {
                getJobDetail(this.id).then(data => {
                    this.i = data
                })
            },
            submit () {
                if (this.$store.state.userInfo.name) {
                    applyJob(this.id).then(() => {
                        this.$store.commit('showToast', '成功投递简历')
                        this.i.state = this.jobState.done
                    })
                } else {
                    this.$store.commit('showConfirm', {
                        text: '请先登录',
                        okText: '确定',
                        cancelText: '取消',
                        ok: () => {
                            this.$router.push('/personal')
                        },
                        cancel: () => {
                        },
                        close: () => {
                        }
                    })
                }
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .jobPage {
        .block {
            position: relative;
            padding-bottom: 0.6rem;
            &:after {
                position: absolute;
                bottom: 0;
                left: 0;
                content: '';
                display: block;
                width: 100%;
                border-top: 1px solid #e8e8e8;
                height: 0.5rem;
                background: #f5f5f5;
            }
            h6 {
                font-size: 1.2rem;
                font-weight: bold;
                padding: 1rem 0.8rem;
                line-height: 1;
            }
            .content {
                line-height: 1.5rem;
                font-size: 1.2rem;
                padding: 0 1.9rem;
                margin-bottom: 0.9rem;
            }
        }
        .btn {
            display: block;
            margin: 1rem auto 2rem;
            width: 92%;
            height: 2.5rem;
            background: #0070ba;
            font-size: 1.2rem;
            font-weight: bold;
            letter-spacing: 0.2rem;
            border-radius: 1rem;
            color: #fff;
            text-align: center;
            line-height: 2.5rem;
            &.disabled {
                background-color: #8e8e8e;
            }
        }
    }

    .jp_info {
        padding: 0 1.2rem 0 1.9rem;
        box-sizing: border-box;
        .top {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            padding: 1.4rem 0 1.2rem;
        }
        .name {
            font-size: 1.5rem;
            font-weight: bold;
        }
        .salary {
            font-weight: bold;
            color: #0070bc;
            font-size: 1.3rem;
        }
        dl {
            font-size: 1.2rem;
            margin-bottom: 1.15rem;
        }
        dt {
            display: inline-block;
        }
        dd {
            font-weight: bold;
            display: inline-block;
            &:first-of-type {
                min-width: 9.9rem;
            }
        }
    }
</style>
