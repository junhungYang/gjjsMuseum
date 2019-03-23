<template>
    <div class="scanPage">
        <img class="logo" src="../assets/images/logo.png">
        <p class="name">珠三角工匠精神展示馆验票系统</p>
        <!--<p>{{scanStatus}}</p>-->
        <span class="btn_2" @click="scanQrCode">点击扫码</span>
        <span class="btn_2" @click="manualAdd">手动添加未预约人数</span>
        <div class="ticketInfo">
            <p class="title">门票信息</p>
            <ul class="detail">
                <li><p>联系人</p><span>{{ticketInfo.name || ''}}</span></li>
                <li><p>预约种类</p><span>{{type || ''}}</span></li>
                <li><p>进馆时间</p><span
                    v-show="time !== '' && time !== undefined">{{time | formatDate1}}（{{time | formatDate2}}）</span>
                </li>
                <li class="actualNum"><p>实际人数</p><span><input type="text" v-model="realNum">人</span></li>
                <li class="remark">
                    <p>备注<span>（选填）</span></p>
                    <input placeholder="填写未预约人或票数差异大的原因" v-model="remark">
                </li>
            </ul>
            <div class="confirm">
                <span @click="cancel">取消</span>
                <span class="sure" @click="verification">核销</span>
            </div>
        </div>
        <div class="total"><p>今天实际到场人数：</p>
            <p>{{visitNum}} 人</p></div>
        <transition name="fade">
            <div class="success" v-if="verificationState === 1">核销成功</div>
        </transition>
        <transition name="fade">
            <div class="mark" v-if="scanStatus !== 300" @touchmove.prevent>
                <div class="failed">
                    <p class="title">核销失败</p>
                    <p class="reason" v-if="scanStatus === 705">该票已经核销过了。</p>
                    <p class="reason" v-if="scanStatus === 707">该票已经退票。</p>
                    <div class="reason time" v-if="scanStatus === 704 || scanStatus === 706">
                        <p>该票进场时间为：</p>
                        <span>{{ticketInfo.ticketTime}}</span>
                        <span>{{time | formatDate1}}（{{time | formatDate2}}）</span>
                    </div>
                    <span class="sure" @click="sureError">确认</span>
                </div>
            </div>
        </transition>
        <v-pullup :options="pullupdata"></v-pullup>
    </div>
</template>

