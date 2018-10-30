<template>
    <div class="minecentre">
        <headertwo :dataname="dataname"></headertwo>
        <div class="titlediv">
                <p>{{myscor}}</p>
                <p @click="shuomingwarp"> <span>积分规则说明</span>      
                    <img src="../../imgs/mine/youxhuangjiantou.png" alt="">
                </p>
                <div>
                        <p @click="warpbol=true">转赠</p>
                        <p @click="scoreConvertbtn">积分兑换</p>
                </div>
        </div>
        <div id="id_img">
                <img src="../../imgs/mine/jfcontentimg.png" alt="">
        </div>
        <div class="ul_title">积分明细</div>
        <ul class="contentul" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10">
                <li v-for="item in scorlist">
                        <div>
                          <p>{{item.month|monthvfilter}}月</p>
                          </div>
                        <div v-for="item in item.content">
                                <p>
                                        <span>{{item.followTypeName}}</span>
                                        <span>{{item.score}}</span>
                                </p>
                                <p>
                                        <span>{{item.createDate.split(" ")[0]}}</span>
                                        <span>{{item.remainingScore}}</span>
                                </p>
                        </div>
                </li>
        </ul>
        <div class="warpthree" v-show="warpbolthree" @click.stop.self.prevent="warpbolthree=false">
                <div class="warpboxthree"></div>
                <img  @click.stop.self.prevent="warpbolthree=false" src="../../imgs/mine/warpnide.png" alt="">
        </div>
        <div class="warp" v-show="warpbol" @click.stop.self.prevent="btntwo">
                <div class="warpboxtwo" v-show="!warpboxbol">
                        <p>积分转赠</p>
                        <div>
                                <input type="text" placeholder="请输入验证码" v-model="code">
                                <p @click="codebtn" :class="{class_12:btnname!=='获取验证码'}">{{btnname}}</p>
                        </div>
                        <div>
                                <p @click.stop="btntwo">取消</p>
                                <p  @click.stop="btnthree">确定</p>
                        </div>
                </div>
                 <div class="warpbox" v-show="warpboxbol">
                        <p>积分转赠</p>
                        <input type="number" placeholder="请输入转赠分数" v-model="scor">
                        <input type="text" placeholder="请输入好友电话号码" v-model="username">
                        <div @click="gobtnpage">下一步</div>
                </div>
                <img @click="btntwo" src="../../imgs/mine/warpnide.png" alt="">
        </div>
    </div>
