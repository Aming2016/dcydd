<template>
    <div class="register">
        <headertwo :dataname="dataname"></headertwo>
        <div class="mineimg">
            <img src="../../imgs/home/denglogo.png" alt="" srcset="">
        </div>
        <div>
        <div class="inputbox">
            <input type="number" placeholder="请输入手机号码" maxlength="11" v-model="phonnumber">
        </div>
        <div class="inputbox" style="margin-top:0.15rem;">
            <input type="text" style="width:1.5rem;" placeholder="请输入验证码" v-model="code">
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
      code: "", //验证码
      phonnumber: "", //手机号码
      number: 60, //倒计时
      fasodxnumber: "获取验证码",
      buttonnametwo: "确定",
      dataname: "绑定手机号码",
      my_wx_data: "" //微信信息
    };
  },
  created() {
    this.$store.state.activeindex = "6";
    if (window.localStorage.my_wx_data) {
      this.my_wx_data = JSON.parse(window.localStorage.my_wx_data);
    }
  },
  methods: {
    pricebtn() {
      //发送验证码
      if (this.phonnumber.length == 11) {
        this._queryscode();
      } else {
        MessageBox.alert("手机号码不正确,请重新输入");
      }
    },
    gohuanhaombtntwo() {
      //发送绑定手机号码
      if (this.phonnumber.length == 11) {
        if (this.code) {
          this._querysphone();
        } else {
          MessageBox.alert("请输入验证码");
        }
      } else {
        MessageBox.alert("手机号码不正确,请重新输入");
      }
    },
    _querysphone() {
      //绑定手机号码
      this.$http
        .post(this.$url.URL.WXPHONENUMBER, {
          authKey: this.my_wx_data.authKey, //认证key
          headImage: this.my_wx_data.headImage, //头像URL
          nickname: this.my_wx_data.nickname, //微信昵称
          openid: this.my_wx_data.openid, // 微信openid
          phone: this.phonnumber, //手机号码
          sex: this.my_wx_data.sex, //性别
          verifyCode: this.code //验证码
        })
        .then(res => {
          if (res.data.status == "1") {
            window.localStorage.token = res.data.data;
            MessageBox.alert("登录成功");
            this.$router.push("/mine");
            this._querys();
          } else {
            MessageBox.alert(res.data.msg);
          }
        });
    },
    _queryscode() {
      //获取验证码
      this.$http
        .post(this.$url.URL.FETCHSMSCODE,{
          deviceCode: "web",
          mobile: this.phonnumber,
          operateType: "REGISTER"
        })
        .then(res => {
          MessageBox.alert("验证码发送成功");
          this.movenumbe = false;
          var time = setInterval(() => {
            this.number--;
            if (this.number == -1) {
              this.movenumbe = true;
              this.number = 60;
              clearInterval(time);
            }
          }, 1000);
        });
    },
    _querys() {
      this.$http.get(this.$url.URL.MINEDATAINFO).then(res => {
        window.localStorage.mydata = JSON.stringify(res.data.data);
        this.mydata = res.data.data;
        if(this.mydata.easemobUsername==null){
          this._bangdingjiguang()
        }else{
          this.jiguangchushi();
        }
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
      //极光初始化
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
          console.log(data);
          that.jgdenglu();
          this.onDisconnect(); //断线监听
        })
        .onFail(function(data) {
          console.log("初始化失败");
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
          console.log(data);
          this.onSyncConversation();
          this.getConversation();//获取会话列表
        })
        .onFail(function(data) {
          console.log("登录失败");
          console.log(data);
        })
        .onTimeout(function(data) {
          console.log("登录延迟");
          console.log(data);
        });
    },
    onDisconnect() {
      JIM.onDisconnect(()=> {
        console.log("断线")
         this._querys()
      });
    },
      onMsgReceive() {
      //监听收到消息后处理
      JIM.onMsgReceive(data => {
        console.log("dddd")
        this.$store.dispatch('messagepush',data.messages[0].content)
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
              messgone.ctime_ms=data.messages[0].content.create_time,
              messgone.content = {
                from_id: data.messages[0].from_username,
                url: true,
                msg_body: {
                  media_id: urls
                },
                msg_type: "image"
              };
              var message = {};
              message.from_username = data.messages[0].from_username;
              message.msgs = [];
              message.msgs.push(messgone);
              this.$store.dispatch("messagebtnone", message);
            });
          } else {
            messgone.ctime_ms=data.messages[0].content.create_time,
            messgone.content = {
              from_id: data.messages[0].from_username,
              msg_body: {
                text: data.messages[0].content.msg_body.text
              },
              msg_type: "text"
            };
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
    onSyncConversation() {
      var set = [];
      this.$store.dispatch("messagelist", set);
      JIM.onSyncConversation(data => {
        //离线消息同步监听
        console.log(data);
        this.$store.dispatch("messagelist", data);
        this.onMsgReceive(); //收到消息后处理
      });
    },
    getUnreadMsgCnt(name) {//告诉后台充值会话信息
      var count = JIM.getUnreadMsgCnt({
        username: name
      });
    },
    getConversation(){//获取会话列表
      JIM.getConversation().onSuccess(data=>{
        console.log(data);
        this.$store.dispatch('getConversation',data.conversations)
      });
    },
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

