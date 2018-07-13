<template>
  <div class="searchlist">
    <div class="topseatch">
        <img src="../../imgs/home/fanhui.png" alt="" @click="gohomebtn">
        <div id="topserchbox">
            <img src="../../imgs/home/homesousuo.png" alt="" srcset="">
            <form action="javascript:search();"> 
                <input type="text" placeholder="请输入您要查询的信息" v-model="serchname" @keyup.enter="serchbtn($event)">
            </form>
            
        </div>
    </div>
    
    <div class="tabercontent">
    <div class="shuaixuan" :class="{shuaixuanonese:removerone}"  @click.self="removebtn">
    <ul class="taberlist">
        <li v-for="(item,index) in taberlist" @click.stop="activebtn(index)">
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
    <div class="shuaixuantwo shuaixuantwo_xuanxuan" v-else-if="active=='1'">
        <div v-for= "(item,index) in houselist"  :class="{sxuanitem:activeone==index}"  @click="itemonebtn(item,index)">{{item.name}}</div>
        <div class="bottomdiv_1">
        <p class="gobtnclasstwo" @click.stop="shaixuanbtnone">条件不限</p>
        <p class="gobtnclass" @click.stop="shaixuanbtn">确定</p>
        </div>
        
    </div>
     <div class="shuaixuantwo shuaixuantwo_2" v-else-if="active=='2'">
        <div v-for="(item,index) in typelist" :class="{sxuanitem:activetwo==index}" @click="ytpelistbtn(item,index)">{{item.name}}</div>
        <div class="bottomdiv_1">
        <p class="gobtnclasstwo"  @click="activebtnone">条件不限</p>
        <p class="gobtnclass" @click="activebtntwo">确定</p>
        </div>
    </div>
    </div>
    <div class="cnxhlist" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10"
  infinite-scroll-immediate-check="true">
           <ul id="cnxhlistul">
               <li @click="brokeritem(item)" v-for="item in listone">
                   <div class="cnxhlistdiv">
                       <div class="cnxhlistleft">
                           <img v-lazy="item.photo" alt="">
                       </div>
                       <ul class="cnxhlistright">
                           <li>
                               <div>{{item.emplName}}<span>{{item.positionName}}</span></div>
                               <div>{{item.grade}} <span>评分</span></div>
                           </li>
                           <li>
                               {{item.deptName}}
                           </li>
                           <li>
                               <div v-for="item in item.emplFlag">{{item}}</div>
                           </li>
                       </ul>
                   </div>
               </li>
            </ul>
    </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  name: "HelloWorld",
  data() {
    return {
      id: "1",
      sctiveonetwo: null, //片区颜色
      sctiveoneone: null, //区域颜色
      activeone: null, //帅选颜色
      activetwo: null, //排序颜色
      removerone: false,
      serchname: "", //搜索name
      active: "5", //过滤控制
      keyword: "", //搜索关键字
      shuaixuan: "", //筛选存储的值
      screen: "", //排序存储的值
      areaId: "", //区域id
      districtId: "", //片区id
      taberlist: ["区域", "筛选", "排序"],
      erealistone: "", //帅选区域列表
      erealisttwo: "", //帅选区域列表
      houselist: [
        "区域经理",
        "置业顾问",
        "高级置业顾问",
        "豪宅专员",
        "高级豪宅专员"
      ], //户型帅选
      typelist: [
        { name: "评分", value: "GRADE" },
        { name: "带看量", value: "DK_COUNT" },
        { name: "成交量", value: "DEAL_COUNT" }
      ], //住宅类型筛选
      list: "", //获取的数据
      site: window.localStorage.site, //城市
      listone: [],
      page: "1",
      numberlor: false
    };
  },
  created() {
    this._querys();
    this._shaixuanlist();
  },
  methods: {
    serchbtn(ev) {
      //搜索确定按钮
      this.numberlor = false;
      scrollTo(0, 0);
      this.taberlist = ["区域", "筛选", "排序"];
      (this.shuaixuan = ""), //筛选存储的值
        (this.screen = ""), //排序存储的值
        (this.areaId = ""), //区域id
        (this.districtId = ""), //片区id
        (this.keyword = this.serchname);
      this.listone = [];
      this.page = 1;
      this._querys();
    },
    erealistbtnbx() {
      //点击区域不限
      this.numberlor = false;
      scrollTo(0, 0);
      this.areaId = "";
      this.districtId = "";
      this.sctiveoneone = "100";
      this.removerone = false;
      this.taberlist[0] = "区域";
      this.active = null;
      this.page = "1";
      this.listone = [];
      this._querys();
    },
    erealistonebtn(item, index) {
      //点击区域
      this.areaId = item;
      this.sctiveoneone = index;
      this.erealisttwo = item.districts;
      this.districtId = "";
      this.taberlist[0] = item.name;
    },
    erealistitembtnbx() {
      //点击片区不限
      this.numberlor = false;
      scrollTo(0, 0);
      this.districtId = "";
      this.taberlist[0] = "区域";
      this.sctiveonetwo = "100";
      this.removerone = false;
      this.active = null;
      this.page = "1";
      this.listone = [];
      this._querys();
    },
    erealistoneitembtn(item, index) {
      //点击片区
      this.numberlor = false;
      scrollTo(0, 0);
      this.districtId = item;
      this.sctiveonetwo = index;
      this.removerone = false;
      this.active = null;
      this.taberlist[0] = item.name;
      this.page = 1;
      this.listone = [];
      this._querys();
    },
    itemonebtn(item, index) {
      //点击筛选
      this.activeone = index;
      this.shuaixuan = item;
    },
    shaixuanbtnone() {
      //筛选不限
      this.numberlor = false;
      scrollTo(0, 0);
      this.taberlist[1] = "筛选";
      this.removerone = false;
      this.active = null;
      this.activeone = null;
      this.shuaixuan = "";
      this.page = 1;
      this.listone = [];
      this._querys();
    },
    shaixuanbtn() {
      //筛选确认
      this.numberlor = false;
      scrollTo(0, 0);
      this.taberlist[1] = this.shuaixuan.name;
      this.page = 1;
      this.listone = [];
      this._querys();
      this.removerone = false;
      this.active = null;
    },
    ytpelistbtn(item, index) {
      //点击排序
      this.activetwo = index;
      this.screen = item;
    },
    activebtnone() {
      //排序条件不限
      this.numberlor = false;
      scrollTo(0, 0);
      this.screen = "";
      this.taberlist[2] = "排序";
      this.page = 1;
      this.listone = [];
      this._querys();
      this.removerone = false;
      this.activetwo = null;
      this.active = null;
    },
    activebtntwo() {
      //排序条件确定
      this.numberlor = false;
      scrollTo(0, 0);
      this.taberlist[2] = this.screen.name;
      this.page = 1;
      this.listone = [];
      this._querys();
      this.removerone = false;
      this.active = null;
    },
    _shaixuanlist() {
      this.$http
        .get(this.$url.URL.AREADISTRICTS + "/" + this.site) //获取城市以下的片区
        .then(res => {
          this.erealistone = res.data.data;
          this.erealisttwo = [];
        });
      this.$http.get(this.$url.URL.DICTIONARY + "/BROKER_DUTY").then(res => {
        this.houselist = res.data.data;
      });
    },
    loadMore() {
      if (this.numberlor) {
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
        .post(this.$url.URL.BROKERS, {
          scity: this.site,
          pageSize: 10,
          pageNo: this.page,
          keyword: this.keyword, //搜索关键字
          areaId: this.areaId.id, //区域id
          districtId: this.districtId.id, //片区id
          positiId: this.shuaixuan.value, //岗位id
          sortMode: this.screen.value //排序
        })
        .then(res => {
          this.numberlor = true;
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].emplFlag) {
              res.data.data[i].emplFlag = res.data.data[i].emplFlag.split(",");
            }
          }
          this.listone = this.listone.concat(res.data.data);
          this.page++;
        });
    },
    gohomebtn() {
      this.$router.go(-1);
    },
    brokeritem(item) {
      this.$router.push({ path: "/brokeritem/" + item.id });
    },
    activebtn(index) {
      this.active = index;
      this.removerone = true;
    },
    removebtn() {
      this.removerone = false;
      this.active = null;
    },
    rentingitembtn() {
      this.$router.push({ path: "/rentingitem/", query: { id: this.id } });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="less">
@import "../../common/css/master.less";
@import "../../common/css/search.css";
@import "../../common/css/fulist.css";
.searchlist {
  width: 100%;
  min-height: 100%;
}
.tabercontent {
  margin-top: 0.44rem;
}
#shuaixuancolor {
  color: @colorone;
}
.shuaixuanname {
  color: @colorone;
}
.taberlist > li {
  width: 33.33333333%;
}
.cnxhlist {
  margin-top: 0.35rem;
  margin-bottom: 0;
  width:100%;
  min-height:100%;
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
#cnxhlistul {
  min-height: 100%;
  overflow: hidden;
}
#cnxhlistul > li:nth-last-of-type(1) {
  border: none;
}
#cnxhlistul > li {
  width: 100%;
  height: 1.05rem;
  float:left;
  overflow: hidden;
  border-bottom: 1px solid #cacaca;
}
.cnxhlistdiv {
  margin-left: 0.12rem;
  margin-right: 0.12rem;
  height: 0.75rem;
  margin-top: 0.15rem;
}
.cnxhlistleft {
  width: 0.75rem;
  height: 100%;
  float: left;
  border-radius: 50%;
  overflow: hidden;
}
.cnxhlistleft > img {
  width: 100%;
  height: 100%;
  float: left;
}
.cnxhlistright {
  width: 2.5rem;
  height: 100%;
  float: right;
  overflow: hidden;
}
.cnxhlistright > li {
  float: left;
  overflow: hidden;
}
.cnxhlistright > li:nth-of-type(1) {
  width: 100%;
  font-size: 0.18rem;
  margin-top:0.2rem;
  overflow: hidden;
}
.cnxhlistright > li:nth-of-type(1) > div:nth-of-type(1) {
  float: left;
}
.cnxhlistright > li:nth-of-type(1) > div:nth-of-type(1) > span {
  font-size: 0.14rem;
  color: #999999;
  margin-left: 0.1rem;
}
.cnxhlistright > li:nth-of-type(1) > div:nth-of-type(2) {
  float: right;
  color: @colorone;
}
.cnxhlistright > li:nth-of-type(1) > div:nth-of-type(2) > span {
  font-size: 0.13rem;
  color: #999999;
}
.cnxhlistright > li:nth-of-type(2) {
  font-size: 0.15rem;
  color: #666666;
  margin-top: 0.09rem;
  overflow: hidden;
  line-height: 1.1;
}
.cnxhlistright > li:nth-of-type(3) {
  width: 100%;
  font-size: 0.12rem;
  color: #999999;
  margin-top: 0.09rem;
}
.cnxhlistright > li:nth-of-type(3) > div {
  float: left;
  width: 0.65rem;
  height: 0.23rem;
  line-height: 0.23rem;
  text-align: center;
  background: #f9f9f9;
  margin-right: 0.05rem;
}
.shuaixuantwo_xuanxuan > div {
  width: 28.5%;
}
</style>
