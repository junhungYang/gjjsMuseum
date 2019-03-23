<template>
    <div class="addInfoPage">
        <ul class="form">
            <li><p>联系人<em>*</em>：</p><input type="text" placeholder="请填写联系人姓名" v-model="name"></li>
            <li><p>联系电话<em>*</em>：</p><input type="text" placeholder="请填写联系电话" v-model="tel"></li>
            <li class="sex">
                <p>性别<em>*</em>：</p>
                <div>
                    <span :class="{'radioActive' : sex === 1}" @click="sex = 1"><i class="radio_1"></i>男</span>
                    <span :class="{'radioActive' : sex === 2}" @click="sex = 2"><i class="radio_1"></i>女</span>
                </div>
            </li>
            <li class="address jintou" @click="showAddress = true"><p>地区<em>*</em>：</p>
                <span v-if="address !== ''">{{address}}</span>
                <span v-else class="c_8e8e8e">请选择地址</span>
            </li>
            <li><p>备注：</p><input type="text" placeholder="选填" v-model="remarks"></li>
            <!--<li class="uploadImg"><p>上传身份证照片<em>*</em>：</p>-->
                <!--<div class="imgWrapper">-->
                    <!--<div class="positive">-->
                        <!--<p @click="addPositiveImg" v-if="false"><i></i>点击上传 身份证正面</p>-->
                        <!--<img src="../assets/images/bg.jpg" v-if="true" class="choosedImg">-->
                        <!--<i @click="cancelUpload(1)"></i>-->
                    <!--</div>-->
                    <!--<div class="reverse">-->
                        <!--<p><i></i>点击上传 身份证背面</p>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</li>-->
        </ul>
        <img src="../assets/images/logo.png" class="logo">
        <p class="name">珠三角工匠精神展示馆</p>
        <div class="bottom" :class="{'disable' : submit === false}" @click="sureSubmit">确认保存</div>
        <addressSlt @selectedInformation="getAddress" :showAddress="showAddress" @close="closeAddressSlt"
                    v-if="showAddress"></addressSlt>
        <v-pullup :options="pullupdata"></v-pullup>
    </div>
</template>

<script>
    import addressSlt from '../components/addressSlt'
    import { addContactInfo } from '../js/sendRequest'
    import wechat from '../js/wechat'
    import pullupbox from './pullupbox'

    export default {
        data () {
            return {
                sex: 1, // 1男 2女
                name: '',
                tel: '',
                remarks: '',
                address: '',
                showAddress: false,
                areaCode: '',
                pullupdata:[]
            }
        },
        computed: {
            submit () {
                if (this.name && this.tel && this.address !== '' && this.sex > 0 && this.areaCode !== '') {
                    return true
                } else {
                    return false
                }
            },
            userInfo () {
                return this.$store.state.selectedInfo
            }
        },
        created () {
            this.init()
        },
        methods: {
            init () {
                this.name = this.userInfo.contactName
                this.sex = parseInt(this.userInfo.sex)
                this.tel = this.userInfo.contactPhone
                this.address = this.userInfo.area.split(' ').join('-')
                this.areaCode = this.userInfo.areaCode
                this.remarks = this.userInfo.remark
            },
            closeAddressSlt (bool) {
                this.showAddress = bool
            },
            getAddress (data) {
                this.areaCode = data[data.length - 1].code
                let list = []
                for (let i = 0; i < data.length; i++) {
                    list.push(data[i].name)
                }
                this.address = list.join('-')
            },
            addPositiveImg () {
                wechat.chooseImage()
            },
            cancelUpload (n) {
                if (n === 1) {

                }
            },
            sureSubmit () {
                if (this.submit === true) {
                    if (/^[1][3,4,5,7,8][0-9]{9}$/.test(this.tel)) {
                        addContactInfo({
                            name: this.name,
                            phone: this.tel,
                            sex: this.sex,
                            area: this.areaCode,
                            remark: this.remarks
                        }).then(data => {
                            this.$store.commit('addContactInfo', {
                                contactName: data.name,
                                contactPhone: data.phone,
                                sex: this.sex,
                                area: this.address,
                                areaCode: this.areaCode
                            })
                            this.$router.push('/')
                        })
                    } else {
                        // alert('请输入正确手机号')
                        this.pullupdata= ['请输入正确手机号'];
                         this.$store.commit('changepullup',true);
                    }
                } else {
                    return false
                }
            },
        },
        components: {
            addressSlt,
            'v-pullup' : pullupbox
        }
    }
</script>

<style lang="scss">
    .addInfoPage {
        min-height: 100vh;
        position: relative;
        /*padding-bottom: 3rem;*/
        .c_8e8e8e {
            color: #8e8e8e;
        }
        color: #353535;
        .form {
            width: 100%;
            li {
                display: flex;
                padding: 1.3rem 1.4rem;
                margin-bottom: 1px;
                background: #ffffff;
                font-size: 1.2rem;
                p {
                    width: 7rem;
                    & > em {
                        color: #c22d27;
                    }
                }
            }
            .sex {
                & > div {
                    width: 9rem;
                    display: flex;
                    justify-content: space-between;
                }
            }
            .address {
                &.jintou:after {
                    right: 1.5rem;
                    top: 1.5rem;
                }
            }
            .uploadImg {
                display: flex;
                flex-direction: column;
                p {
                    width: 100%;
                }
                .imgWrapper {
                    width: 25rem;
                    height: 10rem;
                    margin: 1.25rem auto;
                    display: flex;
                    justify-content: space-between;
                    & > div {
                        width: 10rem;
                        height: 10rem;
                        border: 1px dashed #686868;
                        & > p {
                            width: 5rem;
                            margin: 0 auto;
                            font-size: 1rem;
                            font-weight: bold;
                            color: #8e8e8e;
                            text-align: center;
                            line-height: 1.5rem;
                            & > i {
                                display: block;
                                width: 1.9rem;
                                height: 1.9rem;
                                background: url("../assets/icons/addImg.png") center no-repeat;
                                background-size: 100%;
                                margin: 2rem auto 1rem;
                            }
                        }
                        & > img {
                            display: inline-block;
                            width: 10rem;
                            height: 7.5rem;
                            margin-top: 1.25rem;
                        }
                    }
                    .positive {
                        background: #000;
                        border: none;
                        position: relative;
                        & > i {
                            display: inline-block;
                            width: 1.5rem;
                            height: 1.5rem;
                            position: absolute;
                            right: -0.75rem;
                            top: -0.75rem;
                            background: url("../assets/icons/delete.png") center no-repeat;
                            background-size: 100%;
                        }
                    }
                }
            }
        }
        .logo {
            display: block;
            width: 5rem;
            height: 5rem;
            margin: 11.2rem auto 1.5rem;
        }
        .name {
            font-size: 1.5rem;
            color: #c22d27;
            font-family: 微软雅黑;
            font-weight: bold;
            text-align: center;
        }
        .bottom {
            width: 100%;
            height: 5rem;
            line-height: 5rem;
            text-align: center;
            font-size: 1.3rem;
            color: #ffffff;
            background: #c22d27;
            margin-top: 3rem;
            position: absolute;
            left: 0;
            bottom: 0;
        }
        .disable {
            background: #8e8e8e;
        }
    }
</style>
