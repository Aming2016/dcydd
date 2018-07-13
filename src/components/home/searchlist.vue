<template>
  <div class="searchlist">
    <div class="topseatch">
        <img src="../../imgs/home/fanhui.png" alt="" @click="gohomebtn">
        <div id="topserchbox">
            <img src="../../imgs/home/homesousuo.png" alt="" srcset="">
            <form action="javascript:search();"> 
            <input type="search" placeholder="请输入您要查询的信息" v-model="serchname" @keyup.enter="serchbtn($event)">
            </form>
        </div>
    </div>
    
    <div class="tabercontent">
    <div class="shuaixuan" :class="{shuaixuanonese:removerone}"  @click.self="removebtn">
    <ul class="taberlist">
        <li v-for="(item,index) in taberlist" @click.stop="activebtn(index)" :class="{taberclass:id=='2'}">
            {{item}}
            <img src="../../imgs/home/xiangxia.png" alt="" srcset="">
        </li>
         
    </ul>
    <div class="shuaixuanone" v-if="active=='0'">
        <ul>
            <li @click="erealistbtnbx" :class="{activesetcolor:sctiveoneone=='100'}">不限</li>
            <li v-for="(item,index) in erealistone" @click="erealistonebtn(item,index)" :class="{activesetcolor:sctiveoneone==index}">{{item.name}}</li>
            
        </ul>
        <ul>
            <li @click="erealistitembtnbx" :class="{activesetcolor:sctiveonetwo=='100'}">不限</li>
            <li v-for="(item,index) in erealisttwo" :class="{activesetcolor:sctiveonetwo==index}" @click="erealistoneitembtn(item,index)">{{item.name}}</li>
            
        </ul>
    </div>
    <div class="shuaixuantwo" v-else-if="active=='1'">
        <div v-for= "(item,index) in listtop.HOUSE_HUXING" :class="{sxuanitem:activeone==index}" @click="itemonebtn(item,index)">{{item.name}}</div>
        <div class="bottomdiv_1">
        <p class="gobtnclasstwo" @click.stop="roomsNumbtnone">条件不限</p>
        <p class="gobtnclass" @click.stop="roomsNumbtn">确定</p>
        </div>
        
    </div>
    <div class="shuaixuantwo shuaixuantwo_1 shuaixuantwo_input" v-else-if="active=='2'">
       <div v-for="(item,index) in HOUSE_RENTAL" :class="{sxuanitem:activetwo==index}" @click="itemtwobtn(item,index)">{{item.name}}</div>
       
       <div class="zidingyiqujian">自定义区间（万）</div>
       <p class="inputbox">
         <input type="text" placeholder="最小金额" v-model="minmoney" @focus='testbtn'>
         <input type="text" placeholder="最大金额" v-model="maxmoney" @focus='testbtn'>
       </p>
       <div class="bottomdiv_1">
        <p class="gobtnclasstwo" @click="rentPriceonebtn">条件不限</p>
        <p class="gobtnclass" @click="rentPricebtn">确定</p>
        </div>
       
    </div>
    <div class="shuaixuantwo shuaixuantwo_1" v-else-if="active=='3'">
        <div v-for="(item,index) in listtop.HOUSE_AREA" :class="{sxuanitem:activethree==index}" @click="itemthreebtn(item,index)">{{item.name}}</div>
        <div class="bottomdiv_1">
        <p class="gobtnclasstwo" @click="mianjionebtn">条件不限</p>
        <p class="gobtnclass" @click="mianjibtn">确定</p>
        </div>
        
    </div>
     <div class="shuaixuantwo shuaixuantwo_2" v-else-if="active=='4'">
        <div v-for="(item,index) in listtop.HOUSE_TYPE" :class="{sxuanitem:activefour==index}" @click="itemfourbtn(item,index)">{{item.name}}</div>
       <div class="bottomdiv_1">
        <p class="gobtnclasstwo" @click="leixingonebtn">不限条件</p>
        <p class="gobtnclass" @click="leixingbtn">确定</p>
        </div>
    </div>
    </div>
    <div class="cnxhlist" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10" infinite-scroll-immediate-check="true">
            <div class="cnxhlistitem" @click="rentingitembtn(item)" v-for="(item,index) in sslist">
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
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
export default {
  name: "HelloWorld",
  data() {
    return {
      sctiveoneone: "", //区域颜色控制
      sctiveonetwo: "", //片区颜色控制
      activethree: null,
      activeone: null,
      activetwo: null,
      activefour: null,
      serchname: "", //输入的关键字
      keyword: "", //搜索关键字
      areaId: "", //区域
      districtId: "", // 片区
      houseForm: "", //类型
      maxBuildArea: "", //最大面积
      maxPrice: "", //最大价格
      minBuildArea: "", //最小面积
      minPrice: "", //最小价格
      roomsNum: "", //户型
      minRentPrice: "", //最小租金
      maxRentPrice: "", //最大租金
      minmoney: "", //输入最小金额
      maxmoney: "", //输入最大金额
      id: "1",
      removerone: false,
      active: "5", //过滤控制
      erealistone: "", //帅选区域列表
      erealisttwo: "", //帅选区域列表
      HOUSE_RENTAL: "", //房源租金
      site: window.localStorage.site,
      moneyurl: "", //房源售价/租金url
      listtop: "", //筛选列表
      urlone: "", //list地址
      page: 1, //页码
      sslist: [], //list
      numberlor:true
    };
  },
  created() {
    this.id = this.$route.query.id;
    if (this.id == "1") {
      this.taberlist = ["区域", "户型", "价格", "面积", "类型"];
      this.sxurl = ["HOUSE_HUXING", "HOUSE_AREA", "HOUSE_TYPE"];
      this.moneyurl = this.$url.URL.DICTIONARYTWO + "/SELL_PRICE/";
    } else {
      this.taberlist = ["区域", "户型", "租金", "面积"];
      this.sxurl = ["HOUSE_HUXING", "HOUSE_AREA"];
      this.moneyurl = this.$url.URL.DICTIONARYTWO + "/HOUSE_RENTAL/";
    }
    this.keyword = this.$store.searchname;
    this.serchname = this.$store.searchname;
    this._shaixuanlist();
    this._erlist();
  },
  methods: {
    loadMore() {
      if (this.numberlor) {
        this.loading = true;
        this._erlist();
        Toast({
          message: "正在加载。。。",
          position: "bottom",
          duration:500
        });
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      }
    },
    _erlist() {
      var seturl = "";
      this.id == "1"
        ? (this.urlone = this.$url.URL.HOUSEQUERYONE)
        : (this.urlone = this.$url.URL.RENTHOUSEQUERYS); //搜索list
      this.id == "1"
        ? (seturl = {
            scity: this.site,
            pageNo: this.page,
            pageSize: "10",
            keyword: this.keyword, //搜索关键字
            areaId: this.areaId, //区域
            districtId: this.districtId, // 片区
            houseForm: this.houseForm.value, //类型
            maxBuildArea: this.maxBuildArea, //最大面积
            maxPrice: this.maxmoney ? this.maxmoney : this.maxPrice, //最大价格
            minBuildArea: this.minBuildArea, //最小面积
            minPrice: this.minmoney ? this.minmoney : this.minPrice, //最小价格
            roomsNum: this.roomsNum.value //户型
          })
        : (seturl = {
            scity: this.site,
            pageNo: this.page,
            pageSize: "10",
            keyword: this.keyword, //搜索关键字
            areaId: this.areaId, //区域
            districtId: this.districtId, // 片区
            maxBuildArea: this.maxBuildArea, //最大面积
            minBuildArea: this.minBuildArea, //最小面积
            roomsNum: this.roomsNum.value, //户型
            maxRentPrice: this.maxmoney ? this.maxmoney : this.maxRentPrice, //最大租金
            minRentPrice: this.minmoney ? this.minmoney : this.minRentPrice //最小租金
          });
      this.$http
        .post(this.urlone, seturl)
        .then(res => {
          this.numberlor=true
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
          this.sslist = this.sslist.concat(res.data.data);
          console.log(this.sslist)
          this.page++;
        })
        .catch(() => {
          Toast({
            message: "全部加载完成",
            position: "bottom"
          });
        });
    },
    serchbtn(ev) {
      //搜索确定按钮
      this.numberlor=false
      scrollTo(0,0)
      if (this.id == "1") {
        this.taberlist = ["区域", "户型", "价格", "面积", "类型"];
      } else {
        this.taberlist = ["区域", "户型", "租金", "面积"];
      }
      this.areaId = ""; //区域
      this.districtId = ""; // 片区
      this.houseForm = ""; //类型
      this.maxBuildArea = ""; //最大面积
      this.maxPrice = ""; //最大价格
      this.minBuildArea = ""; //最小面积
      this.minPrice = ""; //最小价格
      this.roomsNum = ""; //户型
      this.minRentPrice = ""; //最小租金
      this.maxRentPrice = ""; //最大租金
      this.minmoney = ""; //输入最小金额
      this.maxmoney = ""; //输入最大金额
      this.keyword = this.serchname;
      this.sslist = [];
      this.page = 1;
      this._erlist();
    },
    _shaixuanlist() {
      this.$http
        .get(this.$url.URL.AREADISTRICTS + "/" + this.site) //获取城市以下的片区
        .then(res => {
          this.erealistone = res.data.data;
          this.erealisttwo = [];
        });
      this.$http
        .get(this.moneyurl + this.site) //房源租金/价格
        .then(res => {
          this.HOUSE_RENTAL = res.data.data;
        });
      this.$http.post(this.$url.URL.DICTIONARYS, this.sxurl).then(response => {
        this.listtop = response.data.data;
      });
    },
    erealistbtnbx() {
      //点击区域不限
      this.numberlor=false
      scrollTo(0,0)
      this.sctiveoneone = "100";
      this.erealisttwo = "";
      this.removerone = false;
      this.active = null;
      this.taberlist[0] = "区域";
      this.areaId = "";
      this.districtId = "";
      this.page = 1;
      this.sslist = [];
      this._erlist();
    },
    erealistonebtn(item, index) {
      //点击区域
      this.erealisttwo = item.districts;
      this.sctiveoneone = index;
      this.areaId = item.id;
      this.districtId = "";
      this.taberlist[0] = item.name;
    },
    erealistitembtnbx() {
      //点击片区不限
      this.numberlor=false
      scrollTo(0,0)
      this.sctiveonetwo = "100";
      this.removerone = false;
      this.active = null;
      this.districtId = "";
      this.page = 1;
      this.sslist = [];
      this._erlist();
    },
    erealistoneitembtn(item, index) {
      //点击片区
      this.numberlor=false
      scrollTo(0,0)
      this.sctiveonetwo = index;
      this.removerone = false;
      this.active = null;
      this.districtId = item.id;
      this.taberlist[0] = item.name;
      this.page = 1;
      this.sslist = [];
      this._erlist();
    },
    itemonebtn(item, index) {
      //点击户型
      this.activeone = index;
      this.roomsNum = item;
    },
    roomsNumbtnone() {
      this.numberlor=false
      scrollTo(0,0)
      this.roomsNum = "";
      this.activeone = null;
      this.page = 1;
      this.sslist = [];
      this.taberlist[1] = "户型";
      this._erlist();
      this.removerone = false;
      this.active = null;
    },
    roomsNumbtn() {
      this.numberlor=false
      scrollTo(0,0)
      this.page = 1;
      this.taberlist[1] = this.roomsNum.name;
      this.sslist = [];
      this._erlist();
      this.removerone = false;
      this.active = null;
    },
    itemtwobtn(item, index) {
      //点击价格
      this.activetwo = index;
      this.minmoney = "";
      this.maxmoney = "";
      if (this.id == "1") {
        this.minPrice = item.value.split("-")[0];
        this.maxPrice = item.value.split("-")[1];
      } else {
        this.minRentPrice = item.value.split("-")[0];
        this.maxRentPrice = item.value.split("-")[1];
      }
    },
    rentPriceonebtn() {
      //点击价格条件不限
      this.numberlor=false
      scrollTo(0,0)
      this.id == "1"
        ? (this.taberlist[2] = "价格")
        : (this.taberlist[2] = "租金");
      this.minRentPrice = "";
      this.maxRentPrice = "";
      this.maxPrice = "";
      this.minPrice = "";
      this.minmoney = "";
      this.maxmoney = "";
      this.activetwo = null;
      this.sslist = [];
      this.page = 1;
      this._erlist();
      this.removerone = false;
      this.active = null;
    },
    rentPricebtn() {
      //价格确定
      this.numberlor=false
      scrollTo(0,0)
      if (this.minmoney || this.maxmoney) {
        if (
          /^[1-9]\d*$/.test(this.minmoney) &&
          /^[1-9]\d*$/.test(this.maxmoney) &&
          this.maxmoney > this.minmoney
        ) {
          this.taberlist[2] = this.minmoney + "-" + this.maxmoney;
          this.page = 1;
          this.sslist = [];
          this._erlist();
          this.removerone = false;
          this.active = null;
        } else {
          Toast({
            message: "输入的金额必须为正整数,且输入最小金额比最大金额小",
            position: "bottom"
          });
        }
      } else {
        if (this.minPrice || this.minRentPrice) {
          this.id == "1"
            ? (this.taberlist[2] = this.minPrice + "-" + this.maxPrice)
            : (this.taberlist[2] = this.minRentPrice + "-" + this.maxRentPrice);
        } else {
          this.id == "1"
            ? (this.taberlist[2] = "价格")
            : (this.taberlist[2] = "租金");
        }

        this.page = 1;
        this.sslist = [];
        this._erlist();
        this.removerone = false;
        this.active = null;
      }
    },
    itemthreebtn(item, index) {
      //点击面积
      this.activethree = index;
      this.minBuildArea = item.value.split("-")[0];
      this.maxBuildArea = item.value.split("-")[1];
    },
    mianjionebtn() {
      //面积不限
      this.numberlor=false
      scrollTo(0,0)
      this.maxBuildArea = "";
      this.minBuildArea = "";
      this.activethree = null;
      this.sslist = [];
      this.page = 1;
      this._erlist();
      this.removerone = false;
      this.active = null;
      this.taberlist[3] = "面积";
    },
    mianjibtn() {
      //点击面积确定
      this.numberlor=false
      scrollTo(0,0)
      this.page = 1;
      this.sslist = [];
      this.taberlist[3] = this.minBuildArea + "-" + this.maxBuildArea;
      this._erlist();
      this.removerone = false;
      this.active = null;
    },
    itemfourbtn(item, index) {
      //点击类型
      this.activefour = index;
      this.houseForm = item;
    },
    leixingonebtn() {
      //类型不限
      this.numberlor=false
      scrollTo(0,0)
      this.houseForm = "";
      this.activefour = null;
      this.taberlist[4] = "类型";
      this.sslist = [];
      this.page = 1;
      this._erlist();
      this.removerone = false;
      this.active = null;
    },
    leixingbtn() {
      //类型确定
      this.numberlor=false
      scrollTo(0,0)
      this.page = 1;
      this.sslist = [];
      this.taberlist[4] = this.houseForm.name;
      this._erlist();
      this.removerone = false;
      this.active = null;
    },
    testbtn() {
      this.id == "1"
        ? (this.taberlist[2] = "价格")
        : (this.taberlist[2] = "租金");
      this.minRentPrice = "";
      this.maxRentPrice = "";
      this.maxPrice = "";
      this.minPrice = "";
      this.activetwo = null;
    },
    gohomebtn() {
      this.$router.go(-1);
    },
    activebtn(index) {
      this.active = index;
      this.removerone = true;
    },
    removebtn() {
      this.removerone = false;
      this.active = null;
    },
    rentingitembtn(item) {
      this.$router.push({
        path: "/rentingitem/" + item.sdid,
        query: { id: this.id }
      });
    }
  },
  computed: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="less">
@import "../../common/css/master.less";
@import "../../common/css/search.css";
@import "../../common/css/fulist.css";
.tabercontent {
  margin-top: 0.44rem;
}
#shuaixuancolor {
  color: @colorone;
}
.shuaixuanname {
  color: @colorone;
}
// .taberlist{
//     position: fixed;
//     top:0.45rem;
// }
.cnxhlist {
  margin-top: 0.35rem;
  margin-bottom: 0;
}
.shuaixuan {
  position: fixed;
  width: 100%;
  background: rgba(1, 1, 1, 0.5);
  top: 0.44rem;
}
.shuaixuanonese {
  height: 100%;
}
.gobtnclass {
  background: @colorone;
}
.taberclass {
  width: 25% !important;
}
</style>
