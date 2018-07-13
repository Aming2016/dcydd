<template>
  <div class="abmessage">
   <headertwo :dataname="dataname">
   </headertwo>
   <div class="boxcontent">
     <div v-for="item in messagelist.msgs" class="contenbox">
       <div>
         <span>{{item.ctime_ms|timefilter}}</span>
      </div>
       <div :class="{li_1:item.content.from_id!==mydataname,li_2:item.content.from_id==mydataname}">
        <img v-if="item.content.from_id!==mydataname" :src="messagelist.from_username|jjrheadimg" alt="">
        <img v-else :src="myimg" alt="">
        <div>
          <img v-if="item.content.msg_type=='image'"  :src="item.content.msg_body.media_id" alt="">
          <span v-else>
            {{item.content.msg_body.text}}
          </span>
          
        </div>
      </div>
     </div>
      <!-- item.content.url?item.content.msg_body.media_id:'http://dl.im.jiguang.cn/'+item.content.msg_body.media_id -->
   
      <a class="scoll"></a>
   </div>
   <div id="keyboard">
       <input v-iosinput type="text" v-model="testcontent" @focus='test' class="inputtext">
       <input class="inputtexttwo"  v-if="!testcontent" type="file" accept="image/*" @change="changeimg($event)">
       <img v-if="!testcontent" src="../../imgs/home/liaotianjiaohao.png" alt="">
       <div v-else @click="btn">发送</div>
   </div>
  </div>
</template>

