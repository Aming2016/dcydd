<template>
    <div class="home">      
        <div class="swiper">
            <mt-swipe :auto="4000" class="swiperitem">
            <mt-swipe-item v-for="item in bannerimg">
                <a :href="item.contentUrl">
                    <img :src="item.picUrl|imgfilter" alt="" srcset="">
                </a>               
            </mt-swipe-item>  
            </mt-swipe>
            <div class="searchboxwarp" :class="{searchboxwarpone:homemove==1,searchboxwarponea:homemove==2,searchboxwarponeb:homemove==3,searchboxwarponec:homemove==4,searchboxwarponed:homemove==5}">
               <div class="searchbox searchboxone">
                    <div id="serchitem">
                        <div id="serchleft" @click="indexlistbtn">
                            <span style="line-height:0.2rem;">{{sitename}}</span>
                            <img src="../../imgs/home/xiangxia.png" alt="" srcset="">
                        </div>
                        <div id="serchright" @click="sarchbtn">
                            <img src="../../imgs/home/homesousuo.png" alt="">
                            <!-- <input type="text" placeholder="搜索心意住所"> -->
                            <div style="line-height:0.2rem;"> 搜索心意住所 </div>
                        </div>   
                    </div> 
                </div>
            </div>
        </div>
        <mt-swipe :auto="0" class="swiperonebox">
          <mt-swipe-item class="swiperoneboxitem"> 
            <ul class="btnbox">
            <li @click="rentingbtn">
                <img src="../../imgs/home/woyaomaifang.png" alt="">
                <div>二手房</div>
            </li>
            <li @click="newhosebtn">
                <img src="../../imgs/home/xinfang.png" alt="">
                <div>新房</div>
            </li>
            <li @click="rentingbtntwo">
                <img src="../../imgs/home/woyaozufang.png" alt="">
                <div>租房</div>
            </li>
            <li @click="rentingbtnthree">
                <img src="../../imgs/home/woyaoshouzu.png" alt="">
                <div>我要卖房</div>
            </li>
            <li @click="rentingbtnfour">
                <img src="../../imgs/home/woyaozufangone.png" alt="">
                <div>我要出租</div>
            </li>
            <li @click="brokerbtn">
                <img src="../../imgs/home/zhaojinjiren.png" alt="">
                <div>找经纪人</div>
            </li>
            <li @click="seekshopbtn">
                <img src="../../imgs/home/zhaomengdian.png" alt="">
                <div>找门店</div>
            </li>
            <li @click="mapboxtwobtn">
                <img src="../../imgs/home/dituzhaopang.png" alt="">
                <div>地图找房</div>
            </li>
            <li @click="regionlistbtn">
                <img src="../../imgs/home/xiaoquzhaopang.png" alt="">
                <div>小区找房</div>
            </li>
            <li @click="sojourntnvestbtn">
                <img src="../../imgs/home/touzilvyou.png" alt="">
                <div>旅居投资</div>
            </li>
        </ul> 
        </mt-swipe-item>
         <mt-swipe-item class="swiperoneboxitem"> <ul class="btnbox">
            <li @click="sellrentfourbtn">
                <img src="../../imgs/home/daibanhuokuan.png" alt="">
                <div>代办业务</div>
            </li>
            <li @click="remoteservebtn">
                <img src="../../imgs/home/yidibanli.png" alt="">
                <div>便民服务</div>
            </li>
            <li @click="housetrusteeshipbtn" v-show="site=='beihai'||site=='nanning'">
                <img src="../../imgs/home/fangwutuoguan.png" alt="">
                <div>房屋托管</div>
            </li>
            <li @click="overseaspurchabtn">
                <img src="../../imgs/home/haiwaizhiye.png" alt="">
                <div>海外置业</div>
            </li>
            <li @click="makeplanbtn">
                <img src="../../imgs/home/changyonggongju.png" alt="">
                <div>成交进度</div>
            </li>
            <li @click="fitmentfinishbtn" v-show="site=='beihai'||site=='nanning'">
                <img src="../../imgs/home/zhuangxiuone.png" alt="">
                <div>装修</div>
            </li>
            <li @click="publicbenefitbtn">
                <img src="../../imgs/home/shihuagongyi.png" alt="">
                <div>世华公益</div>
            </li>
            <li @click="calculatorbtn">
                <img src="../../imgs/home/jisuanqitwotwo.png" alt="">
                <div>计算器</div>
            </li>
            <li @click="advisorybtn">
                <img src="../../imgs/home/zixuntwo.png" alt="">
                <div>咨询</div>
            </li>
            <li @click="bandbookbtn">
                <img src="../../imgs/home/goufangzhinantwo.png" alt="">
                <div>购房指南</div>
            </li>
        </ul> 
        </mt-swipe-item>
        </mt-swipe>
        <img class="yinyingfengimg" src="../../imgs/home/yinyingfengge.png" alt="" srcset="">
        <ul id="ul_1">
          <li class="ul_li_one" v-for="item in bklist" @click="phoneurl(item)">
            <a>
              <div>
              <div>{{item.title}}</div>
              <div>{{item.subhead}}</div>
            </div>
            <img :src="item.imageUrl" alt="">
            </a>
            
          </li>
        </ul>
        <div class="pingrongji">
            <div>热门推荐</div>
        </div>

         <swiper :auto="0" :options="swiperOptions" ref="mySwiper" class="swiperershoufangtwo">
            <!-- slides -->
            <swiper-slide class="swiperfangitemtwo"  style="margin-top:0.2rem" v-for="item in remenlist">
              <a :href="item.phoneContentUrl">
                <img v-lazy="item.imageUrl" alt="" srcset="">
                <div class="xiaoquname">{{item.title}}</div>
                <div class="xiaoqunumtwo" style="margin-top:0.05rem;">{{item.summary}}</div>
              </a>
                
            </swiper-slide>
           
        </swiper>

         <div class="pingrongji">上月成交量统计</div>
         <div class="ershoufangimg" @click="cartogrambtn">
             <div id="fangwuleft">
                 <div>全市{{statistics.month}}月均价</div>
                 <div>{{statistics.month}}月世华成交量</div>
             </div>
             <div id="fangwuright">
                 <div>{{statistics.avgPrice}}<span>元/平</span></div>
                 <div>{{statistics.suiteCount }}<span>套</span></div>
             </div>
         </div>
         <div class="erlisttwo">
            <div>热门小区</div>
            <div @click="hotdistrictbtn">查看更多</div>
        </div>

         <swiper :auto="0" :options="swiperOptions" ref="mySwiper" class="swiperershoufangtwo">
            <!-- slides -->
            <swiper-slide class="swiperfangitemtwo" v-for="item in relist" @click.native="rmxqbtn(item)">
                <img v-lazy="item.housePic" alt="" srcset="">
                <div class="xiaoquname">{{item.buildName}}</div>
                <div class="xiaoqunum">在售{{item.saleCount }}套/在租{{item.rentCount}}套</div>
                <div class="xiaoqumoney">{{item.avgSalePrice}}<span>元/平</span></div>
            </swiper-slide>
           
        </swiper>
        <div class="erlisttwo">
            <div>新盘推荐</div>
            <!-- <div>查看更多</div> -->
        </div>

         <swiper :auto="0" :options="swiperOptions" ref="mySwiper" class="swiperershoufangtwo">
            <!-- slides -->
            <swiper-slide class="swiperfangitemtwo" v-for="item in xplist">
                <a :href="item.phoneContentUrl">
                <img :src="item.imageUrl" alt="" srcset="">
                <div class="xiaoquname">{{item.title}}</div>
                <div class="xiaoqunumtwo" style="margin-top:0.05rem;">{{item.summary}}</div>
              </a>
            </swiper-slide>
           
        </swiper>

        <div class="erlisttwo">
            <div>猜你喜欢</div>
            <div>
                <span v-for="(item,index) in homebtnlist" @click="homebtns(index)" :class="{homebtn:index==indextwo}">{{item}}</span>
            </div>
        </div>
        <div class="cnxhlist">
            <div class="cnxhlistitem" v-for="item in esflist" @click="listitembtn(item)">
                <div class="cnxhcontnet">
                    <div class="cnxhcontnetleft">
                        <img :src="item.housePic" alt="">
                    </div>
                    <div class="cnxhcontnetright">
                        <div class="cnxhconterone">
                            {{item.houseTitle}}
                        </div>
                        <div class="cnxhcontertwo">
                            {{item.areaName}} {{item.districtName}} {{item.houseDirection}}
                        </div>
                        <div class="cnxhconterthree">
                            {{item.houseType}} {{item.builtArea}}m² 
                        </div>
                        <div class="cnxhconterfour">
                            <div v-for="item in item.houseTag">{{item}}</div>
                        </div>
                         <div class="cnxhconterfive">
                            <div v-if="id=='1'">{{item.saleTotal}}万</div>
                            <div v-else>{{item.rentPrice}}元/月</div>
                            <div v-show="id=='1'">{{item.salePrice}}元/平</div>                      
                        </div>
                    </div>
                </div>              
            </div>
            
        </div>
        <div id="allmap" tabindex="0"></div>
    </div>
