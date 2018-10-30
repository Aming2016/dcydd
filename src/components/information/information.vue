<template>
  <div class="information">
    <div id="bannerdiv">
          <img src="../../imgs/mine/bannerone.png" alt="">
    </div>
    <a :href="headdata.phoneContentUrl">
      <div class="div_1">
      {{headdata.summary}}
    </div>
    <div class="div_2">
      <img :src="headdata.imageUrl|imgfilter" alt="">
    </div>
    <div class="div_3">
      <img src="../../imgs/mine/udsfhoihdos.png" alt="" v-if="headdata.isTop=='1'">
      <span v-if="headdata.isTop=='1'">置顶</span><span style="margin-left:0.12rem;">{{headdata.columnesName}}</span>
    </div>
    </a>
    
    <ul class="ul_1" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10"
  infinite-scroll-immediate-check="true">
      <li v-for="item in datalist">
        <a :href="item.phoneContentUrl">
          <div>
          <p>{{item.summary}}</p>
          <!-- <p>{{item.columnesName}}</p> -->
          <div class="div_3">
      <img src="../../imgs/mine/udsfhoihdos.png" style="margin-left:0;" alt="" v-if="item.isTop=='1'">
      <span v-if="item.isTop=='1'">置顶</span><span style="margin-left:0;">{{item.columnesName}}</span>
    </div>
        </div>
        <div>
          <img :src="item.imageUrl|imgfilter" alt="">
        </div>
        </a>
        
      </li>

    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      datalist: [],
      page: 1,
      headdata: ""
    };
  },
  created() {
    this._querys();
  },
  methods: {
    loadMore() {
      if (this.page != "1") {
        this.loading = true;
        this._querys();
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      }
    },
    _querys() {
      this.$http
        .get(this.$url.URL.INFOQUEYLIST + "/12?pageNo=" + this.page)
        .then(res => {
          if (this.page == "1") {
            this.headdata = res.data.data[0];
            res.data.data.splice(0,1)
            this.datalist = res.data.data
          } else {
            this.datalist = [...this.datalist, ...res.data.data];
          }
          if(res.data.data.length=='0'){
            Toast({
              message: "已全部加载",
              position: "bottom",
              duration:500
            });
          }else{
            Toast({
              message: "正在加载。。。",
              position: "bottom",
              duration:500
            });
          }
          this.page++;
        });
    }
  }
};
</script>

<style scoped lang="less">
@import "../../common/css/master.less";
.information {
  width: 100%;
  min-height: 100%;
  border-bottom: 0.005rem solid #ffffff;
  box-sizing: border-box;
}
#bannerdiv {
  margin: 0 0.12rem;
  margin-top: 0.15rem;
  overflow: hidden;
  > img {
    width: 100%;
    float: left;
  }
}
.div_1 {
  margin: 0 0.12rem;
  margin-top: 0.15rem;
  font-size: @fontsize_4;
  line-height: 1.5;
  color: @color_1;
}
.div_2 {
  margin: 0 0.12rem;
  height: 1.8rem;
  margin-top: 0.15rem;
  > img {
    width: 100%;
    height: 100%;
    float: left;
  }
}
.div_3 {
  margin-top: 0.1rem;
  overflow: hidden;
  > img {
    height: 0.14rem;
    float: left;
    margin-left: 0.12rem;
  }
  > span:nth-of-type(1) {
    margin-left: 0.07rem;
    margin-right: 0.15rem;
  }
  > span {
    font-size: @fontsize_6;
    color: @color_3;
    float: left;
    padding-top: 0.02rem;
  }
}
.ul_1 {
  margin: 0 0.12rem;
  margin-top: 0.2rem;
  margin-bottom: 0.6rem;
  > li {
    width: 100%;
    padding: 0.2rem 0;
    border-top: 0.005rem solid @bordercolor_1;
    overflow: hidden;
    > a > div:nth-of-type(2) {
      width: 1.1rem;
      height: 0.8rem;
      float: right;
      > img {
        float: left;
        width: 100%;
        height: 100%;
      }
    }
    > a > div:nth-of-type(1) {
      width: 2.25rem;
      float: left;
      > p:nth-of-type(1) {
        font-size: @fontsize_4;
        color: @color_1;
        line-height: 1.5;
      }
      > p:nth-of-type(2) {
        font-size: @fontsize_6;
        color: @color_3;
        margin-top: 0.1rem;
        overflow: hidden;
        line-height: 1.1;
      }
    }
  }
}
</style>
