<template>
    <div class="personalPage">
        <div class="personal_top">
            <img :src="i.headImageUrl" class="avatar" alt>
            <router-link v-if="i.name" to="/personal/infoModify"><span>更改个人简历资料</span><i class="rightArrow-i_02"></i>
            </router-link>
            <a v-else @click="chooseOperate"><span>用户未登录，请点击该处登录/注册</span><i class="rightArrow-i_02"></i></a>
        </div>
        <div class="personal_info block">
            <dl>
                <dt>真实姓名</dt>
                <dd>{{i.name}}</dd>
            </dl>
            <dl>
                <dt>性别</dt>
                <dd>{{i.sex === 1 ? '男' : i.sex === 2 ? '女' : '保密'}}</dd>
            </dl>
            <dl>
                <dt>身份证号码</dt>
                <dd>{{i.idCard}}</dd>
            </dl>
            <dl>
                <dt>手机号码</dt>
                <dd>{{i.phone}}</dd>
            </dl>
            <dl>
                <dt>居住地区</dt>
                <dd>{{area}}</dd>
            </dl>
            <dl>
                <dt>学历</dt>
                <dd>{{educationMap[i.educatin]}}</dd>
            </dl>
            <dl>
                <dt>意向职业</dt>
                <dd>{{professionMap[i.wantJobId]}}</dd>
            </dl>
            <dl>
                <dt>意向职业的工作经验</dt>
                <dd>{{expTimeMap[i.expTime]}}</dd>
            </dl>
            <dl>
                <dt>工作经历</dt>
                <dd>{{i.expDetail}}</dd>
            </dl>
        </div>
        <div class="block">
            <router-link to="/personal/certificate">
                <div class="left"><i class="fileUpload-i"></i>证件照片</div>
                <span class="right">{{ i.cardUrl && i.cardUrl.length > 0 ? '已上传' : '未上传'}}</span>
            </router-link>
        </div>
        <div class="block">
            <router-link to="/personal/applyRecord">
                <div class="left"><i class="applyRecord-i"></i>简历投放记录</div>
            </router-link>
        </div>
        <div class="block">
            <a @click="showPhone">
                <div class="left"><i class="chat-i"></i>平台客服</div>
                <a ref="call" href="tel://10086" target="_blank" hidden></a>
            </a>
        </div>
        <div class="block">
            <router-link to="/personal/changePassword">
                <div class="left"><i class="lock-i"></i>修改密码</div>
            </router-link>
        </div>
        <div class="block">
            <a @click="logout">
                <div class="left"><i class="logout-i"></i>退出登录</div>
            </a>
        </div>
        <ConfirmComp class="personal_confirm" v-model="isShowLogin" @close="showLogin(0)" @cancel="showLogin(0)"
                     @ok="login">
            <div class="loginForm">
                <h6>登录</h6>
                <dl>
                    <dt>账号：</dt>
                    <dd>
                        <input type="text" v-model="account">
                    </dd>
                </dl>
                <dl>
                    <dt>密码：</dt>
                    <dd><input type="password" v-model="password"></dd>
                </dl>
            </div>
        </ConfirmComp>
        <FooterComp/>

    </div>
</template>

<script>
    import ConfirmComp from '../components/popup/ConfirmComp'
    import FooterComp from '../components/FooterComp'
    import { EDUCATION_MAP, EXP_TIME_MAP } from '../js/constData'
