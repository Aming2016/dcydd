<template>
    <div class="register">
        <img id="returnimg" src="../../imgs/home/denglufanhui.png" alt="" @click="returnbtn">
        <div class="titlename">忘记密码</div>
        <div class="inputbox" style="margin-top:1.25rem;">
            <input type="text" placeholder="请输入用户名/手机" v-model="phonnumber" @blur="movephoneer">
        </div>
        <div class="inputbox" style="margin-top:0.15rem;">
            <input type="text" style="width:1.5rem;" placeholder="请输入验证码" v-model="yzmname">
            <div class="dxcolorone" v-show="movenumbe" @click="pricebtn">
                {{fasodxnumber}}
            </div>
            <div class="dxcolortwo" v-show="!movenumbe" >
                {{number}}<span>s</span>
            </div>
        </div>
        <div class="inputbox" style="margin-top:0.15rem;">
            <input type="password" placeholder="请设置6~12位新密码" v-model="password"  @blur="movepasswoder">
        </div>
        <div class="inputbox" style="margin-top:0.15rem;">
            <input type="password" placeholder="请再次输入新密码" v-model="passwords">
        </div>
        <buttonone class="buttonone" :buttonname="buttonnametwo" @click.native="gohuanhaombtntwo"></buttonone>
    </div>
</template>
<script>
import buttonone from "../module/buttonone";
import { MessageBox } from "mint-ui";
import { md5 } from "../../common/js/md5.js";
export default {
  data() {
    return {
      movenumbe: true,
      fasodxnumber: "获取验证码",
      buttonnametwo: "确定",
      number: 60,
      phonnumber: "", //手机号码
      yzmname: "", //验证码
      password: "", //密码1
      passwords: "" //密码2
    };
  },
  methods: {
    returnbtn() {
      this.$router.go(-1);
    },
    movephoneer() {
      //移开手机号码输入框
      if (!/^1[34578]\d{9}$/.test(this.phonnumber)) {
        MessageBox.alert("不是完整的11位手机号码");
      }
    },
    pricebtn() {
      //点击获取验证码
      this._yzmquerys();
    },
    _codebtn() {
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
    },
    _yzmquerys() {
      //发送验证码
      if (/^1[34578]\d{9}$/.test(this.phonnumber)) {
        let str = this.phonnumber + this.$url.URL.SECRETKEY;
        console.log(str);
        let strone = md5(str);
        this.$http
          .post(this.$url.URL.FETCHSMSCODE, {
            mobile: this.phonnumber,
            sign: strone,
            operateType: "RESET_PASSWORD"
          })
          .then(res => {
            if (res.status == "200") {
              MessageBox.alert("已发送验证码，请注意查收");
            }
            this._codebtn();
          })
          .catch(() => {
            MessageBox.alert("发送失败");
          });
      } else {
        MessageBox.alert("不是完整的11位手机号码");
      }
    },
    movepasswoder() {
      //移开密码1
      if (!/^[A-Za-z0-9]{6,12}$/.test(this.password)) {
        MessageBox.alert("请输入6~12位的的密码");
      }
    },
    gohuanhaombtntwo() {
      if (/^1[34578]\d{9}$/.test(this.phonnumber)) {
        if (this.yzmname) {
          if (/^[A-Za-z0-9]{6,12}$/.test(this.password)) {
            if (this.password == this.passwords) {
              this.$http
                .post(this.$url.URL.RESETPASSWORD, {
                  mobile: this.phonnumber,
                  smsCode: this.yzmname,
                  newPassword: this.password,
                  confirmPassword: this.password
                })
                .then(res => {
                  if (res.status == "200") {
                    MessageBox.alert("重新设置密码成功");
                    this.$router.push("/register");
                  }
                });
            } else {
              MessageBox.alert("两次密码输入不同，请重新输入");
            }
          } else {
            MessageBox.alert("请输入6~12位的的密码");
          }
        } else {
          MessageBox.alert("验证码不能为空");
        }
      } else {
        MessageBox.alert("不是完整的11位手机号码");
      }
    }
  },
  components: {
    buttonone
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
  z-index: 3;
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
  line-height: normal;
  padding: 0.06rem 0;
  float: right;
  margin-top: 0.05rem;
  background: @colorone;
  border-radius: 0.15rem;
  font-size: 0.14rem;
  text-align: center;
  color: #ffffff;
}
.titlename {
  width: 100%;
  height: 0.44rem;
  text-align: center;
  line-height: 0.44rem;
  font-size: 0.19rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
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

.buttonone {
  margin-left: 10%;
  margin-top: 0.5rem;
}
</style>

