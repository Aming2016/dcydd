<template>
    <div class="makeplaninquire">
        <headertwo :dataname="dataname"></headertwo>
        <nav>安全验证</nav>
        <ul id="ul_1">
            <li>
                <input type="text" placeholder="请输入用户名/手机" v-model="phone">
            </li>
            <li>
                <input type="text" placeholder="请输入验证码" v-model="code">
                <div v-if="movenum" @click="codebtn">{{codename}}</div>
                <div v-else style="background:#eeeeee;color:#999999;">{{num}}s</div>
            </li>
        </ul>
        <buttonone class="buttonone" :buttonname="buttonnametwo" @click.native="gohuanhaombtntwo"></buttonone>
    </div>
</template>
<script>
import headertwo from "../module/headertwo";
import { Toast } from "mint-ui";
import buttonone from "../module/buttonone";
import { MessageBox } from "mint-ui";
import { md5 } from "../../common/js/md5.js";
export default {
  data() {
    return {
      dataname: "成交进度",
      buttonnametwo: "确定",
      phone: "", //手机号码
      code: "", //验证码
      num: 60,
      movenum: true,
      codename: "获取验证码"
    };
  },
  created() {},
  methods: {
    gohuanhaombtntwo() {
      if (/^1[34578]\d{9}$/.test(this.phone)) {
        if (this.code) {
            this._querys()
        } else {
          Toast({
            message: "请输入验证码",
            position: "bottom",
            duration: 800
          });
        }
      } else {
        Toast({
          message: "手机号码不正确",
          position: "bottom",
          duration: 800
        });
      }
    },
    codebtn() {
      //发送验证码
      if (/^1[34578]\d{9}$/.test(this.phone)) {
        this._queryscode();
      } else {
        Toast({
          message: "手机号码不正确",
          position: "bottom",
          duration: 800
        });
      }
    },
    _querys() {
      this.$http
        .get(
          this.$url.URL.TRADEPROGRESSQUERY +
            "?phone=" +
            this.phone +
            "&smsCode=" +
            this.code
        )
        .then(res => {
            window.localStorage.progresslist=JSON.stringify(res.data.data)
            if(res.data.status=='1'){
                 this.$router.push("/makeplan");
            }else{
              Toast({
                message: res.data.data.msg,
                position: "bottom",
                duration: 800
              });
            }
       
        });
    },
    _queryscode() {
      //获取验证码
      let str = this.phone + this.$url.URL.SECRETKEY;
      let strone = md5(str);
      this.$http
        .post(this.$url.URL.FETCHSMSCODE, {
          mobile: this.phone,
          sign: strone,
          operateType: "TRADE_PROGRESS"
        })
        .then(res => {
          console.log(res.data.status);
          if (res.data.status == "1") {
            MessageBox.alert("已发送验证码，请注意查收");
            this.movenum = false;
            this.codename = "重新获取";
            this._timefs();
          } else {
            MessageBox.alert(res.data.msg);
          }
        });
    },
    _timefs() {
      var setval = setInterval(() => {
        this.num--;
        if (this.num == "-1") {
          clearInterval(setval);
          this.movenum = true;
          this.num = 60;
        }
      }, 1000);
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
.makeplaninquire {
  width: 100%;
  min-height: 100%;
  border-top: 1px solid #ffffff;
  box-sizing: border-box;
}
nav {
  padding-top: 0.84rem;
  color: @color_1;
  font-size: 0.23rem;
  margin-left: 0.38rem;
}
.buttonone {
  margin-left: 10%;
  margin-top: 0.8rem;
}
#ul_1 {
  margin: 0 0.38rem;
  margin-top: 0.45rem;
  > li:nth-of-type(2) {
    margin-top: 0.15rem;
  }
  > li {
    width: 100%;
    height: 0.46rem;
    border-bottom: 0.005rem solid @bordercolor_1;
    position: relative;
    > input {
      width: 100%;
      height: 100%;
      font-size: 0.18rem;
      color: @color_4;
      float: left;
    }
    > div {
      width: 0.8rem;
      background: @colorone;
      color: #ffffff;
      padding: 0.06rem 0;
      line-height: normal;
      font-size: @fontsize_8;
      text-align: center;
      position: absolute;
      right: 0;
      top: 0.08rem;
      border-radius: 0.15rem;
    }
  }
}
</style>

