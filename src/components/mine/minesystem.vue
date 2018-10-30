<template>
    <div class="minecentre">
        <headertwo :dataname="dataname"></headertwo>
        <!-- <ul class="headerimg">
            <li>
                <div>推荐二维码</div>
                <div>
                    <img src="../../imgs/home/gengduojiantou.png" alt="">
                    <span></span>
                    
                </div>
            </li>
        </ul>
        <ul class="contentul">
            <li>
                <div>关于我们</div>
                <div>
                    <img src="../../imgs/home/gengduojiantou.png" alt="" @click="minenamebtn">
                </div>
            </li>
        </ul> -->
         <ul class="contentul" style="margin-top:0.5rem;">
            <li>
                <div>当前版本</div>
                <div>
                    <span>v1.2.3</span>
                </div>
            </li>
        </ul>
        <buttonone class="buttonone" :buttonname="buttonnametwo" @click.native="gohuanhaombtntwo"></buttonone>
    </div>
</template>
<script>
import headertwo from "../module/headertwo";
import buttonone from "../module/buttonone";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      dataname: "系统设置",
      buttonnametwo: "退出当前账户"
    };
  },
  methods: {
    minenamebtn() {
      this.$router.push("/minename");
    },
    numberbtn() {
      this.$router.push("/phonenumber");
    },
    minepasswordbtn() {
      this.$router.push("/minepassword");
    },
    gohuanhaombtntwo() {
      MessageBox.confirm("是否退出登录?")
        .then(action => {
          this._querystwo();
        })
        .catch(res => {});
    },

    _querystwo() {
      this.$http.post(this.$url.URL.MINELOGOUT).then(res => {
        var objct = {
          data: {},
          type: "LOGOUT"
        };
        this.$addevent(objct);
        localStorage.removeItem("dc_token");
        this.$store.state.messagebol = 0;
        localStorage.removeItem("sitename");
        localStorage.removeItem("dc_mydata");
        sessionStorage.clear();
        localStorage.removeItem("my_wx_data");
        this.$imConn.close();
        this.$router.push("/");
      });
    }
  },
  components: {
    headertwo,
    buttonone
  }
};
</script>
<style scoped lang="less">
.minecentre {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #f8f8f8;
}
.headerimg {
  width: 100%;
  height: 0.5rem;
  background: #ffffff;
  margin-top: 0.54rem;
  box-sizing: border-box;
}
.headerimg > li {
  margin-left: 0.12rem;
  margin-right: 0.12rem;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}
.headerimg > li > div:nth-of-type(1) {
  float: left;
  font-size: 0.17rem;
  height: 100%;
  line-height: 0.5rem;
}
.headerimg > li > div:nth-of-type(2) {
  float: right;
  height: 0.6rem;
}
.headerimg > li > div:nth-of-type(2) > span {
  display: inline-block;
  float: right;
  width: 0.3rem;
  height: 0.3rem;
  // background:red;
  margin-top: 0.1rem;
  overflow: hidden;
}
.headerimg > li > div:nth-of-type(2) > img {
  width: 0.1rem;
  height: 0.18rem;
  margin-left: 0.1rem;
  float: right;
  margin-top: 0.16rem;
}
.contentul {
  width: 100%;
  height: 0.5rem;
  background-color: #ffffff;
}
.contentul > li {
  margin-left: 0.12rem;
  margin-right: 0.12rem;
  height: 100%;
  box-sizing: border-box;
  line-height: 0.5rem;
}
.contentul > li > div:nth-of-type(1) {
  float: left;
  font-size: 0.17rem;
}
.contentul > li > div {
  line-height: 0.5rem;
}
.contentul > li > div:nth-of-type(2) {
  float: right;
  font-size: 0.15rem;
  color: #999999;
}
.contentul > li > div:nth-of-type(2) > img {
  width: 0.1rem;
  height: 0.18rem;
  margin-left: 0.1rem;
}
.buttonone {
  float: left;
  margin-left: 10%;
  margin-top: 1rem;
}
</style>