<template>
    <div class="message">
        <div class="titlebox">消息</div>
        <ul class="messageul">
            <li @click="messageone">
                <div class="messagelist">
                    <img src="../../imgs/home/fuwutongzhi.png" alt="">
                    <div class="messagelistright">
                        <div>服务通知</div>
                        <div>和发售富华大厦发货单三和发售我电话费和发售哈</div>
                    </div>
                </div>
                
            </li>
            <li @click="messagetwo">
                <div class="messagelist">
                    <img src="../../imgs/home/xitongtongzhi.png" alt="">
                    <div class="messagelistright">
                        <div>系统通知</div>
                        <div>和发售富华大厦发货单三和发售我电话费和发售哈</div>
                    </div>
                </div>               
            </li>
        </ul>
        <ul class="messageul" style="margin-top:0;border:none;margin-bottom:0.5rem;">
            <li @click="messagethree(item)" v-show="item.content.length!=0" v-for="item in listdata" style="border-bottom:0.005rem solid #e6e6e6;" @touchstart="btnleft()" @touchend="diversionbtn()">
                <div class="messagelist messagelistddd" :class="{class_1:false}">
                    <div v-show="item.quantity!=0">{{item.quantity}}</div>
                    <img :src="item.photo|headimgfriltertwo" :onerror="null|headimgfrilter" alt="">
                    <div class="messagelistright">
                        <div>{{item.emplName}}</div>
                        <div>{{item.content.length!=0?item.content[item.content.length-1].data?item.content[item.content.length-1].data:'[图片]':""}}</div>
                    </div>
                </div>
                <div class="removebtn" :class="{class_2:false}" @click.stop="removebtn()">标记已读</div>               
            </li>
        </ul>
    </div>
</template>
<script>
import router from "../../router";
export default {
  data() {
    return {
      // listdata: [],
      moveleft: null, //滑动距离
    };
  },
  created() {
    // this.huoqulist();
  },
  computed: {
    listdata() {
      return this.$store.state.friendlist;
    }
  },
  methods: {
    messageone() {
      this.$router.push({ path: "/messageitem/", query: { id: "1" } });
    },
    messagetwo() {
      this.$router.push({ path: "/messageitem/", query: { id: "2" } });
    },
    removebtn() {
      // //点击删除
    },
    messagethree(item) {
      //点击聊天
      this.moveleft = null;
      this.$store.dispatch("pushfriendlisttwo",item);
      this.$router.push("/abmessage");
    },
    btnleft() {
      //触摸
      this.moveone = event.touches[0].clientX;
    },
    diversionbtn() {
      //离开
      // this.movetwo = event.changedTouches[0].clientX;
      // this.movethree = this.moveone - this.movetwo;
      // if (this.movethree > 50) {
      //   this.moveleft = index;
      // }
      // if (this.movethree < -50) {
      //   this.moveleft = null;
      // }
    }
  }
};
</script>
<style scoped lang="less">
@import "../../common/css/master.less";
.message {
  width: 100%;
  height: 100%;
  border-top: 1px solid #ffffff;
  box-sizing: border-box;
}
.titlebox {
  width: 100%;
  height: 0.44rem;
  position: fixed;
  background: #ffffff;
  text-align: center;
  line-height: 0.44rem;
  border-bottom: 1px solid #cacaca;
  font-size: 0.19rem;
  top: 0;
  left: 0;
  z-index: 999;
}
.messageul {
  margin-top: 0.44rem;
  width: 100%;
}
.messageul > li {
  margin-left: 0.12rem;
  margin-right: 0.12rem;
  height: 0.8rem;
  position: relative;
  overflow: hidden;
}
.removebtn {
  width: 1rem;
  height: 100%;
  position: absolute;
  right: -1rem;
  top: 0;
  background: @colorone;
  color: #ffffff;
  font-size: 0.18rem;
  text-align: center;
  line-height: 0.8rem;
}
.messageul > li:nth-last-of-type(1) {
  border-bottom: 1px solid #cacaca;
}
.messagelist {
  width: 100%;
  height: 0.5rem;
  padding-top: 0.15rem;
}
.messagelistddd {
  position: relative;
  > div:nth-of-type(1) {
    padding: 0.03rem 0.05rem;
    background: red;
    font-size: 0.1rem;
    color: #ffffff;
    position: absolute;
    border-radius: 50%;
    top: 0.05rem;
    left: 0.4rem;
  }
}
.messagelistddd > img {
  border-radius: @boxborder_2;
}
.class_2 {
  right: 0 !important;
  transition: all 0.6s ease;
}
.class_1 {
  margin-left: -1.09rem !important;
  transition: all 0.2s ease;
}
.messagelist > img {
  width: 0.5rem;
  height: 0.5rem;
  float: left;
}
.messagelistright {
  height: 100%;
  float: left;
  margin-left: 0.1rem;
  width: 2.9rem;
}
.messagelistright > div:nth-of-type(1) {
  font-size: 0.18rem;
  color: #333333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-top: 0.05rem;
}
.messagelistright > div:nth-of-type(2) {
  font-size: 0.14rem;
  color: #666666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 0.08rem;
  line-height: 1.2;
}
</style>

