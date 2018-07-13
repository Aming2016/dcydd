<template>  
    <div class="attention">
         <headertwo :dataname="dataname"></headertwo>
        <consutlist style="margin-top:0.44rem;" :list="datalist" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10" infinite-scroll-immediate-check="true"></consutlist>
    </div>
</template>
<script>
import headertwo from "../module/headertwo";
import consutlist from "../module/consultlist";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      dataname: "我关注的",
      active: "0",
      id: "",
      datalist: [],
      page: 1,
      page_three:false
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.id == "1"
      ? (this.dataname = "我关注的")
      : this.id == "2"
        ? (this.dataname = "我的提问")
        : (this.dataname = "我的咨询");
    this._querys();
  },
  methods: {
    loadMore() {
      if (this.page_three) {
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
      if (this.id == "1") {
        this.$http.get(this.$url.URL.CONSULTANTMYCONCERN).then(res => {
          this.datalist = res.data.data;
        });
      } else if (this.id == "2") {
        this.$http.get(this.$url.URL.CONSULTANTMYPROBLEM).then(res => {
          this.datalist = res.data.data;
        });
      } else {
        this.$http
          .get(this.$url.URL.MYMYPROBLEM + "?pageNo=" + this.page)
          .then(res => {
            this.datalist.push(...res.data.data);
            this.page_three=true;
            this.page++
          });
      }
    }
  },
  components: {
    headertwo,
    consutlist
  }
};
</script>
<style scoped lang="less">
@import "../../common/css/master.less";
.attention {
  width: 100%;
  min-height: 100%;
  background: #ffffff;
  border-top: 1px solid #ffffff;
  box-sizing: border-box;
}
</style>