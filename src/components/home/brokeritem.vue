<template>
  <div class="searchlist">
   <img id="fengxiang" src="../../imgs/home/fengxianghese.png" alt="">
   <headertwo :dataname="dataname"></headertwo>
               <div id="brokenitemname">
                   <img class="brokenitemimg" src="../../imgs/home/shoucangxz.png" alt="" v-if="isCollect" @click="isCollectcancelbtn">
                   <img class="brokenitemimg" src="../../imgs/home/weixuanzhes.png" alt="" v-else @click="isCollectaddbtn">
                   <div class="cnxhlistdiv">
                       <div class="cnxhlistleft">
                           <img :src="dataone.photo|headimgfilter" alt="">
                       </div>
                       <ul class="cnxhlistright">
                           <li>
                               <div>{{dataone.emplName}}<span>{{dataone.positionName}}</span></div>
                               <div>{{dataone.grade}}<span>评分</span></div>
                           </li>
                           <li>
                               {{dataone.deptName}}
                           </li>
                           <li>
                               世华工号:{{dataone.emplAccNo}}
                           </li>
                       </ul>
                   </div>
               </div>   
    <ul class="oneul">
        <li>
            <div>{{dataone.historyDealNum}}</div>
            <div>历史成交</div>
        </li>
        <li>
            <div>{{dataone.byCollectNum }}</div>
            <div>被收藏</div>
        </li>
        <li>
             <div>{{dataone.grade}}</div>
            <div>带看量</div>
        </li>
    </ul>
    <div class="erlisttwo">
            <div>他的评价</div>
            <p @click="discussbtn">
                <span>查看全部</span>
                <img src="../../imgs/home/gengduojiantou.png" alt="">
            </p>
    </div>

    <div class="div_3">
        <div v-if="discuss.length=='0'" id="wupingid_1">
            <img src="../../imgs/home/zhanqupinglun.png" alt=""><span>此经纪人暂无评论~~~</span>
        </div>
        <discuss :message="discuss" v-else></discuss>
    </div>
    <div class="erlisttwo">
            <div>他的房源</div>
            <div>
                <span v-for="(item,index) in homebtnlist" @click="homebtns(index)" :class="{homebtn:index==indextwo}">{{item}}</span>
            </div>
    </div>
        <div class="cnxhlist" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10">
            <div class="cnxhlistitem" @click="rentingitembtn(item)" v-for="item in datalist">
                <div class="cnxhcontnet">
                    <div class="cnxhcontnetleft">
                        <img :src="item.housePic " alt="">
                    </div>
                    <div class="cnxhcontnetright">
                        <div class="cnxhconterone">
                            {{item.houseTitle}}
                        </div>
                        <div class="cnxhcontertwo">
                            {{item.areaName}} {{item.districtName}} {{item.houseDirection}}
                        </div>
                        <div class="cnxhconterthree">
                            {{item.roomsNum}}房{{item.livingRoomNum}}厅 {{item.builtArea}}m² 
                        </div>
                        <div class="cnxhconterfour">
                            <div v-for="item in item.houseTag ">{{item}}</div>
                        </div>
                         <div class="cnxhconterfive" v-if="id=='1'">
                            <div>{{item.saleTotal}}万</div>
                            <div>{{item.salePrice}}元/平</div>
                        </div>
                        <div class="cnxhconterfive" v-else>
                            <div>{{item.rentPrice}}元/月</div>                          
                        </div>
                    </div>
                </div>              
            </div>
        </div>
        <ul id="bottombtnone">
            <li><a :href="'tel:'+dataone.phone">
                打电话
            </a>
            </li>
            <li @click="messagebtn">
                <a>
                在线咨询
                </a>
            </li>
        </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import headertwo from "../module/headertwo";
