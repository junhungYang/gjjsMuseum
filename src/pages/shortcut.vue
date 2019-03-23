<template>
    <div class="shortcut" id="shortcutImgMark">
        <div class="bg" id="shortcutHtml2canvas">
            <div class="wrapper">
                <span v-if="hasData" :style="styleObj" class="introduce"></span>
                <img src="../assets/images/bg.jpg" class="introduce" v-if="hasData === false || ticketDetail === {}">
                <div class="border">
                    <div class="content">
                        <div id="qrcode">
                            <img :src="ticketDetail.codeUrl" alt="">
                        </div>
                        <div class="detail">
                            <p class="day">{{entryDay}}</p>
                            <p class="time">{{ticketDetail.entryTime | formatDate2}}</p>
                            <p class="name">{{ticketDetail.name}}</p>
                            <p class="type">{{ticketDetail.personCount}}</p>
                        </div>
                    </div>
                    <p>您是第{{ticketDetail.number}}位访客</p>
                    <!--<div class="triangle"><p>入场券</p></div>-->
                </div>
                <img :src="base64Img.hexiao" class="seal" v-if="ticketDetail.state === '已核销'">
                <img :src="base64Img.guoqi" class="seal" v-if="ticketDetail.state === '已过期'">
                <img :src="base64Img.tuipiao" class="seal" v-if="ticketDetail.state === '退票'">
            </div>
        </div>
        <v-pullup :options="pullupdata"></v-pullup>
    </div>
</template>

<script>
    //    import '../js/html2canvas'
    import Canvas2Image from '../js/canvas2image'
    import { getTicketDetail } from '../js/sendRequest'
    //    import { getTicketDetail } from '../js/testData'
    import base64Img from '../js/localImgBase64'
    import pullupbox from './pullupbox'
    export default {
        data () {
            return {
                ticketDetail: {},
                entryDay: '',
                hasData: true,
                base64Img: {},
                pullupdata:[]
            }
        },
        computed: {
            styleObj () {
                return {
                    'background': 'url(' + this.ticketDetail.imageUrl + ')'
                }
            }
        },
        created () {
            this.getTicketDetail()
            this.base64Img = base64Img
        },
        components:{
             'v-pullup':pullupbox
        },
        methods: {
            drawQrcode (ticketNumber) {
                /* eslint-disable */
                new QRCode(document.getElementById('qrcode'), 'ticketNumber=' + ticketNumber)
                /* eslint-enable */
            },
            getTicketDetail () {
                getTicketDetail({id: this.$route.query.id}).then(data => {
                    if (data === '') {
                        this.hasData = false
                        // alert('NO DATA')
                        this.pullupdata= ['NO DATA'];
                        this.$store.commit('changepullup',true);
                    }
                    // this.drawQrcode(data.ticketNumber)
                    this.ticketDetail = data
//                    this.ticketDetail.imageUrl = this.getImgBase64(this.ticketDetail.imageUrl)
                    let dayList = data.ticketTime.split('-')
                    this.entryDay = dayList[0] + '年' + dayList[1] + '月' + dayList[2] + '日'
                    this.$nextTick(() => {
                        this.convert2canvas()
                    })
                })
            },
            /**
             * 获取图片Base64编码
             */
            getImgBase64 (imgUrl) {
                let img = new Image()
                img.src = imgUrl
                img.setAttribute('crossOrigin', 'Anonymous')
                img.onload = function (img) {
                    let canvas = document.createElement('canvas')
                    canvas.width = img.width
                    canvas.height = img.height
                    let ctx = canvas.getContext('2d')
                    ctx.drawImage(img, 0, 0, img.width, img.height)
                    let dataURL = canvas.toDataURL('image/png')
                    return dataURL
                }
            },
            convert2canvas () {
                let cntElem = document.getElementById('app')
                let shareContent = cntElem   // 需要截图的包裹的（原生的）DOM 对象
                let width = shareContent.offsetWidth   // 获取dom 宽度
                let height = shareContent.offsetHeight  // 获取dom 高度
//                let canvas = document.createElement('canvas')   // 创建一个canvas节点
                let scale = 2   // 定义任意放大倍数 支持小数
//                canvas.width = width * scale   // 定义canvas 宽度 * 缩放
//                canvas.height = height * scale   // 定义canvas高度 *缩放
//                canvas.getContext('2d').scale(scale, scale)   // 获取context,设置scale
                let opts = {
                    scale: scale,   // 添加的scale 参数
//                    canvas: canvas,   // 自定义 canvas
                    logging: true,   // 日志开关，便于查看html2canvas的内部执行流程
                    width: width * scale,
                    height: height * scale,
                    useCORS: true,   // 【重要】开启跨域配置
                    onrendered: function (canvas) {
                        let context = canvas.getContext('2d')
                        // 【重要】关闭抗锯齿
                        context.mozImageSmoothingEnabled = false
                        context.webkitImageSmoothingEnabled = false
                        context.msImageSmoothingEnabled = false
                        context.imageSmoothingEnabled = false
                        // 【重要】默认转化的格式为png,也可设置为其他格式
                        let img = Canvas2Image.convertToJPEG(canvas, canvas.width, canvas.height)
                        img.style = {
                            width: canvas.width / scale + 'px',
                            height: canvas.height / scale + 'px',
                        }
                        img.classList.add('markImg')
                        document.getElementById('shortcutImgMark').appendChild(img)
                    }
                }
                window.html2canvas(shareContent, opts)
            }
        },
        mounted () {

        }
    }
