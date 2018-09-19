<template>
    <div class="loginPage">
        <img class="logo" src="../assets/images/logo.png">
        <p class="title">珠三角工匠精神展示馆验票系统</p>
        <div class="login">
            <div class="name"><input type="text" placeholder="请输入管理员账号" v-model="name"></div>
            <div class="pwd"><input type="text" placeholder="请输入管理员密码" v-model="pwd"></div>
            <span class="btn_2" @click="login">登录</span>
        </div>
    </div>
</template>

<script>
    import { scanLogin } from '../js/sendRequest'
    //    import { scanLogin } from '../js/testData'

    export default {
        data () {
            return {
                name: '',
                pwd: '',
            }
        },
        methods: {
            login () {
                if (this.name !== '' && this.pwd !== '') {
                    scanLogin({username: this.name, password: this.pwd}).then(() => {
                        window.sessionStorage.setItem('isLogin', 'true')
                        this.$router.push('/scan')
                    })
                }
            }
        }
    }
</script>

<style lang="scss">
    .loginPage {
        width: 100%;
        height: 100%;
        padding-top: 1.5rem;
        .logo {
            display: block;
            margin: 0 auto 1.5rem;
            width: 5rem;
            height: 5rem;
        }
        .title {
            text-align: center;
            font-size: 1.5rem;
            color: #c22d27;
            font-family: 微软雅黑;
            font-weight: bold;
        }
        .login {
            width: 23rem;
            height: 13.6rem;
            background: #ffffff;
            border-radius: 1rem;
            margin: 4.5rem auto;
            display: flex;
            flex-direction: column;
            padding: 2.2rem 0;
            & > div {
                margin: 0 auto 1.5rem;
            }
            input {
                width: 17rem;
                height: 2.75rem;
                border-bottom: 1px solid #e8e8e8;
                padding-left: 2.7rem;
            }
            .name {
                position: relative;
                &:after {
                    content: '';
                    width: 1.8rem;
                    height: 1.8rem;
                    background: url("../assets/icons/account.png") no-repeat center;
                    background-size: 1.8rem;
                    position: absolute;
                    left: 0.1rem;
                    top: 0.3rem;
                }
            }
            .pwd {
                position: relative;
                &:after {
                    content: '';
                    width: 1.8rem;
                    height: 1.8rem;
                    background: url("../assets/icons/pwd.png") no-repeat center;
                    background-size: 1.8rem;
                    position: absolute;
                    left: 0.1rem;
                    top: 0.3rem;
                }
            }
            .btn_2 {
                margin-top: 1rem;
            }
        }
    }
</style>
