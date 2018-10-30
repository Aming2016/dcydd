<template>
    <div class="minecentre">
        <headertwo :dataname="dataname"></headertwo>
        <p id="kajuanshuoming">卡卷说明</p>
        <ul id="navbtn_id">
                <li v-for="(item,index) in navlist" @click="navactive=index">
                        <span :class="{navbtn_add:index==navactive}">{{item}}</span>
                </li>
        </ul>
        <ul class="content_id" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10">
                <li v-for="item in cardslist" @click="objctbtn(item)">
                        <div :class="{contentitem:navactive=='1'||navactive=='2'||navactive=='3'}">
                                <img src="../../imgs/mine/yizhuanzeng.png" alt="" v-show="navactive=='1'">
                                <img src="../../imgs/mine/yishiyong.png" alt="" v-show="navactive=='2'">
                                <img src="../../imgs/mine/yiguoqi.png" alt="" v-show="navactive=='3'">
                                <div class="contentleft">
                                  <!-- 购房<span>85</span>折 -->
                                        <p :class="{contentpone:true,contentptwo:false}">{{item.name}}</p>
                                        <!-- <div>({{item.fetchPersonName}}转曾)</div> -->
                                        <p class="code_class">编号：{{item.code}}</p>
                                        <p>{{item.endDateTime }} 23:12 过期</p>
                                </div>
                                <div class="contentright" :class="{contentrighttwo:navactive=='1'||navactive=='2'||navactive=='3'}">
                                        <div  @click.stop="warpbtn(item)">转 赠</div>
                                        <div  @click.stop="warpbtntwo(item)">立即使用</div>
                                </div>
                        </div>
                </li>
               
        </ul>
        <div id="warptwo" v-show="warperweima" @click.stop.self.prevent="warperweima=false">
              <div id="warpboxthree">
                <div id="qrcode"></div>
                <p>编号：{{warpcode}}</p>
              </div>
              <img @click="warperweima=false"  src="../../imgs/mine/warpnide.png" alt="">
        </div>
        <div class="warp" v-show="warpbol" @click.stop.self.prevent="warpbol=false">
                <div class="warpbox" v-if="warpbox">
                        <p>卡劵转赠</p>
                        <input type="number" placeholder="请输入好友电话号码" v-model="givename">
                        <div id="warpbtn" @click.stop="btnone">下一步</div>
                </div>
                <div class="warpboxtwo" v-else>
                        <p>卡劵转赠</p>
                        <div>
                                <input type="text" placeholder="请输入验证码" v-model="code">
                                <p @click="codebtn">{{btnname}}</p>
                        </div>
                        <div>
                                <p @click.stop="btntwo">取消</p>
                                <p @click.stop="btnthree">确定</p>
                        </div>
                </div>
                <img @click="btntwo" src="../../imgs/mine/warpnide.png" alt="">
        </div>
    </div>
