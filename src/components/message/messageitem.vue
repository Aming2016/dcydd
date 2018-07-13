<template>
    <div class="message">
        <headertwo :dataname="dataname"></headertwo>
        <ul class="contentul">
            <li>
                <div class="titilename">12.45</div>
                <div class="contentbox">
                    分红你等哈哦ID号法搜我好的佛号大师胡打死豁达是都会死带上一个海带丝给
                </div>
            </li>
             <li>
                <div class="titilename">12.45</div>
                <div class="contentbox">
                    分红你等哈哦ID号法搜我放大看撒谎发的哈萨克货到付款是好的佛号大师胡打死豁达是都会死带上一个海带丝给
                </div>
            </li>
             <li>
                <div class="titilename">12.45</div>
                <div class="contentbox">
                    分红你等哈哦ID号法搜我好的发货单三好的方式开厚大司考佛号大师胡打死豁达是都会死带上一个海带丝给
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
        id:"1",
        dataname:"服务通知"
      }
  },
  created(){
      this.id= this.$route.query.id
      if(this.id=="1"){
          this.dataname="服务通知"
      }else{
          this.dataname="系统通知"
      }
  },
  methods:{
      
  },
  components:{
    headertwo
  }
}
</script>
<style scoped lang="less">
.message{
    width:100%;
    height:100%;
    border-top:1px solid #ffffff;
    box-sizing: border-box;
    background:#f8f8f8;
}
.contentul{
    width:100%;
    margin-top:0.44rem;
}
.contentul>li{
    margin-left:0.12rem;
    margin-right:0.12rem;
}
.titilename{
    font-size:0.13rem;
    color:#999999;
    text-align: center;
    margin-top:0.15rem;
    margin-bottom:0.1rem;
}
.contentbox{
    padding-top:0.15rem;
    padding-left:0.1rem;
    padding-right:0.1rem;
    padding-bottom:0.15rem;
    background:#ffffff;
    font-size:0.15rem;
    color:#666666;
    border-radius: 0.06rem;
}
</style>

