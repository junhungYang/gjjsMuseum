<template>
    <div class="enlistRecord">
        <i class="rule_i" @click="showRule = !showRule"></i>
        <div class="qrCode">
            <img :src="ticketsRecord[ticketActive].codeUrl" v-if="ticketsRecord.length > 0">
            <img class="defaultImg" src="../assets/images/logo.png" v-else>
        </div>
        <div class="enlistInfo" v-if="ticketsRecord.length > 0">
            <p>报名人：{{ticketsRecord[ticketActive].name}}</p>
            <p>第{{ticketsRecord[ticketActive].number}}位游客</p>
            <p>进场时间： {{entryTime}}</p>
        </div>
        <div class="enlistInfo" v-else>
            <p class="title">珠三角工匠精神展示馆</p>
            <p class="welcoming">— 欢迎您的来临 —</p>
        </div>
        <div class="topWrapper">
            <span class="readNum">参观次数：{{visitCount}}</span>
            <span class="queryNum" v-if="ticketsRecord.length > 0">{{ticketsRecord[ticketActive].ticketNumber}}</span>
            <span class="queryNum" v-else></span>
            <span class="refund" @click="showRefund = true">退票</span>
        </div>
        <div class="listWrapper">
            <ul class="list">
                <li class="item" :class="{'stay' : index === ticketActive}" v-for="item, index in ticketsRecord"
                    @click="selectRecord(index)">
                    {{item.ticketTime}} 丨 {{item.entryTime || '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'}} 丨 {{item.personCount}}<span>{{item.ticketState}}</span>
                </li>
                <li v-if="noData">
                    <p class="noRecord">暂无记录</p>
                </li>
            </ul>
        </div>
        <transition name="fade">
            <div class="mark" v-if="showRule" @touchmove.prevent>
                <div class="rule">
                    <i class="close_i" @click="showRule = false"></i>
                    <p class="title">使用说明</p>
                    <p>1.预约码只能使用一次，且每次参观人数不得超过登记人数；如有需要，可重新预约。</p>
                    <p>2.如需更改时间，请至少提前一天按指引操作。</p>
                    <p>3.预约成功后请合理安排时间，逾期未至超过2次，将被拉入黑名单。</p>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div class="mark" v-if="showRefund" @touchmove.prevent>
                <div class="sureRefund">
                    <p>
                        {{ticketsRecord[ticketActive].ticketState === '待进场' ? '您确定要退票吗？' : ticketsRecord[ticketActive].ticketState === '已核销' ? '该票已核销' : ticketsRecord[ticketActive].ticketState === '已过期' ? '该票已过期' : '该票已退票'}}</p>
                    <div class="confirm">
                        <span @click="showRefund = false">取消</span>
                        <span class="sure" @click="refundTicket">确定</span>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div class="mark" v-if="showMessage" @touchmove.prevent>
                <div class="visitNotice">
                    <p class="title">参观须知</p>
                    <p class="content">{{visitNotice}}</p>
                    <span class="sure" @click="isShowMessage">确定</span>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div class="success" v-if="showRefundMessage === true">退票成功</div>
        </transition>
    </div>
</template>

<script>
    import { getTicketsRecord, refundTicket } from '../js/sendRequest'
    //    import { getTicketsRecord } from '../js/testData'

    export default {
        data () {
            return {
                showRule: false,
                showRefund: false,
                ticketsRecord: [],
                ticketActive: 0,
                entryTime: '',
                visitCount: 0,
                noData: false,
                showRefundMessage: false,
            }
        },
        watch: {
            ticketsRecord (val) {
                if (val.length === 0) {
                    this.noData = true
                }
            }
        },
        computed: {
            showMessage () {
                return this.$store.state.showMessage
            },
            visitNotice () {
                return this.$store.state.visitNotice
            }
        },
        created () {
            this.getTicketsRecord()
        },
        methods: {
            isShowMessage () {
                if (this.showMessage === true) {
                    this.$store.commit('showMessage', false)
                }
            },
            getTicketsRecord () {
                getTicketsRecord({}).then(data => {
                    if (data.length === 0) {
                        this.noData = true
                    }
                    this.ticketsRecord = data.list
                    this.getEntryTime(this.ticketActive)
                    for (let i = 0; i < this.ticketsRecord.length; i++) {
                        if (this.ticketsRecord[i].ticketState === '已核销') {
                            this.visitCount += 1
                        }
                    }
                })
            },
            selectRecord (index) {
                this.ticketActive = index
                this.getEntryTime(index)
            },
            getEntryTime (index) {
                if (this.ticketsRecord.length === 0) {
                    return false
                }
                if (this.ticketsRecord[index].entryTime2) {
                    let time = this.ticketsRecord[index].entryTime2
                    if (time === '上午') {
                        this.entryTime = '9:30 ~ 11:30'
                    } else if (time === '下午') {
                        this.entryTime = '15:00 ~ 17:00'
                    } else {
                        this.entryTime = time.split('-').join(' ~ ')
                    }
                }
            },
            refundTicket () {
                if (this.ticketsRecord[this.ticketActive].ticketState === '待进场') {
                    refundTicket({ticketNumber: this.ticketsRecord[this.ticketActive].ticketNumber}).then(() => {
                        this.ticketsRecord[this.ticketActive].ticketState = '退票'
                        this.showRefundMessage = true
                        setTimeout(() => {
                            this.showRefundMessage = false
                        }, 1000)
                    })
                }
                this.showRefund = false
            },
        }
    }
