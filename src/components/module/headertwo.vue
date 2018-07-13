<template>  
       <div class="header">
           <img src="../../imgs/home/fanhui.png" alt="" @click="quitbtn">
           {{dataname}}
        </div>   
</template>
<script>
export default{
    props:["dataname"],
    methods:{
        quitbtn(){
            var scrottop=window.document.documentElement.getBoundingClientRect().width/375*365
            window.scrollTo(0, scrottop);
            this.$router.go(-1)
        }
    }   
}
</script>
<style scoped lang="less">
    .header{
        width:100%;
        height:0.44rem;
        position: fixed;
        top:0;
        left:0;
        background:#ffffff;
        border-bottom:1px solid #cccccc;
        color:#333333;
        text-align: center;
        line-height: 0.44rem;
        font-size:0.19rem;
        z-index: 999;
    }
    .header>img{
        position: absolute;
        width:0.12rem;
        height:0.2rem;
        top:0.1rem;
        left:0.12rem;
    }
</style>