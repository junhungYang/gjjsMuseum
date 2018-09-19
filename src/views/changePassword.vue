<template>
    <div class="changePasswordPage">
        <HeaderF title="修改密码"/>
        <div class="row">
            <span>原密码：</span>
            <input type="password" v-model="password">
        </div>
        <div class="row">
            <span>新密码：</span>
            <input type="password" v-model="newPassword">
        </div>
        <div class="row">
            <span>重复密码：</span>
            <input type="password" v-model="repeatPassword">
        </div>

        <a class="btn_01" @click="submit">确认修改</a>
    </div>
</template>

<script>
    import HeaderF from '../components/HeaderF'
    import { changePassword } from '../js/sendRequest/sendRequest'

    export default {
        data () {
            return {
                password: '',
                newPassword: '',
                repeatPassword: ''
            }
        },
        methods: {
            submit () {
                changePassword({
                    password: this.password,
                    newPassword: this.newPassword,
                    repeatPassword: this.repeatPassword
                }).then(() => {
                    this.$router.push('/personal')
                })
            }
        },
        components: {
            HeaderF,
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../css/_base.scss";
    .changePasswordPage {
        font-size: 1.2rem;
        .row {
            width: 20rem;
            display: flex;
            align-items: center;
            margin: 2rem auto;
            span {
                min-width: 7rem;
            }
        }
        input {
            width: 12rem;
            height: 2.25rem;
            line-height: 2.25rem;
            padding-left: 1rem;
            border: 1px solid #e8e8e8;
            box-sizing: border-box;
        }
    }
</style>
