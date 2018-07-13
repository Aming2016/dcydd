<template>
  <div class="searchlist">
   <headertwo :dataname="dataname"></headertwo>
    <div class="cnxhlist" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10" infinite-scroll-immediate-check="true" v-if="movenum">
           <ul id="cnxhlistul">
               <li @click="brokeritem(item)" v-for="item in listone">
                   <div class="cnxhlistdiv">
                       <div class="cnxhlistleft">
                           <img :src="item.photo|headimgfilter" alt="">
                       </div>
                       <ul class="cnxhlistright">
                           <li>
                               <div><span :class="{classname:item.status!='0'}">{{item.emplName}}</span><span>{{item.positionName}}</span></div>
                               <div>{{item.grade}} <span>评分</span></div>
                           </li>
                           <li>
                               {{item.deptName}}
                           </li>
                           <li>
                               <div v-for="item in item.emplFlag">{{item}}</div>
                           </li>
                       </ul>
                   </div>
               </li>              
           </ul>
    </div>
    <div id="div_67" v-else>
          <img src="../../imgs/home/duibiliebiaokongbai.png" alt="">
          <div>{{tishicontent}}~~~</div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import headertwo from "../module/headertwo";
export default {
  name: "HelloWorld",
  data() {
    return {
      dataname: "我收藏的经纪人",
      movenum: true,
      tishicontent: "",
      scitys: window.localStorage.site, //城市
      listone: [],
      page: "1",
      id: "",
      url:""
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.id == "1"
      ? (this.dataname = "我收藏的经纪人")
      : (this.dataname = "我的经纪人");
    if (this.id == "1") {
      this.tishicontent = "暂无收藏经纪人";
      this.url=this.$url.URL.COLLECTIONLIST;
    } else {
      this.tishicontent = "暂无我的经纪人";
      this.url=this.$url.URL.MYCOLLECTIONLIST;
    }
    this._querys();
  },
  methods: {
    loadMore() {
      if (this.page != "1") {
        this.loading = true;
        this._querys();
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
    _querys() {
      this.$http
        .get(
          this.url + "?pageNo=" + this.page + "&pageSize=10"
        )
        .then(res => {
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].emplFlag) {
              res.data.data[i].emplFlag = res.data.data[i].emplFlag.split(",");
            }
          }
          this.listone = this.listone.concat(res.data.data);
          if (this.listone.length > 0) {
            this.movenum = true;
          } else {
            this.movenum = false;
          }
          this.page++;
        });
    },
    gohomebtn() {
      this.$router.go(-1);
    },
    brokeritem(item) {
      if (item.status == "0") {
        this.$router.push({ path: "/brokeritem/" + item.id });
      }
    }
  },
  components: {
    headertwo
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="less">
@import "../../common/css/master.less";
@import "../../common/css/search.css";
@import "../../common/css/fulist.css";
.tabercontent {
  margin-top: 0.44rem;
}
#div_67 {
  width: 100%;
  height: 100% !important;
  position: fixed;
  text-align: center;
  background: #ffffff;
  z-index: 1;
  > img {
    width: 35%;
    margin-top: 1.36rem;
  }
  > div:nth-of-type(1) {
    margin-top: 0.7rem;
    font-size: @fontsize_4;
    color: @color_3;
  }
  > div:nth-of-type(2) {
    width: 50%;
    height: 0.4rem;
    border-radius: @boxborder_2;
    border: 0.01rem solid @colorone;
    color: @colorone;
    font-size: @fontsize_4;
    text-align: center;
    line-height: 0.4rem;
    margin: 0.4rem auto;
  }
}
#shuaixuancolor {
  color: @colorone;
}
.shuaixuanname {
  color: @colorone;
}
.taberlist > li {
  width: 33.33333333%;
}
.cnxhlist {
  margin-top: 0.45rem;
  margin-bottom: 0;
}
.shuaixuan {
  position: fixed;
  width: 100%;
  background: rgba(1, 1, 1, 0.5);
  top: 0.44rem;
}
.shuaixuanonese {
  height: 100%;
}
.classname {
  text-decoration: line-through;
}
.gobtnclass {
  background: @colorone;
}
.taberclass {
  width: 25% !important;
}
#cnxhlistul {
  min-height: 100%;
}
#cnxhlistul > li:nth-last-of-type(1) {
  border: none;
}
#cnxhlistul > li {
  width: 100%;
  height: 1.05rem;
  border-bottom: 1px solid #cacaca;
}
.cnxhlistdiv {
  margin-left: 0.12rem;
  margin-right: 0.12rem;
  height: 0.75rem;
  margin-top: 0.15rem;
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
  margin-top: 0.2rem;
}
.cnxhlistright > li:nth-of-type(1) > div:nth-of-type(1) {
  float: left;
}
.cnxhlistright > li:nth-of-type(1) > div:nth-of-type(1) > span:nth-of-type(2) {
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
.cnxhlistright > li:nth-of-type(2) {
  font-size: 0.15rem;
  color: #666666;
  margin-top: 0.1rem;
  overflow: hidden;
  line-height: 1.1;
}
.cnxhlistright > li:nth-of-type(3) {
  font-size: 0.12rem;
  color: #999999;
  margin-top: 0.1rem;
}
.cnxhlistright > li:nth-of-type(3) > div {
  float: left;
  width: 0.65rem;
  height: 0.23rem;
  line-height: 0.23rem;
  text-align: center;
  background: #f9f9f9;
  margin-right: 0.05rem;
}
.shuaixuantwo_xuanxuan > div {
  width: 33.33333333%;
}
</style>
