<template>
  <div class="minseller">
     <div class="div_title">
          <img src="../../imgs/home/fanhui.png" alt="" @click="backbtn">
          <p :class="{titileactive:active==index}" v-for="(item,index) in titlelist" @click.stop="activebtn(index)">{{item}}</p>
      </div>
      <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
import headertwo from "../module/headertwo";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      titlelist: ['我的申请','我的房源'],
      active: 0,
      id:""
    };
  },
  created() {
    this.id=this.$route.params.id
    this.id=='3'?this.titlelist= ['代办业务','我的房源']:this.titlelist= ['我的申请','我的房源']
  },
  methods: {
    activebtn(index) {
      this.active = index;
      if(index=='0'){
        this.$router.push("/minsellerone/"+this.id)
      }else{
        this.$router.push("/minsellertwo/"+this.id)
      }
    },
    backbtn() {
      this.$router.push("/mine")
    }
  }
};
</script>
<style scoped lang="less">
@import "../../common/css/master.less";
.minseller {
  border-top: 1px solid #ffffff;
  box-sizing: border-box;
  width: 100%;
  height:100%;
  min-height: 100%;
  background: #f9f9f9;
}
.div_title {
  width: 100%;
  height: 0.44rem;
  border-bottom: 0.005rem solid @bordercolor_1;
  position: fixed;
  box-sizing: border-box;
  top: 0;
  background:#ffffff;
  left: 0;
  text-align: center;
  z-index:999;
  > p:nth-of-type(1) {
    margin-left: 32%;
  }
  > p:nth-last-of-type(1) {
    margin: 0;
  }
  > p {
    font-size: @fontsize_8;
    height: 0.44rem;
    line-height: 0.44rem;
    float: left;
    display: inline-block;
    margin-right: 0.33rem;
    overflow: hidden;
  }
  > img {
    height: 0.2rem;
    position: fixed;
    top: 0.11rem;
    left: 0.12rem;
  }
}
.titileactive {
  color: @colorone !important;
  border-bottom: 0.02rem solid @colorone;
  box-sizing: border-box;
}
</style>


