<template>
    <div class="minecentre">
        <headertwo :dataname="dataname"></headertwo>
        <div class="wcbtnclass" @click="wcbtn">完成</div>
        <div class="contentname">
            <div>昵称</div>
            <input type="text" :placeholder="mydata.nickname" v-model="mydataname">
        </div>
    </div>
</template>
<script>
import headertwo from '../module/headertwo'
export default {
  data(){
      return{
          dataname:"昵称",
          mydata:JSON.parse(window.localStorage.mydata),
          mydataname:""
      }
  },
  methods:{
     wcbtn(){
         this.$http.post(this.$url.URL.UPDATENICKNAME,{
             nickname:this.mydataname
         })
         .then(res=>{
             console.log(res)
             this._myquerys()//请求个人数据
         })
     },
     _myquerys(){
        this.$http.get(this.$url.URL.MINEDATAINFO)
        .then(res=>{
            window.localStorage.mydata=JSON.stringify(res.data.data)
            this.$router.back(-1)
        })
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
.wcbtnclass{
    position: fixed;
    z-index: 999999;
    top:0.1rem;
    right:0.12rem;
    font-size:0.17rem;
    color:#999999;
}
.contentname{
    width:100%;
    height:0.5rem;
    margin-top:0.54rem;
    background:#ffffff;
    line-height: 0.5rem;
    font-size:0.17rem;
}
.contentname>div{
    display: inline-block;
    margin-left:0.12rem;
}
.contentname>input{
    font-size:0.16rem;
    color:#666666;
    margin-left:0.2rem;
}
</style>