<script>
import { Toast, Indicator } from "mint-ui"; 
import headertwo from "../module/headertwo";
export default {
  name: "HelloWorld",
  data() {
    return {
      dataname: "在线咨询",
      datamine: "", //聊天对象
      numbol: true,
      fd: "", //
      testcontent: "", //输入的聊天内容
      mydataname: JSON.parse(window.localStorage.mydata).easemobUsername,
      myimg: JSON.parse(window.localStorage.mydata).headImage, //我的头像
      mydata: JSON.parse(window.localStorage.mydata)
    };
  },
  created() {
    //获取聊天对象
    this.datamine = this.$store.state.message;
    this.onMsgReceives();
  },
  computed: {
    messagelist() {
      //监听聊天消息变化
      let arr = this.$store.state.messagelist.filter(item => {
        return item.from_username == this.datamine.username; //假设id为唯一标识
      });
      if (arr.length == 0) {
        var set = {};
        set.msgs = [];
        return set;
      } else {
        for (let i = 0; i < this.$store.state.messagelist.length; i++) {
          if (
            this.$store.state.messagelist[i].from_username ==
            this.datamine.username
          ) {
            return this.$store.state.messagelist[i];
          }
        }
      }
      setTimeout(() => {
        var boxcontent = document.querySelector(".scoll");
        boxcontent.scrollIntoView(false);
      }, 100);
    }
  },
  methods: {
    // resetUnreadCount() {
    //   JIM.resetUnreadCount({
    //     username: this.datamine.username
    //   });
    //   this.getConversation();
    // },
    onMsgReceiveimg(data) {
      //发送图片消息处理
      var set = {
				username: this.datamine.username,
				unread_msg_count: 1,
				nickName: this.datamine.nickName,
				name: this.datamine.username,
      }
      console.log(set)
      this.$store.dispatch("onepushmessagelist",set)
      let arr = this.$store.state.messagelist.filter(item => {
        return item.from_username == this.datamine.username; //假设id为唯一标识
      });
      if (arr.length == 0) {
        var messgone = {};
        messgone.ctime_ms = new Date().getTime();
        messgone.content = {
          from_id: this.mydataname,
          msg_body: {
            media_id: data.url
          },
          url: true,
          msg_type: "image"
        };
        var message = {};
        message.from_username = this.datamine.username;
        message.msgs = [];
        message.msgs.push(messgone);
        this.$store.dispatch("messagebtnone", message);
      } else {
        var message = {};
        message.name = this.datamine.username;
        message.ctime_ms = new Date().getTime();
        message.content = {
          from_id: this.mydataname,
          msg_body: {
            media_id: data.url
          },
          url: true,
          msg_type: "image"
        };
        this.$store.dispatch("messagebtntwo", message);
      }
      Indicator.close();
      this.scrollball(); //滚动到底不
    },
    getConversation() {
      //获取会话列表
      JIM.getConversation().onSuccess(data => {
        this.$store.dispatch("getConversation", data.conversations);
      });
    },
    onMsgReceive() {
      //发送文字消息处理
      console.log(this.datamine)
      var set = {
				username: this.datamine.username,
				unread_msg_count: 1,
				nickName: this.datamine.nickName,
				name: this.datamine.username,
      }
      console.log(set)
      this.$store.dispatch("onepushmessagelist",set)
      let arr = this.$store.state.messagelist.filter(item => {
        return item.from_username == this.datamine.username; //假设id为唯一标识
      });
      if (arr.length == 0) {
        var messgone = {};
        messgone.ctime_ms = new Date().getTime();
        messgone.content = {
          from_id: this.mydataname,
          msg_body: {
            text: this.testcontent
          },
          msg_type: "text"
        };
        var message = {};
        message.from_username = this.datamine.username;
        message.msgs = [];
        message.msgs.push(messgone);
        this.$store.dispatch("messagebtnone", message);
      } else {
        var message = {};
        message.name = this.datamine.username;
        message.ctime_ms = new Date().getTime();
        message.content = {
          from_id: this.mydataname,
          msg_body: {
            text: this.testcontent
          },
          msg_type: "text"
        };
        this.$store.dispatch("messagebtntwo", message);
      }
      this.testcontent = "";
    },
    onMsgReceives() {
      //监听收到消息后处理
      JIM.onMsgReceive(data => {
        // this.getConversation(); //获取会话列表用于刷新会话列表未读数
        this.$store.dispatch("messagepush", data.messages[0].content);
        this.getUnreadMsgCnt(data.messages[0].from_username);//告诉后台获取会话未读数
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
        this.scrollball();
      });
    },
    btn() {
      //发送按钮
      if (this.testcontent) {
        if (this.messagelist.msgs == undefined) {
          this.messagelist.msgs = [];
        }
        var inputbutton = document.querySelector("input");
        inputbutton.focus();
        this.contentgo();
      }
      this.scrollball();
    },
    test() {
      this.scrollball();
      //获取input焦点事件
    },
    contentgo() {
      //发送聊天信息
      JIM.sendSingleMsg({
        target_username: this.datamine.username,
        appkey: this.mydata.brokerAppKey,
        content: this.testcontent,
        no_offline: false,
        no_notification: false,
        need_receipt: true
      })
        .onSuccess((data, msg) => {
          this.scrollball();
          this.onMsgReceive(); //发送消息
        })
        .onFail(data => {
          //同发送单聊文本
          if (data.code == 880103) {
            this._querysmessage();
          }
        });
    },
    _querysmessage() {
      this.$http
        .post(this.$url.URL.JIGUANGBROKERREGUSER, {
          chatUsername: this.datamine.username
        })
        .then(res => {
          this.btn(); //重新发送文字
        });
    },
    _querysmessageimg() {
      this.$http
        .post(this.$url.URL.JIGUANGBROKERREGUSER, {
          chatUsername: this.datamine.username
        })
        .then(res => {
          this.sendSinglePic(this.fd); //发送图片
        });
    },
    scrollball() {
      //内容滚动到最底部
      setTimeout(() => {
        var boxcontent = document.querySelector(".scoll");
        boxcontent.scrollIntoView(false);
      }, 100);
    },
    changeimg(e) {
      this.fd = new FormData();
      let files = e.target.files || e.dataTransfer.files;
      if (!files[0]) throw new Error("获取文件失败");
      this.fd.append(files[0].name, files[0]);
      this.sendSinglePic(this.fd); //发送图片
    },
    sendSinglePic(fd) {
      Indicator.open({
        text: "图片发送中...",
        spinnerType: "fading-circle"
      });
      //发送图片
      JIM.sendSinglePic({
        target_username: this.datamine.username,
        image: fd,
        appkey: this.mydata.brokerAppKey,
        need_receipt: true
      })
        .onSuccess((data, msg) => {
          //data.code 返回码
          //data.message 描述
          //data.msg_id 发送成功后的消息id
          //data.ctime_ms 消息生成时间,毫秒
          //data.appkey 用户所属 appkey
          //data.target_username 用户名
          //msg.content 发送成功消息体
          // console.log(msg);
          this.getResource(msg);
        })
        .onFail(data => {
          //同发送单聊文本
          if (data.code == 880103) {
            this._querysmessageimg();
          }
        });
    },
    getResource(msg) {
      //获取资源
      JIM.getResource({
        media_id: msg.content.msg_body.media_id
      }).onSuccess(data => {
        //data.code 返回码
        //data.message 描述
        //data.url 资源临时访问路径
        this.onMsgReceiveimg(data);
      });
    },
    getUnreadMsgCnt(name) {
      var count = JIM.getUnreadMsgCnt({
        username: name
      });
    }
  },
  mounted() {
    this.scrollball(); //滚动到底不
  },
  beforeDestroy() {
    //组件销毁之前调用\
    //重置会话对象
    JIM.resetUnreadCount({
      username: this.datamine.username,
      appkey: this.mydata.brokerAppKey
    });
    this.$store.dispatch("movemessageitem", this.datamine.username);
    // //获取会话列表
    // JIM.getConversation().onSuccess(data => {
    //   this.$store.dispatch("getConversation", data.conversations);
    // });
  },
  components: {
    headertwo
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="less">
@import "../../common/css/master.less";
.abmessage {
  width: 100%;
  height: 100%;
  border-top: 0.005rem solid #ffffff;
  box-sizing: border-box;
  height: 3rem;
  overflow: hidden;
}
.contenbox {
  width: 100%;
  overflow: hidden;
  margin-top: 0.2rem !important;
  > div:nth-of-type(1) {
    text-align: center;
    font-size: 0.12rem;
    margin-bottom: 0.1rem;
    > span {
      display: inline-block;
      margin: auto;
      background: #cacaca;
      color: #ffffff;
      border-radius: 0.04rem;
      padding: 0.04rem 0.08rem;
    }
  }
}
.li_1 {
  width: 2.85rem;
  overflow: hidden;
  float: left;
  margin-left: 0.12rem;
  > img {
    width: 0.4rem;
    height: 0.4rem;
    float: left;
    border-radius: 50%;
    background: #ffffff;
  }
  > div {
    max-width: 2.1rem;
    padding: 0.1rem;
    background: #ffffff;
    line-height: 1.2;
    float: left;
    margin-left: 0.12rem;
    border-radius: @boxborder_2;
    font-size: @fontsize_3;
  }
}
.li_2 {
  width: 2.85rem;
  overflow: hidden;
  float: right;
  margin-right: 0.12rem;
  > img {
    width: 0.4rem;
    height: 0.4rem;
    float: right;
    border-radius: 50%;
    background: #ffffff;
  }
  > div {
    max-width: 2.1rem;
    padding: 0.1rem;
    background: @colorfiv;
    color: #ffffff;
    line-height: 1.2;
    float: right;
    margin-right: 0.12rem;
    border-radius: @boxborder_2;
    font-size: @fontsize_3;
  }
}
.scoll {
  float: left;
  width: 100%;
}
.boxcontent {
  width: 100%;
  position: fixed;
  bottom: 0.5rem;
  height: 86%;
  background: @colorfour;
  overflow-y: scroll;
  overflow-x: hidden;
  > div:nth-last-of-type(1) {
    margin-bottom: 0.14rem;
  }
  > div {
    margin-top: 0.14rem;
  }
}
.inputtext {
  display: inline-block;
  width: 3rem;
  height: 0.35rem;
  border-radius: @boxborder_2;
  border: 0.005rem solid @bordercolor_1;
  box-sizing: border-box;
  margin-left: 0.12rem;
  float: left;
  margin-top: 0.065rem;
  font-size: 0.14rem;
  text-indent: 0.12rem;
}
.inputtexttwo {
  width: 0.35rem;
  height: 0.3rem;
  margin-left: 0.15rem;
  position: fixed;
  right: 0.1rem;
  margin-top: 0.06rem;
  opacity: 0;
}
#keyboard {
  width: 100%;
  height: 0.5rem;
  border-top: 0.005rem solid @bordercolor_1;
  box-sizing: border-box;
  line-height: 0.5rem;
  position: fixed;
  overflow: hidden;
  bottom: 0;
  background: #ffffff;
  > img {
    width: 0.35rem;
    margin-left: 0.15rem;
    float: left;
    margin-top: 0.06rem;
  }
  > div {
    width: 0.5rem;
    font-size: 0.18rem;
    background: @colorfiv;
    float: left;
    text-align: center;
    color: #ffffff;
    padding: 0.085rem 0;
    margin-top: 0.065rem;
    margin-left: 0.08rem;
    border-radius: 0.03rem;
  }
}
</style>