import discuss from "../module/discuss";
export default {
  name: "HelloWorld",
  data() {
    return {
      dataname: "经纪人详情",
      homebtnlist: ["二手房", "租房"],
      indextwo: 0,
      id: "1",
      idtwo: "",
      site: window.localStorage.site,
      dataone: "", //经纪人个人信息
      page: "1",
      datalist: [],
      discuss: "", //评价列表
      isCollect: "" //收藏状态
    };
  },
  created() {
    this.idtwo = this.$route.params.id;
    this._querys();
    this._querystwo();
  },
  methods: {
    messagebtn() {
      //跳转聊天页面
      if (window.localStorage.token) {
        var set = {};
        set.username = this.dataone.chatUsername;
        set.nickName=this.dataone.emplName
        this.$store.dispatch("message", set);
        this.$router.push("/abmessage");
      } else {
        this.$router.push("/register");
      }
    },
    _querys() {
      this.$http
        .get(this.$url.URL.BROKERTWO + "/" + this.site + "/" + this.idtwo)
        .then(res => {
          this.dataone = res.data.data;
          //    console.log(this.dataone)
          this.isCollect = res.data.data.isCollect;
        });
      this.$http
        .get(
          this.$url.URL.BROKEREVALUATES +
            "?brokerId=" +
            this.idtwo +
            "&pageNo=1&pageSize=2"
        )
        .then(res => {
          for (let i = 0; i < res.data.data.length; i++) {
            res.data.data[i].tag = res.data.data[i].tag.split(",");
          }
          if (res.data.data.length > 2) {
            res.data.data = res.data.data.slice(0, 2);
          }

          this.discuss = res.data.data;
        });
    },
    isCollectcancelbtn() {
      //取消收藏
      this.$http
        .post(
          this.$url.URL.BROKERCOLLECTIONCANCEL +
            "/" +
            this.site +
            "/" +
            this.idtwo
        )
        .then(res => {
          this.isCollect = false;
        });
    },
    isCollectaddbtn() {
      //添加收藏
      if (window.localStorage.token) {
        this.$http
          .post(
            this.$url.URL.BROKERCOLLECTIONADD +
              "/" +
              this.site +
              "/" +
              this.idtwo
          )
          .then(res => {
            this.isCollect = true;
          });
      } else {
        this.$router.push("/register");
      }
    },
    discussbtn() {
      if (this.discuss.length != "0") {
        this.$router.push("/discussindex/" + this.idtwo);
      }
    },
    loadMore() {
      if (this.page !== "1") {
        this.loading = true;
        this._querystwo();
        Toast({
          message: "正在加载。。。",
          position: "bottom",
          duration: 500
        });
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      }
    },
    _querystwo() {
      var url = "";
      this.id == "1"
        ? (url =
            this.$url.URL.HOUSELIST +
            "/" +
            this.site +
            "/" +
            this.idtwo +
            "?pageNo=" +
            this.page +
            "&pageSize=10")
        : (url =
            this.$url.URL.RENTHOUSELISTTWO +
            "/" +
            this.site +
            "/" +
            this.idtwo +
            "?pageNo=" +
            this.page +
            "&pageSize=10");
      this.$http.get(url).then(res => {
        for (let i = 0; i < res.data.data.length; i++) {
          res.data.data[i].houseTag = res.data.data[i].houseTag.split(",");
        }
        this.datalist = this.datalist.concat(res.data.data);
        this.page++;
      });
    },
    homebtns(index) {
      this.indextwo = index;
      this.id = index + 1;
      this.page = "1";
      this.datalist = [];
      this._querystwo();
    },
    rentingitembtn(item) {
      this.$router.push({
        path: "/rentingitem/" + item.sdid,
        query: { id: this.id }
      });
    }
  },
  components: {
    headertwo,
    discuss
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="less">
@import "../../common/css/master.less";
@import "../../common/css/fulist.css";
.searchlist {
  width: 100%;
  min-height: 100%;
}
#fengxiang {
  width: 0.221rem;
  height: 0.21rem;
  position: fixed;
  top: 0.115rem;
  right: 0.12rem;
  z-index: 99999;
}
#brokenitemname {
  width: 100%;
  height: 1.05rem;
  border-top: 1px solid #ffffff;
  border-bottom: 1px solid #cacaca;
  margin-top: 0.45rem;
  position: relative;
}
.cnxhlistdiv {
  margin-left: 0.12rem;
  margin-right: 0.12rem;
  height: 0.75rem;
  margin-top: 0.15rem;
}
#wupingid_1 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  width: 100%;
  text-align: center;
  font-size: @fontsize_4;
  color: @color_4;
  border-bottom: 0.01rem solid @color_3;
  box-shadow: 0px 0px 0px 0px #aaa, 0px 0px 0px 0px #aaa,
    0px 3px 0px 0px @color_3, 0px 0px 0px 0px #aaa;

  > span {
    vertical-align: middle;
    margin-left: 0.23rem;
  }
  > img {
    height: 0.7rem;
    vertical-align: middle;
  }
}
.cnxhlistleft {
  width: 0.75rem;
  height: 100%;
  float: left;
  border-radius: 50%;
  overflow: hidden;
}
.cnxhlistleft > img {
  width: 100%;
  height: 100%;
  float: left;
}
.cnxhlistright {
  width: 2.5rem;
  height: 100%;
  float: right;
}
.cnxhlistright > li:nth-of-type(1) {
  width: 100%;
  font-size: 0.18rem;
  overflow: hidden;
}
.cnxhlistright > li:nth-of-type(1) > div:nth-of-type(1) {
  float: left;
}
.cnxhlistright > li:nth-of-type(1) > div:nth-of-type(1) > span {
  font-size: 0.14rem;
  color: #999999;
  margin-left: 0.1rem;
}
.cnxhlistright > li:nth-of-type(1) > div:nth-of-type(2) {
  float: right;
  color: @colorone;
}
.cnxhlistright > li:nth-of-type(1) > div:nth-of-type(2) > span {
  font-size: 0.13rem;
  color: #999999;
}
.div_3 {
  margin-top: 0.05rem;
  margin-left: 0.12rem;
  margin-right: 0.12rem;
  border-top: 1px solid #ffffff;
  box-sizing: border-box;
}

