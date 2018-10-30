<template>
    <div class="newhouse">
       <div class="topseatch" :class="{searchboxwarpone:homemove==1,searchboxwarponea:homemove==2,searchboxwarponeb:homemove==3,searchboxwarponec:homemove==4,searchboxwarponed:homemove==5}">
            <img src="../../imgs/home/fanhui.png" alt="" @click="gohomebtn">
            <div id="topserchbox" :class="{searchboxone:homemove==1}">
                <img src="../../imgs/home/homesousuo.png" alt="" srcset="">
                <form action="javascript:search();"> 
                <input type="search" placeholder="请输入您要搜索的内容" @keyup.enter="showbtn($event)" v-model="textcontent">
                </form>
            </div>
        </div>
      
        <mt-swipe :auto="4000" class="swiperitem">
            <mt-swipe-item v-for="(item,index) in bannerimg" :key="index" class="swiperitemitem">
                <a :href="item.contentUrl">
                    <img :src="item.picUrl|imgfilter" alt="" srcset="">
                </a>
            </mt-swipe-item>
        </mt-swipe>
            <ul id="ul_1" :class="{gudingclass:numberfalse}">
            <li v-for="(item,index) in titlebtn" :key="index" @click="listbtn(item,index)" :class="{ziticolor:active==index}">{{item.cityName}}</li>
        </ul>
        
    <ul class="cnxhlist" v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10"
    infinite-scroll-immediate-check="true" :class="{gudingclasstwo:numberfalse}">
        <li v-for="(item,index) in list" :key="index">
            <a :href="item.phoneContenUrl">
            <div id="divlistleft">
                <img v-lazy="item.imageUrl" alt="">
            </div>
            <div id="divlistright">
                <div class="divlist_1">
                    <p>{{item.buildName}}</p>
                    <p class="biaoqian" v-for="(item,index) in item.tag" :key="index">{{item}}</p>
                </div>
                <div>
                    <span>{{item.buildSummary}}</span>
                </div>
                <div>
                    <span>{{item.avgPrice}}元/平</span><span>建筑面积{{item.minBuildArea}}-{{item.maxBuildArea}}㎡</span>
                </div>
            </div>
            </a>
        </li>
    </ul>
</div>
</template>
<script>
import { Toast } from "mint-ui";
import { MessageBox } from "mint-ui";

