<template>
    <div class="sellrent">
        <headerone :dataname="dataname" class="headerone"></headerone>
        <mt-swipe :auto="4000" class="swiperitem">
            <mt-swipe-item v-for="(item,index) in bannerimg" :key="index" class="swiperitemitem">
                <img :src="item.picUrl|imgfilter" alt="" srcset="">
            </mt-swipe-item>
        </mt-swipe>
        <div class="navtitle">
          <ul>
            <li :class="{class_23:id=='3'}" v-for="(item,index) in listone" :key="index" @click="activebtn(item,index)">
              <img src="../../imgs/home/xuanzhong.png" alt="" v-if="index==active">
              <img src="../../imgs/home/weixuanz.png" alt="" v-else>
              <span>{{item}}</span>
            </li>
          </ul>
        </div>
        <ul class="ulboxwarp">
            <li>
                <div>姓名</div>
                <input type="text" placeholder="请输入您的姓名" v-model="linkman">
            </li>
            <li>
                <div>电话</div>
                <p>{{photo}}</p>
            </li>
            <li>
                <div>城市</div>
                <p>{{cityname.name}}</p>
                <img src="../../imgs/home/gengduojiantou.png" alt="" @click="citybtn">
            </li>
            <li>
                <div>小区</div>
                <p>{{buildingName.buildName}}</p>
                <img src="../../imgs/home/gengduojiantou.png" alt="" @click="buildingbtn">
            </li>
            <li>
                <div>栋座/单元/门牌号</div>
                <p>{{fangyuanxinxi}}</p>
                <img src="../../imgs/home/gengduojiantou.png" alt="" @click="buildingtwobtn">
            </li>
            <li>
                <div>具体地址</div>
                <input type="text" placeholder="请输入您房源的具体地址" v-model="address">
            </li>
        </ul>
         <ul class="ulboxwarp" style="margin-top:0.05rem;">
           <li v-if="this.id=='3'">
                <div>代办业务类型</div>
                <p>{{dbywlx.name}}</p>
                <img src="../../imgs/home/gengduojiantou.png" alt="" @click="worktypebtn">
            </li>
            <li style="border:none;">
                <div>经纪人</div>
                <p>{{brokername.emplName}}</p>
                <img src="../../imgs/home/gengduojiantou.png" alt="" @click="brokerlistbtn">
            </li>
         </ul>
        <div class="bottomnames">我们将在最短的时间内与您联系</div>
         <buttonone class="buttonone" :buttonname="buttonname" @click.native="addbtn"></buttonone>
    </div>
