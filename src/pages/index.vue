<template>
    <div class="indexPage">
        <div class="notice">
            <div class="wrapper">
                <p :style="{animation: animation}">{{notice}}</p>
            </div>
        </div>
        <div class="top">
            <img class="logo" src="../assets/images/logo.png">
            <p class="name">珠三角工匠精神展示馆</p>
            <router-link to="/enlistRecord"><span class="btn_1">报名记录</span></router-link>
        </div>
        <div class="content">
            <div class="dateSlt">
                <p class="prompt">日期选择</p>
                <ul class="date">
                    <li v-for="item, index in week" @click="selecteDay(index)"
                        :class="{'ban' : (item.amTicket <= 0 && item.pmTicket <= 0) || (selectedInfo.ticketType === 2 && index <= 2)}">
                        <span>{{item.day}}</span>
                        <span
                            :class="{'active' : selectedInfo.daySltActive == index && (item.amTicket > 0 || item.pmTicket > 0)}">{{item.date | formatDate}}</span>
                    </li>
                </ul>
            </div>
            <div class="ticketType">
                <p class="prompt">预约种类</p>
                <div class="typeSlt">
                    <span class="personal" :class="{'radioActive' : selectedInfo.ticketType === 1}" @click="selectType(1)">
                        <i class="radio_1"></i>个人票</span>
                    <span class="team" :class="{'radioActive' : selectedInfo.ticketType === 2}"
                          @click="selectType(2)"><i
                        class="radio_1"></i>团体票</span>
                </div>
            </div>
            <div class="numberSlt" :class="{'jintou' : selectedInfo.ticketType === 2}">
                <p class="prompt">进馆人数</p>
                <div class="clickZone" @click="showSelectSpec = true" v-if="selectedInfo.ticketType === 2">
                    <span :class="{'showy' : (selectedInfo.selectedSpec === -1 && selectedInfo.ticketType === 2)}">
                        {{selectedInfo.selectedSpec === -1 ? '请选择参团人数' : selectedInfo.selectedSpec === -2 ? '余票不足' : specList[selectedInfo.selectedSpec]}}
                    </span>
                </div>
                <div class="singleTicket" v-if="selectedInfo.ticketType === 1">
                    <div class="count">
                        <i class="reduce" @click="singleReduce"></i>
                        <span>{{selectedInfo.singleCount}}</span>
                        <i class="add" @click="singleAdd"></i>
                    </div>
                    <div class="tips">(人数上限：5)</div>
                </div>
            </div>
            <div class="selectedTime">
                <div class="top"><p class="prompt">选择到场时间</p>
                    <p class="surplus" v-if="selectedInfo.ticketType === 2">剩余票数：{{tickets}}</p>
                    <p class="singleTime" v-if="selectedInfo.ticketType === 1">(上午：9:30-11:30 ; 下午：15:00-17:00)</p>
                </div>
                <div class="ticketsWrapper" v-if="selectedInfo.ticketType === 2">
                    <ul class="tickets">
                        <li class="ticket" v-for="item, index in ticketsList"
                            :class="{'period' : item.teamRemain == 0 || index <= deadline, 'active' : selectedInfo.selectedTime === index}"
                            @click="selectTime(index)"><p>{{item.time}}</p>
                            <p>团队名额：{{item.teamRemain}}</p>
                        </li>
                    </ul>
                </div>
                <div class="singleTicketWrapper"
                     v-if="selectedInfo.ticketType === 1 && week[selectedInfo.daySltActive]">
                    <div class="am"
                         :class="{'period' : week[selectedInfo.daySltActive].amTicket === 0 || deadline >= 1, 'active' : selectedInfo.selectedTime === 6}"
                         @click="selectTime(6)">
                        <p>上午</p>
                        <p>剩余{{week[selectedInfo.daySltActive].amTicket}}张票</p>
                    </div>
                    <div class="pm"
                         :class="{'period' : week[selectedInfo.daySltActive].pmTicket === 0 || deadline >= 4, 'active' : selectedInfo.selectedTime === 7}"
                         @click="selectTime(7)">
                        <p>下午</p>
                        <p>剩余{{week[selectedInfo.daySltActive].pmTicket}}张票</p>
                    </div>
                </div>
            </div>
            <router-link to="/addInfo">
                <div class="contactsSlt jintou">
                    <p class="prompt">添加联系人信息</p>
                    <span
                        :class="{'showy' : selectedInfo.contactName === ''}">{{selectedInfo.contactName === '' ? '请填写联系人信息' : selectedInfo.contactName}}</span>
                </div>
            </router-link>
        </div>
        <div class="btn_2" @click="submit">确认报名</div>
        <p class="tel">客服咨询热线：{{tel}}</p>
        <transition name="fade">
            <div class="selectSpec mark" v-if="showSelectSpec" @touchmove.prevent @click.stop="hideSelectSpec">
                <div class="specWrapper">
                    <div class="top">
                        <p>选择进馆人数<span @click.stop="hideSelectSpec">×</span></p>
                    </div>
                    <ul class="content">
                        <li class="spec" v-for="item, index in specList"
                            :class="{'active' : selectedInfo.selectedSpec === index}"
                            @click.stop="selectSpec(index)">{{item}}
                        </li>
                        <li class="tips">报名人数超过50人以上，请联系客服：{{tel}}</li>
                    </ul>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div class="regInfo mark" v-if="showRegInfo" @touchmove.prevent>
            <!--<div class="regInfo mark" v-if="true" @touchmove.prevent>-->
                <div class="wrapper">
                    <p class="top">核实报名信息</p>
                    <div class="contacts">
                        <p>联系人：<span>{{selectedInfo.contactName || ''}}</span></p>
                        <p>联系电话：<span>{{selectedInfo.contactPhone || ''}}</span></p>
                        <p>
                            报名人数：<span>{{selectedInfo.ticketType === 2 ? specList[selectedInfo.selectedSpec] : selectedInfo.singleCount + '&nbsp;人'}}</span>
                        </p>
                    </div>
                    <dl>
                        <dt>进场时间：</dt>
                        <dd>
                            {{week[selectedInfo.daySltActive].date}}，{{selectedInfo.ticketType === 2 ? week[selectedInfo.daySltActive].times[selectedInfo.selectedTime].time : singleTime[(selectedInfo.selectedTime - 6)]}}
                        </dd>
                    </dl>
                    <dl v-if="selectedInfo.ticketType === 2">
                        <dt>是否需要讲解员</dt>
                        <dd>
                        <span :class="{'radioActive' : guide === 1}" @click="guide = 1"><i
                            class="radio_1"></i>是</span>
                            <span :class="{'radioActive' : guide === 2}" @click="guide = 2"><i
                                class="radio_1"></i>否</span>
                        </dd>
                    </dl>
                    <dl class="company" v-if="selectedInfo.ticketType === 2">
                        <dt>团队或单位名称：</dt>
                        <dd>
                            <input type="text" placeholder="选填" v-model="teamName">
                        </dd>
                    </dl>
                    <div class="confirm">
                        <span @click="showRegInfo = false">取消</span>
                        <span class="sure" @click="sureSubmit">确定</span>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import { getIndexData, addSelectedInfo, getNotice } from '../js/sendRequest'

    export default {
        data () {
            return {
                notice: '',
                guide: 2, // 讲解员 1需要  2不需要
                week: [],
                tickets: 0,
                ticketsList: [],
//                specList: ['10 - 20 人', '21 - 30 人', '31 - 40 人', '41 - 50 人'],
                specList: ['20 - 50 人'],
                showSelectSpec: false,
                showRegInfo: false,
                teamName: '',
                deadline: -1, // 过期时间下标 小于deadline则过期
                singleTime: ['9:30-11:30', '15:00-17:00'],
                tel: ''
            }
        },
        created () {
            this.getIndexData()
            this.getNotice()
        },
        computed: {
            selectedInfo () {
                return this.$store.state.selectedInfo
            },
            count () {   // 进场人数
                if (this.selectedInfo.selectedSpec === 0) {
                    return 9
                } else {
                    return ((this.selectedInfo.selectedSpec + 1) * 10)
                }
            },
            animation () { // notice动画
                return 'noticeScroll ' + this.notice.length / 2 + 's linear 300'
            },
        },
        methods: {
            noOrderMonday (index) {
                if (this.week[index].day === '一' && (this.week[index].amTicket > 0 || this.week[index].pmTicket > 0)) {
                    return false
                } else if (this.week[index].day === '一') {
                    return true
                }
            },
            singleReduce () {
                if (this.selectedInfo.singleCount === 1) {
                    return false
                } else {
                    let count = this.selectedInfo.singleCount - 1
                    this.$store.commit('selectSingleCount', count)
                }
            },
            singleAdd () {
                if (this.selectedInfo.singleCount === 5) {
                    return false
                } else {
                    if (this.selectedInfo.selectedTime === 6 && this.selectedInfo.singleCount === this.week[this.selectedInfo.daySltActive].amTicket) {
                        return false
                    } else if (this.selectedInfo.selectedTime === 7 && this.selectedInfo.singleCount === this.week[this.selectedInfo.daySltActive].pmTicket) {
                        return false
                    }
                    let count = this.selectedInfo.singleCount + 1
                    this.$store.commit('selectSingleCount', count)
                }
            },
            getIndexData () {
                getIndexData({}).then(data => {
                    let dataStr = JSON.stringify(data)
                    // alert(`getIndexData请求:返回数据=${dataStr}`)
                    this.week = data.week
                    if (this.noOrderMonday(0)) {
                        this.$store.commit('selectedDay', 1)
                    }
                    if (data.name) {
                        this.$store.commit('addContactInfo', {
                            contactName: data.name,
                            contactPhone: data.phone,
                            sex: data.sex,
                            area: data.address,
                            areaCode: data.areaCode
                        })
                    }
                    this.judgeDeadline(this.selectedInfo.daySltActive)
                    this.ticketsList = data.week[this.selectedInfo.daySltActive].times
                    if (this.selectedInfo.selectedTime <= 1 && this.deadline < 1) {
                        this.tickets = data.week[this.selectedInfo.daySltActive].amTicket
                    } else {
                        this.tickets = data.week[this.selectedInfo.daySltActive].pmTicket
                    }
                    this.selectType(2)
                })
            },
            getNotice () {
                getNotice().then(data => {
                    let dataStr = JSON.stringify(data)
                    // alert(`getNotice请求:返回数据=${dataStr}`)
                    this.notice = data.notice
                    this.tel = data.phone
                    this.$store.commit('setVisitNotice', data.content)
                })
            },
            selecteDay (index) {
                if (this.selectedInfo.ticketType === 2 && index <= 2) {
                    return false
                }
                if (this.noOrderMonday(index)) {
                    return false
                } else {
                    this.judgeDeadline(index)
                    this.$store.commit('selectedDay', index)
                    this.$store.commit('selectTime', -1)
                    this.ticketsList = this.week[index].times
                    if ((this.ticketsList[0].teamRemain + this.ticketsList[1].teamRemain) > 0 && this.deadline < 1) {
                        this.tickets = this.week[index].amTicket
                    } else {
                        this.tickets = this.week[index].pmTicket
                    }
                }
            },
            selectSpec (index) {
                this.$store.commit('selectSpec', index)
                if (this.tickets < this.count) {
                    this.$store.commit('selectSpec', -2)
                    return false
                }
            },
            hideSelectSpec () {
                if (this.selectedInfo.selectedSpec === -2) {
                    this.$store.commit('selectSpec', -1)
                }
                this.showSelectSpec = false
            },
            selectTime (index) {
                if (this.selectedInfo.ticketType === 2) {
                    if (this.ticketsList[index].teamRemain === 0 || index <= this.deadline) {
                        return false
                    }
                    if (this.ticketsList[index].time === '9:30-10:30' || this.ticketsList[index].time === '10:30-11:30' || this.ticketsList[index].time === '上午') {
                        this.tickets = this.week[this.selectedInfo.daySltActive].amTicket
                    } else {
                        this.tickets = this.week[this.selectedInfo.daySltActive].pmTicket
                    }
                    if (this.tickets < this.count) {
                        this.$store.commit('selectTime', -1)
                        return false
                    }
                } else {
                    if (index === 6) {
                        if (this.deadline >= 1 || this.week[this.selectedInfo.daySltActive].amTicket === 0 || this.selectedInfo.singleCount > this.week[this.selectedInfo.daySltActive].amTicket) {
                            return false
                        }
                    } else if (index === 7) {
                        if (this.deadline >= 4 || this.week[this.selectedInfo.daySltActive].pmTicket === 0 || this.selectedInfo.singleCount > this.week[this.selectedInfo.daySltActive].pmTicket) {
                            return false
                        }
                    }
                }
                this.$store.commit('selectTime', index)
            },
            selectType (type) {
                if (type === 2) {
                    if (this.noOrderMonday(3)) {
                        this.selecteDay(4)
                    } else {
                        this.selecteDay(3)
                    }
                }
                this.$store.commit('ticketType', type)
            },
            submit () {
                alert('请填写真实手机号码并保持通讯畅通，如遇重大活动或临时性闭馆，预约团队另行安排参观时间并将通过手机短信告知；')
                if (this.selectedInfo.ticketType === 2) {
                    if (this.selectedInfo.selectedSpec >= 0 && this.selectedInfo.selectedTime >= 0 && this.selectedInfo.contactName !== '') {
                        this.showRegInfo = true
                    } else if (this.selectedInfo.selectedSpec < 0) {
                        alert('请选择进场人数')
                    } else if (this.selectedInfo.selectedTime < 0) {
                        alert('请选择进场时间')
                    } else if (this.selectedInfo.contactName === '') {
                        alert('请添加联系人信息')
                    }
                } else if (this.selectedInfo.ticketType === 1) {
                    if (this.selectedInfo.selectedTime >= 6 && this.selectedInfo.contactName !== '') {
                        this.showRegInfo = true
                    } else if (this.selectedInfo.selectedTime < 6) {
                        alert('请选择进场时间')
                    } else if (this.selectedInfo.contactName === '') {
                        alert('请添加联系人信息')
                    }
                }
            },
            sureSubmit () {
                let entryTime = 0
                let count = 0
                let sort = 0
                switch (this.week[this.selectedInfo.daySltActive].day) {
                    case '一':
                        sort = 1
                        break
                    case '二':
                        sort = 2
                        break
                    case '三':
                        sort = 3
                        break
                    case '四':
                        sort = 4
                        break
                    case '五':
                        sort = 5
                        break
                    case '六':
                        sort = 6
                        break
                    case '日':
                        sort = 7
                        break
                }
                if (this.selectedInfo.ticketType === 2) {
                    entryTime = this.selectedInfo.selectedTime + 1
//                    count = this.selectedInfo.selectedSpec + 1
                    count = 4
                } else {
                    entryTime = this.selectedInfo.selectedTime
                    count = this.selectedInfo.singleCount + 4
                }
                addSelectedInfo({
                    contactName: this.selectedInfo.contactName,
                    contactPhone: this.selectedInfo.contactPhone,
                    dayNumber: this.selectedInfo.daySltActive,
                    entryTime: entryTime,
                    guide: this.guide,
                    teamName: this.teamName,
                    type: this.selectedInfo.ticketType,
                    count: count,
                    sort: sort,
                }).then(() => {
                    this.$router.push('/enlistRecord')
                    this.$store.commit('showMessage', true)
                })
                this.showRegInfo = false
            },
            judgeDeadline (index) {  // 判断是否过期
                if (index === 0) {
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
                        if (now >= date[i]) {
                            this.deadline = i
                        }
                    }
                } else {
                    this.deadline = -1
                }
            },
        }
    }