</script>

<style lang="scss">
    @import "../css/_base.scss";

    .enlistRecord {
        color: #353535;
        position: relative;
        padding-top: 3rem;
        overflow: hidden;
        .success {
            width: 20rem;
            height: 7rem;
            background: rgba(0, 0, 0, .4);
            line-height: 7rem;
            text-align: center;
            color: #ffffff;
            font-size: 1.5rem;
            position: absolute;
            top: 13rem;
            left: calc(50% - 10rem);
        }
        .noRecord {
            text-align: center;
            font-size: 2rem;
            color: #8e8e8e;
            padding-top: 4rem;
        }
        .rule_i {
            display: block;
            width: 1.2rem;
            height: 1.2rem;
            background: url("../assets/icons/doubt.png") no-repeat center;
            background-size: 1.2rem;
            position: absolute;
            right: 0;
            top: 0;
            padding: 1.5rem;
        }
        .qrCode {
            display: block;
            width: 15rem;
            height: 15rem;
            box-shadow: 0 0.1rem 0.2rem #b5b5b5;
            margin: 0 auto;
            background: #fff;
            img {
                width: 100%;
                height: 100%;
            }
            .defaultImg {
                display: inline-block;
                width: 12.5rem;
                height: 12.5rem;
                margin-top: calc((100% - 12.5rem) / 2);
                margin-left: calc((100% - 12.5rem) / 2);
                border-radius: 0.5rem;
            }
        }
        .enlistInfo {
            width: 20rem;
            height: 7.2rem;
            margin: 1.5rem auto;
            background: $bgc;
            & > p {
                font-size: 1.2rem;
                text-align: center;
                margin-top: 0.8rem;
            }
            & :first-child {
                padding-top: 0.8rem;
            }
            .title {
                font-size: 1.7rem;
                color: #9b1e23;
                font-weight: bold;
                padding-top: 1.5rem;
                text-align: center;
            }
        }
        .topWrapper {
            width: 100%;
            height: 4.25rem;
            background: #ffffff;
            border-bottom: 1px solid #8e8e8e;
            box-shadow: 0 -0.1rem 0.2rem #b5b5b5;
            display: flex;
            align-items: center;
            span {
                font-size: 1.2rem;
                height: 1.8rem;
                line-height: 1.8rem;
                text-align: center;
            }
            .readNum {
                width: 10.5rem;
                border-right: 1px solid #e4dfcb;
            }
            .queryNum {
                width: 15rem;
                height: 2.5rem;
                font-size: 1rem;
                line-height: 2.5rem;
                text-align: center;
                color: #8e8e8e;
                background: #f5f5f5;
                margin: 0 1rem;
                border-radius: 1rem;
            }
            .refund {
                width: 4.25rem;
                border-left: 1px solid #e4dfcb;
            }
        }
        .listWrapper {
            background: #ffffff;
            .list {
                min-height: calc(100vh - 32.5rem);
                .item {
                    font-size: 1.2rem;
                    padding: 1.5rem;
                    border-bottom: 1px solid #e4dfcb;
                    span {
                        float: right;
                    }
                }
                .stay {
                    background: #e4dfcb;
                    color: #ffffff;
                }
            }
        }
        .rule {
            width: 20rem;
            position: absolute;
            top: 8.75rem;
            left: calc(50% - 10rem);
            background: #ffffff;
            .close_i {
                display: inline-block;
                width: 1.8rem;
                height: 1.8rem;
                background: url("../assets/icons/close.png") no-repeat center;
                background-size: 1.8rem;
                position: absolute;
                right: -0.8rem;
                top: -0.8rem;
            }
            .title {
                margin: 0 auto;
                font-size: 1.3rem;
                width: 18rem;
                height: 4rem;
                line-height: 4rem;
                text-align: center;
            }
            p {
                width: 18rem;
                margin: 0 auto 1.4rem;
                font-size: 1.2rem;
                line-height: 1.5rem;
            }
        }
        .sureRefund {
            width: 20rem;
            position: fixed;
            top: 34%;
            left: calc(50% - 10rem);
            background: #ffffff;
            p {
                margin: 0 auto;
                padding: 2.3rem 0;
                font-size: 1.8rem;
                width: 18rem;
                height: 4rem;
                line-height: 4rem;
                text-align: center;
                border-bottom: 1px solid #e8e8e8;
                font-weight: normal;
            }
            .confirm {
                width: 17.5rem;
                padding: 0.9rem 0;
                font-size: 1.2rem;
                margin: 0 auto;
                span {
                    display: inline-block;
                    width: 8.5rem;
                    height: 1.8rem;
                    line-height: 1.8rem;
                    text-align: center;
                }
                .sure {
                    color: #c22d27;
                    border-left: 1px solid #e8e8e8;
                }
            }
        }
        .visitNotice {
            width: 20rem;
            margin: 14rem auto;
            background: #ffffff;
            .title {
                font-size: 1.6rem;
                text-align: center;
                line-height: 3rem;
                padding-top: 1rem;
            }
            .content {
                width: 15rem;
                padding: 0 2.5rem;
                word-break: break-all;
                word-wrap: break-word;
                text-align: center;
            }
            .sure {
                width: 100%;
                height: 3rem;
                font-size: 1.6rem;
                text-align: center;
                line-height: 3rem;
                display: inline-block;
                border-top: 1px solid #b5b5b5;
                margin-top: 1rem;
            }
        }
    }
</style>
