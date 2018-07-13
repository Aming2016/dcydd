<template>
    <div class="makeplan">
        <div class="header">
           <img src="../../imgs/home/fanhui.png" alt="" @click="quitbtn">
           成交进度
        </div>   
        
        <swiper :auto="0" ref="mySwiper"  :options="swiperOptions" class="swiperershoufangtwo">
            <!-- slides -->
            <swiper-slide class="swiperfangitemtwo"  style="margin-top:0.2rem" v-for="item in list">
              <p class="p_1">{{item.houseTitle}}</p>
              <p class="p_2"><span>{{item.areaName}}</span><span>{{item.districtName}}</span><span>{{item.houseDirection}}</span></p>
              <p class="p_2"><span>{{item.houseType}}</span><span>{{item.builtArea}}㎡</span></p>
              <p class="p_3">{{item.saleTotal}}万</p>
            </swiper-slide>
           
        </swiper>
        <div class="div_3"></div>
        <ul class="ul_1">
            <li v-for="item in listitem">
                <img src="../../imgs/home/kaobeidiansf.png" alt="">
                <div>
                    <p>{{item.nodeContent}}</p>
                    <p>{{item.transactManInfo}}</p>
                </div>
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
      index: 0,
      list: "",
      listitem: "",
      swiperOptions: {
        effect: "coverflow",
        slidesPerView: 1.2,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 30,
          stretch: 1,
          depth: 10,
          modifier: 1,
          slideShadows: true
        },
        // loop: true,
        on: {
          touchEnd() {
            this.index = this.activeIndex;
            console.log(this.activeIndex); 
            // this.listitem=this.list[this.activeIndex].nodeList
            
          },
          slideChangeTransitionEnd() {
            this.index = this.activeIndex;
            // this.listitem=this.list[this.activeIndex].nodeList
          }
        }
      }
    };
  },
  created() {
    var that = this;
    this.list = JSON.parse(window.localStorage.progresslist);
    console.log(this.list);
    this.listitem = this.list[this.index].nodeList;
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    this.swiper.ontouchEnd(() => {
      console.log("ddddd");
    });
  },
  methods: {
    quitbtn() {
      this.$router.push("/");
    },
    swiperone(){
    }
  },
  mounted() {}
};
</script>
<style scoped lang="less">
@import "../../common/css/master.less";
.header {
  width: 100%;
  height: 0.44rem;
  position: fixed;
  top: 0;
  left: 0;
  background: #ffffff;
  border-bottom: 1px solid #cccccc;
  color: #333333;
  text-align: center;
  line-height: 0.44rem;
  font-size: 0.19rem;
  z-index: 999;
}
.header > img {
  position: absolute;
  width: 0.12rem;
  height: 0.2rem;
  top: 0.1rem;
  left: 0.12rem;
}
.makeplan {
  width: 100%;
  min-height: 100%;
  border-top: 1px solid #ffffff;
  box-sizing: border-box;
}
.swiperershoufangtwo {
  width: 100;
  height: 1.15rem;
  margin-top: 0.69rem;
}
.swiperfangitemtwo {
  height: 100%;
  margin-top: 0 !important;
  border-radius: 0.1rem;
  overflow: hidden;
  background: url("../../imgs/home/chengjiaojindu.png");
  background-size: 100% 100%;
}
.p_1 {
  padding-top: 0.19rem;
  font-size: @fontsize_4;
  color: #ffffff;
  margin-left: 0.2rem;
}
.p_2 {
  margin-top: 0.09rem;
  font-size: @fontsize_6;
  color: #ffffff;
  margin-left: 0.2rem;
  overflow: hidden;
  > span {
    margin-right: 0.05rem;
  }
}
.p_3 {
  margin-top: 0.1rem;
  font-size: @fontsize_4;
  color: #ffffff;
  margin-left: 0.2rem;
}
.ul_1 {
  margin: 0 0.15rem;
  overflow: hidden;
  > li:nth-of-type(2n-1) {
    width: 50%;
    height: 0.78rem;
    float: left;
    border-right: 0.005rem solid @bordercolor_1;
    position: relative;
    > img {
      position: absolute;
      width: 0.18rem;
      right: -0.095rem;
    }
    > div {
      margin-left: 0;
      margin-right: 0.25rem;
      > p:nth-of-type(1) {
        font-size: 0.11rem;
        color: @colorone;
        overflow: hidden;
        line-height: 1.5;
        text-align: right;
      }
      > p:nth-of-type(2) {
        font-size: 0.09rem;
        color: @color_2;
        overflow: hidden;
        line-height: 1.5;
        text-align: right;
      }
    }
  }
  > li:nth-of-type(2n) {
    width: 50%;
    height: 0.78rem;
    float: right;
    box-sizing: border-box;
    border-left: 0.005rem solid @bordercolor_1;
    position: relative;
    > img {
      position: absolute;
      width: 0.18rem;
      left: -0.095rem;
    }
    > div {
      margin-left: 0.25rem;
      margin-right: 0;
      > p:nth-of-type(1) {
        font-size: 0.11rem;
        color: @colorone;
        text-align: left;
        line-height: 1.5;
        overflow: hidden;
      }
      > p:nth-of-type(2) {
        font-size: 0.09rem;
        color: @color_2;
        text-align: left;
        line-height: 1.5;
        overflow: hidden;
      }
    }
  }
}
.div_3 {
  width: 50%;
  height: 0.3rem;
  margin-top: 0.2rem;
  border-right: 0.005rem solid @bordercolor_1;
}
</style>

