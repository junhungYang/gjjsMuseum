<template>
    <div class="pullupbox">
        <div class="mask" v-show="canshow">
            <div class="content">
                <p>{{textdata}}</p>
                <div @click="submit">确定</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
    name: 'pllupbox',
    props:{
    options:{
      type:Array,
      default:''
    }
    },
    data (){
        return {
            textdata:'',
            textindex:1
            }
        },
    computed : {
        canshow(){
            return this.$store.state.pullupshow;
        }
    },
    mounted(){
    },
    methods: {
        submit(){
            // console.log(this.options)
            if(this.textindex == this.options.length){
                this.$store.commit('changepullup',false);
            }
            if(this.options.length > 1){
                this.textdata = this.options[1];
                this.textindex = 2;
            }
        }
    },
    watch:{
        options(newval,old){
            if(newval.length > 0){
                this.textdata = newval[0];
                this.textindex = 1;
            }
        } 
    }
    }
</script>
<style lang="scss">
    .pullupbox{
        .mask{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        z-index: 100;
        .content{
            width: 82%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50% ,-50%);
            background-color: white;
            color: grey;
            text-align: center;
            border-radius: 2rem;
            border: 2px solid rgb(183,183,183);
            overflow: hidden;
            p{
                font-size: 1.4rem;
                line-height: 2rem;
                padding: 2rem 1rem 1rem 1rem;
                border-bottom: 2px solid grey;
                min-height: 5rem;
            }
            div{
                width: 100%;
                font-size: 2rem;
                line-height: 4rem;
                background-color: white;
                color: black;
            }
        }
    }
    }
</style>