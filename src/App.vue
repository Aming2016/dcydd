<template>
  <div id="app">
    <!-- <keep-alive include="sellrent">
    <router-view/> 
    </keep-alive> -->
    <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <ul id="bottombtn" v-show="activeindex<6">
      <li class="btnlione" :class="{btnlionez:activeindex==1}" @click="homebtn">
        <div>首页</div>
      </li>
      <li class="btnlitwo" :class="{btnlitwoz:activeindex==2}" @click="messagebtn">
        <div id="setmessageid" v-show="messagequantity!='0'">{{messagequantity}}</div>
        <div>消息</div>
      </li>
      <li class="btnlifive" :class="{btnlifivez:activeindex==5}" @click="informationbtn">
        <div>资讯</div>
      </li>
      <li class="btnlithree" :class="{btnlithreez:activeindex==3}" @click="lookhousebtn">
        <div>约看</div>
      </li>
      <li class="btnlifour" :class="{btnlifourz:activeindex==4}" @click="minebtn">
        <div>我的</div>
      </li>
    </ul>   
  </div>
</template>

<script>
import router from "./router";
import { md5 } from "./common/js/md5.js";
import { hxmessage } from "./common/js/hxmessage.js";
export default {
  name: "App",
  data() {
    return {
      // activeindex: 1,
      transitionName: "slide-left"
    };
  },
  computed: {
    messagequantity(){
      var num=0;
      for(let i=0;i<this.$store.state.friendlist.length;i++){
        num=num+this.$store.state.friendlist[i].quantity
      }
      return num;
    },
    activeindex() {
      return this.$store.state.activeindex;
    }
  },
  created() {
    if (window.localStorage.dc_token) {
      //初始化
      if (JSON.parse(window.localStorage.dc_mydata).easemobUsername == null) {
      } else {
        hxmessage(this)
      }
    }
  },
  mounted() {
    router.beforeEach((to, from, next) => {
      var path = to.path;
      if (path == "/") {
        window.sessionStorage.setItem("btnindex", "1");
        this.$store.state.activeindex = window.sessionStorage.btnindex;
      } else if (path == "/message") {
        window.sessionStorage.setItem("btnindex", "2");
        this.$store.state.activeindex = window.sessionStorage.btnindex;
      } else if (path == "/information") {
        window.sessionStorage.setItem("btnindex", "5");
        this.$store.state.activeindex = window.sessionStorage.btnindex;
      } else if (path == "/lookhouse") {
        window.sessionStorage.setItem("btnindex", "3");
        this.$store.state.activeindex = window.sessionStorage.btnindex;
      } else if (path == "/lookhouseone") {
        window.sessionStorage.setItem("btnindex", "3");
        this.$store.state.activeindex = window.sessionStorage.btnindex;
      } else if (path == "/lookhousetwo") {
        window.sessionStorage.setItem("btnindex", "3");
        this.$store.state.activeindex = window.sessionStorage.btnindex;
      } else if (path == "/lookhousethree") {
        window.sessionStorage.setItem("btnindex", "3");
        this.$store.state.activeindex = window.sessionStorage.btnindex;
      } else if (path == "/mine") {
        window.sessionStorage.setItem("btnindex", "4");
        this.$store.state.activeindex = window.sessionStorage.btnindex;
      } else {
        window.sessionStorage.setItem("btnindex", "6");
        this.$store.state.activeindex = window.sessionStorage.btnindex;
      }
      next();
    });

    // 百度统计代码
    // var _hmt = _hmt || [];
    // (function() {
    //   var hm = document.createElement("script");
    //   hm.src = "https://hm.baidu.com/hm.js?fd1ce7c390e1c59627c86c8eb67ac183";
    //   var s = document.getElementsByTagName("script")[0];
    //   s.parentNode.insertBefore(hm, s);
    // })();
  },
  methods: {
    _querys() {
      this.$http.get(this.$url.URL.MINEDATAINFO).then(res => {
        window.localStorage.dc_mydata = JSON.stringify(res.data.data);
      });
    },
    informationbtn() {
      this.$router.push("/information");
    },
    homebtn() {
      this.$router.push("/");
    },
    messagebtn() {
      if (window.localStorage.dc_token) {
        this.$router.push("/message");
      } else {
        this.$router.push("/register");
      }
    },
    lookhousebtn() {
      if (window.localStorage.dc_token) {
        this.$router.push("/lookhouse");
      } else {
        this.$router.push("/register");
      }
    },
    minebtn() {
      if (window.localStorage.dc_token) {
        this.$router.push("/mine");
      } else {
        this.$router.push("/register");
      }
    }
  }
};
</script>

