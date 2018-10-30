<template>
    <div class="rentingitem">
        <div class="titlename" :class="{searchboxwarpone:homemove==1,searchboxwarponea:homemove==2,searchboxwarponeb:homemove==3,searchboxwarponec:homemove==4,searchboxwarponed:homemove==5}">
            <img class="gorentingimg" v-if="fengxiang" src="../../imgs/home/fanhuitwo.png" alt="" @click="gohomebtn">
            <img class="gorentingimg" v-else src="../../imgs/home/fanhui.png" alt="" @click="gohomebtn">
            <img class="titleimgone" v-if="movehx==1" src="../../imgs/home/shoucangxz.png" alt="" @click="qxtianjiascbtn">
            <img class="titleimgone" v-else-if="movehx==2" src="../../imgs/home/weixuanzhes.png" alt="" @click="tianjiascbtn">
            <img class="titleimgone" v-else src="../../imgs/home/shouchangwxz.png" alt="" @click="tianjiascbtn">
            <!-- <img class="fengxiangimg" v-if="fengxiang" src="../../imgs/home/fengxiang.png" alt="">
            <img class="fengxiangimg" v-else src="../../imgs/home/fengxianghese.png" alt=""> -->
        </div>
         
         <mt-swipe :auto="3000" class="swiperitem" :showIndicators="false" @change="handleChange">
            <mt-swipe-item v-for="(item,index) in dataone.housePicList" :key="index">
                    <img :src="item" alt="" srcset="">
            </mt-swipe-item>            
        </mt-swipe>
        <div class="swiperdivone">{{activeindex}}/{{dataone.housePicList.length}}</div>
        <div class="locathionclass">
            <div>{{dataone.buildName|stringfilter}}</div>
            <div>{{dataone.adreessOfficial}}</div>
        </div>
        <ul id="ul_1">
          <li>
            <div>参考均价</div>
            <div>{{dataone.avgSalePrice}}元/平</div>
          </li>
          <li>
            <div>小区类型</div>
            <div>{{dataone.buildType}}</div>
          </li>
          <li>
            <div>建筑时间</div>
            <div>{{dataone.buildAge}}</div>
          </li>
        </ul>
        <div class="locathionclass_1" style="">
            小区房源
            
        </div>
            <ul class="locathionbtn">
                <li @click="ershoufbtn(dataone)">
                    <img src="../../imgs/home/xiaoquershouf.png" alt="">
                    <div>二手房</div>
                </li>
                <li @click="zufangbtn(dataone)">
                    <img src="../../imgs/home/zufangbtn.png" alt="">
                    <div>租房</div>
                </li>
            </ul>
        <div class="locathionname">
            小区信息
        </div>
        <ul class="ullistname">
            <li>建筑时间：<span>{{dataone.buildAge}}年</span></li>
            <li>小区类型：<span>{{dataone.buildType}}</span></li>
            <li>栋数：<span>{{dataone.totalBuildNum}}栋</span></li>
            <li>小区面积：<span>{{dataone.totalCoverArea}}㎡</span></li>
            <li>车位数：<span>{{dataone.carDownNum+dataone.carUpNum}}个</span></li>
            <li>绿化率：<span>{{dataone.greenRatio}}%</span></li>
            <li>小区简介：<span>{{dataone.buildSynop}}</span></li>
        </ul>
        <div class="fangywz">小区位置</div>
        <div id="allmap" tabindex="0" @click="mapboxonebtn"></div>
        <div class="fangywz">周边设施</div>
        <div class="moreApratInfo">
            <div>交通：<span>{{dataone.transportInfo}}</span></div>
            <div>学校：<span>{{dataone.schoolInfo}}</span><span style="font-size:0.09rem;"></span></div>
            <div>医院：<span>{{dataone.hospitalInfo}}</span></div>
            <div>银行：<span>{{dataone.bankInfo}}</span></div>
            <div>超市：<span>{{dataone.supermarketInfo}}</span></div>
        </div>
         <div class="erlisttwo">
            <div>小区房源</div>
            <div>
                <span v-for="(item,index) in homebtnlist" :key="index" @click="homebtns(index)" :class="{homebtn:index==indextwo}">{{item}}</span>
            </div>
        </div>
        <div class="cnxhlist"v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10">
            <div class="cnxhlistitem" v-for="(item,index) in litetwo" :key="index" @click="rentingitembtn(item)">
                <div class="cnxhcontnet">
                    <div class="cnxhcontnetleft">
                        <img :src="item.housePic|imgfilter" alt="">
                    </div>
                    <div class="cnxhcontnetright">
                        <div class="cnxhconterone">
                            {{item.houseTitle}}
                        </div>
                        <div class="cnxhcontertwo">
                            {{item.areaName}} {{item.districtName}} {{item.houseDirection}}
                        </div>
                        <div class="cnxhconterthree">
                            {{item.roomsNum}}房{{item.livingRoomNum}}厅 {{item.builtArea}}m² 
                        </div>
                        <div class="cnxhconterfour">
                            <div v-for="(item,index) in item.houseTag" :key="index">{{item}}</div>
                        </div>  
                        <div class="cnxhconterfive" v-if="id=='1'">
                            <div>{{item.saleTotal}}万</div>
                            <div>{{item.salePrice}}元/平</div>
                        </div>
                        <div class="cnxhconterfive" v-else>
                            <div>{{item.rentPrice}}元/月</div>
                        </div>
                    </div>
                </div> 
            </div>             
        </div>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      activeindex: 1,
      movehx: 3,
      fengxiang: true,
      warpdivbl: false,
      site:"",
      indextwo: 0,
      sdid: "",
      homemove: 10,
      mapcenter: [], //坐标
      homebtnlist: ["二手房", "租房"],
      dataone: "", //小区详情
      id: "1",
      page: "1",
      litetwo: [] //最下面列表
    };
  },
  created() {
    this.$store.state.activeindex = "6";
    if(this.$route.query.scity){
      this.site=this.$route.query.scity
      window.localStorage.site=this.$route.query.scity
    }else{
      this.site=window.localStorage.site
    }
    this.sdid = this.$route.params.id;
    window.addEventListener("scroll", this.handleScroll);
    this._querys();
    this._hotlist();
  },
  methods: {
    _wxfx(){
      var wxfx = {
        url: window.location.href,
        imgurl: this.dataone.housePicList[0],
        title: this.dataone.buildName,
        content: this.dataone.buildName + " " + this.dataone.buildSynop+" "+this.dataone.avgSalePrice+"元/平"
      };
      this.$wxfx(wxfx);
    },
    qxtianjiascbtn() {
      //取消收藏
      this._cancelquerys();
    },
    tianjiascbtn() {
      //添加收藏
      if (window.localStorage.dc_token) {
        this._addquerys();
      } else {
        this.$router.push("/register");
      }
    },
    _cancelquerys() {
      this.$http
        .post(
          this.$url.URL.BULDCOLLECTIONCANCEL + "/" + this.site + "/" + this.sdid
        )
        .then(res => {
          var scrollTop =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop;
          scrollTop > "200" ? (this.movehx = 2) : (this.movehx = 3);
        });
    },
    _addquerys() {
      this.$http
        .post(
          this.$url.URL.BUILDCOLLECTIONADD + "/" + this.site + "/" + this.sdid
        )
        .then(res => {
          this.movehx = 1;
        });
    },
    _querys() {
      //获取详情
      this.$http
        .get(this.$url.URL.BUILDINFO + "/" + this.site + "/" + this.sdid)
        .then(res => {
          this.dataone = res.data.data;
          this._wxfx()//调取微信授权
          console.log(this.dataone.isCollect);
          this.dataone.isCollect ? (this.movehx = 1) : (this.movehx = 3);
          if(res.data.data.px==0&&res.data.data.py==0){
            this.mapcenter[0]=JSON.parse(window.localStorage.mapxy).lng;
            this.mapcenter[1]=JSON.parse(window.localStorage.mapxy).lat;
          }else{
            this.mapcenter[0] = res.data.data.px;
            this.mapcenter[1] = res.data.data.py;
          }
          console.log(this.mapcenter)
          this.mapcenters(); //获取定位信息
        });
    },
    mapboxonebtn() {
      window.localStorage.setItem("mapone", JSON.stringify(this.mapcenter));
      this.$router.push("/mapboxone");
    },
    handleChange(index) {
      this.activeindex = index + 1;
    },
    loadMore() {
      if (this.page !== "1") {
        this.loading = true;
        this._hotlist();
        Toast({
          message: "正在加载。。。",
          position: "bottom"
        });
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      }
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
      if (scrollTop < "200") {
        this.movehx == 1 ? this.movehx == 1 : (this.movehx = 3);
        this.fengxiang = true;
      } else {
        this.movehx == 1 ? this.movehx == 1 : (this.movehx = 2);
        this.fengxiang = false;
      }
    },
    _hotlist() {
      var url = "";
      this.id == "1"
        ? (url =
            this.$url.URL.SECONDHOUSELIST +
            "/" +
            this.site +
            "/" +
            this.sdid +
            "?pageNo=" +
            this.page +
            "&pageSize=10")
        : (url =
            this.$url.URL.RENTHOUSELIST +
            "/" +
            this.site +
            "/" +
            this.sdid +
            "?pageNo=" +
            this.page +
            "&pageSize=10");
      this.$http.get(url).then(res => {
        for (let i = 0; i < res.data.data.length; i++) {
          res.data.data[i].houseTag = res.data.data[i].houseTag.split(",");
          if (res.data.data[i].houseTag.length > 3) {
            res.data.data[i].houseTag.splice(
              -1,
              res.data.data[i].houseTag.length - 3
            );
          } else {
            res.data.data[i].houseTag = res.data.data[i].houseTag;
          }
        }
        this.litetwo = this.litetwo.concat(res.data.data);
        this.page++;
      });
    },
    homebtns(index) {
      this.indextwo = index;
      this.id = index + 1;
      this.page = "1";
      this.litetwo = [];
      this._hotlist();
    },
    gohomebtn() {
      if(this.$route.query.scity){
        this.$router.push("/")
      }else{
        this.$router.go(-1);
      }
      
    },
    rentingitembtn(item) {
      this.$router.push({
        path: "/rentingitem/" + item.sdid,
        query: { id: this.id }
      });
    },
    ershoufbtn(dataone) {
      this.$router.push({
        path: "/rentinglist/" + dataone.sdid,
        query: { id: "1" }
      });
    },
    zufangbtn(dataone) {
      this.$router.push({
        path: "/rentinglist/" + dataone.sdid,
        query: { id: "2" }
      });
    },
    mapcenters() {
      setTimeout(() => {
        var map = new BMap.Map("allmap"); // 创建Map实例
        var point = new BMap.Point(this.dataone.px, this.dataone.py);
        map.centerAndZoom(point, 15); // 初始化地图,设置中心点坐标和地图级别
        var marker = new BMap.Marker(point); // 创建标注
        map.disableDragging();
        map.addOverlay(marker);
      }, 500);
    }
  },
  destroyed(){
    if(window.localStorage.scity){
      window.localStorage.site=window.localStorage.scity
      window.localStorage.removeItem("scity")
    }
  }
};
</script>
<style scoped lang="less">
@import "../../common/css/master.less";
@import "../../common/css/fulist.css";
.cnxhlists {
  margin-bottom: 0;
}
.cnxhlists > div:nth-last-of-type(1) {
  border-bottom: 1px solid #cccccc;
}
.cnxhconterones {
  font-size: 0.18rem;
}
.cnxhcontertwos {
  font-size: 0.13rem;
  margin-top: 0.15rem;
  margin-bottom: 0.2rem;
}
.cnxhconterfives {
  font-size: 0.19rem;
  color: @colorone;
}
.cnxhconterfives span {
  font-size: 0.11rem;
}
.rentingitem {
  width: 100%;
  height: 100%;
  position: relative;
}
.swiperitem {
  width: 100%;
  height: 2.8rem;
}
.swiperitem img {
  width: 100%;
  height: 100%;
}
.gorentingimg {
  width: 0.12rem;
  height: 0.2rem;
  position: absolute;
  top: 0.12rem;
  left: 0.12rem;
  display: inline-block;
  z-index: 999;
}
.titleimgone {
  width: 0.22rem;
  position: absolute;
  top: 0.12rem;
  right: 0.12rem;
  display: inline-block;
  z-index: 999;
}
.fengxiangimg {
  width: 0.23rem;
  position: absolute;
  top: 0.12rem;
  right: 0.12rem;
  display: inline-block;
  z-index: 999;
}
.locathionclass {
  width: 100%;
  // height: 0.8rem;
  overflow: hidden;
  padding:0.25rem 0;
}
.swiperdivone {
  padding: 0.1rem 0;
  width: 0.35rem;
  text-align: center;
  background: rgba(0, 0, 0, 0.2);
  color: #333333;
  font-size: 0.13rem;
  overflow: hidden;
  position: absolute;
  border-radius: 50%;
  right: 0.1rem;
  top: 2.3rem;
  z-index: 999999;
  color: #ffffff;
}
.locathionclass_1 {
  margin-left: 0.12rem;
  margin-right: 0.12rem;
  height: 0.58rem;
  font-size: @fontsize_1;
  line-height: 0.58rem;
  border-bottom: 0.005rem solid @bordercolor_1;
}
.locathionbtn {
  width: 100%;
  margin-top: 0.15rem;
  font-size: 0.15rem;
  color: #666666;
  overflow: hidden;
}
.locathionbtn > li {
  width: 50%;
  float: left;
  text-align: center;
  overflow: hidden;
}
.locathionbtn div {
  margin-top: 0.1rem;
}
.locathionbtn img {
  width: 0.35rem;
}
.moneyset {
  float: right;
  height: 0.8rem;
  line-height: 0.8rem;
  margin-right: 0.12rem;
  color: @colorone;
  font-size: 0.2rem;
}
.moneyset > span {
  font-size: 0.13rem;
}
.locathionclass > div:nth-of-type(1) {
  float: left;
  font-size: 0.23rem;
  margin-left: 0.12rem;
  height: 100%;
}
.locathionclass >div:nth-of-type(2){
  font-size:0.14rem;
  color:#999999;
  margin-top:0.14rem;
  float:left;
  width:100%;
  text-indent: 0.12rem;
}
.locathionname {
  font-size: 0.2rem;
  margin-top: 0.4rem;
  margin-left: 0.12rem;
}
.ullistname {
  margin-left: 0.12rem;
  margin-right: 0.12rem;
  overflow: hidden;
  margin-top: 0.25rem;
}
.ullistname > li {
  width: 50%;
  float: left;
  margin-top: 0.15rem;
  font-size: 0.15rem;
  color: #333333;
  overflow: hidden;
  line-height: 1.1;
}
.ullistname > li:nth-of-type(1),
.ullistname > li:nth-of-type(2) {
  margin: 0;
}
.ullistname > li:nth-last-of-type(1) {
  width: 100%;
}
.ullistname > li > span {
  color: #666666;
}
.fangywz {
  font-size: 0.2rem;
  margin-top: 0.35rem;
  margin-left: 0.12rem;
}
#ul_1 {
  width: 100%;
  overflow: hidden;
  border-top: 0.005rem solid @bordercolor_1;
  border-bottom: 0.005rem solid @bordercolor_1;
  > li:nth-of-type(3) {
    border: none;
  }
  > li {
    width: 33.33333%;
    float: left;
    overflow: hidden;
    padding: 0.15rem 0;
    border-right: 0.005rem solid @bordercolor_1;
    box-sizing: border-box;
    > div:nth-of-type(2) {
      font-size: @fontsize_2;
      color: @colorone;
      margin-left: 0.15rem;
      margin-top: 0.08rem;
    }
    > div {
      font-size: @fontsize_5;
      color: @color_2;
      margin-left: 0.15rem;
    }
  }
}
#allmap {
  width: 100%;
  height: 2rem;
  margin-top: 0.15rem;
}
.moreApratInfo {
  font-size: 0.15rem;
  margin: 0.05rem 0.12rem;
  overflow: hidden;
  color: #333333;
}
.moreApratInfo > div {
  margin-top: 0.2rem;
}
.moreApratInfo > div > span {
  color: #666666;
  margin-right: 0.1rem;
}
.shoubianfang {
  float: left;
  margin-top: 0.35rem;
  font-size: 0.2rem;
  margin-left: 0.12rem;
}
.btnbottomul {
  width: 100%;
  height: 0.5rem;
  position: fixed;
  bottom: 0;
}
.btnbottomul > li {
  width: 50%;
  float: left;
  height: 0.5rem;
  text-align: center;
  line-height: 0.5rem;
  font-size: 0.17rem;
  color: #ffffff;
  z-index: 999999;
  background: @colorone;
}
.cnxhlist {
  margin-bottom: 0;
}
.btnbottomul > li:nth-of-type(2) {
  background: #5db1ff;
}
.warpdiv {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(1, 1, 1, 0.6);
  z-index: 999999;
  top: 0;
  left: 0;
}
.warpdiv > div {
  width: 3rem;
  height: 1.82rem;
  background: #ffffff;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -1.3rem;
  margin-left: -1.5rem;
  border-radius: 0.06rem;
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
  font-size: 0.2rem;
  line-height: 0.2rem;
  box-sizing: border-box;
}
.erlisttwo > div:nth-of-type(2) {
  float: right;
  margin-right: 0.12rem;
  height: 0.2rem;
  text-indent: 0.1rem;
  font-size: 0.14rem;
  line-height: 0.2rem;
  color: #333333;
}
.erlisttwo > div:nth-of-type(2) > span {
  margin-left: 0.13rem;
}
.warpdiv > img {
  width: 0.23rem;
  height: 0.23rem;
  position: fixed;
  top: 65%;
  left: 50%;
  margin-left: -0.115rem;
}
.messagebox {
  margin-left: 0.15rem;
  margin-right: 0.15rem;
  margin-top: 0.3rem;
  height: 0.8rem;
}
.messagebox > img {
  width: 0.8rem;
  height: 0.8rem;
  float: left;
}
.messagebox > div {
  height: 100%;
  margin-left: 0.15rem;
  float: left;
  font-size: 0.2rem;
}
.messagebox > div > div:nth-of-type(2) {
  font-size: 0.15rem;
  margin-top: 0.1rem;
  margin-bottom: 0.1rem;
}
.messagebox > div > div:nth-of-type(3) {
  font-size: 0.13rem;
  margin-top: -0.05rem;
}
.phonebtn {
  width: 100%;
  height: 0.7rem;
}
.phonebtn > li {
  float: left;
  width: 50%;
  height: 100%;
  line-height: 0.7rem;
  text-align: center;
  font-size: 0.18rem;
}
.phonebtn > li > img {
  width: 0.23rem;
}
.bottombtnclass {
  width: 100% !important;
}
.titlename {
  width: 100%;
  height: 0.44rem;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0);
  color: #333333;
  text-align: center;
  line-height: 0.44rem;
  font-size: 0.19rem;
  z-index: 999;
  border: none;
}
.searchboxwarpone {
  width: 100%;
  position: fixed;
  background: rgba(255, 255, 255, 1);
  top: 0;
  left: 0;
  z-index: 9999;
  border-bottom: 1px solid #cccccc;
}
.searchboxwarponea {
  width: 100%;
  position: fixed;
  background: rgba(255, 255, 255, 0.2);
  top: 0;
  left: 0;
  z-index: 9999;
  border: none;
}
.searchboxwarponeb {
  width: 100%;
  position: fixed;
  background: rgba(255, 255, 255, 0.4);
  top: 0;
  left: 0;
  z-index: 9999;
  border: none;
}
.searchboxwarponec {
  width: 100%;
  position: fixed;
  background: rgba(255, 255, 255, 0.6);
  top: 0;
  left: 0;
  z-index: 9999;
  border: none;
}
.searchboxwarponed {
  width: 100%;
  position: fixed;
  background: rgba(255, 255, 255, 0.8);
  top: 0;
  left: 0;
  z-index: 9999;
  border: none;
}
.homebtn {
  color: @colorone !important;
}
</style>