</script>

<style lang="scss">
    .shortcut {
        color: #353535;
        padding-top: 2rem;
        .markImg {
            display: inline-block;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0.01;
            z-index: 1000;
            /*& > img {*/
                /*display: inline-block;*/
                /*margin: auto;*/
                /*-webkit-touch-callout: default;*/
            /*}*/
        }
        .bg {
            margin: 0 auto;
            width: 30rem;
            padding: 1rem 0.5rem;
            background: rgba(255, 255, 255, 0.6);
        }
        .wrapper {
            margin: 0 auto;
            font-weight: bold;
            width: 29rem;
            background: #ffffff;
            position: relative;
            .border {
                padding-bottom: 1rem;
                overflow: hidden;
                position: relative;
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAkQAAAFTCAYAAADY2xPkAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2NGE3YmY1OS04NGVhLWExNGUtYjEyYy1iYTY5NTRhOGVhMjYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REYwQUY5NDczRUNBMTFFODgxMkFCRUNDMzNBNThGREEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REYwQUY5NDYzRUNBMTFFODgxMkFCRUNDMzNBNThGREEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YTBkNzJlMjctMzAwNS00MzRhLTljMzgtMDQxNzliMDQ1N2Q1IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NmFmZDYyNGUtZjBmNy0xMWU3LTkzNjAt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) #ffffff center no-repeat;
                background-size: 100% 100%;
                & > p {
                    color: #c22d27;
                    font-size: 1rem;
                    margin-left: 3.5rem;
                }
            }
        }
        .introduce {
            display: block;
            width: 29rem;
            height: 29rem;
            background-size: 100% !important;
        }
        .content {
            width: 29rem;
            margin: 0 auto;
            display: flex;
            #qrcode {
                width: 10rem;
                height: 10rem;
                box-shadow: 0 0.1rem 0.2rem #b5b5b5;
                margin: 2rem 2rem 1rem;
                padding: 1rem;
            }
            .detail {
                margin-top: 2rem;
                & > p {
                    font-size: 1.3rem;
                    color: #c22d27;
                    text-align: center;
                    margin-top: 1.4rem;
                }
                .time {
                    margin-top: 1rem;
                }
                .name {
                    color: #353535;
                }
                .type {
                    font-size: 1rem;
                    color: #b5b5b5;
                }
            }
        }
        .triangle {
            width: 12rem;
            height: 12rem;
            background: #9b1e23;
            color: #ffffff;
            text-align: center;
            font-size: 1.8rem;
            position: absolute;
            bottom: -6rem;
            right: -6rem;
            transform: rotate(-45deg);
            p {
                margin-top: 1rem;
            }
        }
        .seal {
            width: 9.1rem;
            height: 8rem;
            position: absolute;
            bottom: 1.2rem;
            left: 9.5rem;
        }
    }
</style>