<script>
    import wechat from '../js/wechat'
    import { getVisitNum, changeTicket, addRealPeople, getTicketScanInfo } from '../js/sendRequest'
    import pullupbox from './pullupbox'
    export default {
        data () {
            return {
                ticketInfoState: 0, // 门票信息状态 0空  1扫一扫成功返回数据  2手动添加未预约人数
                realNum: '',
                verificationState: 0, // 核销成功状态
                type: '',
                time: '',
                visitNum: 0,
                ticketInfo: {},
                remark: '',
//                specList: ['5 - 9 人', '10 - 20 人', '21 - 30 人', '31 - 40 人', '41 - 50 人'],
                specList: ['20 - 50 人'],
                timeList: ['9:30-10:30', '10:30-11:30', '14:00-15:00', '15:00-16:00', '16:00-17:00', '上午', '下午'],
                pullupdata:[]
            }
        },
        watch: {
            ticketInfoState (val) {
                if (val === 0) {
                    this.ticketInfo = {}
                    this.type = ''
                    this.time = ''
                    this.realNum = ''
                }
            }
        },
        created () {
            this.getVisitNum()
        },
        computed: {
            judgeTime () {  // 判断时间段
                let time = ['9:30-10:30', '10:30-11:30', '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00']
                let date = []
                let dateStamp = new Date()
                let now = dateStamp.getTime()
                date.push(dateStamp.setHours(10, 30, 0, 0))
                date.push(dateStamp.setHours(11, 30, 0, 0))
                date.push(dateStamp.setHours(15, 0, 0, 0))
                date.push(dateStamp.setHours(16, 0, 0, 0))
                date.push(dateStamp.setHours(17, 0, 0, 0))
                date.push(dateStamp.setHours(18, 0, 0, 0))
                for (let i = 0; i < date.length; i++) {
                    if (date[i] >= now) {
                        return time[i]
                    }
                }
            },
            scanStatus () {
                return this.$store.state.scanStatus // 705已核销 704 706已过期或未到时间 707已退票
            }
        },
        components:{
            'v-pullup':pullupbox
        },
        methods: {
            scanQrCode () {
                wechat.scanQrCode(this.qrCodeInfo)
            },
            qrCodeInfo (code) {
//                http://nfrb.ydcycloud.com/nfrb/dist/index.html#/shortcut?id=97$ticketNumber=20180123380@contactName=huolik1@type=2@entryTime=2@ticketTime=18-01-24@count=2
//                let code = 'ticketNumber=20180123380@contactName=huolik1@type=2@entryTime=2@ticketTime=2018-01-24@count=2'
                let ticketNumber = code.split('=')[1]
                getTicketScanInfo({ticketNumber: ticketNumber}).then((data) => {
                    this.ticketInfo = data
                    this.ticketInfo.ticketNumber = ticketNumber
                    if (parseInt(data.personCount) <= 5) {
                        this.type = '个人票（' + data.personCount + '人）'
                    } else {
//                        if (parseInt(data.personCount) <= 10) {
//                            this.type = '团体票（' + this.specList[0] + '）'
//                        } else {
//                            this.type = '团体票（' + this.specList[parseInt((parseInt(data.personCount) / 10) - 1)] + '）'
                        this.type = '团体票（' + this.specList[0] + '）'
//                        }
                    }
                    this.realNum = parseInt(data.personCount)
                    this.time = data.entryTime
                    this.ticketInfoState = 1
                })
            },
            manualAdd () {
//                if (this.judgeTime) {
                this.ticketInfoState = 2
                this.ticketInfo = {
                    name: '未预约人'
                }
                this.type = '未预约票种'
                this.time = this.judgeTime
//                } else {
//                    alert('不在工作时间段')
//                }
            },
            verification () {
                let peopleCount = parseInt(this.realNum)
                if (isNaN(peopleCount)) {
                    // alert('请输入数字')
                    this.pullupdata= ['请输入数字'];
                    this.$store.commit('changepullup',true);
                    return false
                }
                if (this.ticketInfoState === 0) {
                    return false
                } else if (this.ticketInfoState === 1 && peopleCount > 0) {
                    // 核销扫一扫
//                    alert(this.ticketInfo.ticketNumber + '--' + peopleCount + '--' + this.remark)
                    changeTicket({
                        ticketNumber: this.ticketInfo.ticketNumber,
                        peopleCount: peopleCount,
                        remark: this.remark
                    }).then((data) => {
                        this.ticketInfoState = 0
                        this.verificationState = 1
                        setTimeout(() => {
                            this.verificationState = 0
                        }, 1000)
                        this.visitNum += peopleCount
                    })
                } else if (this.ticketInfoState === 2 && peopleCount > 0) {
                    // 核销手动添加
                    addRealPeople({peopleCount: peopleCount, remark: this.remark}).then(() => {
                        this.ticketInfoState = 0
                        this.verificationState = 1
                        setTimeout(() => {
                            this.verificationState = 0
                        }, 1000)
                        this.visitNum += peopleCount
                    })
                }
                this.realNum = ''
                this.remark = ''
            },
            sureError () {
                this.$store.commit('setScanStatus', 300)
                this.ticketInfoState = 0
            },
            cancel () {
                this.ticketInfoState = 0
                this.realNum = ''
                this.remark = ''
            },
            getVisitNum () {
                getVisitNum().then((data) => {
                    this.visitNum = data.realNum
                })
            }
        },
    }
</script>

