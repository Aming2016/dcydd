<template>
  <div class="discussindex">
      <headertwo :dataname="dataname"></headertwo>
      <div class="div_3" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10">
        <discuss :message="discuss"></discuss>
    </div>
  </div>
  
</template>
<script>
import headertwo from "../module/headertwo";
import discuss from "../module/discuss";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      dataname: "全部评价",
      discuss: [],
      idtwo: "", //经济人id
      site: window.localStorage.site,
      page: "1"
    };
  },
  created() {
    this.idtwo = this.$route.params.id;
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
          this.$url.URL.BROKEREVALUATES +
            "?brokerId=" +
            this.idtwo +
            "&pageNo=" +
            this.page +
            "&pageSize=10"
        )
        .then(res => {
          for (let i = 0; i < res.data.data.length; i++) {
            res.data.data[i].tag = res.data.data[i].tag.split(",");
          }
          this.discuss = this.discuss.concat(res.data.data);
        });
    }
  },
  components: {
    headertwo,
    discuss
  }
};
</script>
<style lang="less" scoped>
.discussindex {
  width: 100%;
  min-height: 100%;
  border-top: 1px solid #ffffff;
  box-sizing: border-box;
}
.div_3 {
  margin-top: 0.44rem;
  margin-left: 0.12rem;
  margin-right: 0.12rem;
  border-top: 1px solid #ffffff;
  box-sizing: border-box;
}
</style>
