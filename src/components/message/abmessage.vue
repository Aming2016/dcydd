<template>
  <div class="abmessage">
   <headertwo :dataname="dataname">
   </headertwo>
   <div class="boxcontent">
     <div class="contenbox" v-for="item in messagelist.content">
       <div>
         <span>{{item.time|timefilter}}</span>
      </div>
       <div :class="{li_1:item.from!=mydataname,li_2:item.from==mydataname}">
        <img v-if="item.from==mydataname" :src="myimg" alt="">
        <img v-else :src="toname.chatUsername|jjrheadimg" :onerror="null|headimgfrilter" alt="">
        <div>
          <img v-if="item.url" :src="item.url" alt="">
          <span v-else>
           {{item.data}}
          </span>         
        </div>
      </div>
     </div>
      <!-- item.content.url?item.content.msg_body.media_id:'http://dl.im.jiguang.cn/'+item.content.msg_body.media_id -->
   
      <a class="scoll"></a>
   </div>
   <div id="keyboard">
       <input v-iosinput type="text" v-model="testcontent" @focus='test' class="inputtext">
       <input id="inputtexttwo"  v-if="!testcontent" type="file" accept="image/*" @change="changeimg($event)">
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
      fd: "",
      toname: "", //发送的聊天对象
      testcontent: "", //输入的聊天内容
      mydataname: JSON.parse(window.localStorage.dc_mydata).easemobUsername,
      myimg: JSON.parse(window.localStorage.dc_mydata).headImage, //我的头像
      mydata: JSON.parse(window.localStorage.dc_mydata)
    };
  },
  created() {
    //获取聊天对象
    this.toname = this.$store.state.chatobject;
    this.dataname = this.toname.emplName;
    console.log(this.mydata);
    // this.monitor();
    var objct = {
      data: {},
      type: "CHAT"
    };
    this.$addevent(objct);
  },
  computed: {
    messagelist() {
      var listfind = this.$store.state.friendlist.find((value, index) => {
        return value.chatUsername == this.$store.state.chatobject.chatUsername;
      });
      listfind.quantity = 0;
      //push到缓存里面
      var lockey = JSON.parse(window.localStorage.dc_mydata).easemobUsername;
      var messagelist = JSON.parse(localStorage.getItem(lockey));
      var listtwofind = messagelist.find((value, index) => {
        return value.chatUsername == this.$store.state.chatobject.chatUsername;
      });
      listtwofind.quantity = 0;
      localStorage.setItem(lockey, JSON.stringify(messagelist));
      setTimeout(() => {
        this.scrollball();
      }, 400);
      return listfind || this.scrollball();
    }
  },
  methods: {
    // resetUnreadCount() {
    //   JIM.resetUnreadCount({
    //     username: this.datamine.username
    //   });
    //   this.getConversation();
    // },

    btn() {
      //发送按钮
      if (this.testcontent) {
        var inputbutton = document.querySelector("input");
        inputbutton.focus();
        this.contentgo();
      }
    },
    test() {
      this.scrollball();
      //获取input焦点事件
    },

    //发送文本消息
    contentgo() {
      var id = this.$imConn.getUniqueId(); // 生成本地消息id
      var msg = new WebIM.message("txt", id); // 创建文本消息
      msg.set({
        msg: this.testcontent, // 消息内容
        to: this.$store.state.chatobject.chatUsername, // 接收消息对象（用户id）
        roomType: false,
        ext: { nickName: this.mydata.nickname, headImg: this.myimg },
        success: function(id, serverMsgId) {}
      });
      msg.body.chatType = "singleChat";
      this.$imConn.send(msg.body);
      var objct = {
        data: this.testcontent, //聊天信息
        from: this.mydataname, //发送人的环信标识
        to: this.$store.state.chatobject.chatUsername, // 接收消息对象（用户id）
        chatUsername: this.$store.state.chatobject.chatUsername, // 接收消息对象（用户id）
        type: "chat"
      };
      this.$store.dispatch("pushfriendmessage", objct);
      this.testcontent = "";
      //发送聊天信息
    },
    scrollball() {
      //内容滚动到最底部
      setTimeout(() => {
        var boxcontent = document.querySelector(".scoll");
        boxcontent.scrollIntoView(false);
      }, 100);
    },

    //发送图片
    changeimg(e) {
      //将图片转换bs64；
      var files = e.target.files[0];
      if (!e || !window.FileReader) return; // 看支持不支持FileReader
      let reader = new FileReader();
      let imgurl; //bs64图片路径
      reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
      reader.onloadend = () => {
        var objct = {
          url: reader.result, //聊天信息
          from: this.mydataname, //发送人的环信标识
          ext: { nickName: this.mydata.nickname, headImg: this.myimg },
          to: this.$store.state.chatobject.chatUsername, // 接收消息对象（用户id）
          chatUsername: this.$store.state.chatobject.chatUsername, // 接收消息对象（用户id）
          type: "imgs"
        };
        this.$store.dispatch("pushfriendmessage", objct);
      };
      //环信发送图片
      var id = this.$imConn.getUniqueId();
      var msg = new WebIM.message("img", id);
      var input = document.getElementById("inputtexttwo"); // 选择图片的input
      var file = WebIM.utils.getFileUrl(input); // 将图片转化为二进制文件
      // this.scrollball();
      var allowType = {
        jpg: true,
        gif: true,
        png: true,
        bmp: true
      };
      var option = {
        apiUrl: WebIM.config.apiURL,
        file: file,
        to: this.$store.state.chatobject.chatUsername,
        roomType: false,
        ext: { nickName: this.mydata.nickname, headImg: this.myimg },
        chatType: "singleChat",
        onFileUploadError: function() {},
        onFileUploadComplete: function() {},
        success: function() {}
      };
      // for ie8
      try {
        if (!file.filetype.toLowerCase() in allowType) {
          return;
        }
      } catch (e) {
        option.flashUpload = WebIM.flashUpload;
      }
      msg.set(option);
      this.$imConn.send(msg.body);
    },
    monitor() {
      this.$imConn.listen({
        onClosed(message) {}, //连接关闭回调
        onTextMessage(message) {
          console.log(message);
          this.$store.dispatch("pushfriendmessage", message);
          this.scrollball();
        }, //收到文本消息
        onEmojiMessage(message) {}, //收到表情消息
        onPictureMessage(message) {
          console.log(message);
          this.$store.dispatch("pushfriendmessage", message);
          this.scrollball();
        } //收到图片消息
      });
    }
  },
  mounted() {
    this.scrollball(); //滚动到底不
  },
  beforeDestroy() {},
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
#inputtexttwo {
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
