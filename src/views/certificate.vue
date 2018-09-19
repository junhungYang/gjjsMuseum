<template>
    <div class="certificatePage">
        <HeaderF title="上传证件"/>
        <p class="tips">
            请上传意向职业的相关证件正面照，未上传该照片将无法 投送简历。
            <span>(支持jpg/png/gif格式图片,单张大小在5M以内，最多可上传三张。)</span>
        </p>
        <a class="upload" @click="chooseImage">
            <i class="plus-i"></i>
            <span>点击上传照片</span>
        </a>
        <ul class="photoList">
            <li v-for="item,index in photos">
                <img :src="item">
                <a class="delete" @click="deletePhoto(index)"><i class="close-i"></i></a>
            </li>
        </ul>
        <div class="btnBox_01">
            <a class="btn_01" @click="save">确认保存</a>
        </div>
    </div>
</template>

<script>
    import HeaderF from '../components/HeaderF'
    import { uploadImage as wxUploadImage } from '../js/wechat'
    import wx from 'weixin-js-sdk'
    import { uploadImage, certificateUpload } from '../js/sendRequest/sendRequest'
    export default {
        data () {
            return {
                photos: []
            }
        },
        created () {
            this.photos = this.$store.state.userInfo.cardUrl.split(',')
        },
        methods: {
            deletePhoto (index) {
                this.photos.splice(index, 1)
            },
            chooseImage () {
                wx.chooseImage({
                    count: 3 - this.photos.length,
                    success: function (res) {
                        this.photos = this.photos.concat(res.localIds)
                    }
                })
            },
            save () {
                let localIds = [], imgs = []
                this.photos.forEach(item => {
                    if (item.indexOf('wxLocal') > 0) {
                        localIds.push(item)
                    } else {
                        imgs.push(item)
                    }
                })

                wxUploadImage(localIds).then(res => {
                    return uploadImage(res.serverIds)
                }).then(data => {
                    certificateUpload(imgs.concat(data)).then(() => {
                        this.$store.commit('showToast', '保存成功')
                    })
                })
            },
        },
        components: {
            HeaderF,
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .certificatePage {
        .tips {
            padding: 1rem;
            font-size: 1.2rem;
            span {
                color: #8e8e8e;
                font-size: 1.0rem;
            }
        }
        .upload {
            display: block;
            height: 8rem;
            margin: 1rem 2rem;
            border: 1px dashed #8e8e8e;
            i {
                display: block;
                margin: 2rem auto 0.9rem;
            }
            span {
                display: block;
                text-align: center;
                color: #8e8e8e;
                font-size: 1.0rem;
                font-weight: bold;
            }
        }
        .photoList {
            display: flex;
            margin-left: 2rem;
            margin-bottom: 3rem;
            li {
                position: relative;
                margin-right: 1.25rem;
            }
            img {
                display: block;
                width: 8.5rem;
                height: 8.5rem;
            }
            .delete {
                position: absolute;
                padding: 0.2rem;
                top: 0;
                right: 0;
                transform: translate3d(40%, -40%, 0);
            }
        }

    }
</style>