//    import CityPicker from '../plugins/picker/cityPicker/cityPicker'
    import areaList from '../picker.json'
    import Cookies from 'js-cookie'

    export default {
        data () {
            return {
                educationMap: EDUCATION_MAP,
                expTimeMap: EXP_TIME_MAP,
                isShowLogin: false,
                account: '',
                password: '',
            }
        },
        created () {
            let userInfo = Cookies.getJSON('userInfo')
            if (userInfo && !this.$store.state.userInfo.name) {
                this.$store.dispatch('getUserInfo')
            }
        },
        computed: {
            i () {
                let i = Object.assign({}, this.$store.state.userInfo)
                return i
            },
            area () {
                for (let i = 0; i < areaList.length; i++) {
                    if (areaList[i].code === this.i.area) {
                        return areaList[i].name
                    }
                    if (areaList[i].sub) {
                        for (let j = 0; j < areaList[i].sub.length; j++) {
                            if (areaList[i].sub[j].code === this.i.area) {
                                return areaList[i].name + '' + areaList[i].sub[j].name
                            }
                            if (areaList[i].sub[j].sub) {
                                for (let x = 0; x < areaList[i].sub[j].sub.length; x++) {
                                    if (areaList[i].sub[j].sub[x].code === this.i.area) {
                                        return areaList[i].name + '' + areaList[i].sub[j].name + '' + areaList[i].sub[j].sub[x].name
                                    }
                                }
                            }
                        }
                    }
                }
            },
            professionMap () {
                return this.$store.getters.professionMap
            },
        },
        methods: {
            logout () {
                this.$store.commit('showConfirm', {
                    text: '确定退出登录吗?',
                    ok: () => {
                        this.$store.commit('setUserInfo')
                    }
                })
            },
            showLogin (bool) {
                this.isShowLogin = Boolean(bool)
            },
            login () {
                if (this.account.trim() === '' || this.password.trim() === '') return
                this.$store.dispatch('login', {
                    account: this.account,
                    password: this.password
                })
            },
            chooseOperate () {
                this.$store.commit('showConfirm', {
                    text: '请选择对应操作',
                    okText: '注册',
                    cancelText: '登录',
                    ok: () => {
                        this.$router.push('/personal/register')
                    },
                    cancel: () => {
                        this.showLogin(1)
                    },
                    close: () => {
                    }
                })
            },
            showPhone () {
                this.$store.commit('showConfirm', {
                    title: '联系客服',
                    text: '是否拨打客服热线：<p style="color: #0070ba">0757-86723432</p>',
                    ok: () => {
                        const evt = document.createEvent('MouseEvents')
                        evt.initMouseEvent('click', true, true)
                        this.$refs.call.dispatchEvent(evt)
                    }
                })
            }
        },
        components: {
            ConfirmComp,
            FooterComp,
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .personalPage {
        padding-bottom: 5rem;
        .block {
            border-bottom: 0.5rem solid #f5f5f5;
            > a {
                border-bottom: 1px solid #e8e8e8;
                display: flex;
                height: 3.5rem;
                justify-content: space-between;
                align-items: center;
                padding: 0 1.9rem;
                font-size: 1.2rem;
                .left {
                    color: #0070ba;
                }
                i {
                    width: 1.6rem;
                    margin-right: 1rem;
                }
            }
        }
    }

    .personal_top {
        background: #0070ba;
        text-align: center;
        padding: 1rem 0 0.5rem;
        .avatar {
            display: block;
            margin: 0 auto;
            width: 5rem;
            height: 5rem;
            border-radius: 1rem;
            overflow: hidden;
            /*border: 1px solid #e8e8e8;*/
        }
        a {
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 2;
            font-size: 1.0rem;
            color: #fff;
            em {
                font-family: simsun;
                font-weight: bold;
            }
        }
    }

    .personal_info {
        dl {
            display: flex;
            justify-content: space-between;
            padding: 0.9rem 1.9rem;
            font-size: 1.2rem;
            border-bottom: 1px solid #e8e8e8;
        }
        dt {
            color: #8e8e8e;
        }
        dd {
            max-width: 16rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: right;
        }
    }

    /*
     .personal_confirm .btnBox a {
         background: #fff !important;
         color: #353535 !important;
         border-color: #e8e8e8 !important;
     }
     */
    .loginForm {
        width: 18rem;
        h6 {
            text-align: center;
            font-weight: bold;
            font-size: 1.3rem;
            margin-top: 1rem;
        }
        dl {
            display: flex;
            margin: 1.5rem;
            font-size: 1.2rem;
        }
        dt {
            width: 4rem;
            line-height: 2.45rem;
        }
        dd {
            flex: 1;
        }
        input {
            display: block;
            width: 100%;
            height: 2.25rem;
            line-height: 2.25rem;
            padding-left: 1rem;
            border: 0.1rem solid #e8e8e8;
            background: #fff;
            box-sizing: border-box;
        }
    }
</style>
