<template>
    <div class="rentingitem">
        <div class="titlename" :class="{searchboxwarpone:homemove==1,searchboxwarponea:homemove==2,searchboxwarponeb:homemove==3,searchboxwarponec:homemove==4,searchboxwarponed:homemove==5}">
            <img v-if="homemove>5" class="gorentingimg" src="../../imgs/home/fanhuitwo.png" alt="" @click="gohomebtn">
            <img v-else class="gorentingimg" src="../../imgs/home/fanhui.png" alt="" @click="gohomebtn">
            <img class="titleimgone" v-if="imgone=='1'" src="../../imgs/home/shouchangwxz.png" alt="" @click="collectbtn">
            <img class="titleimgone" v-else-if="imgone=='2'" src="../../imgs/home/weixuanzhes.png" alt="" @click="collectbtn">
            <img class="titleimgone" v-else src="../../imgs/home/shoucangxz.png" alt=""  @click="collectonebtn">
            <!-- <img class="fengxiangimg" v-if="imgfour=='1'" src="../../imgs/home/fengxiang.png" alt="">
            <img class="fengxiangimg" v-else-if="imgfour=='2'" src="../../imgs/home/fengxianghese.png" alt=""> -->
            <img class="titleimgtwo" v-if="imgtwo=='1'&&id=='1'" src="../../imgs/home/daikanliebiaobaise.png" alt="" @click="daikanlistbtn">
            <img class="titleimgtwo" v-else-if="imgtwo=='2'&&id=='1'" src="../../imgs/home/daikanliebiaohuise.png" alt="" @click="daikanlistbtn">
            <img class="titleimgthree" v-if="imgthree=='1'&&id=='1'" @click="comparisonbtn" src="../../imgs/home/duibiliebiaobai.png" alt="">
            <img class="titleimgthree" v-else-if="imgthree=='2'&&id=='1'" @click="comparisonbtn" src="../../imgs/home/duibiliebiaohuise.png" alt="">
            <div class="div_1_one" v-show="id=='1'&&addCount.contrastCount!='0'&&addCount.contrastCount!=undefined" style="right:0.75rem;">{{addCount.contrastCount}}</div>
            <div class="div_1_one" v-show="id=='1'&&addCount.appointCount!='0'&&addCount.appointCount!=undefined">{{addCount.appointCount}}</div>
        </div>
         <mt-swipe :auto="3000" class="swiperitem" :showIndicators="false" @change="handleChange">
            <mt-swipe-item v-for="(item,index) in dataone.housePicList" :key="index" class="swiperitembox">
                    <img :src="item" alt="" srcset="">
            </mt-swipe-item>
        </mt-swipe>
        <div class="swiperdivone">{{activeindex}}/{{dataone.housePicList.length}}</div>
        <div class="locathionclass">
            <div style="line-height:1.2;">{{dataone.houseTitle}}</div>
        </div>
        <ul class="ul_1">
            <li v-if="id=='1'">
                <div>售价</div>
                <div>{{dataone.saleTotal}}万</div>
            </li>
            <li v-else>
              <div>租金</div>
              <div>{{dataone.rentPrice}}元/月</div>
            </li>
            <li>
                <div>户型</div>
                <div>{{dataone.houseType}}</div>
            </li>
            <li v-if="id=='1'">
                <div>建筑面积</div>
                <div>{{dataone.builtArea}}<span>㎡</span></div>
            </li>
            <li v-else>
                <div>家具</div>
                <div>{{dataone.houseElec}}</div>
            </li>
        </ul>
        <div class="locathionname">
            房源信息
        </div>
        <ul class="ullistname">
            <li v-if="id=='1'">单价：<span>{{dataone.saleprice}}元/平</span></li>
            <li v-else>方式：<span>{{dataone.rentPayType}}</span></li>
            <li>朝向：<span>{{dataone.houseDirection}}</span></li>
            <li>装修：<span>{{dataone.houseDecoration }}</span></li>
            <li>年代：<span>{{dataone.buildAge}}年</span></li>
            <li>车位：<span>{{dataone.carNum}}位</span></li>
            <li v-if="id=='1'">产权：<span>{{dataone.houseRight}}</span></li>
            <li v-else>租期：<span>{{dataone.rentLowestPeriod}}</span></li>
            <li>物业费：<span>{{dataone.houseManageFee}}元/平</span></li>
            <li v-if="id=='1'">类型：<span>{{dataone.houseForm}}</span></li>
            <li v-else>面积：<span>{{dataone.builtArea}}㎡</span></li>
            <li>电梯：<span>{{dataone.elevator}}</span></li>
            <li v-if="id=='1'">所在楼层：<span>{{dataone.floor}}</span></li>
            <li v-else>房屋类型：<span>{{dataone.houseForm}}</span></li>
            <li>现状：<span>{{dataone.houseCurrentStatus}}位</span></li>
            <li>用途：<span>{{dataone.houseUse}}位</span></li>
            <li v-if="id=='1'">首付预算：<span>{{dataone.paymentBudget}}</span></li>
            <li v-else>家具：<span id="id_11">{{dataone.houseElec}}</span></li>
        </ul>
        <div class="locathionname">房源位置</div>
        <div id="allmap" tabindex="0" @click="mapboxonebtn"></div>
        <div class="locathionname">房源动态</div>
        <ul class="ul_2">
            <li>
                <div>近七日带看（次）</div>
                <div>{{dataone.day7Num}}</div>
            </li>
            <li>
                <div>近30日带看（次）</div>
                <div>{{dataone.day30Num}}</div>
            </li>
            <li>
                <div>收藏房源（人）</div>
                <div>{{dataone.collectNum}}</div>
            </li>
        </ul>
        <div class="ul_3">
            <li>带看记录</li>
            <li @click="lookrecordbtn"><span>最近带看{{dataone.recentlySee}}</span><img src="../../imgs/home/gengduojiantou.png" alt=""></li>
        </div>
        <div class="locathionname">关联小区</div>
                <div class="contentbox" @click="rentingitembtn(datatwo)">
                    <div class="contentboxleft">
                        <img v-lazy="datatwo.housePic" alt="">
                    </div>
                    <div class="contentboxright">
                        <div>
                            {{datatwo.buildName}}
                        </div>
                        <div>
                            {{datatwo.districtName}}/{{datatwo.buildAge}}年建成/{{datatwo.buildType }}
                        </div>
                        <div>
                            在售{{datatwo.saleCount}}套/在租{{datatwo.rentCount}}套
                        </div>
                        <div v-if="id=='1'">
                          <div>{{datatwo.avgSalePrice}}<span>元/平</span></div>   
                        </div>
                         <div v-else>
                            <div>{{datatwo.avgRentPrice}}<span>元/月</span></div>           
                        </div>
                    </div>
                </div>    
        <div class="locathionname">
            同小区房源
            <div @click="hotdisitembtn">更多小区房源 <img src="../../imgs/home/gengduojiantou.png" alt=""></div>    
        </div>
        <div class="cnxhlist">
            <div class="cnxhlistitem"  @click="listbtn(item)" v-for="(item,index) in housinglist" :key="index">
                <div class="cnxhcontnet">
                    <div class="cnxhcontnetleft">
                        <img v-lazy="item.housePic" alt="">
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
                            <div v-for="(item,index) in item.houseTag " :key="index">{{item}}</div>
                        </div>
                         <div class="cnxhconterfive" v-if="id=='1'">
                            <div v-if="id='1'">{{item.saleTotal}}万</div>
                            <div v-show="id=='1'">{{item.salePrice}}元/平</div>                           
                        </div>
                        <div class="cnxhconterfive" v-else>
                        <div>{{item.rentPrice}}元/月</div>
                        </div>
                    </div>
                </div>              
            </div>
           
        </div>          
        <div class="locathionname" style="float:left; margin-top:0.35rem;">周边房源</div>
        <div class="cnxhlist cnxhlisttwo" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10"
  infinite-scroll-immediate-check="true"
   style=" margin-bottom:0.5rem;">
            <div class="cnxhlistitem" v-for="(item,index) in listthree" @click="listbtn(item)" :key="index">
                <div class="cnxhcontnet">
                    <div class="cnxhcontnetleft">
                        <img v-lazy="item.housePic"  alt="">
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
                            <div v-if="id='1'">{{item.saleTotal}}万</div>
                            <div v-show="id=='1'">{{item.salePrice}}元/平</div>                           
                        </div>
                        <div class="cnxhconterfive" v-else>
                        <div>{{item.rentPrice}}元/月</div>
                        </div>
                    </div>
                </div>              
            </div>
        </div>
        <ul class="btnbottomul">
            <li v-if="contrastnumber&&id=='1'" @click="contrastaddbtn">
              <img src="../../imgs/home/duibiliebiaored.png" alt="">
              <div class="duibiliebiao">加入对比列表</div>
            </li>
            <li v-else-if="!contrastnumber&&id=='1'" @click="contrastdeletebtn">
              <img src="../../imgs/home/duibiliebiaohuise.png" alt="">
              <div>加入对比列表</div>
            </li>
            <li @click="subscribeitem" v-show="id=='1'" :class="{color_5:yuyuekanfang}">{{yuyuekanfangname}}</li>

            <li @click="warpdivbl=true" :class="{bottombtnclass:id=='2'}">联系经纪人</li>
        </ul>
        <div class="warpdiv" v-if="warpdivbl">
            <div >
                <div class="messagebox">
                     <img :src="dataone.broker.photo" alt="">
                     <div>
                         <div>{{dataone.broker.emplName}}</div>
                         <div>电话：{{dataone.broker.phone}}</div>
                         <div>{{dataone.broker.emplFlag}}</div>
                     </div>
                </div>
                <ul class="phonebtn">
                    <li @click="phonebtns">
                        <a :href="tel">
                        <img src="../../imgs/home/dianhua.png" alt="">
                        电话
                       </a>
                    </li>
                    <li @click="messagebtn">
                        <a>
                        <img src="../../imgs/home/duanxin.png" alt="">
                        消息
                        </a>
                    </li>
                </ul>
            </div>
            <img src="../../imgs/home/fuanbibtn.png" alt="" @click="warpdivbl=false">
        </div>
        <div class="warpdivs" v-show="warpdivbltwo">
            <div>
                <ul id="ul_5">
                  <li>
                    <p>已添加到看房列表</p>
                    <p>在看房列表预约看房时间 </p>
                  </li>
                  <li>
                    <p @click="maketimecancelbtn">取消</p>
                    <p @click="maketimeconfirmbtn">确定</p>
                  </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