.cnxhlistright > li:nth-of-type(2) {
  font-size: 0.15rem;
  color: #666666;
  margin-top: 0.1rem;
  overflow: hidden;
}
.cnxhlistright > li:nth-of-type(3) {
  font-size: 0.15rem;
  color: #666666;
  margin-top: 0.1rem;
  overflow: hidden;
}
.brokenitemimg {
  width: 0.225rem;
  position: absolute;
  right: 0.25rem;
  bottom: 0.2rem;
}
.oneul {
  width: 100%;
  overflow: hidden;
  margin-top: 0.2rem;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid #cacaca;
}
.oneul > li {
  width: 33.3333333%;
  float: left;
  font-size: 0.2rem;
  text-align: center;
  overflow: hidden;
}
.oneul > li > div:nth-of-type(2) {
  font-size: 0.14rem;
  color: #666666;
  margin-top: 0.15rem;
}
.cnxhlist {
  margin-bottom: 0.5rem;
}
.erlisttwo {
  width: 100%;
  overflow: hidden;
  margin-top: 0.3rem;
  > p {
    float: right;
    font-size: @fontsize_6;
    color: @color_3;
    margin-right: 0.12rem;
    > span {
      vertical-align: middle;
    }
    > img {
      vertical-align: middle;
      margin-left: 0.1rem;
      width: 0.09rem;
    }
  }
}
.erlisttwo > div:nth-of-type(1) {
  float: left;
  margin-left: 0.12rem;
  height: 0.2rem;
  font-size: 0.2rem;
  line-height: 0.2rem;
  box-sizing: border-box;
}
.erlisttwo > div:nth-of-type(2) {
  float: right;
  margin-right: 0.12rem;
  height: 0.2rem;
  text-indent: 0.1rem;
  font-size: 0.14rem;
  line-height: 0.2rem;
  color: #333333;
}
.erlisttwo > div:nth-of-type(2) > span {
  margin-left: 0.13rem;
}
.homebtn {
  color: @colorone !important;
}
#bottombtnone {
  width: 100%;
  height: 0.5rem;
  position: fixed;
  left: 0;
  bottom: 0;
  background: #ffffff;
  line-height: 0.5rem;
}
#bottombtnone > li {
  height: 0.4rem;
  line-height: 0.4rem !important;
  float: left;
  margin-top: 0.05rem;
  text-align: center;
  line-height: 0.5rem;
  font-size: 0.17rem;
  color: #ffffff;
  background: @colorone;
  width: 40% !important;
  border-radius: @boxborder_2;
  margin-left: 0.25rem;
}
#bottombtnone > li > a {
  text-decoration: none;
  color: #ffffff;
}
#bottombtnone > li:nth-of-type(2) {
  background: @colorfiv;
}
</style>

 
