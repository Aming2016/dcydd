<template>
  <div class="takelooklist">
      <headertwo :dataname="dataname"></headertwo>
      <div id="titlename">
        <p>看房日期</p>
        <p>带看人</p>
      </div>
      <ul id="ul_1"  v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10"
  infinite-scroll-immediate-check="true">
        <li v-for="item in list">
          <p>{{item.seeDate}}</p>
          <p>{{item.emplName}}</p>
        </li>
      </ul>
  </div>
</template>
<script>
import headertwo from "../module/headertwo";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      dataname: "带看记录",
      id: "",
      itemid: "",
      page: 1,
      url: "",
      list: []
    };
  },
  created() {
    //HOUSESEE  二手房   RENTHOUSESEE   租房
    this.id = this.$route.params.id.split("a")[0];
    this.itemid = this.$route.params.id.split("a")[1];
    this.id == "1"
      ? (this.url = this.$url.URL.HOUSESEE)
      : (this.url = this.$url.URL.RENTHOUSESEE);
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
        .get(this.url + "/" + this.itemid + "?pageNo=" + this.page)
        .then(res => {
          this.list.push(...res.data.data);
          if (res.data.data.length == "0") {
            Toast({
              message: "已全部加载。。。",
              position: "bottom",
              duration: 500
            });
          } else {
            Toast({
              message: "正在加载。。。",
              position: "bottom",
              duration: 500
            });
          }
          this.page++;
        });
    }
  },
  components: {
    headertwo
  }
};
</script>
<style lang="less" scoped>
@import "../../common/css/master.less";
.takelooklist {
  width: 100%;
  height: 100%;
  min-height: 100%;
  background-color: #f9f9f9;
  border-top: 1px solid #ffffff;
  box-sizing: border-box;
  overflow: hidden;
}
#titlename {
  width: 100%;
  height: 0.4rem;
  margin-top: 0.44rem;
  > p:nth-of-type(1) {
    text-indent: 0.2rem;
  }
  > p {
    width: 50%;
    float: left;
    line-height: 0.4rem;
    font-size: @fontsize_8;
    color: @color_2;
  }
}
#ul_1 {
  width: 100%;
  background: #ffffff;
  height: 100%;
  > li {
    margin: 0 0.12rem;
    border-bottom: 0.005rem solid @bordercolor_1;
    height: 0.45rem;
    > p:nth-of-type(1) {
      text-indent: 0.08rem;
    }
    > p {
      width: 50%;
      float: left;
      font-size: @fontsize_3;
      color: @color_1;
      line-height: 0.45rem;
    }
  }
}
</style>

