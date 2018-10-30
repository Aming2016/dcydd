<template>
    <div class="invitation">
        <headertwo :dataname="dataname"></headertwo>
        <ul class="ul_1">
            <li @click="twocodebtn">
                <span>我的邀请码</span>
                <img src="../../imgs/home/gengduojiantou.png" alt="">
                <img src="../../imgs/mine/erweimatwo.png" alt="">
            </li>
        </ul>
        <ul class="ul_1" style="margin-top:0.1rem;">
            <li @click="friendlistbtn(1)">
                <span>邀请我的</span>
                <img src="../../imgs/home/gengduojiantou.png" alt="">
            </li>
            <li @click="friendlistbtn(2)"> 
                <span>我邀请的</span>
                <img src="../../imgs/home/gengduojiantou.png" alt="">
            </li>
        </ul>
    </div>
</template>
<script>
import headertwo from '../module/headertwo'
export default {
  data(){
      return{
          dataname:"邀请好友",
      }
  },
  methods:{
   twocodebtn(){
     this.$router.push("/twocode")
   },
   friendlistbtn(num){
     this.$router.push("/friendlist"+"/"+num)
   }
  },
  components:{
    headertwo
  }
}
</script>
<style scoped lang="less">
.invitation{
    width:100%;
    height:100%;
    position: absolute;
    background-color:#F8F8F8;
}
.ul_1{
    width:100%;
    background:#ffffff;
    margin-top:0.54rem;
    >li:nth-of-type(2){
        border-top:0.005rem solid #e6e6e6;
    }
    >li{
        padding:0.15rem 0;
        margin:0 0.12rem;
        font-size:0.17rem;
        >img:nth-of-type(1){
            height:0.18rem;
            vertical-align: middle;
            float:right;
        }
        >img:nth-of-type(2){
            margin-top:-0.03rem;
            width:0.23rem;
            margin-right:0.1rem;
            vertical-align: middle;
            float:right;
        }
        >span{
            vertical-align: middle;
        }
    }
}
</style>