<template>
    <div class="infoInputPage">
        <div class="infoInput_top">
            <img :src="i.headImageUrl" class="avatar" alt>
            <a class="selectAvatar" >替换头像</a>
        </div>
        <div class="infoInput_info">
            <dl class="required">
                <dt>真实姓名</dt>
                <dd><input type="text" v-model="i.name" placeholder="请输入您的真实姓名"></dd>
            </dl>
            <dl>
                <dt required>性别</dt>
                <dd>
                    <label><input type="radio" name="sex" v-model="i.sex" value="1"><span>男</span></label>
                    <label><input type="radio" name="sex" v-model="i.sex" value="2"><span>女</span></label>
                </dd>
            </dl>
            <dl>
                <dt required>身份证号码</dt>
                <dd><input type="text" v-model="i.idCard" placeholder="请输入您的身份证号码"></dd>
            </dl>
            <dl>
                <dt required>手机号码</dt>
                <dd><input type="text" v-model="i.phone" placeholder="请输入您的手机号码"></dd>
            </dl>
            <dl>
                <dt required>居住地区</dt>
                <dd :class="{ unselected: !i.areaCode }" select ><input  ref="cityPicker" type="text" placeholder="请选择您的居住地区"></dd>
            </dl>
            <dl>
                <dt required>学历</dt>
                <dd :class="{ unselected: !i.education, 'hide-select': true }" select>
                    {{educationMap[i.education] || '请选择您的学历程度'}}
                    <select v-model="i.education">
                        <option v-for="option in educationList" :value="option.value">{{option.name}}</option>
                    </select>
                </dd>
            </dl>
            <dl>
                <dt>意向职业</dt>
                <dd :class="{ unselected: !i.wantJob, 'hide-select': true }" select>
                    {{professionMap[i.wantJob] || '请选择您的意向职业'}}
                    <select v-model="i.wantJob">
                        <option v-for="option in professionList" :value="option.value">{{option.name}}</option>
                    </select>
                </dd>
            </dl>
            <dl>
                <dt>意向职业的工作经验</dt>
                <dd :class="{ unselected: !i.expTime, 'hide-select': true }" select>
                    {{expTimeMap[i.expTime] || '请选择您对该职业工作经验'}}
                    <select v-model="i.expTime">
                        <option v-for="option in expTimeList" :value="option.value">{{option.name}}</option>
                    </select>
                </dd>
            </dl>
            <div class="expDetail">
                <div class="label">工作经历</div>
                <textarea v-model="i.expDetail" placeholder="请输入您的工作经历"></textarea>
            </div>
        </div>
        <template v-if="isRegister">
            <p class="passwordTips">帐号为注册时填写的手机号,初始密码为：123456</p>
            <a class="btn_01" @click="submit">注册</a>
        </template>
        <a class="btn_01" v-else @click="submit">确认保存</a>
    </div>
</template>

<script>
    import { EDUCATION_MAP, EDUCATION_LIST, EXP_TIME_LIST, EXP_TIME_MAP } from '../js/constData'
    import CityPicker from '../plugins/picker/cityPicker/cityPicker'

    export default {
        data () {
            return {
                educationList: EDUCATION_LIST,
                educationMap: EDUCATION_MAP,
                expTimeList: EXP_TIME_LIST,
                expTimeMap: EXP_TIME_MAP,
                i: {},
                cityPicker: null
            }
        },
        created () {
            if (!this.isRegister) this.i = Object.assign({}, this.$store.state.userInfo)
        },
        mounted () {
            this.cityPicker = new CityPicker(this.$refs.cityPicker, {
                color: '#0070ba',
                value: this.i.areaCode,
                title: '请选择您的居住地区',
                onSet: (value) => {
                    this.i.areaCode = value
                }
            })
        },
        computed: {
            professionMap () {
                return this.$store.getters.professionMap
            },
            professionList () {
                return this.$store.state.professionList
            },
            isRegister () {
                return this.$route.name === 'register'
            }
        },
        methods: {
            chooseAvatar () {
                /* eslint-disable */
                wx.chooseImage({
                    count: 1,
                    success: (res) => {
                        this.i.headImageUrl = res.localIds[0]
                    },
                    fail: function (res) {
                        alert(JSON.stringify(res))
                    }
                })
                /* eslint-enable */
            },
            submit () {
                this.$store.dispatch(this.isRegister ? 'register' : 'saveUserInfo', this.i).then(() => {
                    this.$router.push('/personal')
                })
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../plugins/picker/cityPicker/cityPicker.scss";
    .infoInput_top {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 8.4rem;
        background: #0070ba;
        .avatar {
            display: block;
            margin-right: 1rem;
            width: 5rem;
            height: 5rem;
            border-radius: 1rem;
            overflow: hidden;
            /*border: 1px solid #e8e8e8;*/
        }
        .selectAvatar {
            color: #0070ba;
            background: #fff;
            display: block;
            width: 4.9rem;
            height: 1.8rem;
            font-size: 1.0rem;
            text-align: center;
            line-height: 1.8rem;
            border-radius: 0.5rem;
        }
    }
    .infoInput_info {
        margin-bottom: 2rem;
        dl {
            align-items: center;
            height: 3.2rem;
            display: flex;
            border-bottom: 1px solid #e8e8e8;
            font-size: 1.2rem;
        }
        dt {
            width: 13.5rem;
            padding-left: 1.9rem;
            height: 1.8rem;
            line-height: 1.8rem;
            border-right: 1px solid #e8e8e8;
            box-sizing: border-box;
            &[required]:after {
                content: '*';
                color: #f00;
            }
        }
        dd {
            width: 15rem;
            padding-right: 1rem;
            margin-left: 1.5rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            position: relative;
            line-height: 3.0rem;
            &[select]:after {
                content: '';
                display: inline-block;
                position: absolute;
                right: 0;
                top: 50%;
                margin-top: -0.225rem;
                width: 0.9rem;
                height: 0.55rem;
                background: url('../assets/icons/downArrow-i_02.png') center no-repeat;
                background-size: 0.9rem;
            }
        }
        label {
            display: inline-block;
            height: 3.0rem;
            margin-right: 1.3rem;
            padding-right: 0.5rem;
            input {
                display: inline-block;
                vertical-align: middle;
                margin-right: 0.5rem;
            }
            span {
                vertical-align: middle;
            }
        }
        input[type=text] {
            display: block;
            width: 15rem;
            line-height: 3.0rem;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #353535;
        }
        .unselected {
            color: #8e8e8e;
        }
        .expDetail {
            padding: 0 1.9rem;
            font-size: 1.2rem;
            line-height: 3.2rem;
            border-bottom: 1px solid #e8e8e8;
            textarea {
                display: block;
                margin-top: -0.5rem;
                padding: 0.5rem 0;
                border: none;
                border-top: 1px solid #e8e8e8;
                width: 28.2rem;
                height: 6.8rem;
            }
        }
    }
    .infoInputPage {
        .passwordTips {
            color: #8e8e8e;
            text-align: center;
            font-size: 1.2rem;
            margin-bottom: 1rem;
        }
    }
</style>
