<template>
    <div class="minecentre">
        <headertwo :dataname="dataname"></headertwo>
        <textarea class="boxclass" placeholder="请输入您的反馈内容" v-model="content">
        {{content}}
        </textarea>
        <div class="bottomtext">感谢您对我们提出宝贵的意见！</div>
        <buttonone class="buttonone" :buttonname="buttonnametwo" @click.native="activebtn"></buttonone>
    </div>
</template>
<script>
import headertwo from '../module/headertwo'
import buttonone from '../module/buttonone'
import { Toast } from "mint-ui";
export default {
  data(){
      return{
          dataname:"意见反馈",
          content:"",
          buttonnametwo:"提交"
      }
  },
  methods:{
    activebtn(){
        if(this.content){
            this._querys()
        }else{
             Toast({
                message:"请填写反馈信息",
                position: "bottom",
                duration: 600
                });
        }
        
    },
    _querys(){
        this.$http.post(this.$url.URL.FEEDBACKADVICE,{
            content: this.content
        })
        .then(res=>{
            if(res.data.status=='1'){
                this.$router.go(-1)
                Toast({
                message:"提交成功",
                position: "bottom",
                duration: 600
                });
            }else{
                Toast({
                message: res.data.msg,
                position: "bottom",
                duration:600
                });
            }
        })
    }
  },
  components:{
    headertwo,
    buttonone
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
.boxclass{
    width:100%;
    background:#ffffff;
    height:1.5rem;
    margin-top:0.54rem;
    font-size:0.15rem;
    text-indent: 0.12rem;
    float:left;
}
.bottomtext{
    font-size:0.15rem;
    color:#666666;
    margin-left:0.12rem;
    float:left;
    margin-top:0.05rem;
}
.buttonone{
    float:left;
    margin-left:10%;
    margin-top:1rem;
}
</style>