</template>
<script>
import headerone from "../module/headertwo";
import buttonone from "../module/buttonone";
import { MessageBox, Toast } from "mint-ui";
import { locationmap } from "../../common/js/locationmap.js";
export default {
  name: "sellrent",
  data() {
    return {
      dataname: "我要卖房",
      active: 0,
      icobol: true,
      listone: ["业主", "推荐人"],
      icobolone: false,
      buttonname: "提交",
      site: window.localStorage.site,
      bannerimg: "", //banner图
      fangyuanxinxi: "房源信息",
      mydata: JSON.parse(window.localStorage.dc_mydata),
      photo: "", //电话号码
      brokername: "", //经纪人
      applicantType: "", //申请人类型
      id: "", //判断是售房页面还是租房页面
      posturl: "", //获取接口
      address: "", //详细地址
      buildingName: "房源所在小区", //小区名称,必填
      cityname: "", //城市编码,必填
      linkman: "", //姓名,必填
      roomNum: "", // 房号,必填
      unitNum: "", // 单元号,必填
      buildNum: "", //栋号,必填
      dbywlx: "" //代办业务类型
    };
  },
  created() {
    this.id = this.$route.params.id;
    locationmap(this).then(() => {
      this.querysone();
    });
    if (this.id == "1") {
      this.dataname = "我要卖房";
      this.posturl = this.$url.URL.HOUSEENTRUSTAPPLYSELLHOUSE;
    } else {
      this.dataname = "我要出租";
      this.posturl = this.$url.URL.HOUSEENTRUSTAPPRENTHOUSE;
    }
    this.photo =
      this.mydata.mobile.substring(0, 3) +
      "****" +
      this.mydata.mobile.substring(8, 11);
  },
  activated() {
    this.id = this.$route.params.id;
    locationmap(this).then(() => {
      this.querysone();
    });
    if (this.id == "1") {
      this.dataname = "我要卖房";
      this.posturl = this.$url.URL.HOUSEENTRUSTAPPLYSELLHOUSE;
      this.listone = ["业主", "推荐人"];
      this.applicantType = "OWNER";
    } else if (this.id == "2") {
      this.dataname = "我要出租";
      this.posturl = this.$url.URL.HOUSEENTRUSTAPPRENTHOUSE;
      this.listone = ["业主", "推荐人"];
      this.applicantType = "OWNER";
    } else {
      this.dataname = "代办业务";
      this.posturl = this.$url.URL.LOANGANCYAPPLYREST;
      this.listone = ["卖方", "买方", "推荐人"];
      this.applicantType = "SELLER";
    }
    this.$store.business //代办业务类型
      ? (this.dbywlx = this.$store.business)
      : (this.dbywlx = { name: "请选择代办业务类型", value: "" });
    this.$store.mpitem //门牌
      ? (this.roomNum = this.$store.mpitem)
      : (this.roomNum = "");
    this.$store.dyitem //单元
      ? (this.unitNum = this.$store.dyitem)
      : (this.unitNum = "");
    this.$store.dzitem //栋座
      ? (this.buildNum = this.$store.dzitem)
      : (this.buildNum = { name: "", id: "" });
    this.$store.housing //小区缓存
      ? (this.buildingName = this.$store.housing)
      : (this.buildingName = { buildName: "房源所在地" });
    this.$store.cityname //选择城市缓存
      ? (this.cityname = this.$store.cityname)
      : (this.cityname = { name: "请选择你房源所在城市", key: "" });
    this.$store.brokername //选择经纪人缓存
      ? (this.brokername = this.$store.brokername)
      : (this.brokername = { emplName: "请选择跟进经纪人", id: "" });
    if (
      this.buildingName.id &&
      this.buildNum.id &&
      this.unitNum &&
      this.roomNum
    ) {
      this.address =
        this.buildingName.buildName +
        " " +
        this.buildNum.name +
        " " +
        this.unitNum +
        " " +
        this.roomNum;
    } else if (this.buildingName.id && this.buildNum.id && this.unitNum) {
      this.address =
        this.buildingName.buildName +
        " " +
        this.buildNum.name +
        " " +
        this.unitNum;
    } else if (this.buildingName.id && this.buildNum.id) {
      this.address = this.buildingName.buildName + " " + this.buildNum.name;
    } else if (this.buildingName.id) {
      this.address = this.buildingName.buildName;
    } else {
      this.address = "";
    }
    if (this.roomNum || this.unitNum || this.buildNum) {
      this.fangyuanxinxi =
        this.buildNum.name + " " + this.unitNum + " " + this.roomNum;
    } else {
      this.fangyuanxinxi = "房源信息";
    }
  },
  methods: {
    querysone() {
      var banner = "";
      this.id == "1"
        ? (banner = "/WILL_HOUSE_SELL_BANNER")
        : (banner = "/WILL_HOUSE_RENT_BANNER");
      this.$http
        .get(this.$url.URL.INFORMATION + "/" + this.site + banner)
        .then(res => {
          this.bannerimg = res.data.data;
        });
    },
    activebtn(item, index) {
      //按钮点击
      this.active = index;
      if (item == "业主") {
        this.applicantType = "OWNER";
      } else if (item == "推荐人") {
        this.applicantType = "RECMD_MAN";
      } else if (item == "卖方") {
        this.applicantType = "SELLER";
      } else {
        this.applicantType = "PURCHASER";
      }
    },
    citybtn() {
      this.$store.mpitem = ""; //门牌
      this.$store.dyitem = ""; //单元
      this.$store.dzitem = { name: "", id: "" }; //栋座
      this.$store.housing = ""; //小区缓存
      this.$store.brokername = ""; //选择经纪人缓存

      //选择城市
      this.$store.citynumber = false;
      this.$router.push("/indexlist");
    },
    worktypebtn() {
      this.$router.push("/worktype");
    },
    buildingbtn() {
      if (this.$store.cityname) {
        this.$router.push("/estatechoose/1");
      } else {
        Toast({
          message: "请先选择城市",
          position: "bottom",
          duration: 500
        });
      }
    },
    buildingtwobtn() {
      if (this.$store.housing) {
        this.$router.push("/estatechoose/2");
      } else {
        Toast({
          message: "请先选择小区",
          position: "bottom",
          duration: 500
        });
      }
    },
    addbtn() {
      if (this.id == "3") {
        //提交代办贷款
        if (this.linkman) {
          if (this.cityname.key) {
            if (
              this.buildingName.buildName !== "" &&
              this.buildingName.buildName !== "房源所在地"
            ) {
              if (this.dbywlx.value) {
                if (this.brokername.id) {
                  this._querystwo();
                } else {
                  MessageBox.alert("请选择经纪人");
                }
              } else {
                MessageBox.alert("请选择代办类型");
              }
            } else {
              MessageBox.alert("请输入房源小区");
            }
          } else {
            MessageBox.alert("请选择城市");
          }
        } else {
          MessageBox.alert("请填写姓名");
        }
      } else {
        //提交申请列表
        if (this.linkman) {
          if (this.cityname.key) {
            if (
              this.buildingName.buildName !== "" &&
              this.buildingName.buildName !== "房源所在地"
            ) {
              if (this.brokername.id) {
                this._querys();
              } else {
                MessageBox.alert("请选择经纪人");
              }
            } else {
              MessageBox.alert("请输入房源小区");
            }
          } else {
            MessageBox.alert("请选择城市");
          }
        } else {
          MessageBox.alert("请填写姓名");
        }
      }
    },

    _querystwo() {
      //提交申请列表请求
      this.$http
        .post(this.posturl, {
          address: this.address, //详细地址
          brokerId: this.brokername.id, //经纪人,必填
          buildNum: this.buildNum.name, //栋号,必填
          buildingName: this.buildingName.buildName, //小区名称,必填
          cityCode: this.cityname.key, //城市编码,必填
          applicantType: this.applicantType, //经纪人类型
          name : this.linkman, //姓名,必填
          phone: this.mydata.mobile, //联系电话,必填
          roomNum: this.roomNum, // 房号,必填
          unitNum: this.unitNum, // 单元号,必填
          loanAgencyType: this.dbywlx.value //代办类型
        })
        .then(res => {
          MessageBox.alert(res.data.msg);
          if (res.data.status == "1") {
            this._qingchuvuex();
            this.$router.go(-1);
          }
        });
    },
    _querys() {
      //提交申请列表请求
      this.$http
        .post(this.posturl, {
          address: this.address, //详细地址
          brokerId: this.brokername.id, //经纪人,必填
          buildNum: this.buildNum.name, //栋号,必填
          buildingName: this.buildingName.buildName, //小区名称,必填
          cityCode: this.cityname.key, //城市编码,必填
          applicantType: this.applicantType, //经纪人类型
          linkman: this.linkman, //姓名,必填
          phone: this.mydata.mobile, //联系电话,必填
          roomNum: this.roomNum, // 房号,必填
          unitNum: this.unitNum // 单元号,必填
        })
        .then(res => {
          MessageBox.alert(res.data.msg);
          if (res.data.status == "1") {
            this._qingchuvuex();
            this.$router.go(-1);
          }
        });
    },
    _qingchuvuex() {
      this.$store.business = "";
      this.$store.mpitem = "";
      this.$store.dyitem = "";
      this.$store.dzitem = "";
      this.$store.housing = "";
      this.$store.cityname = "";
      this.$store.brokername = "";
      this.linkman = "";
    },
    brokerlistbtn() {
      //经纪人列表
      if (this.cityname.key) {
        this.$router.push("/brokerlist/1");
      } else {
        Toast({
          message: "请选择城市",
          position: "bottom",
          duration: 500
        });
      }
    },
    icobtn() {
      this.icobol = true;
      this.icobolone = false;
    },
    icobtnone() {
      this.icobol = false;
      this.icobolone = true;
    }
  },
  components: {
    headerone,
    buttonone
  }
};
</script>
<style scoped lang="less">
@import "../../common/css/master.less";
.sellrent {
  width: 100%;
  // min-height:100%;
  background: #f8f8f8;
  overflow: hidden;
  padding-bottom: 0.4rem;
}
.headerone {
  width: 100%;
  background: rgba(255, 255, 255, 0) !important;
  border: none !important;
  position: fixed;
  top: 0;
  color: #333333 !important;
}
.swiperitem {
  width: 100%;
  height: 2rem;
}
.navtitle {
  width: 100%;
  background: @colorthree;
  > ul {
    margin: 0 0.12rem;
    padding: 0.25rem 0;
    overflow: hidden;
    // >li:nth-of-type(1){
    //   text-align: left;
    // }
    // >li:nth-last-of-type(1){
    //   text-align: right;
    // }
    > li {
      width: 50%;
      float: left;
      font-size: @fontsize_2;
      color: #333333;
      text-align: center;
      > img {
        width: 0.15rem;
        height: 0.15rem;
        margin-right: 0.15rem;
        vertical-align: middle;
      }
      > span {
        vertical-align: middle;
      }
    }
  }
}
.class_23 {
  width: 33.3333333% !important;
}
.swiperitemitem {
  width: 100%;
  height: 100%;
  > img {
    width: 100%;
    height: 100%;
  }
}
.ulboxwarp {
  width: 100%;
  background-color: #ffffff;
  // margin-top: 0.1rem;
}
.ulboxwarp > li:nth-last-of-type(1) {
  border: none;
}
.ulboxwarp > li {
  margin-left: 0.12rem;
  margin-right: 0.12rem;
  height: 0.5rem;
  font-size: @fontsize_2;
  line-height: 0.5rem;
  box-sizing: border-box;
  border-bottom: 0.005rem solid @bordercolor_1;
}
.ulboxwarp > li > div {
  float: left;
  line-height: 0.5rem;
}
.ulboxwarp > li > input {
  width: 70%;
  display: inline-block;
  font-size: @fontsize_3;
  margin-left: 0.3rem;
  color: @color_4;
}
.ulboxwarp > li:nth-of-type(3) {
  border-bottom: 0.005rem solid @bordercolor_1;
}
.ulboxwarp > li > p {
  float: left;
  font-size: @fontsize_3;
  margin-left: 0.3rem;
  line-height: 0.5rem;
  color: @color_4;
}
.ulboxwarp > li > input::-webkit-input-placeholder {
  /*Chrome/Safari*/
  color: @color_4;
}
::-moz-placeholder {
  /*Firefox*/
  color: @color_4;
}
::-ms-input-placeholder {
  /*IE*/
  color: @color_4;
}
.ulboxwarp > li > img {
  float: right;
  width: 0.1rem;
  height: 0.18rem;
  margin-top: 0.16rem;
}
.bottomnames {
  font-size: 0.12rem;
  float: left;
  margin-top: 0.1rem;
  margin-left: 0.12rem;
  color: #999999;
}
#ulid_1 {
  margin-left: 0.12rem;
  margin-right: 0.12rem;
  height: 0.5rem;
  border-bottom: 0.005rem solid @bordercolor_1;
  > div {
    height: 0.5rem;
    float: left;
    font-size: @fontsize_2;
    color: @color_1;
    margin-right: 0.15rem;
    > input {
      font-size: @fontsize_3;
      color: @color_4;
      width: 0.5rem;
      margin-left: 0.1rem;
    }
  }
}
.buttonone {
  float: left;
  margin-left: 10%;
  margin-top: 0.5rem;
  font-size: @fontsize_3;
}
</style>

