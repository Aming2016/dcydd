<template>
    <div class="mine">
       <div class="minetitle" @click="centrebtn">
           <div class="minediv_2">
                <img :src="mydata.headImage?mydata.headImage:'../../imgs/mine/minetitleurl.png'" alt="">
           </div>
           
           <div class="minediv_1">
               <div>{{mydata.nickname }}</div>
               <div>点击查看个人资料</div>
           </div>
       </div>
       <div class="div_2">
           <div>我的收藏</div>
       </div>
       <ul class="url_1">
           <li @click="minerentinglist">
               <img src="../../imgs/mine/minershouf.png" alt="">
               <div>二手房(<span>{{mydata.houseCollectCount}}</span>)</div>
           </li>
           <li @click="minerentinglistone">
               <img src="../../imgs/mine/zufnagone.png" alt="">
               <div>租房(<span>{{mydata.rentHouseCollectCount}}</span>)</div>
           </li>
           <li @click="minebrokerbtn">
               <img src="../../imgs/mine/jingjiren.png" alt="">
               <div>经纪人(<span>{{mydata.brokerCollectCount}}</span>)</div>
           </li>
           <li @click="mineregionlistbtn">
               <img src="../../imgs/mine/xiaoquone.png" alt="">
               <div>小区(<span>{{mydata.buildCollectCount}}</span>)</div>
           </li>
       </ul>
        <div class="div_2">
           <div style="border:none;">我的委托</div>
       </div>
       <ul class="url_1">
           <li style="width:33.333333%" @click="minSeller">
               <img src="../../imgs/mine/wodemaifang.png" alt="">
               <div>我的卖房</div>
           </li>
           <li style="width:33.333333%"  @click="minSellertwo">
               <img src="../../imgs/mine/wodezufang.png" alt="">
               <div>我的租房</div>
           </li>
           <li style="width:33.333333%" @click="minsellert">
               <img src="../../imgs/mine/daibandaikuan.png" alt="">
               <div>代办业务</div>
           </li>
       </ul>
      
         <ul class="contentul" style="margin-top:0.1rem;">
             <a :href="'tel:'+mydata.custServerPhone">
            <li style="border:none;">
                    <div>客服电话</div>
                    <div>
                        <span>{{mydata.custServerPhone}}</span>
                    </div>              
            </li>
            </a>
        </ul> 
        <ul class="contentul" @click="brokerlistbtn">
            <li >
                <div>我的经纪人</div>
                <div>
                    <img src="../../imgs/home/gengduojiantou.png">
                </div>
            </li>
        </ul>
        <ul class="contentul" @click="minecommentbtn">
            <li>
                <div>我的评论</div>
                <div>
                    <img src="../../imgs/home/gengduojiantou.png">
                </div>
            </li>
        </ul>
        <ul class="contentul" @click="advisorybtn">
            <li>
                <div>我的咨询</div>
                <div>
                    <img src="../../imgs/home/gengduojiantou.png">
                </div>
            </li>
        </ul>
        <ul class="contentul" @click="feedbackbtn">
            <li>
                <div>意见反馈</div>
                <div>
                    <img src="../../imgs/home/gengduojiantou.png">
                </div>
            </li>
        </ul>
        <ul class="contentul" @click="abountusebtn">
            <li>
                <div>关于我们</div>
                <div>
                    <img src="../../imgs/home/gengduojiantou.png">
                </div>
            </li>
        </ul>
        <ul class="contentul" style="margin-bottom:0.65rem;" @click="systembtn">
            <li>
                <div>系统设置</div>
                <div>
                    <img src="../../imgs/home/gengduojiantou.png">
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  data() {
    return {
      mydata: ""
    };
  },
  created() {
    this._querys();
    if (this.urlname(window.location.href).code) {
      this._urlweixin(this.urlname(window.location.href).code);
    }
  },
  methods: {
    urlname(url) {//获取urlcode
      var urlStr = url.split("?")[1].split("&");
      var urlparams = {};
      for (let i = 0; i < urlStr.length; i++) {
        var item = urlStr[i].split("=");
        urlparams[item[0]] = item[1];
      }
      return urlparams;
    },
    _urlweixin(urlcode) {
      //获取微信信息
      this.$http.get(this.$url.URL.WXCODE + "?code=" + urlcode).then(res => {
        alert(JSON.stringify(res));
        if(res.status=='1'){
          this.$router.push("/wxregister")
        }
        window.sessionStorage.my_wx_data = res.data;
      });
    },
    _querys() {
      this.$http.get(this.$url.URL.MINEDATAINFO).then(res => {
        window.localStorage.mydata = JSON.stringify(res.data.data);
        this.mydata = res.data.data;
        console.log(this.mydata)
      });
    },
    centrebtn() {
      this.$router.push("/minecentre"); //个人中心
    },
    systembtn() {
      this.$router.push("/minesystem"); //系统设置
    },
    feedbackbtn() {
      this.$router.push("/feedback"); //意见反馈
    },
    minecommentbtn() {
      this.$router.push("/minecomment"); //我的评论
    },
    advisorybtn() {
      this.$router.push("/acttention/3"); //我的咨询
    },
    registerbtn() {
      this.$router.push("/register"); //登录
    },
    brokerlistbtn() {
      this.$router.push("/minebroker/2");
    },
    minSeller() {
      this.$router.push("/minsellerone/1"); //我卖房
    },
    minSellertwo() {
      this.$router.push("/minsellerone/2"); //我租房
    },
    minsellert() {
      //代办贷款
      this.$router.push("/minsellerone/3"); //我租房
    },
    abountusebtn(){
      //关于我们
      this.$router.push("/abountuse");
    },
    minerentinglist() {
      this.$router.push({ path: "/minerentinglist/", query: { id: "1" } }); //我租房
    },
    minerentinglistone() {
      this.$router.push({ path: "/minerentinglist/", query: { id: "2" } }); //我租房
    },
    mineregionlistbtn() {
      this.$router.push("/mineregionlist");
    },
    minebrokerbtn() {
      this.$router.push("/minebroker/1");
    }
  }
};
</script>
<style scoped lang="less">
@import "../../common/css/master.less";
.mine {
  width: 100%;
  min-height: 100%;
  background-color: #f9f9f9;
  // padding-bottom:0.5rem;
  overflow: hidden;
}
.minetitle {
  width: 100%;
  background-color: #ffffff;
  padding-top: 0.3rem;
  padding-bottom: 0.2rem;
  overflow: hidden;
}
.minediv_2 {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  float: left;
  margin-left: 0.2rem;
  margin-right: 0.15rem;
  overflow: hidden;
  position: relative;
}
.minediv_2 > img {
  float: left;
  width: 100%;
  height: 100%;
}
.minediv_1 {
  float: left;
}
.minediv_1 > div:nth-of-type(1) {
  font-size: 0.19rem;
  font-weight: bold;
  padding-top: 0.2rem;
}
.minediv_1 > div:nth-of-type(2) {
  font-size: 0.13rem;
  margin-top: 0.1rem;
  color: #999999;
}
.div_2 {
  width: 100%;
  height: 0.45rem;
  margin-top: 0.1rem;
  background: #ffffff;
}
.div_2 > div {
  margin-left: 0.12rem;
  margin-right: 0.12rem;
  height: 100%;
  border-bottom: 1px solid #cacaca;
  box-sizing: border-box;
  line-height: 0.45rem;
  font-size: 0.17rem;
}
.url_1 {
  width: 100%;
  background: #ffffff;
  padding: 0.2rem 0;
  overflow: hidden;
}
.url_1 > li {
  width: 25%;
  float: left;
  text-align: center;
  font-size: 0.14rem;
  overflow: hidden;
}
.url_1 > li span {
  color: @colorone;
}
.url_1 > li > img {
  height: 0.24rem;
}
.url_1 > li > div {
  margin-top: 0.1rem;
}
.contentul {
  width: 100%;
  height: 0.5rem;
  background-color: #ffffff;
}
.contentul >a {
  text-decoration: none;
  color: #333;
}
.contentul li {
  margin-left: 0.12rem;
  margin-right: 0.12rem;
  height: 100%;
  box-sizing: border-box;
  border-top: 1px solid #cacaca;
}
.contentul li>div:nth-of-type(1) {
  float: left;
  font-size: 0.17rem;
  line-height: 0.49rem;
}
.contentul li>div:nth-of-type(2) {
  float: right;
  font-size: 0.15rem;
  color: #999999;
  line-height: 0.49rem;
}
.contentul li>div:nth-of-type(2) > img {
  width: 0.1rem;
  height: 0.18rem;
  margin-left: 0.1rem;
}
</style>

