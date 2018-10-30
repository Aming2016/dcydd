<template>  
    <div class="minecomment">
         <headertwo :dataname="dataname"></headertwo>
         <ul id="ul_1" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10" infinite-scroll-immediate-check="true" v-if="movenum">
             <li v-for="item in list">
                 <div class="div_1">
                     <p><img :src="item.headImage|headimgfilter" alt=""></p>
                     <span>{{item.memberName}}</span><span>{{item.commentTime}}</span>
                 </div>
                 <div class="div_2">
                    {{item.content}}
                 </div>
                 <div class="div_4">
                   <p>fsad</p>
                   <p>fdasf</p>
                   <p>fdasf</p>
                 </div>
                 <div class="div_5">
                   <img src="../../imgs/home/hongxing.png" alt="">
                   <img src="../../imgs/home/hongxing.png" alt="">
                   <img src="../../imgs/home/hongxing.png" alt="">
                   <img src="../../imgs/home/hongxing.png" alt="">
                   <img src="../../imgs/home/huixing.png" alt="">
                 </div>
                 <div class="div_3">
                     <p><img :src="item.brokerPhoto|headimgfilter" alt=""></p>
                     <span>{{item.emplName}}</span><span>{{item.positionName}}</span>
                 </div>
             </li>
         </ul>
          <div id="div_67" v-else>
          <img src="../../imgs/home/duibiliebiaokongbai.png" alt="">
          <div>暂无任何评论~~~</div>
    </div>
    </div>
</template>
<script>
import headertwo from "../module/headertwo";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      dataname: "我的评论",
      active: "0",
      id: "",
      movenum: true,
      page: 1,
      list: []
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
        .get(this.$url.URL.MYCOMMENT + "?pageNo=" + this.page)
        .then(res => {
          this.list.push(...res.data.data);
          if (this.list.length > 0) {
            this.movenum = true;
          } else {
            this.movenum = false;
          }
          this.page++
        });
    }
  },
  components: {
    headertwo
  }
};
</script>
<style scoped lang="less">
@import "../../common/css/master.less";
.minecomment {
  width: 100%;
  min-height: 100%;
  background: #ffffff;
  border-top: 1px solid #ffffff;
  box-sizing: border-box;
}
.div_5{
  margin-left:0.1rem;
  margin-right:0.1rem;
  margin-top:0.06rem;
  overflow: hidden;
  >img{
    width:0.14rem;
    float:left;
    margin-right:0.07rem;
  }
}
.div_4{
  margin-left:0.1rem;
  margin-right:0.1rem;
  margin-top:0.15rem;
  overflow: hidden;
  >p{
    float:left;
    font-size:@fontsize_6;
    color:@color_2;
    padding:0.04rem 0.08rem;
    margin-right:0.05rem;
    border:0.005rem solid @color_3;
    margin-bottom:0.05rem;
    border-radius: @boxborder_2;
  }
}
#ul_1 {
  margin-left: 0.12rem;
  margin-right: 0.12rem;
  margin-top: 0.44rem;
  > li:nth-last-of-type(1) {
    margin-bottom: 0.5rem;
  }
  > li {
    width: 100%;
    padding: 0.2rem 0;
  }
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
.div_1 {
  width: 100%;
  height: 0.45rem;
  > span:nth-of-type(1) {
    float: left;
    line-height: 0.45rem;
    font-size: @fontsize_3;
    color: @color_1;
    margin-left: 0.15rem;
  }
  > span:nth-of-type(2) {
    float: right;
    line-height: 0.45rem;
    font-size: @fontsize_6;
    color: @color_3;
  }
  > p {
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    float: left;
    > img {
      width: 100%;
      height: 100%;
      float: left;
    }
  }
}
.div_2 {
  margin-left: 0.1rem;
  margin-right: 0.1rem;
  margin-top: 0.18rem;
  font-size: @fontsize_8;
  color: @color_2;
  line-height: 1.4;
}
.div_3 {
  margin-left: 0.1rem;
  margin-right: 0.1rem;
  height: 0.45rem;
  background: @colorfour;
  margin-top: 0.11rem;
  > span:nth-of-type(1) {
    font-size: @fontsize_5;
    color: @color_1;
    line-height: 0.45rem;
    margin-left: 0.15rem;
    float: left;
  }
  span:nth-of-type(2) {
    font-size: @fontsize_7;
    color: @color_3;
    line-height: 0.45rem;
    margin-left: 0.1rem;
    float: left;
  }
  > p {
    width: 0.3rem;
    height: 0.3rem;
    padding-top: 0.075rem;
    margin-left: 0.15rem;
    float: left;
    > img {
      float: left;
      width: 100%;
      height: 100%;
    }
  }
}
</style>