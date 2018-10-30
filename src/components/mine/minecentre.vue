<template>
    <div class="minecentre">
        <headertwo :dataname="dataname"></headertwo>
        <ul class="headerimg" @click="portraitbtn">
            <li>
                <div>头像</div>
                <div>
                   <img src="../../imgs/home/gengduojiantou.png" alt="">
                    <span>
                        <img :src="mydata.headImage" alt="">
                    </span>
                    
                </div>
            </li>
        </ul>
        <ul class="contentul" @click="minenamebtn">
            <li>
                <div>昵称</div>
                <div>
                    <span>{{mydata.nickname}}</span>
                    <img src="../../imgs/home/gengduojiantou.png" alt="">
                </div>
            </li>
        </ul>
         <ul class="contentul" style="margin-top:0.1rem;" @click="numberbtn">
            <li>
                <div>手机号码</div>
                <div>
                    <span>{{mydata.mobile}}</span>
                    <img src="../../imgs/home/gengduojiantou.png" alt="">
                </div>
            </li>
        </ul>
         <ul class="contentul" @click="minepasswordbtn">
            <li>
                <div>密码登录</div>
                <div>
                    <img src="../../imgs/home/gengduojiantou.png" alt="">
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import headertwo from '../module/headertwo'
export default {
  data(){
      return{
          dataname:"个人中心",
          mydata:""
      }
  },
  created(){
      this.mydata=JSON.parse(window.localStorage.dc_mydata)
  },
  activated(){
      console.log("aqaa")
  },
  methods:{
     portraitbtn(){
         this.$router.push("/portrait")
     },
      minenamebtn(){
          this.$router.push("/minename")
      },
      numberbtn(){
          this.$router.push("/phonenumber")
      },
      minepasswordbtn(){
          this.$router.push("/minepassword")
      }
  },
  components:{
    headertwo
  }
}
</script>
<style scoped lang="less">
.minecentre{
    width:100%;
    height:100%;
    position: absolute;
    background-color:#F8F8F8;
}
.headerimg{
    width:100%;
    height:0.6rem;
    background:#ffffff;
    margin-top:0.54rem;
    margin-top:1px solid #ffffff;
    box-sizing: border-box;
}
.headerimg>li{
    margin-left:0.12rem;
    margin-right:0.12rem;
    height:100%;
    border-bottom:1px solid #cacaca;
    box-sizing: border-box;
    overflow: hidden;
}
.headerimg>li>div:nth-of-type(1){
    float:left;
    line-height: 0.6rem;
    font-size:0.17rem;
}
.headerimg>li>div:nth-of-type(2){
    float:right;
    height:0.6rem;
    line-height: 0.6rem;
}
.headerimg>li>div:nth-of-type(2)>img{
    width:0.1rem;
    height:0.18rem;
    margin-left:0.1rem;
    margin-top:0.2rem;
    float:right;

}
.headerimg>li>div:nth-of-type(2)>span{
    display:inline-block;
    float:right;
    width:0.4rem;
    height:0.4rem; 
    border-radius: 50%;
    margin-top:0.1rem;
    overflow: hidden;
    position: relative;
}
.headerimg>li>div:nth-of-type(2)>span>img{
    width:100%;
    height:100%;
    margin-left:0.1rem;
    top:0;
    left:0;
    float:right;
}
.contentul{
    width:100%;
    height:0.5rem;
    background-color:#ffffff;

}
.contentul>li{
    margin-left:0.12rem;
    margin-right:0.12rem;
    height:100%;
    box-sizing: border-box;
}
.contentul>li>div:nth-of-type(1){
    float:left;
    font-size:0.17rem;
    line-height: 0.5rem;
}
.contentul>li>div:nth-of-type(2){
    float:right;
    font-size:0.15rem;
    color:#999999;
    line-height: 0.5rem;
}
.contentul>li>div:nth-of-type(2)>img{
    width:0.1rem;
    height:0.18rem;
    margin-left:0.1rem;
}
</style>