</template>
<script>
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      homebtnlist: ["二手房", "租房"],
      htmlurl: "", //h5页面的url
      id: "1",
      sitename: "",
      indextwo: 0,
      bannerimg: "", //首页banner
      statistics: "", //统计
      esflist: "", //首页二手房列表
      gofanglist: "", //首页购房列表
      relist: "", //热门小区列表
      remenlist: "", //热门推荐
      xplist: "", //新盘推荐
      bklist: "", //四个板块接口
      homemove: 10,
      zuobiao: [], //坐标
      swiperOption: {
        autoplay: true,
        slidesPerView: 1.43,
        spaceBetween: 10,
      },
      swiperOptions: {
        slidesPerView: 2.17
      },
      site: ""
    };
  },
  created() {
    if (window.sessionStorage.htmlurl) {
      this.htmlurl = JSON.parse(window.sessionStorage.htmlurl);
    } else {
      this._querysurl();
    }
    if (window.localStorage.sitename) {
      this.site = window.localStorage.site;
      this.sitename = window.localStorage.sitename;
      this._request();
      this._ersf();
    }
    
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.map();
  },
  methods: {
    fitmentfinishbtn() {
      this.$router.push("/fitmentfinish");
    },
    publicbenefitbtn() {
      this.$router.push("/publicbenefit");
    },
    remoteservebtn() {
      this.$router.push("/remoteserve");
    },
    housetrusteeshipbtn() {
      this.$router.push("/housetrusteeship");
    },
    overseaspurchabtn() {
      this.$router.push("/overseaspurcha");
    },
    makeplanbtn(){
      this.$router.push("/makeplaninquire")
    },
    sojourntnvestbtn() {
      this.$router.push("/sojourntnvest");
    },
    _querysurl() {
      this.$http
        .get(this.$url.URL.DEFAULTCITYITEM + "/APP_H5_URL")
        .then(res => {
          this.htmlurl = res.data.data;
          window.sessionStorage.htmlurl = JSON.stringify(res.data.data);
          console.log(this.htmlurl)
        });
    },
    map() {
      if (window.localStorage.sitename == undefined) {
        //浏览器定位
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(116.331398, 39.897445);
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(r => {
          //获取坐标
          if (geolocation.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            window.localStorage.mapxy = JSON.stringify({
              lng: r.point.lng,
              lat: r.point.lat
            });
            window.localStorage.mapmine = JSON.stringify({
              lng: r.point.lng,
              lat: r.point.lat
            });

            var myFun = result => {
              var cityName = result.name; //城市名称
              if (cityName.substr(cityName.length - 1, 1) == "市") {
                cityName = cityName.substring(0, cityName.length - 1);
              }
              var site = pinyinUtil.getPinyin(cityName).replace(/\s/g, ""); //汉字转拼音
              this.sitename = cityName;
              this.site = site;
              window.localStorage.setItem("sitename", cityName);
              window.localStorage.setItem("site", site);
              this._request();
              this._ersf();
            };
            var myCity = new BMap.LocalCity();
            myCity.get(myFun); 
          } else {
            this._querysmap();
          }
        });
      }
    },
    phoneurl(item){
      window.location.href = item.phoneContUrl+"&cityName="+this.site+"&id=1&type=web"
    },
    mapboxtwobtn() {
      this.$router.push("/mapboxtwo");
    },
    cartogrambtn() {
      //跳转统计图
      this.$router.push("/cartogram");
    },
    brokerbtn() {
      this.$router.push("/broker");
    },
    _querysmap() {
      this.$http.get(this.$url.URL.DEFAULTCITY).then(res => {
        var cityName = res.data.data.name; //城市名字
        if (cityName.substr(cityName.length - 1, 1) == "市") {
          cityName = cityName.substring(0, cityName.length - 1);
        }
        this.sitename = cityName;
        window.localStorage.setItem("sitename", cityName); //缓存城市名
        window.localStorage.mapxy = JSON.stringify({
          //缓存城市坐标
          lng: res.data.data.px,
          lat: res.data.data.py
        });
        this.site = res.data.data.value;
        window.localStorage.site = res.data.data.value; //缓存城市拼音
        this._request();
        this._ersf();
      });
    },
    _request() {
      //请求数据接口
      //首页banner请求
      let bannerurl =
        this.$url.URL.BANNER + "/" + this.site + this.$url.URL.INDEX_BANNER;
      this.$http.get(bannerurl).then(res => {
        this.bannerimg = res.data.data;
      });
      //四个板块接口
      this.$http
        .get(this.$url.URL.PLATEQUERYBANKUAI + "/INDEX_PLATE")
        .then(res => {
          if (res.data.data.length > 4) {
            this.bklist = res.data.data.splice(0, 4);
          } else {
            this.bklist = res.data.data;
          }
        });
      //热门推荐
      this.$http
        .get(this.$url.URL.INFOQUERYERMENTUIJIAN + "/1001", {
          pageNo: 1,
          pageSize: 5
        })
        .then(res => {
          this.remenlist = res.data.data;
        });
      //新盘推荐
      this.$http
        .get(this.$url.URL.INFOQUERYERMENTUIJIAN + "/1002", {
          pageNo: 1,
          pageSize: 5
        })
        .then(res => {
          this.xplist = res.data.data;
        });
      //首页统计
      let hosuser = this.$url.URL.HOSEUSED + "/" + this.site;
      this.$http.get(hosuser).then(res => {
        this.statistics = res.data.data;
      });
      //热门小区列表
      this.$http.get(this.$url.URL.HOTBUILDING + "/" + this.site).then(res => {
        this.relist = res.data.data;
      });
      //首页的购房指南
      var gofangurl =
        this.$url.URL.INFORMATION +
        "/" +
        this.site +
        this.$url.URL.PURCHASE_GUIDE +
        "/1/6";
      this.$http.get(gofangurl).then(res => {
        this.gofanglist = res.data.data;
      });
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
    },
    listitembtn(item) {
      this.$router.push({
        path: "/rentingitem/" + item.sdid,
        query: { id: this.id }
      });
    },
    sellrentfourbtn() {
      if (window.localStorage.token) {
        this.$router.push("/sellrent/3");
      } else {
        this.$router.push("/register");
      }
    },
    calculatorbtn() {
      this.$router.push("/calculator");
    },
    indexlistbtn() {
      this.$store.citynumber = true;
      this.$router.push("/indexlist");
    },
    sarchbtn() {
      this.$router.push("/searchbox");
    },
    hotdistrictbtn() {
      this.$router.push("/hotdistrict");
    },
    rentingbtn() {
      this.$router.push({ path: "/renting/", query: { id: "1" } });
    },
    rentingbtntwo() {
      this.$router.push({ path: "/renting/", query: { id: "2" } });
    },
    newhosebtn() {
      this.$router.push("/newhouse");
    },
    rentingbtnthree() {
      if (window.localStorage.token) {
        this.$router.push("/sellrent/" + "1");
      } else {
        this.$router.push("/register");
      }
    },
    rentingbtnfour() {
      if (window.localStorage.token) {
        this.$router.push("/sellrent/" + "2");
      } else {
        this.$router.push("/register");
      }
    },
    homebtns(index) {
      this.indextwo = index;
      this.id = index + 1;
      if (index == "0") {
        this._ersf();
      } else {
        this._zufang();
      }
    },
    rmxqbtn(item) {
      this.$router.push({ path: "/hotdisitem/" + item.sdid });
    },
    bandbookbtn() {
      this.$router.push("/handbook");
    },
    regionlistbtn() {
      this.$router.push("/regionlist");
    },
    advisorybtn() {
      this.$router.push("/advisory");
    },
    seekshopbtn() {
      this.$router.push("/seekshop");
    },
    _zufang() {
      //首页租房推荐
      this.$http
        .get(this.$url.URL.RENTHOUSE + "/" + this.site + "?pageNo=1&pageSize=6")
        .then(res => {
          for (let i = 0; i < res.data.data.length; i++) {
            res.data.data[i].houseTag = res.data.data[i].houseTag.split(",");
            if (res.data.data[i].houseTag.length > 3) {
              res.data.data[i].houseTag = res.data.data[i].houseTag.splice(-3);
            } else {
              res.data.data[i].houseTag = res.data.data[i].houseTag;
            }
          }
          this.esflist = res.data.data;
        });
    },
    _ersf() {
      this.$http
        .get(
          this.$url.URL.HOUSEQUERY + "/" + this.site + "?pageNo=1&pageSize=6"
        )
        .then(res => {
          for (let i = 0; i < res.data.data.length; i++) {
            res.data.data[i].houseTag = res.data.data[i].houseTag.split(",");
            if (res.data.data[i].houseTag.length > 3) {
              res.data.data[i].houseTag.splice(3);
            } else {
              res.data.data[i].houseTag = res.data.data[i].houseTag;
            }
          }
          this.esflist = res.data.data;
        });
    }
  }
};
</script>

