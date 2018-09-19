<template>
    <div class="userPage">
        <img src="../assets/images/tp_03.png" class="headerImg">
        <p class="name">bilibili干杯君（￣▽￣）～■□～（￣▽￣）</p>
        <div class="content">
            <div class="top">
                <div class="select" v-if="false">
                    <span>选择</span>
                    <p><i>＋</i>新增报名人信息</p>
                    <span>管理</span>
                </div>
                <div class="revise">
                    <p>管理个人信息资料</p>
                    <span>取消</span>
                </div>
            </div>
            <ul class="list">
                <li class="select_item" v-for="n in 3" >
                    <p class="radioActive radioWrapper"><span class="radio_1"></span></p>
                    <div class="detail">
                        <p class="name_1"><span>联系人：</span>林峰广东省-佛山市-南海区</p>
                        <p><span>联系方式：</span>18943234322</p>
                        <p><span>居住地区：</span>广东省-佛山市-南海区</p>
                    </div>
                    <p class="sex">男</p>
                </li>
                <li class="revise_item" v-if="false" v-for="n in 3">
                    <div class="detail">
                        <p class="name_1"><span>联系人：</span>林峰广东省-佛山市-南海区</p>
                        <p><span>联系方式：</span>18943234322</p>
                        <p><span>居住地区：</span>广东省-佛山市-南海区</p>
                    </div>
                    <p class="sex">男</p>
                    <div class="operation">
                        <span class="edit"><i></i>编辑</span>
                        <span class="del"><i></i>修改</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="bottom disable">确定选择</div>
    </div>
</template>

<script>
    export default {
        data () {
            return {}
        }
    }
</script>

<style lang="scss">
    .userPage{
        color: #353535;
        .headerImg{
            display: block;
            width: 6.5rem;
            height: 6.5rem;
            margin: 2.8rem auto 1.5rem;
            border-radius: 50%;
        }
        .name{
            font-size: 1.2rem;
            margin-bottom: 2.8rem;
            text-align: center;
        }
        .content{
            position: absolute;
            top: 15rem;
            left: 0;
            bottom: 0;
            right: 0;
            background: #ffffff;
            font-size: 1.2rem;
            .top{
                width: 100%;
                height: 4rem;
                border-bottom: 1px solid #b5b5b5;
                .select{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    span{
                        width: 5.3rem;
                        height: 2rem;
                        line-height: 2rem;
                        text-align: center;
                    }
                    p{
                        flex: 1;
                        height: 2rem;
                        line-height: 2rem;
                        text-align: center;
                        border-left: 1px solid #e8e8e8;
                        border-right: 1px solid #e8e8e8;
                        i{
                            display: inline-block;
                            margin-right: 1.1rem;
                            font-weight: 900;
                        }
                    }
                }
                .revise{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    p{
                        flex: 1;
                        font-size: 1.3rem;
                        text-align: center;
                    }
                    span{
                        width: 5.2rem;
                        height: 2.1rem;
                        line-height: 2.1rem;
                        text-align: center;
                        color: #8e8e8e;
                        border-left: 1px solid #e8e8e8;
                    }
                }
            }
            .list{
                & > li{
                    & > p{
                        width: 5.2rem;
                        height: 5.4rem;
                    }
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    height: 7.5rem;
                    border-bottom: 1px solid #e4dfcb;
                    .detail{
                        flex: 1;
                        height: 5.4rem;
                        & > p{
                            margin: 0 0 0.7rem 1.5rem;
                            span{
                                display: inline-block;
                                width: 6.5rem;
                            }
                            &.name_1{
                                width: 14.5rem;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                        }
                    }
                }
            }
            .select_item{
                & > p{
                    &.radioWrapper{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    &.radioActive{
                        .radio_1:after{
                            background: #353535;
                        }
                    }
                }
            }
            .revise_item{
                .sex{
                    border-right: 1px solid #e4dfcb;
                }
                .operation{
                    width: 5.2rem;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    span{
                        width: 4.2rem;
                        height: 3.6rem;
                        line-height: 3.6rem;
                        text-align: center;
                        margin: 0 auto;
                        font-size: 1rem;
                        color: #8e8e8e;
                        i{
                            display: inline-block;
                            width: 1.3rem;
                            height: 1.3rem;
                            vertical-align: middle;
                            margin: -0.2rem 0.5rem 0 0;
                        }
                    }
                    .edit{
                        border-bottom: 1px solid #e4dfcb;
                        i{
                            background: url("../assets/icons/edit.png") no-repeat center;
                            background-size: 1.3rem;
                        }
                    }
                    .del{
                        i{
                            background: url("../assets/icons/del.png") no-repeat center;
                            background-size: 1.3rem;
                        }
                    }
                }
            }
        }
        .bottom{
            width: 100%;
            height: 5rem;
            line-height: 5rem;
            text-align: center;
            font-size: 1.3rem;
            color: #ffffff;
            background: #c22d27;
            position: fixed;
            left: 0;
            bottom: 0;
            z-index: 100;
        }
        .disable{
            background: #8e8e8e;
        }
    }
</style>
