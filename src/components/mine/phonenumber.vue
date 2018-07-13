<template>
    <div class="minecentre">     
        <headertwo :dataname="dataname"></headertwo>       
        <div v-show="movephone">  
            <div class="contentname">
                <div>手机号码</div>
                <div>{{mydata.mobile}}</div>
            </div>
            <buttonone class="buttonone" :buttonname="buttonname" @click.native="gohuanhaombtn"></buttonone>
        </div>
         <div v-show="!movephone">
            <div class="contentname">
                <div style="border-right:1px solid #cacaca;">+86</div>
                <input type="text" placeholder="请输入您要更换的手机号码" v-model="phonnumber">
            </div>
            <div class="duanxinclass">
                <input type="text" placeholder="请输入您的短信验证码" v-model="smsCode">
                <div class="dxcolorone" v-show="movenumbe" @click="pricebtn">
                    {{fasodxnumber}}
                </div>
                <div class="dxcolortwo" v-show="!movenumbe" >
                    {{number}}<span>s</span>
                </div>
            </div>
            <buttonone class="buttonone" :buttonname="buttonnametwo" @click.native="gohuanhaombtntwo"></buttonone>
        </div>
    </div>
</template>
<script>
import headertwo from "../module/headertwo";
import buttonone from "../module/buttonone";
import { MessageBox } from "mint-ui";
import { md5 } from "../../common/js/md5.js";
export default {
  data() {
    return {
      movephone: true,
      movenumbe: true,
      fasodxnumber: "获取验证码",
      dataname: "手机号",
      buttonname: "更换手机号码",
      buttonnametwo: "确定",
      number: 60,
      phonnumber: "", //手机号码
      smsCode:"",//验证码
      mydata: JSON.parse(window.localStorage.mydata)
    };
  },
  methods: {
    gohuanhaombtn() {
      this.movephone = false;
    },
    gohuanhaombtntwo() {
      if(/^1[34578]\d{9}$/.test(this.phonnumber)){
          if(this.smsCode){
              this._querysshouji()
          }else{
              MessageBox.alert("请填写验证码");
          }
      }else{
           MessageBox.alert("不是完整的11位手机号码");
      }
      
    },
    pricebtn() {
      this._querysyzm();
    },
    _querysshouji(){
        this.$http.post(this.$url.URL.UPDATEMOBILE,{
            mobile:this.phonnumber,
            smsCode:this.smsCode
        })
        .then(res=>{
            console.log(res)
            if(res.data.status=='1'){
                this._myquerys();
            }else{
                 MessageBox.alert(res.data.msg);
            }
        })
    },
    _myquerys(){//请求个人数据
        this.$http.get(this.$url.URL.MINEDATAINFO)
        .then(res=>{
            window.localStorage.mydata=JSON.stringify(res.data.data)
            this.$router.back(-1)
        })
    },
    _querysyzm() {//发送验证码
      if (/^1[34578]\d{9}$/.test(this.phonnumber)) {
        let str = this.phonnumber + this.$url.URL.SECRETKEY;
        let strone = md5(str);
        this.$http
          .post(this.$url.URL.FETCHSMSCODE, {
            deviceCode: "web",
            mobile: this.phonnumber,
            operateType: "UPDATE_MOBILE",
            sign: strone
          })
          .then(res => {
              console.log(res)
            if (res.data.status == "1") {
               MessageBox.alert("短信已发送");
              this.movenumbe = false;
              var setval = setInterval(() => {
                this.number--;
                if (this.number == "-1") {
                  this.movenumbe = true;
                  this.fasodxnumber = "重新获取";
                  clearInterval(setval);
                  this.number = 60;
                }
              }, 1000);
            } else {
              MessageBox.alert(res.data.msg);
            }
          });
      } else {
        MessageBox.alert("不是完整的11位手机号码");
      }
    }
  },
  components: {
    headertwo,
    buttonone
  }
};
</script>
<style scoped lang="less">
@import "../../common/css/master.less";
.minecentre {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #f8f8f8;
}
.contentname {
  width: 100%;
  height: 0.5rem;
  margin-top: 0.54rem;
  background: #ffffff;
  line-height: 0.5rem;
  font-size: 0.17rem;
}
.contentname > div:nth-of-type(1) {
  display: inline-block;
  margin-left: 0.12rem;
  height: 100%;
  float: left;
  line-height: 0.5rem;
  padding-right: 0.15rem;
}
.contentname > input {
  font-size: 0.15rem;
  color: #666666;
  margin-left: 0.15rem;
}
.contentname > div:nth-of-type(2) {
  display: inline-block;
  font-size: 0.16rem;
  color: #666666;
  margin-left: 0.15rem;
}
.buttonone {
  // float:left;
  margin-left: 10%;
  margin-top: 1rem;
}
.duanxinclass {
  width: 100%;
  height: 0.5rem;
  margin-top: 0.1rem;
  background: #ffffff;

  font-size: 0.15rem;
  color: rgb(221, 211, 211);
}
.duanxinclass > input {
  display: inline-block;
  margin-left: 0.12rem;
  height: 0.5rem;
  line-height: 0.5rem;
}
.dxcolorone {
  width: 0.8rem;
  line-height: normal;
  padding:0.06rem 0;
  float: right;
  margin-top: 0.1rem;
  margin-right: 0.12rem;
  background: @colorone;
  border-radius: 0.15rem;
  font-size: 0.14rem;
  text-align: center;
  color: #ffffff;
}
.dxcolortwo {
  width: 0.8rem;
  float: right;
  line-height: normal;
  padding:0.07rem 0;
  margin-top: 0.1rem;
  margin-right: 0.12rem;
  background: #eeeeee;
  border-radius: 0.15rem;
  font-size: 0.14rem;
  text-align: center;
  color: #999999;
}
.dxcolortwo > span {
  font-size: 0.12rem;
}
</style>