</template>
<script>
import headertwo from "../module/headertwo";
import { Toast } from "mint-ui";
import { md5 } from "../../common/js/md5.js";
export default {
  data() {
    return {
      navactive: "0",
      warpbol: false,
      warperweima: false,
      warpcode: "",
      warpbox: true,
      listurl: "",
      querysurl: this.$url.URL.COUPONLIST,
      dataname: "卡卷",
      btnname: "获取验证码",
      navlist: ["待使用", "已转赠", "已使用", "已过期"],
      quersstate: ["NO_USED", "", "ALREADY_USED", "ALREADY_OVERDUE"],
      pageno: 1,
      loading: true,
      givename: "", //赠送用户名
      code: "", //验证码
      cardslist: [], //卡劵列表
      itemobjct: "", //转赠卡劵；
      mydata: JSON.parse(window.localStorage.dc_mydata)
    };
  },
  created() {
    this.listurl = JSON.parse(window.sessionStorage.htmlurl);
    this._queryslist();
  },
  watch: {
    navactive(val) {
      if (val == "1") {
        this.querysurl = this.$url.URL.QUERYGIVELIST;
      } else {
        this.querysurl = this.$url.URL.COUPONLIST;
      }
      this.pageno = 1;
      this.cardslist = [];
      this.loading = true;
      this._queryslist();
    }
  },
  methods: {
    qrcode() {
      var QRCode = this.$qrcode;
      let qrcode = new QRCode("qrcode", {
        width: 200,
        height: 200, // 高度
        text: "" // 二维码内容
      });
      return qrcode;
    },
    loadMore() {
      this.loading = true;
      this._queryslist();
    },
    warpbtn(item) {
      if (item.status == "NO_USED") {
        this.itemobjct = item;
        this.warpbol = true;
      }
    },
    warpbtntwo(item) {
      if (item.status == "NO_USED") {
        var objct = {
          data: {},
          type: "USE_COUPON"
        };
        this.$addevent(objct);
        this.warpcode = item.code;
        this.qrcode().clear(); // 清除代码
        this.warperweima = true;
        var qrcodediv = document.querySelector("#qrcode");
        qrcodediv.innerHTML = "";
        this.qrcode().makeCode(item); // 生成另外一个二维码
      }
    },
    objctbtn(item) {
      this.listurl.forEach(items => {
        if (items.name == "couponDetail") {
          if (item.status == "GIVE") {
            window.sessionStorage.htmlpageurl =
              items.value +
              "?token=" +
              localStorage.dc_token +
              "&scity=" +
              localStorage.site +
              "&type=web" +
              "&couponCode=" +
              item.couponFollowId +
              "&status=" +
              item.status;
          } else {
            window.sessionStorage.htmlpageurl =
              items.value +
              "?token=" +
              localStorage.dc_token +
              "&scity=" +
              localStorage.site +
              "&type=web" +
              "&couponCode=" +
              item.code +
              "&status=" +
              item.status;
          }
        }
        this.$router.push("/htmlpage");
      });
    },
    codebtn() {
      //发送验证码
      let str = this.mydata.mobile + this.$url.URL.SECRETKEY;
      let strone = md5(str);
      if (this.btnname == "获取验证码") {
        this.$http
          .post(this.$url.URL.FETCHSMSCODE, {
            mobile: this.mydata.mobile,
            sign: strone,
            operateType: "GIVE_COUPON"
          })
          .then(res => {
            if (res.status == "200") {
              this._codebtn();
              Toast({
                message: "已发送验证码，请注意查收",
                position: "bottom",
                duration: 1000
              });
            } else {
              Toast({
                message: res.data.msg,
                position: "bottom",
                duration: 1000
              });
            }
          })
          .catch(() => {
            Toast({
              message: "发送失败",
              position: "bottom",
              duration: 1000
            });
          });
      }
    },
    _codebtn() {
      var time = 60;
      var t1 = setInterval(() => {
        this.btnname = time + "s";
        time--;
        if (time == "-2") {
          clearInterval(t1);
          this.btnname = "获取验证码";
        }
      }, 1000);
    },
    btnone() {
      if (this.givename.length == "11") {
        this.warpbox = false;
      } else {
        Toast({
          message: "输入的电话号码不正确",
          position: "bottom",
          duration: 1000
        });
      }
    },
    btntwo() {
      this.warpbox = true;
      this.warpbol = false;
    },

    btnthree() {
      this.warpbox = true;
      this.warpbol = false;
      this._querysgive();
    },
    _querysgive() {
      this.$http
        .post(
          this.$url.URL.COUPONGIVE +
            "?couponCode=" +
            this.itemobjct.code +
            "&smsCode=" +
            this.code +
            "&giveMobile=" +
            this.givename
        )
        .then(res => {
          if (res.data.status == "1") {
            Toast({
              message: "转赠成功",
              position: "bottom",
              duration: 1000
            });
            this.pageno = 1;
            this.cardslist = [];
            this.loading = true;
            this._queryslist();
          } else {
            Toast({
              message: res.data.msg,
              position: "bottom",
              duration: 1000
            });
          }
        });
    },
    _queryslist() {
      this.$http
        .post(
          this.querysurl +
            "?status=" +
            this.quersstate[this.navactive] +
            "&pageNo=" +
            this.pageno +
            "&pageSize=10"
        )
        .then(res => {
          if (res.data.status == "1") {
            if (res.data.data.length != "0") {
              this.cardslist.push(...res.data.data);
              this.pageno++;
              setTimeout(() => {
                this.loading = false;
              }, 1000);
              Toast({
                message: "正在加载。。。",
                position: "bottom",
                duration: 800
              });
            } else {
              Toast({
                message: "已全部加载完成",
                position: "bottom",
                duration: 2000
              });
            }
          } else {
            Toast({
              message: "已全部加载完成",
              position: "bottom",
              duration: 2000
            });
          }
        })
        .catch(() => {
          Toast({
            message: "已全部加载完成",
            position: "bottom",
            duration: 2000
          });
        });
    }
  },
  components: {
    headertwo
  }
};
</script>
<style scoped lang="less">
@import "../../common/css/master.less";
.minecentre {
  width: 100%;
  min-height: 100%;
  position: absolute;
  background-color: #f8f8f8;
}
#kajuanshuoming {
  position: fixed;
  right: 0.12rem;
  overflow: hidden;
  line-height: 0.45rem;
  font-size: 0.14rem;
  color: @color_1;
  z-index: 999;
}
#warptwo {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
#warptwo > img {
  width: 0.3rem;
  position: fixed;
  bottom: 1.5rem;
  left: 50%;
  margin-left: -0.15rem;
}
#warpboxthree {
  width: 2.5rem;
  height: 2.52rem;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -1.25rem;
  margin-top: -1.26rem;
  background: #ffffff;
  border-radius: 0.05rem;
  > div {
    width: 2rem;
    height: 2rem;
    margin-top: 0.2rem;
    margin-left: 0.25rem;
    background: red;
  }
  > p {
    width: 100%;
    text-align: center;
    font-size: 0.16rem;
    margin-top: 0.06rem;
    overflow: hidden;
    line-height: 1.2;
  }
}
#navbtn_id {
  width: 100%;
  font-size: 0.17rem;
  position: fixed;
  top: 0.45rem;
  z-index: 777;
  overflow: hidden;
  background: #ffffff;
  > li {
    width: 25%;
    float: left;
    text-align: center;
    color: @color_1;
    > span {
      display: inline-block;
      padding: 0.13rem 0 0.09rem 0;
    }
  }
}
.navbtn_add {
  color: @colorone;
  border-bottom: 0.02rem solid @colorone;
  box-sizing: border-box;
}
.warp {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
.warpboxtwo {
  width: 2.5rem;
  height: 1.46rem;
  background: #ffffff;
  border-radius: 0.1rem;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -0.73rem;
  margin-left: -1.25rem;
  text-align: center;
  > p:nth-of-type(1) {
    padding: 0.16rem 0 0.18rem 0;
    color: @colorone;
    font-size: 0.16rem;
  }
  > div:nth-of-type(1) {
    width: 100%;
    padding-bottom: 0.19rem;
    overflow: hidden;
    > input {
      width: 1.22rem;
      height: 0.3rem;
      background: #efefef;
      border-radius: 0.05rem;
      text-indent: 0.12rem;
      font-size: 0.13rem;
      float: left;
      margin-left: 0.16rem;
      margin-right: 0.1rem;
    }
    > p {
      width: 0.845rem;
      height: 0.3rem;
      background: @colorone;
      text-align: center;
      line-height: 0.3rem;
      font-size: 0.13rem;
      color: #ffffff;
      border-radius: 0.05rem;
      float: left;
    }
  }
  > div:nth-of-type(2) {
    width: 100%;
    height: 0.48rem;
    font-size: 0.16rem;
    border-top: 0.005rem solid @bordercolor_1;
    box-sizing: border-box;
    > p:nth-of-type(1) {
      border-right: 0.005rem solid @bordercolor_1;
      box-sizing: border-box;
      color: #666666;
    }
    > p {
      float: left;
      text-align: center;
      width: 50%;
      line-height: 0.48rem;
      color: @colorone;
    }
  }
}
.warpbox {
  width: 2.5rem;
  height: 1.46rem;
  background: #ffffff;
  border-radius: 0.1rem;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -0.73rem;
  margin-left: -1.25rem;
  text-align: center;
  > p:nth-of-type(1) {
    padding: 0.16rem 0 0.18rem 0;
    color: @colorone;
    font-size: 0.16rem;
  }
  > input {
    width: 1.95rem;
    margin: auto;
    height: 0.3rem;
    background: #efefef;
    border-radius: 0.05rem;
    text-indent: 0.12rem;
    font-size: 0.13rem;
    display: block;
  }
}
#warpbtn {
  width: 2rem;
  height: 0.32rem;
  text-align: center;
  line-height: 0.32rem;
  margin: 0 auto;
  margin-top: 0.18rem;
  font-size: 0.16rem;
  color: #ffffff;
  background: @colorone;
  border-radius: 0.05rem;
}
.content_id {
  padding-top: 0.85rem;
  width: 100%;
  > li {
    width: 100%;
    padding: 0.2rem 0;
    margin-bottom: 0.1rem;
    background: #ffffff;
    > div {
      color: #fdffd8;
      margin: 0 0.2rem;
      height: 1.265rem;
      background: url("../../imgs/mine/kaone.png");
      background-size: 100% 100%;
    }
  }
}
.contentleft {
  float: left;
  margin-left: 0.2rem;
  > p:nth-of-type(1) {
    font-size: 0.18rem;
  }
  > div {
    font-size: 0.1rem;
    float: left;
    margin-top: 0.02rem;
  }
  > p:nth-of-type(2) {
    font-size: 0.12rem;
    overflow: hidden;
    margin-top: 0.22rem;
  }
  > p:nth-of-type(3) {
    font-size: 0.1rem;
    overflow: hidden;
    margin-top: 0.08rem;
  }
}
.contentpone {
  padding-top: 0.2rem;
  font-size: 0.2rem;
  overflow: hidden;
  > span {
    font-size: 0.26rem;
    font-weight: bold;
  }
}
.contentptwo {
  padding-top: 0.2rem;
  font-size: 0.15rem;
  overflow: hidden;
  > span {
    font-size: 0.35rem;
    font-weight: bold;
  }
}
.contentright {
  float: right;
  margin-right: 0.2rem;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    right: 1rem;
    width: 2px;
    height: 120%;
    background: url("../../imgs/mine/xian.png");
  }
  > div {
    font-size: 0.15rem;
    color: @color_1;
    width: 0.78rem;
    text-align: center;
    padding: 0.05rem;
    border-radius: 0.03rem;
    background: #ffda35;
    margin-top: 0.28rem;
    box-shadow: 1px 1px 5px #ffda35;
  }
  > div:nth-of-type(2) {
    margin-top: 0.18rem;
  }
}
.contentrighttwo > div {
  background: #a8a8a8 !important;
  box-shadow: 1px 1px 5px #666666;
  color: #ffffff;
}
.contentitem {
  background: url("../../imgs/mine/beijingtutwo.png") !important;
  background-size: 100% 100% !important;
  color: #ffffff !important;
  position: relative;
  > img {
    position: absolute;
    width: 1.175rem;
    top: 0;
    left: 50%;
    margin-left: -0.6rem;
    z-index: 2;
    margin-top: 0.09rem;
  }
}
.contentboxone {
  position: relative;
  > img {
    position: absolute;
    width: 1.175rem;
    top: 0;
    left: 50%;
    margin-left: -0.6rem;
    z-index: 2;
    margin-top: 0.09rem;
  }
}
.contentboxtwo {
  position: relative;
  > img {
    position: absolute;
    width: 1.175rem;
    top: 0;
    left: 50%;
    margin-left: -0.6rem;
    z-index: 2;
    margin-top: 0.09rem;
  }
}
.warp > img {
  position: fixed;
  width: 0.3rem;
  height: 0.3rem;
  bottom: 30%;
  left: 50%;
  margin-left: -0.15rem;
}
</style>