</template>
<script>
import headertwo from "../module/headertwo";
import { md5 } from "../../common/js/md5.js";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      dataname: "积分",
      warpbol: false,
      listurl:"",
      warpboxbol: true,
      btnname: "获取验证码",
      warpbolthree: false,
      scoregift: "", //积分列表
      myscor: "", //我的积分
      pageno: 1,
      loading: true,
      scorlist: [],
      scor: "", //积分数
      username: "", //用户名
      code: "", //验证码
      mydata: JSON.parse(window.localStorage.dc_mydata)
    };
  },
  created() {
    this.myscor = this.$route.params.id;
    this._querys();
    this.listurl = JSON.parse(window.sessionStorage.htmlurl);
  },
  methods: {
    loadMore() {
      this.loading = true;
      this._querys();
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
            operateType: "GIVE_SCORE"
          })
          .then(res => {
            if (res.status == "200") {
              this._codebtn();
              Toast({
                message: "已发送验证码，请注意查收",
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
    scoreConvertbtn(){
      this.listurl.forEach(item => {
        if(item.name=="scoreConvert"){
           window.sessionStorage.htmlpageurl=item.value+"?token="+localStorage.dc_token+"&scity="+localStorage.site+"&type=web";
           this.$router.push("/htmlpage")
        }
      });
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
    _querys() {
      this.$http
        .post(
          this.$url.URL.SCOREDETAIL + "?pageNo=" + this.pageno + "&pageSize=10"
        )
        .then(res => {
          if (res.data.status == "1") {
            if (res.data.data.recordVoList.length != "0") {
              Toast({
                message: "正在加载。。。",
                position: "bottom",
                duration: 800
              });
              setTimeout(() => {
                this.loading = false;
              }, 1000);
              this.pageno++;
              this.myscor = res.data.data.currentScore;
              for (let i = 0; i < res.data.data.recordVoList.length; i++) {
                var fund = this.scorlist.find(val => {
                  return (
                    val.month ==
                    res.data.data.recordVoList[i].createDate
                      .split("T")[0]
                      .split("-")[0] +
                      "-" +
                      res.data.data.recordVoList[i].createDate
                        .split("T")[0]
                        .split("-")[1]
                  );
                });
                if (fund) {
                  for (let l = 0; l < this.scorlist.length; l++) {
                    if (this.scorlist[l].month == fund.month) {
                      this.scorlist[l].content.push(
                        res.data.data.recordVoList[i]
                      );
                    }
                  }
                } else {
                  var obj = {
                    month:
                      res.data.data.recordVoList[i].createDate
                        .split("T")[0]
                        .split("-")[0] +
                      "-" +
                      res.data.data.recordVoList[i].createDate
                        .split("T")[0]
                        .split("-")[1],
                    content: [res.data.data.recordVoList[i]]
                  };
                  this.scorlist.push(obj);
                }
              }
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
        });
    },
    gobtnpage() {
      if (this.scor && this.username) {
        this.warpboxbol = false;
      } else {
        Toast({
          message: "请输入转赠积分或好友昵称",
          position: "bottom",
          duration: 1000
        });
      }
    },
    btntwo() {
      this.warpbol = false;
      this.warpboxbol = true;
    },
    btnthree() {
      if (this.code) {
        this._querysgivescore();
      } else {
        Toast({
          message: "请输入验证码",
          position: "bottom",
          duration: 1000
        });
      }
    },
    _querysgivescore() {
      //赠送积分接口
      this.$http
        .post(this.$url.URL.GIVESCORE+"?score="+this.scor+"&smsCode="+this.code+"&giveMobile="+this.mydata.mobile)
        .then(res => {
          if (res.data.status == "1") {
            this.warpbol = false;
            this.warpboxbol = true;
            this.pageno=1;
            this._querys();
            Toast({
              message: "转赠成功",
              position: "middle",
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
            message: "转赠失败",
            position: "bottom",
            duration: 1000
          });
        });
    },
    shuomingwarp() {
      this.warpbolthree = true;
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
.titlediv {
  width: 100%;
  background: #ffffff;
  text-align: center;
  padding-top: 0.44rem;
  > p:nth-of-type(1) {
    font-size: 0.4rem;
    color: @colorone;
    padding-top: 0.1rem;
    overflow: hidden;
    line-height: 1;
  }
  > p:nth-of-type(2) {
    font-size: 0.13rem;
    color: #222222;
    padding-top: 0.09rem;
    overflow: hidden;
    > span {
      vertical-align: middle;
    }
    > img {
      vertical-align: middle;
    }
  }
  > div {
    width: 200%;
    overflow: hidden;
    margin-top: 0.14rem;
    padding-bottom: 0.14rem;
    > p {
      font-size: 0.16rem;
      background: @colorone;
      width: 0.96rem;
      height: 0.3rem;
      text-align: center;
      line-height: 0.3rem;
      color: #ffffff;
      border-radius: 0.15rem;
      float: left;
      &:nth-of-type(1) {
        margin-left: 0.61rem;
      }
      &:nth-of-type(2) {
        margin-left: 0.6rem;
      }
    }
  }
}
#id_img {
  margin: 0.1rem 0.12rem;
  height: 1.12rem;
  > img {
    width: 100%;
    height: 100%;
  }
}
.ul_title {
  margin: 0 0.12rem;
  background: #ffffff;
  text-indent: 0.1rem;
  padding-top: 0.1rem;
  padding-bottom: 0.07rem;
  font-size: 0.17rem;
  border-radius: @boxborder_2 @boxborder_2 0 0;
  color: @color_1;
}
.contentul {
  width: 93.5%;
  background: #ffffff;
  border-radius: 0 0 @boxborder_2 @boxborder_2;
  margin-bottom: 0.2rem;
  position: absolute;
  bottom: 0;
  left: 3.25%;
  height: calc(100% - 3.6rem);
  overflow-x: hidden;
  overflow-y: scroll;
  > li:nth-last-of-type(1) > div:nth-last-of-type(1) {
    border-radius: 0 0 @boxborder_2 @boxborder_2;
  }
  > li {
    width: 100%;
    > div:nth-of-type(1) {
      width: 100%;
      margin-top:0.1rem;
      overflow: hidden;
      > p {
        padding: 0 0.1rem;
        float: left;
        height: 0.2rem;
        text-align: center;
        font-size: 0.14rem;
        color: @color_3;
        line-height: 0.2rem;
        border-radius: 0 @boxborder_1 @boxborder_1 0;
        background: @bordercolor_1;
      }
    }
    > div:not(:first-child){
      margin: 0 0.1rem;
      padding: 0.1rem 0;
      font-size: 0.16rem;
      margin-left: 0.12rem;
      border-bottom: 0.005rem solid @bordercolor_1;
      > p:nth-of-type(1) {
        overflow: hidden;
      }
      > p:nth-of-type(2) {
        margin-top: 0.1rem;
        overflow: hidden;
      }
      > p:nth-of-type(1) > span:nth-of-type(1) {
        float: left;
        color: @color_1;
        font-size: @fontsize_4;
      }
      > p:nth-of-type(1) > span:nth-of-type(2) {
        float: right;
        color: @colorone;
        font-size: @fontsize_2;
      }
      > p:nth-of-type(2) > span:nth-of-type(1) {
        float: left;
        font-size: 0.12rem;
        color: @color_3;
      }
      > p:nth-of-type(2) > span:nth-of-type(2) {
        float: right;
        font-size: 0.15rem;
        color: @color_1;
      }
    }
  }
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
.warpthree {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  > img {
    position: fixed;
    width: 0.3rem;
    height: 0.3rem;
    bottom: 10%;
    left: 50%;
    margin-left: -0.15rem;
  }
}
.warpboxthree {
  width: 2.87rem;
  height: 4.1rem;
  background: #ffffff;
  border-radius: 0.1rem;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -2.05rem;
  margin-left: -1.4355rem;
}
.class_12 {
  background: #cccccc !important;
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
    height: 0.46rem;
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
      line-height: 0.46rem;
      color: @colorone;
    }
  }
}
.warpbox {
  width: 2.5rem;
  height: 1.85rem;
  background: #ffffff;
  border-radius: 0.1rem;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -0.925rem;
  margin-left: -1.25rem;
  text-align: center;
  > p:nth-of-type(1) {
    padding: 0.16rem 0 0.18rem 0;
    color: @colorone;
    font-size: 0.16rem;
  }
  > input {
    display: block;
    width: 80%;
    margin-left: 10%;
    margin-bottom: 0.14rem;
    background: #efefef;
    font-size: 0.13rem;
    color: #cacaca;
    height: 0.3rem;
    text-indent: 0.1rem;
    border-radius: 0.05rem;
  }
  > div {
    width: 80%;
    margin-left: 10%;
    font-size: 0.16rem;
    height: 0.32rem;
    line-height: 0.32rem;
    text-align: center;
    color: #ffffff;
    background: @colorone;
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