export default {
  data() {
    return {
      homemove: 10,
      textcontent: "", //搜索的内容
      active: "0", //控制颜色
      numberfalse: false,
      page: "1",
      site: window.localStorage.site,
      titlebtn: "", //按钮
      sityCode: "", //新盘城市编码
      list: [], //列表
      bannerimg: "" //banner
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  created() {
    this.$store.state.activeindex = "6";
    this._querys();
  },
  methods: {
    _querys() {
      //获取城市列表
      this.$http
        .get(this.$url.URL.NEWBUILDINGINDEX,{
          site: this.site
        })
        .then(res => {
          this.titlebtn = res.data.data;
          this.sityCode = this.titlebtn[0].cityCode;
          this._querystwo();
        });
      let bannerurl =
        this.$url.URL.BANNER +
        "/" +
        this.site +
        this.$url.URL.NEW_BUILD_INDEX_BANNER;
      this.$http.get(bannerurl).then(res => {
        this.bannerimg = res.data.data;
      });
    },
    _querystwo() {
      this.$http
        .get(
          this.$url.URL.NEWBUILDINGQUERY +
            "/" +
            this.sityCode +
            "?pageNo=" +
            this.page
        )
        .then(res => {
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].tag) {
              res.data.data[i].tag = res.data.data[i].tag.split(",");
            }
          }
          this.list = [...this.list, ...res.data.data];
          this.page++;
        });
    },
    listbtn(item, index) {
      //城市按钮
      this.active = index;
      this.list = [];
      this.page = "1";
      this.sityCode = item.cityCode;
      this._querystwo();
    },
    gohomebtn() {
      this.$router.go(-1);
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
    _erlist() {
      //列表 请求
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop >= "0" && scrollTop <= "40") {
        this.homemove = 10;
      } else if (scrollTop >= "40" && scrollTop <= "80") {
        this.homemove = 2;
      } else if (scrollTop >= "80" && scrollTop <= "120") {
        this.homemove = 3;
      } else if (scrollTop >= "120" && scrollTop <= "160") {
        this.homemove = 4;
      } else if (scrollTop >= "160" && scrollTop <= "200") {
        this.homemove = 5;
      } else {
        this.homemove = 1;
      }
      var scrottop =
        window.document.documentElement.getBoundingClientRect().width /
        375 *
        170;
      if (scrollTop > scrottop) {
        this.numberfalse = true;
      } else {
        this.numberfalse = false;
      }
    }
  }
};
</script>
<style scoped lang="less">
@import "../../common/css/master.less";
@import "../../common/css/search.css";
.newhouse {
  width: 100%;
  min-height: 100%;
}
.topseatch {
  border: none;
  background: rgba(255, 255, 255, 0);
}
.gudingclass {
  position: fixed;
  top: 0.44rem;
  margin: 0 !important;
}
.searchboxwarpone {
  width: 100%;
  height: 0.44rem;
  position: fixed;
  background: rgba(255, 255, 255, 1);
  top: 0;
  left: 0;
  z-index: 9999;
}
.ziticolor {
  color: @colorone;
}
.searchboxwarponea {
  width: 100%;
  height: 0.44rem;
  position: fixed;
  background: rgba(255, 255, 255, 0.2);
  top: 0;
  left: 0;
  z-index: 99;
}
.searchboxwarponeb {
  width: 100%;
  height: 0.44rem;
  position: fixed;
  background: rgba(255, 255, 255, 0.4);
  top: 0;
  left: 0;
  z-index: 9999;
}
.searchboxwarponec {
  width: 100%;
  height: 0.44rem;
  position: fixed;
  background: rgba(255, 255, 255, 0.6);
  top: 0;
  left: 0;
  z-index: 9999;
}
.searchboxwarponed {
  width: 100%;
  height: 0.44rem;
  position: fixed;
  background: rgba(255, 255, 255, 0.8);
  top: 0;
  left: 0;
  z-index: 9999;
}
.gudingclasstwo {
  margin-top: 0.5rem;
}
.swiperitem {
  height: 2rem;
}
.swiperitemitem {
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}
.searchboxone {
  width: 3.3rem;
  height: 0.35rem;
  position: fixed;
  top: 0.0045rem;
  background-color: #f2f2f2;
  border-radius: 0.04rem;
}
#ul_1 {
  width: 100%;
  height: 0.35rem;
  overflow-x: scroll;
  /* 内容会被裁剪，会以滚动条显示 */
  overflow-y: hidden;
  margin-top: 0.15rem;
  -webkit-padding-start: 0;
  background-color: @colorthree;
  display: flex;
  flex-flow: row nowrap;
  color: @color_1;
  > li {
    flex: 0.625rem 0 0;
    font-size: 0.14rem;
    overflow: hidden;
    height: 100%;
    text-align: center;
    line-height: 0.35rem;
    display: inline-block;
  }
}
.cnxhlist {
  margin-left: 0.12rem;
  margin-right: 0.12rem;

  > li {
    width: 100%;
    // height:0.8rem;
    padding: 0.15rem 0;
    overflow: hidden;
    // background:red;
    border-bottom: 0.005rem solid @bordercolor_1;
  }
}
#divlistleft {
  width: 1rem;
  float: left;
  height: 0.8rem;
  > img {
    width: 100%;
    height: 100%;
    float: left;
  }
}
#divlistright {
  float: right;
  // margin-left:0.2rem;
  margin-right: 0;
  width: 2.32rem;
  > div:nth-of-type(1) {
    margin-top: 0.05rem;
    font-size: @fontsize_2;
    overflow: hidden;
    > p:nth-of-type(1) {
      margin-right: 0.08rem;
      overflow: hidden;
    }
    > p {
      float: left;
    }
  }
  > div:nth-of-type(2) {
    font-size: @fontsize_6;
    color: @color_2;
    margin-top: 0.13rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    > span {
      margin-right: 0.05rem;
    }
  }
  > div:nth-of-type(3) {
    font-size: @fontsize_6;
    color: 0.11rem;
    margin-top: 0.14rem;
    > span:nth-of-type(1) {
      font-size: @fontsize_4;
      color: @colorone;
      margin-right: 0.08rem;
    }
  }
}
.biaoqian {
  font-size: @fontsize_7 !important;
  color: #00b969;
  background: #ebfff3;
  width: 0.3rem;
  height: 0.15rem;
  margin-right: 0.05rem;
  text-align: center;
  line-height: 0.178rem;
  overflow: hidden;
}
.divlist_1 > p:nth-of-type(2) {
  color: #00a8ff;
  background: #edf9ff;
  font-size: 0.3rem;
}
.divlist_1 > p:nth-of-type(3) {
  color: #00b969;
  background: #ebfff3;
}
</style>