<style>
/* // @import 'common/css/master.less'; */
* {
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-text-size-adjust: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-family: Arial, "微软雅黑";
  line-height: 1;
  /* ios兼容 */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -webkit-appearance: none;
  -webkit-overflow-scrolling: touch;
  
}
.mint-indicator-spin{
  display: inline;
  width:100%;
}
.circle-color-10{
  margin-top:0.1rem;
  margin-left:0.2rem;
  margin-bottom:0.2rem;
}
img {
  border: none;
  max-width: 100%;
  vertical-align: middle;
}
body,
p,
form,
input,
button,
dl,
dt,
dd,
ol,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
  list-style: none;
  overflow-x: hidden;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
}
input,
textarea {
  -webkit-user-select: text;
  -ms-user-select: text;
  user-select: text;
  -webkit-appearance: none;
  font-size: 1em;
  line-height: 1.5em;
}
table {
  border-collapse: collapse;
}
input,
select,
textarea {
  outline: none;
  border: none;
  background: none;
}
a {
  outline: 0;
  cursor: pointer;
  *star: expression(this.onbanner=this.blur());
}
a:link,
a:active {
  text-decoration: none;
}
a:visited {
  text-decoration: none;
}
a:hover {
  color: #f00;
  text-decoration: underline;
}
a {
  text-decoration: none;
  -webkit-touch-callout: none;
}
em,
i {
  font-style: normal;
}
li,
ol {
  list-style: none;
}
html {
  font-size: 10px;
}
.clear {
  clear: both;
  height: 0;
  font-size: 0;
  line-height: 0;
  visibility: hidden;
  overflow: hidden;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
html,
body {
  margin: 0 auto;
  max-width: 640px;
  min-width: 320px;
  color: #555;
  background: #ffffff;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
a {
  text-decoration: none;
  color: #333333;
}
.mint-swipe-indicators {
  height: 0;
  bottom: 1.1rem;
  z-index: 1;
}

#bottombtn {
  border-top: 1px solid #666666;
  width: 100%;
  height: 0.5rem;
  position: fixed;
  _position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  /* 父级设置子集的排列方向 */
  flex-direction: row;
  /* 子集横向排列 */
  align-items: center;
  /* 子集的内容纵向排列 */
  justify-content: center;
  text-align: center;
  background: #fdfdfd;
  border-top: 1px solid #cccccc;
  z-index: 999;
}
#bottombtn li {
  /* 按照余下的空间子集进行比例分配 */
  flex: 1;
  height: 100%;
  font-size: 0.11rem;
  overflow: hidden;
}
#bottombtn li > div {
  /* 按照余下的空间子集进行比例分配 */
  margin-top: 0.35rem;
}
.btnlione {
  background: url(imgs/home/homeimg.png) no-repeat;
  background-size: 0.26rem;
  background-position: center 20%;
}
.btnlionez {
  background: url(imgs/home/homexuanzhongimg.png) no-repeat;
  background-size: 0.26rem;
  color: #ff4343;
  background-position: center 20%;
}
.btnlitwo {
  background: url(imgs/home/xiaoxiimg.png) no-repeat;
  background-size: 0.26rem;
  background-position: center 20%;
  position: relative;
}
.btnlitwo > div:nth-of-type(1) {
  position: absolute;
  background: red;
  padding: 0.03rem 0.05rem;
  top: -0.31rem;
  right: 0.18rem;
  color: #ffffff;
  border-radius: 50%;
}
.btnlitwoz {
  background: url(imgs/home/xiaoxixuanhzongone.png) no-repeat;
  background-size: 0.26rem;
  color: #ff4343;
  background-position: center 20%;
}
.btnlifive {
  background: url(imgs/mine/zixunweixuanz.png) no-repeat;
  background-size: 0.26rem;
  background-position: center 20%;
}
.btnlifivez {
  background: url(imgs/mine/zixunxuanzhong.png) no-repeat;
  background-size: 0.26rem;
  color: #ff4343;
  background-position: center 20%;
}
.btnlithree {
  background: url(imgs/home/yuekanimg.png) no-repeat;
  background-size: 0.26rem;
  background-position: center 20%;
}
.btnlithreez {
  background: url(imgs/home/yuekanxuanzhongming.png) no-repeat;
  background-size: 0.26rem;
  color: #ff4343;
  background-position: center 20%;
}
.btnlifour {
  background: url(imgs/home/minimg.png) no-repeat;
  background-size: 0.24rem;
  background-position: center 20%;
}
.btnlifourz {
  background: url(imgs/home/minexuanzhongimg.png) no-repeat;
  background-size: 0.26rem 0.27rem;
  color: #ff4343;
  background-position: center 20%;
}
</style>
