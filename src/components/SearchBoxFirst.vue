<template>
    <div class="searchBox_1">
        <form @submit.prevent="search">
            <input type="search" :placeholder="placeholder" v-model="wd">
            <a class="submit" @click="search">
                <i class="search-i"></i>
            </a>
        </form>
    </div>
</template>

<script>
    export default {
        props: ['placeholder'],
        data () {
            return {
                wd: ''
            }
        },
        created () {
            this.wd = this.$route.query.wd || ''
        },
        methods: {
            search () {
                this.$emit('search', this.wd)
            },
            clear () {
                this.wd = ''
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .searchBox_1 {
        width: 27rem;
        height: 2.4rem;
        margin: 0 auto;
        background: #fff;
        border: 1px solid #e8e8e8;
        border-radius: 0.5rem;
        form {
            display: flex;
        }
        input {
            width: 23.2rem;
            height: 2.4rem;
            padding: 0 1rem;
            line-height: 2.4rem;
            border-right: 1px solid #e8e8e8;
            font-size: 1.2rem;
        }
        .submit {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>
