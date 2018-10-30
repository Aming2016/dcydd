<template>
    <div class="invitation">
        <headertwo :dataname="dataname"></headertwo>
        <ul class="ul_1" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10" infinite-scroll-immediate-check="true">
            <li v-for="item in list">
                <img :src="item.headImage|headimgfilter(item.headImage)" alt="">
                <div>
                    <p>{{item.nickname}}</p>
                    <p>注册时间：{{item.createDateTime}}</p>
                </div>
            </li>
           
        </ul>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
import headertwo from "../module/headertwo";
export default {
  data() {
    return {
      dataname: "邀请我的",
      id: "",
      page:1,
      list:[]
    };
  },
  created() {
    this.id = this.$route.params.id;
    this._querys();
  },
  methods: {
    _querys() {
      if (this.id == "1") {
          this.dataname="邀请我的"
        this._querysone();
      } else {
          this.dataname="我邀请的"
        this._querystwo();
      }
    },
    loadMore() {
      if(this.id=='2'){
        if (this.page!= "1") {
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
      }
      
    },
    _querysone() {                                                         
      //邀请我的
      this.$http.post(this.$url.URL.INVITETOME).then(res => {
          this.list.push(res.data.data)
      });
    },
    _querystwo() {
      //我邀请的
      this.page++
      this.$http.post(this.$url.URL.MYINVITE+"?pageNo="+this.page+"&pageSize=10")
      .then(res => {
         this.list.push(...res.data.data)
      });
    }
  },
  components: {
    headertwo
  }
};
</script>
<style scoped lang="less">
.invitation {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #f8f8f8;
}
.ul_1 {
  width: 100%;
  background: #ffffff;
  margin-top: 0.5rem;
  > li:nth-last-of-type(1) {
    border: none;
  }
  > li {
    margin: 0 0.12rem;
    padding: 0.15rem 0;
    border-bottom: 0.005rem solid #e6e6e6;
    overflow: hidden;
    > img {
      width: 0.35rem;
      height: 0.35rem;
      float: left;
      border-radius: 50%;
    }
    > div {
      padding-top: 0.05rem;
      margin-left: 0.15rem;
      font-size: 0.16rem;
      color: #333333;
      float: left;
      > p:nth-of-type(2) {
        font-size: 0.13rem;
        color: #999999;
        margin-top: 0.1rem;
        overflow: hidden;
      }
    }
  }
}
</style>