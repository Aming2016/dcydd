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
        <div id="setmessageid" v-show="messagebol!='0'">{{messagebol}}</div>
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
export default {
  name: "App",
  data() {
    return {
      // activeindex: 1,
      transitionName: "slide-left"
    };
  },
  computed: {
    messagebol() {
      var num = 0;
      for (let i = 0; i < this.$store.state.friendlist.length; i++) {
        num = num + this.$store.state.friendlist[i].unread_msg_count;
      }
      return num;
    },
    activeindex() {
      return this.$store.state.activeindex;
    }
  },
  created() {
    if (window.localStorage.token) {
      //初始化
      if (JSON.parse(window.localStorage.mydata).easemobUsername == null) {
        this._bangdingjiguang();
      }else{
        this.jiguangchushi();
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
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?fd1ce7c390e1c59627c86c8eb67ac183";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
  },
  methods: {
    _querys() {
      this.$http.get(this.$url.URL.MINEDATAINFO).then(res => {
        window.localStorage.mydata = JSON.stringify(res.data.data);     
        this.jiguangchushi() 
      });
    },
    _bangdingjiguang(){
      this.$http.get(this.$url.URL.JIGUANGBINDING+"?username="+this.mydata.nickname)
      .then(res=>{
        if(res.data.status=='1'){
          this._querys();
        }
      })
    },

    jiguangchushi() {
      //极光
      window.JIM = new JMessage({
        debug: true
      });
      this.$http.get(this.$url.URL.JUGUANGSGT).then(res => {
        this.jgchushihua(res);
      });
    },
    jgchushihua(res) {
      //极光初始化
      var that = this;
      res.data.data.flag = 1;
      JIM.init(res.data.data)
        .onSuccess(function(data) {
          console.log("初始化成功");
          that.jgdenglu();
          this.onDisconnect(); //断线监听
        })
        .onFail(function(data) {
          this.onDisconnect(); //断线监听
        });
    },
    jgdenglu() {
      //登录
      JIM.login({
        username: JSON.parse(window.localStorage.mydata).easemobUsername,
        password: JSON.parse(window.localStorage.mydata).easemobPassword
      })
        .onSuccess(data => {
          console.log("登录成功");
          this.onSyncConversation();
          this.getConversation(); //获取会话列表
        })
        .onFail(function(data) {})
        .onTimeout(function(data) {});
    },
    onMsgReceive() {
      //监听收到消息后处理
      JIM.onMsgReceive(data => {
        this.$store.dispatch("messagepush", data.messages[0].content);
        this.getUnreadMsgCnt(data.messages[0].from_username); //告诉后台获取会话未读数
        let arr = this.$store.state.messagelist.filter(item => {
          return item.from_username == data.messages[0].from_username; //假设id为唯一标识
        });
        if (arr.length == 0) {
          var messgone = {};
          if (data.messages[0].content.msg_type == "image") {
            var urls = "";
            JIM.getResource({
              media_id: data.messages[0].content.msg_body.media_id
            }).onSuccess(data => {
              urls = data.url;
              (messgone.ctime_ms = data.messages[0].ctime_ms),
                (messgone.content = {
                  from_id: data.messages[0].from_username,
                  url: true,
                  msg_body: {
                    media_id: urls
                  },
                  msg_type: "image"
                });
              var message = {};
              message.from_username = data.messages[0].from_username;
              message.msgs = [];
              message.msgs.push(messgone);
              this.$store.dispatch("messagebtnone", message);
            });
          } else {
            (messgone.ctime_ms = data.messages[0].ctime_ms),
              (messgone.content = {
                from_id: data.messages[0].from_username,
                msg_body: {
                  text: data.messages[0].content.msg_body.text
                },
                msg_type: "text"
              });
            var message = {};
            message.from_username = data.messages[0].from_username;
            message.msgs = [];
            message.msgs.push(messgone);
            this.$store.dispatch("messagebtnone", message);
          }
        } else {
          this.$store.dispatch("messagebtn", data);
        }
      });
    },
    getUnreadMsgCnt(name) {
      var count = JIM.getUnreadMsgCnt({
        username: name
      });
    },
    onSyncConversation() {
      var set = [];
      this.$store.dispatch("messagelist", set);
      JIM.onSyncConversation(data => {
        //离线消息同步监听
        console.log("收到消息");
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          for (let l = 0; l < data[i].msgs.length; l++) {
            if (data[i].msgs[l].content.msg_type == "image") {
              console.log(data[i].msgs[l].content.msg_body.media_id);
              JIM.getResource({
                media_id: data[i].msgs[l].content.msg_body.media_id
              }).onSuccess(datas => {
                data[i].msgs[l].content.msg_body.media_id = datas.url;
              });
            }
          }
        }

        this.$store.dispatch("messagelist", data);
        this.onMsgReceive(); //收到消息后处理
      });
    },
    getConversation() {
      //获取会话列表

      JIM.getConversation().onSuccess(data => {
        this.$store.dispatch("getConversation", data.conversations);
      });
    },

    onDisconnect() {
      JIM.onDisconnect(() => {
        console.log("断线");
        this.jiguangchushi();
      });
    },

    informationbtn() {
      this.$router.push("/information");
    },
    homebtn() {
      this.$router.push("/");
    },
    messagebtn() {
      if (window.localStorage.token) {
        this.$router.push("/message");
      } else {
        this.$router.push("/register");
      }
    },
    lookhousebtn() {
      if (window.localStorage.token) {
        this.$router.push("/lookhouse");
      } else {
        this.$router.push("/register");
      }
    },
    minebtn() {
      if (window.localStorage.token) {
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