import router from "../../router";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      activeindex: 1,
      addCount: "", //房源清单列表数据统计
      yuyuekanfang: "", //预约看房样式
      yuyuekanfangname: "", //预约看房name
      contrastnumber: "", //对比列表显示影藏
      housinglist: "", //小区列表
      urlfour: "", //同小区接口
      urlfive: "", //收藏url
      urlfiveone: "", //取消收藏url
      imgone: "1",
      imgtwo: "1",
      imgthree: "1",
      imgfour: "1",
      warpdivbl: false,
      warpdivbltwo: false,
      homemove: 10,
      site: "",
      sdid: "", //获取标详情用
      dataone: "", //获取的标详情
      urlone: "", //详情接口
      urltwo: "", //周边房源接口
      mapcontent: [], //坐标
      datatwo: "", //关联小区
      page: "1",
      listthree: [], //周边房源
      tel: "", //电话
      sms: "", //短信
      scity: "" //传的城市
    };
  },
  created() {
    this.$store.state.activeindex = "6";
    this.id = this.$route.query.id;
    this.site = this.$route.query.scity;
    if (this.$route.query.scity) {
      this.site = this.$route.query.scity;
      window.localStorage.site = this.$route.query.scity;
    } else {
      this.site = window.localStorage.site;
    }
    this.sdid = this.$route.params.id;
    window.addEventListener("scroll", this.handleScroll);
    this._querys();
    this._querysfive(); //房源清单列表数据统计
  },
  mounted() {},
  methods: {
    phonebtns(){
      var objct = {
          data: {},
          type: "PHONE"
        };
        this.$addevent(objct);
    },
    _querysfive() {
      //房源清单列表数据统计
      if (window.localStorage.dc_token) {
        this.$http.get(this.$url.URL.HOUSEDETAILCOUNT).then(res => {
          this.addCount = res.data.data;
        });
      }
    },
    //分享授权接口
    _wxfx() {
      var saleTotal = "";
      if (this.id == "1") {
        saleTotal = this.dataone.saleTotal + "万";
      } else {
        saleTotal = this.dataone.rentPrice + "元/月";
      }
      var wxfx = {
        url: window.location.href,
        imgurl: this.dataone.housePicList[0],
        title: this.dataone.areaName + " " + this.dataone.buildName,
        content:
          this.dataone.houseType +
          " " +
          this.dataone.builtArea +
          "㎡" +
          " " +
          saleTotal
      };
      this.$wxfx(wxfx);
    },

    // beforeRouteEnter() {
    //   router.beforeEach((to, from, next) => {
    //     var path = to.path;
    //     console.log(path)
    //     if (path.split("/")[1] == "rentingitem") {
    //       console.log("ddddddddddddddddddddddddd")
    //       console.log(window.location.href + "&scity=" + window.localStorage.site)
    //       var saleTotal = "";
    //       if (this.id == "1") {
    //         saleTotal = this.dataone.saleTotal + "万";
    //       } else {
    //         saleTotal = this.dataone.rentPrice + "元/月";
    //       }
    //       var wxfx = {
    //         url: window.location.href + "&scity=" + window.localStorage.site,
    //         imgurl: this.dataone.housePicList[0],
    //         title: this.dataone.areaName + " " + this.dataone.buildName,
    //         content:
    //           this.dataone.houseType +
    //           " " +
    //           this.dataone.builtArea +
    //           "㎡" +
    //           " " +
    //           saleTotal
    //       };
    //       this.$wxfx(wxfx);
    //     }
    //     next();
    //   });
    // },
    handleChange(index) {
      this.activeindex = index + 1;
    },
    collectbtn() {
      //点击收藏
      if (window.localStorage.dc_token == undefined) {
        this.$router.push("/register");
      } else {
        this.imgone = parseInt(this.imgone) + 10;
        this._querysadd();
      }
    },
    messagebtn() {
      //点击跳转聊天页面
      this.$http
        .post(this.$url.URL.HUANXINBROKERREGUSER, {
          chatUsername: this.dataone.broker.chatUsername
        })
        .then(res => {
          if (window.localStorage.dc_token) {
            this.$store.dispatch("pushfriendlist", this.dataone.broker);
            this.$router.push("/abmessage");
          } else {
            this.$router.push("/register");
          }
        });
    },
    _querysadd() {
      //点击收藏querys
      this.$http
        .post(this.urlfive + "/" + this.site + "/" + this.sdid)
        .then(res => {});
    },
    collectonebtn() {
      //点击取消收藏
      this.imgone = this.imgone - 10;
      this._queryscall();
    },
    _queryscall() {
      this.$http
        .post(this.urlfiveone + "/" + this.site + "/" + this.sdid)
        .then(res => {});
    },
    contrastaddbtn() {
      //取消加入对比列表
      this.contrastnumber = false;
      this.$http
        .delete(this.$url.URL.CONTRASTCANCEL + "?houseSdid=" + this.sdid)
        .then(res => {
          this.addCount.contrastCount = this.addCount.contrastCount - 1;
        });
    },
    contrastdeletebtn() {
      //加入对比列表
      if (window.localStorage.dc_token) {
        this.contrastnumber = true;
        this.$http
          .put(this.$url.URL.CONTRASTJOID, {
            houseId: this.dataone.id,
            houseSdid: this.sdid,
            scity: this.site
          })
          .then(res => {
            this.addCount.contrastCount = this.addCount.contrastCount + 1;
          });
      } else {
        this.$router.push("/register");
      }
    },
    mapboxonebtn() {
      window.localStorage.setItem("mapone", JSON.stringify(this.mapcontent));
      this.$router.push("/mapboxone");
    },
    hotdisitembtn() {
      this.$router.push({
        path: "/rentinglist/" + this.dataone.sdid,
        query: { id: this.id + this.dataone.buildSdid }
      });
    },
    lookrecordbtn() {
      if (window.localStorage.dc_token) {
        this.$store.state.daikanlilv = [
          this.dataone.day7Num,
          this.dataone.totalSeeNum
        ];
        this.$router.push({
          name: "lookrecord",
          params: { id: this.dataone.id }
        });
      } else {
        this.$router.push("/register");
      }
    },
    listbtn(item) {
      this.sdid = item.sdid;
      window.scrollTo(0, 0);
      this.listthree = [];
      this._querys();
    },
    maketimecancelbtn() {
      this.warpdivbltwo = false;
    },
    daikanlistbtn() {
      this.$router.push("/awaitlook");
    },
    maketimeconfirmbtn() {
      this._queryssess();
    },
    _queryssess() {
      //加入待看列表
      this.$http
        .post(this.$url.URL.APPOINTADD, {
          sdid: this.sdid
        })
        .then(res => {
          if (res.data.status !== "1") {
            MessageBox.alert(res.data.msg);
          } else {
            this.addCount.appointCount = this.addCount.appointCount + 1;
          }
          //预约看房弹框
          this.warpdivbltwo = false;
          this.yuyuekanfang = true;
          this.yuyuekanfangname = "已加入待看";
        });
    },
    rentingitembtn(datatwo) {
      this.$router.push({ path: "/hotdisitem/" + datatwo.sdid });
    },
    _querys() {
      if (this.id == "1") {
        this.urlone = this.$url.URL.AGOTDETAILINFO;
        this.urltwo = this.$url.URL.RIMHOUSINGONE;
        this.urlfour = this.$url.URL.BUILDSAMEUSED;
        this.urlfive = this.$url.URL.HOUSECOLLECTIONADD; //二手房收藏url
        this.urlfiveone = this.$url.URL.HOUSECOLLECTIONCANCEL; //二手房取消收藏url
      } else {
        this.urlone = this.$url.URL.BGOTDETAILINFO;
        this.urltwo = this.$url.URL.RIMHOUSINGTWO;
        this.urlfour = this.$url.URL.UILDSAMEREND;
        this.urlfive = this.$url.URL.RENTHCOLLECTIONADD; //租房收藏url
        this.urlfiveone = this.$url.URL.RENTHCOLLECTIONCANCEL; //租房取消收藏url
      }
      this.$http
        .get(this.urlone + "/" + this.site + "/" + this.sdid)
        .then(res => {
          this.dataone = res.data.data;
          this._wxfx(); //分享授权接口
          console.log(JSON.parse(window.localStorage.mapxy));
          try {
            if (this.dataone.px == 0 && this.dataone.py == 0) {
              this.mapcontent[0] = JSON.parse(window.localStorage.mapxy).lng;
              this.mapcontent[1] = JSON.parse(window.localStorage.mapxy).lat;
            } else {
              this.mapcontent[0] = this.dataone.px;
              this.mapcontent[1] = this.dataone.py;
            }
          } catch (error) {}

          this.contrastnumber = this.dataone.isComparison;
          this.yuyuekanfang = this.dataone.isAppoint;
          console.log(this.yuyuekanfang);
          if (this.yuyuekanfang) {
            this.yuyuekanfangname = "已加入待看";
          } else {
            this.yuyuekanfangname = "预约看房";
          }
          if (this.dataone.isCollect) {
            this.imgone = "11";
          }
          window.localStorage.dataone = JSON.stringify(this.dataone);
          this.tel = "tel:" + this.dataone.broker.phone;
          this.sms = "sms:" + this.dataone.broker.phone;
          this.map();
          this._querystwo();
          this._querysthree();
          this._querysfour(); //小区房源接口
        });
    },
    _querysfour() {
      this.$http
        .get(
          this.urlfour +
            "/" +
            this.site +
            "/" +
            this.dataone.buildSdid +
            "?pageNo=1&pageSize=2"
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
          this.housinglist = res.data.data;
        });
    },
    comparisonbtn() {
      if (window.localStorage.dc_token) {
        this.$router.push("/comparison");
      } else {
        this.$router.push("/register");
      }
    },
    loadMore() {
      if (this.page !== "1") {
        this.loading = true;
        this._querysthree();
        // Toast({
        //   message: "正在加载。。。",
        //   position: "bottom"
        // });
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      }
    },
    _querystwo() {
      this.$http
        .get(
          this.$url.URL.BUILDINFOTWO +
            "/" +
            this.site +
            "/" +
            this.dataone.buildSdid
        )
        .then(res => {
          this.datatwo = res.data.data;
        });
    },
    _querysthree() {
      this.$http
        .post(this.urltwo, {
          buildSdid: this.dataone.buildSdid,
          pageNo: this.page,
          pageSize: 10,
          px: this.dataone.px,
          py: this.dataone.py,
          scity: this.site
        })
        .then(res => {
          if (res.data.data.length == "0") {
            Toast({
              message: "已全部加载",
              position: "bottom",
              duration: 500
            });
          } else {
            Toast({
              message: "正在加载。。。",
              position: "bottom",
              duration: 500
            });
          }
          for (let i = 0; i < res.data.data.length; i++) {
            res.data.data[i].houseTag = res.data.data[i].houseTag.split(",");
            if (res.data.data[i].houseTag.length > 3) {
              res.data.data[i].houseTag.splice(3);
            } else {
              res.data.data[i].houseTag = res.data.data[i].houseTag;
            }
          }
          this.listthree = this.listthree.concat(res.data.data);
        });
      this.page++;
    },
    map() {
      // var map = new BMap.Map("allmap"); // 创建Map实例
      // console.log("1111")
      // var point = new BMap.Point(this.mapcontent[0], this.mapcontent[1]);
      // 百度地图API功能
      setTimeout(() => {
        var map = new BMap.Map("allmap"); // 创建Map实例
        var point = new BMap.Point(this.mapcontent[0], this.mapcontent[1]);
        map.centerAndZoom(point, 15); // 初始化地图,设置中心点坐标和地图级别
        var marker = new BMap.Marker(point); // 创建标注
        map.disableDragging();
        map.addOverlay(marker);
      }, 500);
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
      if (scrollTop < "160") {
        if (parseInt(this.imgone) != "12" && parseInt(this.imgone) != "11") {
          this.imgone = "1";
        }
        this.imgtwo = "1";
        this.imgthree = "1";
        this.imgfour = "1";
      } else {
        if (parseInt(this.imgone) != "12" && parseInt(this.imgone) != "11") {
          this.imgone = "2";
        }

        this.imgtwo = "2";
        this.imgthree = "2";
        this.imgfour = "2";
      }
    },
    gohomebtn() {
      if (this.$route.query.scity) {
        this.$router.push("/");
      } else {
        this.$router.go(-1);
      }
    },
    subscribeitem() {
      //加入待看列表
      if (window.localStorage.dc_token) {
        if (!this.yuyuekanfang) {
          this.warpdivbltwo = true;
        }
      } else {
        this.$router.push("/register");
      }
    }
  },
  destroyed() {
    if (window.localStorage.scity) {
      window.localStorage.site = window.localStorage.scity;
      window.localStorage.removeItem("scity");
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
.swiperitembox {
  width: 100%;
  height: 100%;
}
.swiperitembox > img {
  width: 100%;
  height: 100%;
}
.swiperdivone {
  padding: 0.1rem 0;
  width: 0.35rem;
  text-align: center;
  background: rgba(0, 0, 0, 0.2);
  color: #333333;
  font-size: 0.13rem;
  position: absolute;
  border-radius: 50%;
  right: 0.1rem;
  top: 2.3rem;
  z-index: 999999;
  color: #ffffff;
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
  height: 0.23rem;
  position: absolute;
  top: 0.105rem;
  right: 0.1rem;
  display: inline-block;
  z-index: 999;
}
.titleimgtwo {
  height: 0.23rem;
  position: absolute;
  top: 0.105rem;
  right: 0.45rem;
  z-index: 999;
}
.titleimgthree {
  height: 0.23rem;
  position: absolute;
  top: 0.105rem;
  right: 0.78rem;
  z-index: 999;
}
.color_5 {
  background: @color_4 !important;
}
.locathionclass {
  margin-left: 0.12rem;
  margin-right: 0.25rem;
  font-size: 0.23rem;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  color: #222222;
}
.moneyset {
  float: right;
  height: 0.7rem;
  line-height: 0.7rem;
  margin-right: 0.12rem;
  color: @colorone;
  font-size: 0.2rem;
}
.moneyset > span {
  font-size: 0.13rem;
}
#ul_5 {
  width: 100%;
  height: 100%;
  float: left;
  > li:nth-of-type(1) {
    width: 100%;
    height: 0.8rem;
    border-bottom: 0.005rem solid @bordercolor_1;
    box-sizing: border-box;
    > p {
      font-size: @fontsize_5;
      color: @color_1;
      width: 100%;
      text-align: center;
      padding-top: 0.25rem;
      overflow: hidden;
    }
    > p:nth-of-type(2) {
      margin-top: -0.15rem;
    }
  }
  > li:nth-of-type(2) {
    width: 100%;
    height: 0.4rem;
    > p {
      width: 50%;
      height: 100%;
      float: left;
      text-align: center;
      line-height: 0.4rem;
      font-size: @fontsize_3;
      color: @color_2;
      border-right: 0.005rem solid @bordercolor_1;
      box-sizing: border-box;
    }
    > p:nth-of-type(2) {
      border: none;
      color: #2f81fd;
    }
  }
}
.contentbox {
  margin-left: 0.12rem;
  margin-right: 0.12rem;
  margin-top: 0.25rem;
  padding-top: 0.15rem;
  padding-bottom: 0.15rem;
  border-top: 0.005rem solid #e6e6e6;
  border-bottom: 0.005rem solid #e6e6e6;
  overflow: hidden;
}
.contentboxleft {
  width: 1.05rem;
  height: 0.8rem;
  float: left;
  > img {
    width: 100%;
    height: 100%;
    float: left;
    vertical-align: middle;
  }
}
#id_11 {
  color: @colorfiv;
}
.contentboxright {
  float: left;
  width: 2rem;
  vertical-align: middle;
  margin-left: 0.2rem;
  font-size: @fontsize_6;
  color: @color_2;
  > div:nth-last-of-type(1) {
    font-size: @fontsize_4;
    color: @colorone;
  }
  > div {
    margin-top: 0.09rem;
  }
  > div:nth-of-type(1) {
    font-size: @fontsize_4;
    color: @color_1;
    font-weight: bold;
    margin: 0;
  }
}
.locathionclass > div:nth-of-type(2) {
  float: right;
  font-size: 0.24rem;
  height: 0.7rem;
  text-align: right;
  margin-right: 0.12rem;
}
.locathionclass > div:nth-of-type(2) > div:nth-of-type(1) {
  color: @colorone;
  line-height: 0.4rem;
}
.locathionclass > div:nth-of-type(2) > div:nth-of-type(1) > span {
  font-size: 0.13rem;
}
.locathionclass > div:nth-of-type(2) > div:nth-of-type(2) {
  font-size: 0.11rem;
  color: #666666;
}
.locathionname {
  font-size: @fontsize_1;
  margin-top: 0.35rem;
  margin-left: 0.12rem;
  color: @color_1;
  font-weight: bold;
  > div {
    float: right;
    font-size: @fontsize_5;
    height: 0.2rem;
    line-height: 0.2rem;
    margin-right: 0.12rem;
    color: @color_3;
    > img {
      width: 0.08rem;
      height: 0.14rem;
      margin-left: 0.1rem;
      margin-top: -0.008rem;
    }
  }
}
.ullistname {
  width: 100%;
  overflow: hidden;
  margin-top: 0.25rem;
}
.ullistname > li {
  width: 50%;
  float: left;
  margin-top: 0.2rem;
  font-size: @fontsize_3;
  color: @color_3;
  text-indent: 0.12rem;
  overflow: hidden;
}
.ullistname > li:nth-last-of-type(1) {
  width: 100%;
}
.ullistname > li:nth-of-type(1),
.ullistname > li:nth-of-type(2) {
  margin: 0;
}
.ul_2 {
  width: 100%;
  margin-top: 0.25rem;
  overflow: hidden;
  > li {
    float: left;
    margin-left: 5%;
    font-size: @fontsize_5;
    overflow: hidden;
    color: @color_2;
    > div:nth-of-type(1) {
      line-height: 1.1;
    }
    > div:nth-of-type(2) {
      font-size: @fontsize_2;
      color: @colorone;
      margin-top: 0.1rem;
    }
  }
  > li:nth-of-type(1) {
    margin-left: 0.12rem;
  }
}
.ul_3 {
  margin: 0 0.12rem;
  height: 0.45rem;
  border-top: 0.005rem solid #e6e6e6;
  border-bottom: 0.005rem solid #e6e6e6;
  line-height: 0.45rem !important;
  margin-top: 0.25rem;
  > li {
    font-size: @fontsize_3;
    color: @color_1;
    height: 0.45rem;
    line-height: 0.45rem !important;
  }
  > li:nth-of-type(1) {
    float: left;
  }
  > li:nth-of-type(2) {
    float: right;
    font-size: @fontsize_6;
    color: @color_3;
    > span {
      vertical-align: middle;
    }
    > img {
      width: 0.09rem;
      vertical-align: middle;
      margin-top: -0.007rem;
      margin-left: 0.1rem;
    }
  }
}
.ullistname > li > span {
  color: @color_1;
}
.fangywz {
  font-size: 0.2rem;
  margin-top: 0.35rem;
  margin-left: 0.12rem;
}
#allmap {
  width: 100%;
  height: 2rem;
  margin-top: 0.15rem;
}
.moreApratInfo {
  font-size: 0.16rem;
  margin: 0 0.12rem;
  margin-top: 0.15rem;
  margin-bottom: 0.15rem;
  overflow: hidden;
  text-overflow: nowrap;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
}
.moreApratInfo > span {
  color: #2581ff;
}
.duibiliebiao {
  color: @colorone !important;
}
.shoubianfang {
  float: left;
  margin-top: 0.35rem;
  font-size: 0.2rem;
  margin-left: 0.12rem;
}
.btnbottomul {
  width: 100%;
  height: 0.6rem;
  position: fixed;
  background: #ffffff;
  bottom: 0;
  line-height: 0.6rem;
  -moz-box-shadow: 5px 4px 10px #333333;
  -webkit-box-shadow: 5px 4px 10px #333333;
  box-shadow: 5px 4px 10px #333333;
}
.btnbottomul > li {
  float: left;
}
.btnbottomul > li:nth-of-type(1) {
  width: 0.93rem;
  height: 0.6rem;
  text-align: center;
  font-size: @fontsize_7;
  color: @color_2;
  > img {
    margin-top: 0.1rem;
    width: 0.23rem;
    height: 0.23rem;
  }
  > div {
    margin-top: 0.05rem;
  }
}
.btnbottomul > li:nth-of-type(2) {
  width: 1.3rem;
  height: 0.4rem;
  background: @colorone;
  color: #ffffff;
  border-radius: @boxborder_2;
  font-size: @fontsize_3;
  margin-top: 0.1rem;
  text-align: center;
  line-height: 0.4rem;
}
.btnbottomul > li:nth-of-type(3) {
  width: 1.3rem;
  height: 0.4rem;
  background: @colorfiv;
  color: #ffffff;
  border-radius: @boxborder_2;
  font-size: @fontsize_3;
  margin-left: 0.1rem;
  margin-top: 0.1rem;
  text-align: center;
  line-height: 0.4rem;
}
.div_1_one {
  width: 0.13rem;
  height: 0.13rem;
  background: @colorone;
  color: #ffffff;
  position: fixed;
  font-size: 0.07rem;
  text-align: center;
  line-height: 0.13rem;
  border-radius: 50%;
  right: 0.4rem;
  top: 0.08rem;
  z-index: 999999;
}
.ul_1 {
  width: 100%;
  height: 0.65rem;
  border-top: 0.005rem solid #e6e6e6;
  border-bottom: 0.005rem solid #e6e6e6;
  display: table;
}
.ul_1 > li:nth-of-type(2) {
  border-left: 0.005rem solid @bordercolor_1;
  border-right: 0.005rem solid @bordercolor_1;
  box-sizing: border-box;
}
.ul_1 > li {
  // float:left;
  width: 33.33333%;
  display: table-cell;
  vertical-align: middle;
  > div:nth-of-type(2) {
    font-size: @fontsize_2;
    color: @colorone;
    margin-top: 0.025rem;
  }
}
.ul_1 > li > div {
  font-size: @fontsize_5;
  color: @color_2;
  margin-left: 0.15rem;
}
.ul_1 > li > div:nth-of-type(2) {
  margin-top: 0.1rem;
}
.cnxhlisttwo {
  padding-bottom: 0.5rem;
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
.warpdivs {
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
.warpdivs > div {
  width: 2.6rem;
  height: 1.2rem;
  background: #ffffff;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -0.6rem;
  margin-left: -1.3rem;
  border-radius: @boxborder_2;
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
.phonebtn > li > a > img {
  width: 0.23rem;
}
.phonebtn > li > a {
  text-decoration: none;
  color: #333333;
}
.bottombtnclass {
  width: 3rem !important;
  margin-left: 0.375rem;
  height: 0.4rem !important;
  background: @colorfiv !important;
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
</style>

