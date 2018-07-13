<template>
    <div class="minecentre">     
        <headertwo :dataname="dataname"></headertwo>       
        <div>  
            <div class="contentname">
                <div>原密码</div>
                <input type="password" placeholder="请输入原密码" v-model="password">
            </div>
            <div class="contentname" style="margin-top:0.1rem;">
                <div>登陆密码</div>
                <input type="password" placeholder="请设置6~12位新密码" v-model="newPassword">
            </div>
            <div class="contentname" style="margin-top:0.1rem;">
                <div>验证密码</div>
                <input type="password" placeholder="请再次输入新密码" v-model="confirmPassword">
            </div>
            <buttonone class="buttonone" :buttonname="buttonname" @click.native="gohuanhaombtn"></buttonone>
            <div id="id_3" @click="forgetpasswordbtn">忘记原密码</div>
        </div>
    </div>
</template>
<script>
import headertwo from '../module/headertwo'
import buttonone from '../module/buttonone'
import { MessageBox } from "mint-ui";
import { md5 } from "../../common/js/md5.js";
export default {
  data(){
      return{
          dataname:"设置登录密码",
          buttonname:"确定",
          buttonnametwo:"确定",
          password:"",//原密码
          newPassword:"",//重新设置密码
          confirmPassword:"",//确定密码
      }
  },
  methods:{
     gohuanhaombtn(){
       if(this.password){
           if(this.newPassword){
               if(this.confirmPassword){
                   if(this.newPassword==this.confirmPassword){
                       if(/^[A-Za-z0-9]{6,12}$/.test(this.newPassword)&&/^[A-Za-z0-9]{6,12}$/.test(this.confirmPassword)){
                           this._querys();
                       }else{
                           MessageBox.alert("请输入6~12位的的密码");
                       }
                   }else{
                       MessageBox.alert("两次密码输入不同");
                   }
               }else{
                   MessageBox.alert("请确认新密码");
               }
           }else{
                MessageBox.alert("请填写新密码");
           }
       }else{
           MessageBox.alert("请填写原密码");
       }
     },
     _querys(){
            let passwords=md5(this.password)
            let newPasswords=md5(this.newPassword)
            let confirmPasswords=md5(this.confirmPassword)
         this.$http.post(this.$url.URL.UPDATEPASSWORD,{
             password:passwords,//原密码
             newPassword:newPasswords,//新密码
             confirmPassword:confirmPasswords,//确认密码
         })
         .then(res=>{
             if(res.data.status=='1'){
                 this.$router.go(-1)
             }else{
                MessageBox.alert(res.data.msg); 
             }
         })
     },
     forgetpasswordbtn(){
         this.$router.push("/forgetpassword")
     }
  },
  components:{
    headertwo,
    buttonone
  }
}
</script>
<style scoped lang="less">
@import "../../common/css/master.less";
.minecentre{
    width:100%;
    height:100%;
    position: absolute;
    background-color:#F8F8F8;
}
.contentname{
    width:100%;
    height:0.5rem;
    margin-top:0.54rem;
    background:#ffffff;
    line-height: 0.5rem;
    font-size:0.17rem;
}
.contentname>div:nth-of-type(1){
    display: inline-block;
    margin-left:0.12rem;
    height:100%;
    // border-right:1px solid #cacaca;
    padding-right:0.15rem;
}
.contentname>input{
    font-size:0.15rem;
    color:#666666;
    margin-left:0.15rem;
}
#id_3{
    float:right;
    margin-right:10%;
    font-size:@fontsize_3;
    margin-top:0.15rem;
    color:@colortwo;
}
.contentname>div:nth-of-type(2  ){
    display:inline-block;
    font-size:0.16rem;
    color:#666666;
    margin-left:0.15rem;
}
.buttonone{
    // float:left;
    margin-left:10%;
    margin-top:1rem;
}
.duanxinclass{
    width:100%;
    height:0.5rem;
    margin-top:0.1rem;
    background:#ffffff;
    
    font-size:0.15rem;
    color:rgb(221, 211, 211)
}
.duanxinclass>div:nth-of-type(1){
    display: inline-block;
    margin-left:0.12rem;
    color:#333333;
}
.duanxinclass>input{
    display: inline-block;
    width:1.5rem;
    margin-left:0.12rem;
    height:0.5rem;
    line-height: 0.5rem;
}
.dxcolorone{
    width:0.8rem;
    height:0.3rem;
    float:right;
    margin-top:0.1rem;
    margin-right:0.12rem;
    background:@colorone;
    border-radius: 0.15rem;
    font-size:0.14rem;
    line-height: 0.3rem;
    text-align: center;
    color:#ffffff;
}
.dxcolortwo{
    width:0.8rem;
    height:0.3rem;
    float:right;
    margin-top:0.1rem;
    margin-right:0.12rem;
    background:#EEEEEE;
    border-radius: 0.15rem;
    font-size:0.14rem;
    line-height: 0.3rem;
    text-align: center;
    color:#999999;
}
.dxcolortwo>span{
    font-size:0.12rem;
}
</style>