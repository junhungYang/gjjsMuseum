<template>
    <div class="formMapByGroup">
        <header class="top">
            <img class="logo" src="../assets/images/logo.png">
            <p class="name">珠三角工匠精神展示馆</p>
            <p class="map-title">— 团体预约信息登记 —</p>
        </header>
        <div class="form">
            <dl>
                <dt><span>*</span>参观团类别</dt>
                <dd><input type="text" v-model="formMapByGroup.teamType" placeholder="请输入参观团类别"></dd>
            </dl>
            <p>备注:  旅行社、企业、学校、事业单位、政务考察等</p>
            <dl>
                <dt><span>*</span>活动主题</dt>
                <dd><input type="text" v-model="formMapByGroup.activity" placeholder="请输入活动主题"></dd>
            </dl>
            <p>备注： 活动全称：如xxx培训班、xxx夏令营、xxx党建活动等</p>
            <dl>
                <dt><span>*</span>主办单位</dt>
                <dd><input type="text" v-model="formMapByGroup.teamBy" placeholder="请输入盖公章单位"></dd>
            </dl>
            <dl>
                <dt><span>*</span>参观总人数</dt>
                <dd><input type="text" v-model="formMapByGroup.teamNumber" placeholder="请输入参观总人数"></dd>
            </dl>
            <p>备注： x人（含7~13岁小孩 x 人；初中生 x 人； 教师 x 人；）</p>
            <dl>
                <dt>主要领导姓名及职务</dt>
                <dd><input type="text" v-model="formMapByGroup.teamPerson"  placeholder="请输入姓名及职务"></dd>
            </dl>
            <p>备注： 可选填1~3位带队领导（若无可不填） </p>
            <dl>
                <dt><span>*</span>参观日期</dt>
                <dd><input type="text" v-model="formMapByGroup.teamDate" placeholder="请输入参观年月日"></dd>
            </dl>
            <dl>
                <dt><span>*</span>到达时间</dt>
                <dd><input type="text" v-model="formMapByGroup.teamArry" placeholder="请输入到达时间"></dd>
            </dl>
            <dl>
                <dt><span>*</span>参观时长</dt>
                <dd><input type="text" v-model="formMapByGroup.teamSeeTime" placeholder="请输入参观时长"></dd>
            </dl>
            <dl>
                <dt>出行方式</dt>
                <dd><input type="text" v-model="formMapByGroup.teamBus" placeholder="请输入出行方式"></dd>
            </dl>
            <dl>
                <dt><span>*</span>预约人</dt>
                <dd><input type="text" v-model="formMapByGroup.teamer" placeholder="请输入预约人全名，职务，手机号"></dd>
            </dl>
            <dl>
                <dt><span>*</span>带队联系人</dt>
                <dd><input type="text" v-model="formMapByGroup.teamerInfo" placeholder="请输入带队联系人"></dd>
            </dl>
            <p>备注：全名、职务、手机号（若与预约人为同一人，请填写预约人名字并补充填写一位同行者姓名、电话、以防特殊情况联系不上预约人。）</p>
        </div>
        <div class="confirm">
            <span @click="confirm">确认</span>
        </div>
    </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import { setTimeout } from 'timers';
export default {
    data() {
        return {
            formMapByGroup: {
                teamType: '', //参观团类别
                activity: '', //活动主题
                teamBy: '', //主办单位
                teamNumber: '', //参观总人数
                teamPerson:'', //主要领导
                teamDate: '', //参观日期
                teamArry: '', //到达时间
                teamSeeTime: '', //参观时长
                teamBus: '', //出行方式
                teamer: '', //预约人
                teamerInfo: '' //带队联系人
            }
        }
    },
    created() {
        if(this.Store_formMapByGroup) {
            this.formMapByGroup = JSON.parse(JSON.stringify(this.Store_formMapByGroup))
        }
    },
    computed: {
        ...mapState(['Store_formMapByGroup'])
    },
    methods: {
        ...mapMutations(['Store_setFormMapByGroup']),
        confirm() {
            this.Store_setFormMapByGroup(this.formMapByGroup)
            this.$router.push('/')
        }
    },
    beforeRouteLeave (to, from, next) {
         this.Store_setFormMapByGroup(this.formMapByGroup)
        next()
    }
}
</script>
<style lang="scss" scoped>
.formMapByGroup{
    background: url('http://nfrb.ydcycloud.com/nfrb/gzh/static/img/bgImg.5eff4a2.png');
    background-size: 100% auto;
    min-height: 100vh;
    .top {
        width: 100%;
        // height: 11rem;
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
        .map-title {
            font-size: 1.2rem;
            color: #9b1e23;
            font-family: "微软雅黑";
            margin-top: 0.5rem;
            font-weight: bold;
        }
        .btn_1 {
            position: absolute;
            top: 1rem;
            right: 1rem;
        }
    }
    .form {
        background: rgba(255,255,255,0.8);
        margin-top: 1.5rem;
        dl {
            font-size: 1.2rem;
            display: flex;
            padding: 0.7rem 0;
            margin: 0 0.5rem;
            border-bottom: 1px solid #e5e0cd;
            margin-top: 1.5rem;
            dt,dd {
                line-height: 1.8rem;
            }
            dt {
                width: 7.4rem;
                border-right: 1px solid #e5e0cd;
                color: #353535;
                span {
                    color: red;
                }
            }
            dd {
                input {
                       color: #353535;
                    display: block;
                    height: 100%;
                    line-height: 1.8rem;
                    padding-left: .5rem;
                }
            }
        }
        p {
            font-size: 1.1rem;
            line-height: 1.5rem;
            padding-left: 8.2rem;
            padding-right: .5rem;
            color: rgb(182, 182, 182);
            margin-top: .3rem;
        }
    }
    .confirm {
        background: rgba(255,255,255,0.8);
        height: 10rem;
        position: relative;
        span {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            display: block;
            padding: 1rem 2rem;
            font-size: 1.3rem;
            border-radius: 1rem;
            color: #fff;
            background: #c22d27;
            font-weight: bold;
        }
    }
}
</style>
