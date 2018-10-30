<template>
  <div class="mineregionlist">
      <headertwo :dataname="dataname"></headertwo>
      <div class="cnxhlist"
       v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10" infinite-scroll-immediate-check="true" v-if="movenum">
            <div class="cnxhlistitem" v-for="item in list" @click="rentingitembtn(item)">
                <div class="cnxhcontnet">
                    <div class="cnxhcontnetleft">
                        <img :src="item.housePic" alt="">
                    </div>
                    <div class="cnxhcontnetright">
                        <div class="cnxhconterone">
                            {{item.buildName }}
                        </div>
                         <div class="cnxhconterthree">
                            {{item.areaName}}/{{item.buildAge}}年建成/{{item.buildType}}                         
                        </div>
                        <div class="cnxhcontertwo">
                            在售{{item.saleCount}}套/在租{{item.rentCount }}套
                        </div>
                        
                         <div class="cnxhconterfive">
                            <div>{{item.avgSalePrice}}<span>元/平</span></div>    
                        </div>
                    </div>
                </div>              
            </div>
          
        </div>
         <div id="div_67" v-else>
          <img src="../../imgs/home/duibiliebiaokongbai.png" alt="">
          <div>暂无收藏小区~~~</div>
        </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import headertwo from "../module/headertwo";
export default {
  data() {
    return {
      dataname: "我收藏的小区",
      movenum: true,
      page: "1",
      list: []
    };
  },
  created() {
    this._querys();
  },
  methods: {
    loadMore() {
      if (this.page !== "1") {
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
          this.$url.URL.BULDCOLLECTIONLIST +
            "?pageNo=" +
            this.page +
            "&pageSize=10"
        )
        .then(res => {
          this.list = this.list.concat(res.data.data);
          if (this.list.length > 0) {
            this.movenum = true;
          } else {
            this.movenum = false;
          }
          this.page++;
        });
    },
    rentingitembtn(item) {
      window.localStorage.scity = window.localStorage.site;
      window.localStorage.site = item.scity;
      this.$router.push({ path: "/hotdisitem/" + item.sdid });
    }
  },
  components: {
    headertwo
  }
};
</script>
<style lang="less" scoped>
@import "../../common/css/master.less";
@import "../../common/css/fulist.css";
.mineregionlist {
  width: 100%;
  min-height: 100%;
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
.cnxhlist {
  margin-top: 0.44rem;
  margin-bottom: 0;
}
.cnxhcontnetleft {
  width: 1rem;
  height: 100%;
  float: left;
}
.cnxhcontnetleft > img {
  width: 100%;
  height: 0.8rem;
  float: left;
}
</style>


