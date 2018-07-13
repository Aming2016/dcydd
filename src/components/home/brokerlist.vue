<template>
  <div class="searchlist">
    <headertwo :dataname="dataname"></headertwo>
    <div class="cnxhlist" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10"
  infinite-scroll-immediate-check="true">
           <ul id="cnxhlistul">
               <li @click="brokeritem(item)" v-for="item in listone">
                   <div class="cnxhlistdiv">
                       <div class="cnxhlistleft">
                           <img :src="item.photo|headimgfilter" alt="">
                       </div>
                       <ul class="cnxhlistright">
                           <li>
                               <div>{{item.emplName}}<span>{{item.positionName}}</span></div>
                               <div>{{item.grade}}<span>评分</span></div>
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
    </div>
</template>

<script>
import { Toast } from "mint-ui";
import headertwo from "../module/headertwo";
export default {
  name: "HelloWorld",
  data() {
    return {
      id: "1",
      dataname: "选择经纪人",
      site: window.localStorage.site, //城市
      listone: [],
      page: "1",
      numberlor: true
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.id == "1"
      ? (this.dataname = "选择经纪人")
      : (this.dataname = "选经纪人");
    this._querys();
  },
  methods: {
    loadMore() {
      if (this.numberlor) {
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
      var site = window.localStorage.site;
      if (this.id == "1") {
        window.localStorage.site = this.$store.cityname.key;
      }
      this.$http
        .post(this.$url.URL.BROKERS, {
          scity: this.$store.cityname.key,
          pageSize: 10,
          pageNo: this.page
        })
        .then(res => {
          this.numberlor = true;
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].emplFlag) {
              res.data.data[i].emplFlag = res.data.data[i].emplFlag.split(",");
            }
          }
          window.localStorage.sity=site
          this.listone = this.listone.concat(res.data.data);
          this.page++;
        });
    },
    gohomebtn() {
      this.$router.go(-1);
    },
    brokeritem(item) {
      this.$store.brokername = item;
      this.$router.go(-1);
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
.searchlist {
  width: 100%;
  min-height: 100%;
}
.tabercontent {
  margin-top: 0.44rem;
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
  margin-top: 0.44rem;
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
.cnxhlistright > li {
  float: left;
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
.cnxhlistright > li:nth-of-type(2) {
  font-size: 0.15rem;
  color: #666666;
  margin-top: 0.09rem;
  overflow: hidden;
}
.cnxhlistright > li:nth-of-type(3) {
  width: 100%;
  font-size: 0.12rem;
  color: #999999;
  margin-top: 0.09rem;
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
  width: 28.5%;
}
</style>
