<template>
    <div class="register">
        <headertwo :dataname="dataname"></headertwo>
        <div class="mineimg">
            <img src="../../imgs/home/denglogo.png" alt="" srcset="">
        </div>
        <div>
        <div class="inputbox">
            <input type="text" placeholder="请输入手机号码" maxlength="11" v-model="phonnumber" @blur="movephoneer">
        </div>
        <div class="inputbox" style="margin-top:0.15rem;">
            <input type="text" style="width:1.5rem;" placeholder="请输入验证码" v-model="yzmname">
            <div class="dxcolorone" v-show="movenumbe" @click="pricebtn">
                {{fasodxnumber}}
            </div>
            <div class="dxcolortwo" v-show="!movenumbe">
                {{number}}<span>s</span>
            </div>
        </div>
        <buttonone class="buttonone" :buttonname="buttonnametwo" @click.native="gohuanhaombtntwo"></buttonone>
        </div>
        
    </div>
</template>
<script>
import buttonone from "../module/buttonone";
import { MessageBox } from "mint-ui";
import headertwo from "../module/headertwo";
import { md5 } from "../../common/js/md5.js";
export default {
  data() {
    return {
      movenumbe: true,
      fasodxnumber: "获取验证码",
      buttonnametwo: "登录",
      dataname: "绑定手机号码",
    };
  },
  created(){
     this.$store.state.activeindex="6"
  },
  methods: {
    
  },

  components: {
    buttonone,
    headertwo
  }
};
</script>
<style scoped lang="less">
@import "../../common/css/master.less";

.register {
  width: 100%;
  min-height: 100%;
  border-top: 1px solid #ffffff;
  box-sizing: border-box;
}
#returnimg {
  width: 0.18rem;
  height: 0.18rem;
  position: fixed;
  top: 0.12rem;
  left: 0.12rem;
}
.mineimg {
  width: 1.1rem;
  height: 1.1rem;
  margin: auto;
  margin-top: 0.8rem;
}
.mineimg > img {
  width: 100%;
  height: 100%;
}
.bottondengl {
  width: 80%;
  text-align: center;
  margin: 0.5rem auto;
}
.bottondengl > div {
  float: left;
}
.bottondengl > div:nth-of-type(1) {
  width: 36%;
  border-top: 1px solid #cacaca;
  margin-top: 0.08rem;
}
.bottondengl > div:nth-of-type(3) {
  width: 36%;
  border-top: 1px solid #cacaca;
  margin-top: 0.08rem;
}
.bottondengl > div:nth-of-type(2) {
  font-size: 0.12rem;
  margin: 0 0.1rem;
}
.inputbox {
  margin-left: 0.37rem;
  margin-right: 0.37rem;
  height: 0.45rem;
  line-height: 0.45rem;
  border-bottom: 1px solid #cacaca;
  font-size: 0.18rem;
  margin-top: 0.35rem;
}
.dxcolorone {
  width: 0.8rem;
  padding: 0.06rem 0;
  float: right;
  line-height: normal;
  margin-top: 0.05rem;
  background: @colorone;
  border-radius: 0.15rem;
  font-size: 0.14rem;
  text-align: center;
  color: #ffffff;
}
.dxcoloronetwo {
  width: 0.8rem;
  height: 0.3rem;
  float: right;
  margin-top: 0.08rem;
  border-radius: 0.15rem;
  font-size: 0.15rem;
  line-height: 0.3rem;
  text-align: center;
  color: #666666;
}
.dxcolortwo {
  width: 0.8rem;
  height: 0.3rem;
  float: right;
  margin-top: 0.05rem;
  background: #eeeeee;
  border-radius: 0.15rem;
  font-size: 0.14rem;
  line-height: 0.3rem;
  text-align: center;
  color: #999999;
}
.passwordname {
  font-size: 0.16rem;
  width: 50%;
  color: @colorone;
  margin-top: 0.15rem;
  margin-left: 0.37rem;
}
.buttonone {
  margin-left: 10%;
  margin-top: 0.5rem;
}
.zcclass {
  width: 0.7rem;
  padding: 0.01rem 0;
  line-height: normal;
  border-radius: 0.06rem;
  color: #cacaca;
  background: #eeeeee;
  text-align: center;
  font-size: 0.14rem;
  float: right;
  margin-right: 0.37rem;
  margin-top: 0.13rem;
}
.wangjimia {
  float: left;
  margin-left: 0.37rem;
  margin-top: 0.14rem;
  font-size: 0.15rem;
  color: #cacaca;
}
.bottomimg {
  width: 100%;
  margin-top: -0.3rem;
  text-align: center;
}
.bottomimg > img {
  width: 0.3rem;
}
</style>