<style lang="scss">
    @import "../css/_base.scss";

    .scanPage {
        height: calc(100% - 1.1rem);
        position: relative;
        color: #353535;
        padding-top: 1.1rem;
        .logo {
            display: block;
            margin: 0 auto 1.5rem;
            width: 5rem;
            height: 5rem;
        }
        .name {
            text-align: center;
            font-size: 1.5rem;
            color: #c22d27;
            font-weight: bold;
        }
        .btn_2 {
            margin-top: 1.3rem;
        }
        .ticketInfo {
            width: 23rem;
            margin: 1.8rem auto 0;
            background: #ffffff;
            .title {
                width: 100%;
                height: 4rem;
                line-height: 4rem;
                font-size: 1.2rem;
                text-align: center;
                font-weight: bold;
            }
            .detail {
                width: 20rem;
                margin: 0 auto;
                border-bottom: 1px solid #e8e8e8;
                li {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 1.5rem;
                    p {
                        font-size: 1.2rem;
                        font-weight: bold;
                    }
                    span {
                        font-size: 1.2rem;
                        color: #8e8e8e;
                        font-weight: bold;
                    }
                }
                .actualNum {
                    span {
                        color: #353535;
                        margin-top: -0.7rem;
                        input {
                            width: 5.2rem;
                            height: 2.6rem;
                            border: 1px solid #e8e8e8;
                            box-shadow: 0 -0.1rem 0.2rem #b5b5b5;
                            text-align: center;
                            margin-right: 0.5rem;
                        }
                    }
                }
                .remark {
                    margin-top: -0.7rem;
                    flex-direction: column;
                    margin-bottom: 1rem;
                    & > span {
                        font-weight: normal;
                    }
                    & > input {
                        text-indent: 0.7rem;
                        width: 20rem;
                        height: 2.5rem;
                        line-height: 2.5rem;
                        text-align: left;
                        margin-top: 1rem;
                        border: 1px solid #e8e8e8;
                        box-shadow: 0 -0.1rem 0.2rem #b5b5b5;
                        &::-webkit-input-placeholder {
                            font-size: 1.2rem;
                            color: #8e8e8e;
                        }
                    }
                }
            }
            .confirm {
                width: 20rem;
                padding: 0.9rem 0;
                font-size: 1.2rem;
                font-weight: bold;
                margin: 0 auto;
                span {
                    display: inline-block;
                    width: 9.7rem;
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
        .total {
            width: 20.5rem;
            height: 3rem;
            background: $bgc;
            border-radius: 10rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 1rem auto 0;
            padding: 0 1.25rem;
            box-shadow: 0 -0.1rem 0.2rem #b5b5b5;
            p {
                font-size: 1.2rem;
                font-weight: bold;
            }
        }
        .success {
            width: 20rem;
            height: 7rem;
            background: rgba(0, 0, 0, .4);
            line-height: 7rem;
            text-align: center;
            color: #ffffff;
            font-size: 1.8rem;
            position: absolute;
            top: 37%;
            left: calc(50% - 10rem);
        }
        .failed {
            width: 20rem;
            background: #ffffff;
            margin: 17.5rem auto;
            .title {
                width: 100%;
                height: 4rem;
                line-height: 4rem;
                font-size: 1.3rem;
                text-align: center;
            }
            .reason {
                width: 17rem;
                text-align: center;
                font-size: 1.2rem;
                color: #8e8e8e;
                padding-bottom: 1.5rem;
                border-bottom: 1px solid #e8e8e8;
                margin: 0 auto;
            }
            .sure {
                display: block;
                width: 100%;
                height: 3.5rem;
                line-height: 3.5rem;
                text-align: center;
                font-size: 1.2rem;
                color: #c22d27;
            }
            .time {
                p {
                    text-align: left;
                }
                span {
                    display: block;
                    color: #353535;
                    margin-top: 1rem;
                }
            }
        }
    }
</style>
