<template>
    <div class="rentinglisttwo">
        <headertwo :dataname="dataname"></headertwo>
        <ul id="ul_1">
            <li>
                <p>{{daikanlist[0]}}</p>
                <p>近7天带看（次）</p>
            </li>
            <li>
                <p>{{daikanlist[1]}}</p>
                <p>总带看（次）</p>
            </li>
        </ul>
        <ul id="ul_2_two">
            <li>看房日期</li>
            <li>带看人</li>
            <li>联系经纪人</li>
        </ul>
        <ul id="ul_3_two"  v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10" style=" margin-bottom:0.5rem;">
            <li v-for="item in list">
                <div>{{item.seeDate}}</div>
                <div>{{item.emplName}}</div>
                <div>
                    <a href="javarscript:;" >
                        <img @click="messgebtn(item)" src="../../imgs/home/dianhua.png" alt="">
                    </a>
                    <a :href="'sms:'+item.phone">
                    <img src="../../imgs/home/duanxin.png" alt="">
                    </a>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import headertwo from "../module/headertwo";
import { Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      dataname: "带看记录",
      id:"",
      site:window.localStorage.site,
      page:1,
      daikanlist:"",
      list:[]
    };
  },
  created() {
      this.id=this.$route.params.id
      this.daikanlist=this.$store.state.daikanlilv
      this._querys()

  },
  methods: {
      _querys(){
          this.$http.get(this.$url.URL.HOUSESEE+"/"+this.id+"?scity="+this.site+"&pageNo="+this.page)
          .then(res=>{
              this.list=this.list.concat(res.data.data)
          })
          this.page++
      },
      loadMore() {
      if (this.page !== "1") {
        this.loading = true;
        this._querys();
        Toast({
          message: "正在加载。。。",
          position: "bottom"
        });
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      }
    },
    messgebtn(item){
         //点击跳转聊天页面
      this.$http
        .post(this.$url.URL.HUANXINBROKERREGUSER, {
          chatUsername: item.chatUsername
        })
        .then(res => {
          if (window.localStorage.dc_token) {
            this.$store.dispatch("pushfriendlist", item);
            this.$router.push("/abmessage");
          } else {
            this.$router.push("/register");
          }
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
.rentinglisttwo{
  width: 100%;
  min-height: 100%;
  border-top: 1px solid #ffffff;
  box-sizing: border-box;
}
#ul_1 {
  width: 100%;
  height: 1.05rem;
  margin-top: 0.44rem;
  > li:nth-of-type(1) {
    border-right: 0.005rem solid @bordercolor_1;
    box-sizing: border-box;
  }
  > li {
    width: 50%;
    float: left;
    height: 0.65rem;
    font-size: @fontsize_3;
    color: @color_1;
    text-align: center;
    overflow: hidden;
    margin-top: 0.2rem;
    >p{
        line-height: 1.3;
    }
    p:nth-of-type(1) {
      margin-top: 0.1rem;
    }
    > p:nth-of-type(2) {
      font-size: @fontsize_5;
      color: @color_2;
      margin-top: 0.15rem;
    }
  }
}
#ul_2_two{
  width: 100%;
  height: 0.4rem;
  background: @colorthree;
  font-size:@fontsize_8;
  > li:nth-of-type(1) {
    margin-left: 0.2rem;
  }
  > li:nth-of-type(2) {
    margin-left: 0.9rem;
  }
  > li {
    color: @color_2;
    line-height: 0.4rem;
    float: left;
    margin-left: 0.7rem;
  }
}
#ul_3_two{
    width:100%;
    margin-bottom:0 !important;
    >li{
        width:90%;
        margin-left:5%;
        height:0.45rem;
        border-bottom:0.005rem solid @bordercolor_1;
        font-size:@fontsize_3;
        color:@color_1;
        >div:nth-of-type(2){
            text-indent: 0.35rem;
        }
        >div{
            line-height: 0.45rem;
            float:left;
            width:33%;
            img:nth-of-type(1){
                width:0.165rem;
                height:0.17rem;
                margin-left:0.34rem;
            }
            img:nth-of-type(2){
                width:0.175rem;
                height:0.17rem;
                margin-left:0.3rem;
            }
        }
    }
}
</style>

