<template>
    <div class="renting">
       <div class="topseatch" :class="{searchboxwarpone:homemove==1,searchboxwarponea:homemove==2,searchboxwarponeb:homemove==3,searchboxwarponec:homemove==4,searchboxwarponed:homemove==5}">
            <img src="../../imgs/home/fanhui.png" alt="" @click="gohomebtn">
            <div id="topserchbox" :class="{searchboxone:homemove==1}">
                <img src="../../imgs/home/homesousuo.png" alt="" srcset="">
                <form action="javascript:search();"> 
                <input type="search" placeholder="请输入您要搜索的内容" @keyup.enter="showbtn($event)" v-model="textcontent">
                </form>
            </div>
        </div>
        <div class="shuaixuanss" v-show="movesetnumber" @click.self="yingcangbtn">
        </div>
        <ul class="taberlist taberlists" v-show="movesnumbertwo">
            <li v-for="(item,index) in taberlist" @click.stop="shuaixuan(index,index)" :class="{taberclass:id=='2'}">
                {{item}}
                <img src="../../imgs/home/xiangxia.png" alt="" srcset="">
            </li>            
        </ul>
    <div class="shuaixuanone" v-if="active=='0'">
        <ul>
            <li :class="{activesetcolor:sctiveoneone=='100'}" @click="btndistrictsone">不限</li>
            <li v-for="(item,index) in erealistone" @click="btndistricts(item,index)" :class="{activesetcolor:sctiveoneone==index}">{{item.name}}</li>
            
        </ul>
        <ul>
            <li :class="{activesetcolor:sctiveonetwo=='100'}" @click="btndistrictstwotwo">不限</li>
            <li :class="{activesetcolor:sctiveonetwo==index}" @click="btndistrictstwo(item,index)" v-for="(item,index) in erealisttwo">{{item.name}}</li>
        </ul>
    </div>
      <div class="shuaixuantwo" v-else-if="active=='1'&&id=='2'">
        <div v-for= "(item,index) in HOUSE_HUXING" @click="itemonebtn(item,index)" :class="{sxuanitem:activeone==index}">{{item.name}}</div>
        <div class="bottomdiv_1">
          <p class="gobtnclasstwo"  @click.stop="roomsNumbtnone">条件不限</p>
          <p class="gobtnclass" @click="roomsNumbtn">确定</p>
        </div>
    </div>
     <div class="shuaixuantwo shuaixuantwo_input" v-else-if="active=='2'&&id=='2'">
       <div v-for="(item,index) in HOUSE_RENTAL"  @click="itemtwobtn(item,index)" :class="{sxuanitem:activetwo==index}">{{item.name}}</div>
       <div class="zidingyiqujian">自定义区间（万）</div>
       <p class="inputbox">
         <input type="text" placeholder="最小金额" v-model="minRentPrice" @focus='testbtn'>
         <input type="text" placeholder="最大金额" v-model="maxRentPrice" @focus='testbtn'>
       </p>
        <div class="bottomdiv_1">
          <p class="gobtnclasstwo" @click="rentPriceonebtn">条件不限</p>
          <p class="gobtnclass" @click="rentPricebtn">确定</p>
        </div>
    </div>
    <div class="shuaixuantwo" v-else-if="active=='3'&&id=='2'">
        <div v-for="(item,index) in HOUSE_AREA"  @click="itemthreebtn(item,index)" :class="{sxuanitem:activethree==index}">{{item.name}}</div>
        <div class="bottomdiv_1">
          <p class="gobtnclasstwo" @click="BuildAreaonebtn">条件不限</p>
          <p class="gobtnclass" @click="BuildAreabtn">确定</p>
        </div>       
    </div>

     <div class="shuaixuantwo" v-else-if="active=='1'&&id=='1'">
        <div v-for= "(item,index) in HOUSE_HUXING"  @click="itemfourbtn(item,index)" :class="{sxuanitem:activefour==index}">{{item.name}}</div>
        <div class="bottomdiv_1">
          <p class="gobtnclasstwo"  @click="roomsNumbtnone">条件不限</p>
          <p class="gobtnclass" @click="roomsNumbtn">确定</p>
        </div>
    </div>
     <div class="shuaixuantwo shuaixuantwo_input" v-else-if="active=='2'&&id=='1'">
       <div v-for="(item,index) in SELL_PRICE"  @click="itemfivebtn(item,index)" :class="{sxuanitem:activefive==index}">{{item.name}}</div>
       <div class="zidingyiqujian">自定义区间（万）</div>
       <p class="inputbox">
         <input type="text" placeholder="最小金额" v-model="minPrice" @focus='testbtn'>
         <input type="text" placeholder="最大金额" v-model="maxPrice" @focus='testbtn'>
       </p>
        <div class="bottomdiv_1">
          <p class="gobtnclasstwo" @click="Priceonebtn">条件不限</p>
          <p class="gobtnclass" @click="Pricebtn">确定</p>
        </div>
       
    </div>
    <div class="shuaixuantwo" v-else-if="active=='3'&&id=='1'">
        <div v-for="(item,index) in HOUSE_AREA"  @click="itemsixbtn(item,index)" :class="{sxuanitem:activesix==index}">{{item.name}}</div>
        <div class="bottomdiv_1">
          <p class="gobtnclasstwo" @click="BuildAreaonebtn">条件不限</p>
          <p class="gobtnclass" @click="BuildAreabtn">确定</p>
        </div>       
    </div>
    <div class="shuaixuantwo" v-else-if="active=='4'&&id=='1'">
        <div v-for="(item,index) in HOUSE_TYPE"  @click="itemsevenbtn(item,index)" :class="{sxuanitem:activeseven==index}">{{item.name}}</div>
        <div class="bottomdiv_1">
          <p class="gobtnclasstwo" @click="houseFormonebtn">条件不限</p>
          <p class="gobtnclass" @click="houseFormbtn">确定</p>
        </div>       
    </div>

        <mt-swipe :auto="4000" class="swiperitem">
            <mt-swipe-item v-for="item in bannerimg" class="swiperitemitem">
                <a :href="item.contentUrl">
                    <img :src="item.picUrl" alt="" srcset="">
                </a>
                
            </mt-swipe-item>
            
        </mt-swipe>
        <div id="recommend">为你推荐</div>
          <swiper :options="swiperOptions" ref="mySwiper" class="swiperershoufangtwo">
            <!-- slides -->
            <swiper-slide :auto="0" class="swiperfangitemtwo" v-for="item in tjlist" @click.native="rentingitembtn(item)" :style="{ 'background-image': 'url(' + item.housePic + ')','background-repeat':'no-repeat','background-size':'cover' }">
                <div class="swipername">{{item.houseTitle }}</div>
                <div class="swipernametwo">
                    <span>{{item.areaName}}</span>
                    <span>{{item.districtName }}</span>
                    <span>{{item.houseDirection }}</span>
                </div>
                <div class="swipernametwo">
                    <span>{{item.livingRoomNum }}房{{item.roomsNum }}厅</span>
                    <span>{{item.builtArea}}㎡</span>
                </div>
                <div class="swipernamethree" v-if="id=='1'">
                    {{item.saleTotal}}万
                    <span>{{item.salePrice}}元/平</span>
                </div>
                <div class="swipernamefour" v-else>
                    {{item.rentPrice}}
                    <span>元/月</span>
                </div>
            </swiper-slide>
        </swiper>

        <div class="tabercontent">
        <!-- <div class="shuaixuan" v-show="true" :class="{shuaixuanonesd:remover,shuaixuanonese:removerone}" @click.self="yingcangbtn"> -->
        <ul class="taberlist">
            <li v-for="(item,index) in taberlist" @click.stop="shuaixuan(item,index)" :class="{taberclass:id=='2'}">
                {{item}}
                <img src="../../imgs/home/xiangxia.png" alt="" srcset="">
            </li>
            
        </ul>
  </div>
  <div class="cnxhlist" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10"
  infinite-scroll-immediate-check="true">
            <div class="cnxhlistitem" @click="rentingitembtn(item)" v-for="(item,index) in sslist" :key="index">
                <div class="cnxhcontnet">
                    <div class="cnxhcontnetleft">
                        <img v-lazy="item.housePic " alt="">
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
                            <div v-for="item in item.houseTag ">{{item}}</div>
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
    <!-- </div> -->