</script>

<style lang="scss">
    @import "../css/_base.scss";

    .indexPage {
        width: 100%;
        height: 100%;
        position: relative;
        color: #353535;
        .showy {
            color: #c22d27 !important;
            border: 1.5px solid #c22d27;
            padding: 0.5rem;
        }
        .notice {
            width: 100%;
            height: 2.3rem;
            background: $bgc;
            overflow: hidden;
            .wrapper {
                width: 300%;
                height: 2.3rem;
                margin-left: 1.5rem;
                overflow: hidden;
                p {
                    display: inline-block;
                    font-size: 1rem;
                    color: #c22d27;
                    line-height: 2.3rem;
                    text-align: left;
                    white-space: nowrap;
                }
            }
        }
        .top {
            width: 100%;
            height: 11rem;
            background: rgba(255, 255, 255, 0);
            text-align: center;
            position: relative;
            .logo {
                width: 7rem;
                height: 7rem;
                margin: 1rem 0 0.5rem;
            }
            .name {
                font-size: 1.5rem;
                color: #9b1e23;
                font-family: "微软雅黑";
                font-weight: bold;
            }
            .btn_1 {
                position: absolute;
                top: 1rem;
                right: 1rem;
            }
        }
        .content {
            width: 100%;
            background: $bgc;
            & > div {
                border-bottom: 1px solid #e5e0cd;
            }
            .prompt {
                font-size: 1.3rem;
                margin: 0 1.5rem;
            }
        }
        .dateSlt {
            width: 100%;
            height: 5.25rem;
            display: flex;
            align-items: center;
            .date {
                font-size: 1.2rem;
                width: 22.5rem;
                display: flex;
                justify-content: space-between;
                span {
                    display: block;
                    width: 2rem;
                    height: 2rem;
                    line-height: 2rem;
                    text-align: center;
                    border-radius: 50%;
                    &.active {
                        background: #c22d27;
                        color: #ffffff;
                    }
                }
                .ban {
                    span {
                        color: #8e8e8e;
                    }
                }
            }
        }
        .ticketType {
            width: 100%;
            height: 4.25rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .typeSlt {
                width: 15rem;
                height: 1.75rem;
                margin-right: 1.5rem;
                display: flex;
                justify-content: space-between;
                color: #8e8e8e;
                font-size: 1.2rem;
            }
        }
        .numberSlt {
            width: 100%;
            height: 4.25rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .clickZone {
                width: 22rem;
                height: 100%;
                text-align: right;
                line-height: 4.25rem;
                & > span {
                    font-size: 1.2rem;
                    margin-right: 3rem;
                    color: #8e8e8e;
                }
            }
            &.jintou:after {
                top: 1.825rem;
                right: 1.5rem;
            }
            .singleTicket {
                padding: 0 1.5rem;
                display: flex;
                height: 4.25rem;
                line-height: 4.25rem;
                text-align: center;
                .count {
                    height: 4.25rem;
                    width: 6.5rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    & > span {
                        font-size: 1.3rem;
                        color: #111010;
                    }
                    & > i {
                        width: 1.2rem;
                        height: 1.2rem;
                    }
                    .reduce {
                        background: url("../assets/icons/reduce.png") center no-repeat;
                        background-size: 1.2rem;
                    }
                    .add {
                        background: url("../assets/icons/add.png") center no-repeat;
                        background-size: 1.2rem;
                    }
                }
                .tips {
                    font-size: 1rem;
                    color: #8e8e8e;
                    margin-left: 1.5rem;
                }
            }
        }
        .selectedTime {
            width: 100%;
            height: 8.5rem;
            overflow: hidden;
            .top {
                width: 100%;
                height: 3.1rem;
                display: flex;
                line-height: 3.1rem;
                text-align: center;
                justify-content: space-between;
                .prompt {
                    margin-right: 0;
                }
                .surplus {
                    margin-right: 1.5rem;
                    font-size: 1.2rem;
                }
                .singleTime {
                    font-size: 1.1rem;
                    color: #8e8e8e;
                    margin-right: 1.5rem;
                }
            }
            .singleTicketWrapper {
                width: 100%;
                height: 7.25rem;
                display: flex;
                justify-content: center;
                & > div {
                    min-width: 8rem;
                    height: 4.25rem;
                    border-radius: 0.6rem;
                    color: #8e8e8e;
                    border: 1px solid #8e8e8e;
                    p {
                        font-size: 1.2rem;
                        line-height: 2.1rem;
                        text-align: center;
                        margin: 0 0.5rem;
                    }
                }
                .am {
                    margin-right: 2.5rem;
                }
                .pm {
                    margin-left: 2.5rem;
                }
                .active {
                    color: #c22d27;
                    border: 1px solid #c22d27;
                }
                .period {
                    color: #ffffff;
                    border: 1px solid #e8e8e8;
                    background: #e8e8e8;
                }
            }
            .ticketsWrapper {
                width: 100%;
                height: 7.25rem;
                overflow-x: scroll;
                overflow-y: hidden;
                .tickets {
                    display: flex;
                    min-width: 45rem;
                    .ticket {
                        min-width: 8rem;
                        height: 4.25rem;
                        border-radius: 0.6rem;
                        margin-left: 1rem;
                        color: #8e8e8e;
                        border: 1px solid #8e8e8e;
                        p {
                            font-size: 1.2rem;
                            line-height: 2.1rem;
                            text-align: center;
                            margin: 0 0.5rem;
                        }
                    }
                    .active {
                        color: #c22d27;
                        border: 1px solid #c22d27;
                    }
                    .period {
                        color: #ffffff;
                        border: 1px solid #e8e8e8;
                        background: #e8e8e8;
                    }
                }
            }
        }
        .contactsSlt {
            width: 100%;
            height: 4.25rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
                font-size: 1.2rem;
                margin-right: 3rem;
                color: #8e8e8e;
            }
            &.jintou:after {
                top: 1.825rem;
                right: 1.5rem;
            }
        }
        .btn_2 {
            margin-top: 2rem;
        }
        .tel {
            font-size: 1.2rem;
            color: #353535;
            text-align: center;
            margin-top: 2.5rem;
        }
        .selectSpec {
            .specWrapper {
                width: 100%;
                height: 10.75rem;
                background: #ffffff;
                position: fixed;
                left: 0;
                bottom: 0;
                .top {
                    width: 100%;
                    height: 4rem;
                    line-height: 4rem;
                    text-align: center;
                    font-size: 1.2rem;
                    color: #353535;
                    span {
                        float: right;
                        padding: 0 1.5rem;
                        color: #8e8e8e;
                        font-size: 1.7rem;
                    }
                }
                .content {
                    width: 100%;
                    .spec {
                        margin-left: 1.5rem;
                        line-height: 2.75rem;
                        font-size: 1rem;
                        color: #353535;
                    }
                    .tips {
                        width: 29rem;
                        height: 3rem;
                        border-top: 1px solid #f5f5f5;
                        margin: 1rem auto 0;
                        font-size: 1rem;
                        color: #8e8e8e;
                        line-height: 3rem;
                        text-align: center;
                    }
                    .active {
                        color: #c22d27;
                        position: relative;
                        &:after {
                            content: '';
                            width: 1rem;
                            height: 1rem;
                            background: url("../assets/icons/gou.png") no-repeat center;
                            background-size: 1rem;
                            position: absolute;
                            top: 0.8rem;
                            left: 5rem;
                        }
                    }
                }
            }
        }
        .regInfo {
            .wrapper {
                background: #ffffff;
                position: absolute;
                left: 6rem;
                top: 10.5rem;
                padding: 0 1.5rem;
                & > p {
                    width: 17.5rem;
                    height: 4.25rem;
                    line-height: 4.25rem;
                    text-align: center;
                    font-size: 1.3rem;
                }
                .contacts {
                    width: 17.5rem;
                    border-bottom: 1px solid #e8e8e8;
                    p {
                        font-size: 1.2rem;
                        height: 2rem;
                        span {
                            float: right;
                        }
                    }
                }
                & > dl {
                    width: 17.5rem;
                    height: 5rem;
                    border-bottom: 1px solid #e8e8e8;
                    font-size: 1.2rem;
                    dt, dd {
                        margin-top: 1rem;
                    }
                    dd {
                        float: right;
                        span {
                            margin: 0 0.5rem 0 2rem;
                        }
                    }
                }
                .company {
                    height: 4rem;
                    dd {
                        float: left;
                        width: 100%;
                        input {
                            width: 100%;
                        }
                    }
                }
                .confirm {
                    width: 17.5rem;
                    padding: 0.9rem 0;
                    font-size: 1.2rem;
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
        }
    }
</style>