<style scoped lang="less">
@import "../../common/css/master.less";
@import "../../common/css/fulist.css";
.home {
  width: 100%;
  min-height: 8rem;
  overflow: hidden;
  padding-bottom: 0.5rem;
}
.swiper {
  width: 100%;
  height: 2rem;
  position: relative;
}
.swiperitem {
  width: 100%;
  height: 100%;
}
.swiperitem img {
  width: 100%;
  height: 100%;
}
.swiper > img {
  width: 100%;
  height: 100%;
}
.searchboxwarp {
  width: 100%;
  height: 0.6rem;
  position: fixed;
  background: rgba(255, 255, 255, 0);
  top: 0;
  left: 0;
  z-index: 9999;
}
.searchboxwarpone {
  width: 100%;
  height: 0.6rem;
  position: fixed;
  background: rgba(255, 255, 255, 1);
  top: 0;
  left: 0;
  z-index: 9999;
}
.swiperonebox {
  width: 100%;
  height: 2.1rem;
}
.swiperoneboxitem {
  width: 100%;
  height: 100%;
}
.searchboxwarponea {
  width: 100%;
  height: 0.6rem;
  position: fixed;
  background: rgba(255, 255, 255, 0.2);
  top: 0;
  left: 0;
  z-index: 9999;
}
.searchboxwarponeb {
  width: 100%;
  height: 0.6rem;
  position: fixed;
  background: rgba(255, 255, 255, 0.4);
  top: 0;
  left: 0;
  z-index: 9999;
}
.searchboxwarponec {
  width: 100%;
  height: 0.6rem;
  position: fixed;
  background: rgba(255, 255, 255, 0.6);
  top: 0;
  left: 0;
  z-index: 9999;
}
.searchboxwarponed {
  width: 100%;
  height: 0.6rem;
  position: fixed;
  background: rgba(255, 255, 255, 0.8);
  top: 0;
  left: 0;
  z-index: 9999;
}
.searchbox {
  width: 3.3rem;
  height: 0.4rem;
  position: fixed;
  top: 0.1rem;
  left: 0.225rem;
  background-color: #ffffff;
  border-radius: 0.04rem;
}
.searchboxone {
  width: 3.3rem;
  height: 0.4rem;
  position: fixed;
  top: 0.1rem;
  left: 0.225rem;
  background-color: #f2f2f2;
  border-radius: 0.04rem;
}
#serchitem {
  width: 100%;
  height: 0.2rem;
  margin-top: 0.1rem;
}
#ul_1 {
  width: 100%;
  margin-top: 0.15rem;
  overflow: hidden;
  padding: 0 0.12rem;
}
#ul_1 > li {
  width: 1.72rem;
  float: left;
  background: @colorthree;
  padding-top: 0.15rem;
  padding-bottom: 0.15rem;
}
#ul_1 > li:nth-of-type(1) {
  margin-right: 0.07rem;
  margin-bottom: 0.07rem;
}
#ul_1 > li:nth-of-type(2) {
  margin-bottom: 0.07rem;
}
#ul_1 > li:nth-of-type(4) {
  margin-left: 0.07rem;
}
.ul_li_one > a > div {
  font-size: @fontsize_4;
  color: @color_1;
  margin-left: 0.15rem;
  float: left;
}
.ul_li_one > a > div > div:nth-of-type(2) {
  font-size: @fontsize_5;
  color: @color_2;
  margin-top: 0.07rem;
  width: 0.7rem;
  margin-top: 0.1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.1;
}
.ul_li_one > a > img {
  float: right;
  height: 0.455rem;
  margin-right: 0.07rem;
}
#serchleft {
  width: 25%;
  height: 100%;
  border-right: 1px solid #999999;
  text-align: center;
  font-size: 0.15rem;
  color: #333333;
  float: left;
  box-sizing: border-box;
}
#serchright {
  width: 75%;
  height: 100%;
  float: left;
}
#serchright > img {
  float: left;
  width: 0.15rem;
  height: 0.15rem;
  margin-left: 0.15rem;
  margin-top: 0.025rem;
}
#serchright > div {
  height: 100%;
  margin-left: 0.05rem;
  width: 70%;
  float: left;
  font-size: 0.15rem;
  color: @color_4;
}
.btnbox {
  width: 100%;
  overflow: hidden;
  list-style: none;
}
.btnbox > li > img {
  width: 0.43rem;
  height: 0.43rem;
  margin-bottom: 0.05rem;
}
.btnbox > li {
  width: 20%;
  float: left;
  font-size: @fontsize_5;
  text-align: center;
  margin-top: 0.2rem;
  color: @color_2;
  overflow: hidden;
}
.yinyingfengimg {
  float: left;
  width: 100%;
}
.erlist {
  width: 100%;
  overflow: hidden;
  margin-top: 0.4rem;
}
.erlist > div:nth-of-type(1) {
  float: left;
  margin-left: 0.12rem;
  height: 0.2rem;
  border-left: 4px solid red;
  text-indent: 0.1rem;
  font-size: 0.16rem;
  line-height: 0.2rem;
  box-sizing: border-box;
}
.erlisttwo {
  width: 100%;
  overflow: hidden;
  margin-top: 0.3rem;
}
.erlisttwo > div:nth-of-type(1) {
  float: left;
  margin-left: 0.12rem;
  height: 0.2rem;
  font-size: @fontsize_1;
  line-height: 0.2rem;
  color: @color_1;
  box-sizing: border-box;
}
.erlisttwo > div:nth-of-type(2) {
  float: right;
  margin-right: 0.12rem;
  height: 0.2rem;
  text-indent: 0.1rem;
  font-size: @fontsize_8;
  line-height: 0.2rem;
}
.erlisttwo > div:nth-of-type(2) > span {
  margin-left: 0.13rem;
}
.pingrongji {
  float: left;
  margin-left: 0.12rem;
  height: 0.2rem;
  font-size: @fontsize_1;
  line-height: 0.2rem;
  color: @color_1;
  box-sizing: border-box;
  margin-top: 0.3rem;
}
.erlist > div:nth-of-type(2) {
  float: right;
  margin-right: 0.12rem;
  height: 0.2rem;
  text-indent: 0.1rem;
  font-size: 0.14rem;
  line-height: 0.2rem;
  color: #2581ff;
}
.swiperershoufang {
  width: 100%;
  height: 1rem;
  margin-top: 0.2rem;
}
.swiperfangitem {
  width: 2.5rem !important;
  height: 100%;
  margin-left: 0.1rem;
  background: #f9f9f9;
}
.swiperershoufangtwo {
  width: 100%;
  overflow: hidden;
  margin-top: 0.2rem;
}
.swiperfangitemtwo {
  width: 1.6rem !important;
  margin: 0;
  margin-left: 0.12rem;
  overflow: hidden;
}
.swiperfangitemtwo img {
  width: 100%;
  height: 1.2rem;
  float: left;
}
.tongjiboximgP {
  width: 100%;
}
.sweperimg {
  width: 1rem;
  height: 0.9rem;
  margin-top: 0.05rem;
  margin-left: 0.05rem;
  float: left;
}
.sweperimg > img {
  float: left;
  width: 100%;
  height: 100%;
}
.sweperboxcent {
  width: 1.1rem;
  float: left;
  margin-left: 0.2rem;
}
.sweperboxcent > div:nth-of-type(1) {
  width: 100%;
  font-size: 0.15rem;
  color: #333333;
  margin-top: 0.1rem;
}
.sweperboxcent > div:nth-of-type(2) {
  width: 100%;
  font-size: 0.12rem;
  color: #666666;
  margin-top: 0.05rem;
}
.ershoufangimg {
  width: 3.5rem;
  height: 1.2rem;
  display: block;
  margin: auto;
  margin-top: 0.65rem;
  background: url(../../imgs/home/tongjibeijing.png) no-repeat;
  background-size: 100% 100%;
}
#fangwuleft {
  width: 100%;
  overflow: hidden;
  color: @color_4;
}
#fangwuleft > div {
  width: 50%;
  float: left;
  text-indent: 0.2rem;
  color: #fff6d9;
  font-size: 0.15rem;
  margin-top: 0.3rem;
}
#fangwuright {
  width: 100%;
  overflow: hidden;
}
#fangwuright > div {
  width: 50%;
  float: left;
  text-indent: 0.2rem;
  color: #ffffff;
  font-size: 0.24rem;
  margin-top: 0.2rem;
}
#fangwuright > div > span {
  font-size: 0.12rem;
}
.xiaoquname {
  width: 100%;
  float: left;
  font-size: @fontsize_4;
  color: @color_1;
  margin-top: 0.1rem;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}
.xiaoqunametwo {
  width: 100%;
  float: left;
  font-size: @fontsize_4;
  color: @color_1;
  margin-top: 0.1rem;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}
.xiaoqunum {
  width: 100%;
  float: left;
  font-size: @fontsize_5;
  color: @color_2;
  margin-top: 0.03rem;
}
.xiaoqunumtwo {
  width: 100%;
  float: left;
  font-size: @fontsize_5;
  color: @color_2;
  margin-top: 0.05rem;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}
.xiaoqumoney {
  width: 100%;
  float: left;
  font-size: 0.19rem;
  color: #ff4343;
  margin-top: 0.03rem;
}
.xiaoqumoney > span {
  font-size: 0.11rem;
}
.homebtn {
  color: @colorone !important;
}
</style>
<style>
/* .mint-swipe-indicator.is-active {
   background: #FF4343 !important;
   opacity: 1 !important;
} */
</style>