</template>
<script>
import { Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      movesetnumber: false,
      movesnumbertwo:false,
      activeone: null,
      activetwo: null,
      activethree: null,
      activefour: null,
      activefive: null,
      activesix: null,
      activeseven: null,
      sctiveoneone:"100",
      sctiveonetwo:"100",
      HOUSE_HUXING: "", //房源户型
      SELL_PRICE: "", //房源售价
      HOUSE_RENTAL: "", //房源租金
      HOUSE_USE: "", //房源用途
      HOUSE_AREA: "", //房源面积
      HOUSE_TYPE: "", //房源类型
      HOUSE_AGE: "", //楼零
      BROKER_DUTY: "", //经济人职务

      keyword:"", //搜索关键字
      areaId:"", //区域
      districtId:"",//片区
      houseForm:"", //类型
      maxBuildArea:"", //最大面积
      maxPrice:"", //最大价格
      minBuildArea:"", //最小面积
      minPrice:"", //最小价格
      roomsNum:"", //户型
      maxRentPrice:"",//最大租金
      minRentPrice:"",//最小租金
      textcontent:"",//搜索的内容

      id: 1, //1=我要房子，2=我要租房
      site: window.localStorage.site,
      bannerimg: "", //bannerimg
      page: "1",
      url: "", //推荐链接
      onurl: "", //搜索链接
      homemove: 10,
      removerone: false,
      swiperOptions: {
        autoplay: true,
        slidesPerView: 1.851
      },
      remover: false, //控制滑动效果
      active: "5", //过滤控制
      taberlist: ["区域", "户型", "价格", "面积", "类型"],
      erealistone:"",//帅选区域列表
      erealisttwo:"", //帅选区域列表
      tjlist: "", //推荐列表
      sslist: [], //搜索列表
      sxurl: "", //筛选url
      houselist: "" //获取的帅选列表
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  created(){
    this.$store.state.activeindex="6"
    this.id = this.$route.query.id;
    if (this.id == "2") {
      this.taberlist = ["区域", "户型", "租金", "面积"];
      this.sxurl = ["HOUSE_HUXING", "HOUSE_AREA"];
    } else {
      this.sxurl = ["HOUSE_HUXING", "HOUSE_AREA", "HOUSE_TYPE"];
    }
    this._querysone();
  },
  methods: {
    testbtn(){
      this.activefive=null
    },
    loadMore() {
      if (this.page !== "1") {
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
    _querysone() {
      this.id == "1"
        ? (this.url = this.$url.URL.RECMDLIST + "/" + this.site)
        : (this.url = this.$url.URL.RRNTHOUSE + "/" + this.site); //推荐
      this.$http.get(this.url).then(res => {
        this.tjlist = res.data.data;
      });
      let urlbanner = "";
      this.id == "1"
        ? (urlbanner =
            this.$url.URL.BANNER +
            "/" +
            this.site +
            this.$url.URL.HOUSE_USED_BANNER)
        : (urlbanner =
            this.$url.URL.BANNER +
            "/" +
            this.site +
            this.$url.URL.HOUSE_RENT_BANNER);
      this.$http
        .get(urlbanner) //获取bannerimg
        .then(res => {
          this.bannerimg = res.data.data;
        });
      this._listtop();
      this._erlist();
    },
    btndistricts(item,index){
      this.erealisttwo=item.districts
      this.sctiveoneone=index
      this.sctiveonetwo='100'
      this.areaId=item.id
      this.taberlist[0]=item.name
    },
    btndistrictstwo(item,index){
      this.sctiveonetwo=index
      this.districtId=item.id
      this.page="1"
      this.sslist=[]
      this._erlist()
      this.active = "5";
      this.movesetnumber = false;
      this.taberlist[0]=item.name
    },
    btndistrictsone(){
      this.sctiveoneone='100'
      this.sctiveonetwo='100'
      this.erealisttwo=""
      this.districtId=""
      this.areaId=""
      this.page="1"
      this.sslist=[]
      this._erlist();
      this.active = "5";
      this.movesetnumber = false;
      this.taberlist[0]="区域"
    },
    btndistrictstwotwo(){
      this.sctiveonetwo='100'
      this.districtId=""
      this.page="1"
      this.sslist=[]
      this._erlist();
      this.active = "5";
      this.movesetnumber = false;
    },
    //获取帅选列表
    _listtop() {
      this.$http.get(this.$url.URL.AREADISTRICTS+"/"+this.site)//获取城市以下的片区
      .then(res=>{
        this.erealistone=res.data.data
        this.erealisttwo=[]
      })
      this.$http.get(this.$url.URL.DICTIONARYTWO+"/HOUSE_RENTAL/"+this.site)//房源租金
      .then((res)=>{
        this.HOUSE_RENTAL=res.data.data
      })
      this.$http.get(this.$url.URL.DICTIONARYTWO+"/SELL_PRICE/"+this.site)//房源售价
      .then((res)=>{
        this.SELL_PRICE=res.data.data
      })
      this.$http.post(this.$url.URL.DICTIONARYS, this.sxurl).then(response => {
        this.houselist = response.data.data;

        if (this.houselist.HOUSE_HUXING) {
          this.HOUSE_HUXING = this.houselist.HOUSE_HUXING; //房源户型
        }
        if (this.houselist.SELL_PRICE) {
          this.SELL_PRICE = this.houselist.SELL_PRICE; //房源售价
        }
        if (this.houselist.HOUSE_RENTAL) {
          //房源租金
          this.HOUSE_RENTAL = this.houselist.HOUSE_RENTAL; //房源租金
        }
        if (this.houselist.HOUSE_USE) {
          this.HOUSE_USE = this.houselist.HOUSE_USE; //房源用途
        }
        if (this.houselist.HOUSE_AREA) {
          this.HOUSE_AREA = this.houselist.HOUSE_AREA; //房源面积
        }
        if (this.houselist.HOUSE_TYPE) {
          this.HOUSE_TYPE = this.houselist.HOUSE_TYPE; //房源类型
        }
        if (this.houselist.HOUSE_AGE) {
          this.HOUSE_AGE = this.houselist.HOUSE_AGE; //楼零
        }
        if (this.houselist.BROKER_DUTY) {
          this.BROKER_DUTY = this.houselist.BROKER_DUTY; //经济人职务
        }
      });
    },
    _erlist() {
      var seturl=""
      this.id == "1"
        ? (this.urlone = this.$url.URL.HOUSEQUERYONE)
        : (this.urlone = this.$url.URL.RENTHOUSEQUERYS); //搜索list
      this.id=="1"
        ? seturl={
          scity: this.site,
          pageNo: this.page,
          pageSize: "10",
          keyword: this.keyword, //搜索关键字
          areaId: this.areaId, //区域
          districtId:this.districtId,// 片区
          houseForm: this.houseForm.value, //类型
          maxBuildArea: this.maxBuildArea, //最大面积
          maxPrice: this.maxPrice, //最大价格
          minBuildArea: this.minBuildArea, //最小面积
          minPrice: this.minPrice, //最小价格
          roomsNum: this.roomsNum.value, //户型
        }
        : seturl={
          scity: this.site,
          pageNo: this.page,
          pageSize: "10",
          keyword: this.keyword, //搜索关键字
          areaId: this.areaId, //区域
          districtId:this.districtId,// 片区
          houseForm: this.houseForm.value, //类型
          maxBuildArea: this.maxBuildArea, //最大面积
          minBuildArea: this.minBuildArea, //最小面积
          roomsNum: this.roomsNum.value, //户型
          maxRentPrice:this.maxRentPrice,//最大租金
          minRentPrice:this.minRentPrice,//最小租金
        }
      this.$http
        .post(this.urlone,seturl)
        .then(res => {
          for (let i = 0; i < res.data.data.length; i++) {
            res.data.data[i].houseTag = res.data.data[i].houseTag.split(",");
            if (res.data.data[i].houseTag.length > 3) {
              res.data.data[i].houseTag.splice(3);
            } else {
              res.data.data[i].houseTag = res.data.data[i].houseTag;
            }
          }
          this.sslist = this.sslist.concat(res.data.data);
          this.page++;
        })
        .catch(() => {
          Toast({
            message: "全部加载完成",
            position: "bottom"
          });
        });
    },
    itemonebtn(item, index) {
      this.activeone = index;
      this.roomsNum=item;
    },
    itemtwobtn(item, index) {
      this.activetwo = index;
      var value=item.value.split("-")
      this.minRentPrice =value[0]
      this.maxRentPrice =value[1]
    },
    itemthreebtn(item, index) {
      this.activethree = index;
      var value = item.value.split("-")
      this.minBuildArea=value[0]
      this.maxBuildArea=value[1]
    },
    itemfourbtn(item, index) {
      this.activefour = index;
      this.roomsNum=item;
    },
    roomsNumbtn(){
      this.page="1"
      this.sslist=[];
      this._erlist();
      this.active = "5";
      this.movesetnumber = false;
      this.taberlist[1]=this.roomsNum.name
    },
    roomsNumbtnone(){
      this.page="1"
      this.roomsNum="";
      this._erlist();
      this.active = "5";
      this.movesetnumber = false;  
      this.taberlist[1]="户型"
    },
    itemfivebtn(item, index){
      this.activefive = index;   
      var value=item.value.split("-")
      this.minPrice=value[0]
      this.maxPrice=value[1]
    },
    rentPriceonebtn(){//租房价格请求
      this.page="1"
      this.minRentPrice=""
      this.maxRentPrice=""
      this.sslist=[];
      this._erlist();
      this.active = "5";
      this.movesetnumber = false;
      this.taberlist[2]="价格"
    },
    Priceonebtn(){//价格请求
      this.page="1"
      this.minPrice=""
      this.maxPrice=""
      this.sslist=[];
      this._erlist();
      this.active = "5";
      this.movesetnumber = false;
      this.taberlist[2]="价格"
    },
    rentPricebtn(){
      var reg = /^[0-9]+.?[0-9]*$/;
      if (reg.test(this.minRentPrice)&&reg.test(this.maxRentPrice)) {
        if(parseInt(this.minRentPrice)<parseInt(this.maxRentPrice)){
          this.page="1"
          this.sslist=[];
          this._erlist();
          this.active = "5";
          this.movesetnumber = false;
          this.taberlist[2]=this.minRentPrice+"-"+this.maxRentPrice
        }else{
          MessageBox.alert("输入的最小金额必须小于最大金额")
        }
      }else{
        MessageBox.alert("输入的价格有误")
      }
    },
    Pricebtn(){//价格请求
      var reg = /^[0-9]+.?[0-9]*$/;
      if (reg.test(this.minPrice)&&reg.test(this.maxPrice)) {
        if(parseInt(this.minPrice)<parseInt(this.maxPrice)){
          this.sslist=[];
          this.page="1"
          this._erlist();
          this.active = "5";
          this.movesetnumber = false;
          this.taberlist[2]=this.minPrice+"-"+this.maxPrice
        }else{
          MessageBox.alert("输入的最小金额必须小于最大金额")
        }
      }else{
        MessageBox.alert("输入的价格有误")
      }
    },
    itemsixbtn(item, index) {
      this.activesix = index;
      var value = item.value.split("-")
      this.minBuildArea=value[0]
      this.maxBuildArea=value[1]
    },
    BuildAreaonebtn(){//面积筛选不限
      this.minBuildArea="";
      this.maxBuildArea=""
      this.sslist=[];
      this.page="1"
      this._erlist();
      this.active = "5";
      this.movesetnumber = false;
      this.taberlist[3]="面积"
    },
    BuildAreabtn(){//面积筛选确定
      this.sslist=[];
      this.page="1"
      this._erlist();
      this.active = "5";
      this.movesetnumber = false;
      this.taberlist[3]=this.minBuildArea+"-"+this.maxBuildArea
      
    },
    showbtn(ev) {
        this.$store.searchname=this.textcontent
        this.$router.push({path:'/searchlist/', query: {id:this.id}})
    },
    itemsevenbtn(item, index) {
      this.activeseven = index;
      this.houseForm=item
    },
    houseFormonebtn(){//类型筛选不限
      this.houseForm=""
      this.sslist=[];
      this.page="1"
      this._erlist();
      this.active = "5";
      this.movesetnumber = false;
      this.taberlist[4]="类型"
    },
     houseFormbtn(){//类型筛选确定
      this.sslist=[];
      this.page="1"
      this._erlist();
      this.active = "5";
      this.movesetnumber = false;
      this.taberlist[4]=this.houseForm.name
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
        var taberlist=""
        if(this.$route.path=="/renting/"){
          taberlist=document.querySelectorAll(".taberlist")[1]
        }
      
      if (scrollTop >= "0" && scrollTop <= "40") {
        this.homemove = 10;
        this.movesetnumber = false;
      } else if (scrollTop >= "40" && scrollTop <= "80") {
        this.homemove = 2;
        this.movesetnumber = false;
      } else if (scrollTop >= "80" && scrollTop <= "120") {
        this.homemove = 3;
        this.movesetnumber = false;
      } else if (scrollTop >= "120" && scrollTop <= "160") {
        this.homemove = 4;
        this.movesetnumber = false;
      } else if (scrollTop >= "160" && scrollTop <= "200") {
        this.homemove = 5;
        this.movesetnumber = false;
      } else {
        this.homemove = 1;
      }
      var scolly=taberlist.offsetTop-document.body.scrollTop
      var scrottop=window.document.documentElement.getBoundingClientRect().width/375*44
      if (scolly<=scrottop) {
        this.movesnumbertwo=true;
      } else {
        this.movesnumbertwo=false;
        this.movesetnumber = false;
        this.active = "5";
      }
    },
    shuaixuan(item,index) {
      this.active = index;
      this.movesetnumber = true;
      this.movesnumbertwo=true;
      var scrottop=window.document.documentElement.getBoundingClientRect().width/375*365
      window.scrollTo(0, scrottop);
    },
    yingcangbtn() {
      this.movesetnumber = false;
      this.active = "5";
    },
    gohomebtn() {
      this.$router.go(-1);
    },
    rentingitembtn(item) {
      this.$router.push({
        path: "/rentingitem/" + item.sdid,
        query: { id: this.id }
      });
    }
  },
  
};
</script>
<style scoped lang="less">
@import "../../common/css/master.less";
@import "../../common/css/search.css";
@import "../../common/css/fulist.css";
.renting {
  width: 100%;
  height: 100%;
}
.topseatch {
  border: none;
  background: rgba(255, 255, 255, 0);
}
.searchboxwarpone {
  width: 100%;
  height: 0.44rem;
  position: fixed;
  background: rgba(255, 255, 255, 1);
  top: 0;
  left: 0;
  z-index: 9999;
}
.shuaixuan {
  width: 100%;
}
.shuaixuanss{
  height:100%;
  width:100%;
  position: fixed;
  top:0.44rem;
  z-index:9999;
  background:rgba(1, 1, 1, 0.5);
}
.shuaixuanone{
  border-top:0.005rem solid @bordercolor_1;
  position: fixed;
  top:0.79rem;
  z-index:999999;
}
.activecolor{
  color:@colorone !important;
}
.shuaixuantwo{
  border-top:0.005rem solid @bordercolor_1;
  position: fixed;
  top:0.79rem;
   z-index:999999;
}
.searchboxwarponea {
  width: 100%;
  height: 0.44rem;
  position: fixed;
  background: rgba(255, 255, 255, 0.2);
  top: 0;
  left: 0;
  z-index: 99;
}
.shuaixuanonese {
  width: 100%;
  height: 200% !important;
  background: rgba(1, 1, 1, 0.5);
}
.searchboxwarponeb {
  width: 100%;
  height: 0.44rem;
  position: fixed;
  background: rgba(255, 255, 255, 0.4);
  top: 0;
  left: 0;
  z-index: 9999;
}
.searchboxwarponec {
  width: 100%;
  height: 0.44rem;
  position: fixed;
  background: rgba(255, 255, 255, 0.6);
  top: 0;
  left: 0;
  z-index: 9999;
}
.searchboxwarponed {
  width: 100%;
  height: 0.44rem;
  position: fixed;
  background: rgba(255, 255, 255, 0.8);
  top: 0;
  left: 0;
  z-index: 9999;
}
.searchboxone {
  width: 3.3rem;
  height: 0.35rem;
  position: fixed;
  top: 0.0045rem;
  background-color: #f2f2f2;
  border-radius: 0.04rem;
}
.taberlist{
  background:@colorthree;
}
.swiperitem {
  height: 2rem;
}
.swiperitemitem{
  width:100%;
  height:100%;
   img{
     width:100%;
     height:100%;
   }
}
#recommend {
  width: 100%;
  text-indent: 0.12rem;
  font-size: 0.2rem;
  font-weight: bold;
  margin-top: 0.25rem;
}
.swiperershoufangtwo {
  width: 100%;
  overflow: hidden;
  margin-top: 0.15rem;
}
.swiperfangitemtwo {
  width: 1.9rem !important;
  height: 1.2rem;
  border-radius: 0.06rem;
  margin: 0;
  margin-left: 0.12rem;
  overflow: hidden;
  // background: url(../../imgs/home/banner.png) no-repeat;
  background-size: 100% 100%;
}
.swiperfangitemtwo>div{
  margin-top:0.09rem;
}
.swiperfangitemtwo>div:nth-of-type(1){
  margin-top:0.2rem;
}
.tabercontent {
  margin-top: 0.25rem;
}
.taberlists {
  position: fixed;
  top:0.44rem;
  border: none;
  background: #f9f9f9;
  z-index: 99999;
}
.cnxhlist {
  margin-bottom: 0;
  min-height:1000px;
}
.shuaixuanonesd {
  position: fixed;
  top: 0.44rem;
  z-index: 99999;
  width:100%;
}
.taberclass {
  width: 25% !important;
}
.swipername {
  width: 100%;
  font-size: 0.18rem;
  color: #ffffff;
  margin-top: 0.2rem;
  text-indent: 0.2rem;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}
.swipernametwo {
  font-size: 0.13rem;
  margin-left: 0.2rem;
  color: #ffffff;
}
.swipernametwo > span:nth-of-type(2) {
  margin: 0 0.05rem;
}
.swipernamethree {
  font-size: 0.17rem;
  color: @colorone;
  margin-left: 0.2rem;
  margin-top: 0.1rem;
}
.swipernamethree > span {
  margin-left: 0.05rem;
  font-size: 0.11rem;
  color: #ffffff;
}
.swipernamefour {
  font-size: 0.2rem;
  color: @colorone;
  margin-left: 0.2rem;
  margin-top: 0.1rem;
}
.swipernamefour > span {
  margin-left: 0.05rem;
  font-size: 0.11rem;
}
.gobtnclass {
  background: @colorone;
}
.mint-msgbox-wrapper{
  z-index:99999;
}
</style>

