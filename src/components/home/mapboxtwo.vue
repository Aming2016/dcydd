<template>
  <div class="mapboxone">
    <!-- <headerone :dataname="dataname"></headerone> -->
    <img id="imgone_1" src="../../imgs/home/homesousuo.png" alt="">
    <ul id="ul_1">
      <img src="../../imgs/home/fanhui.png" alt="" @click="quitbtn">
      <li :class="{li_1:titlenumber==index}" v-for="(item,index) in title" @click="titlebtn(index)">{{item}}</li>
    </ul>
    <div id="allmap"></div>
    <ul id="ul_2">
      <li>
        <img src="../../imgs/mine/dituzhaofangxuexiao.png" alt="">
        学校找房
      </li>
      <li>
        <img src="../../imgs/mine/dituzhaopangshangquan.png" alt="">
        商圈找房
      </li>
    </ul>
  </div>
</template>

<script>
// import headerone from "../module/headertwo";
export default {
  name: "mapboxone",
  data() {
    return {
      title:["二手房","租房"],
      titlenumber:"0",
      mapname: window.localStorage.sitename, //地点
      imgs: require("../../imgs/home/blue.png"),
      // mapone: JSON.parse(window.localStorage.mapone), //坐标
      site: window.localStorage.site, //城市拼音
      mapdata: "", //海量点
      mapxy: JSON.parse(window.localStorage.mapxy), //中心坐标
      markerArr:"",//坐标存储
      map:null,
      mapurl:"",
      movebtn:"1",//判断是不是在移动
    };
  },
  created() {
    this.titlenumber=='0'?this.mapurl=this.$url.URL.MAPHOUSESECONDHOUSE:this.mapurl=this.$url.URL.MAPHOUSERENTHOUSE
  },
  mounted() {
    this.mapbox();
  },
  methods: {
    quitbtn(){//返回按钮
            var scrottop=window.document.documentElement.getBoundingClientRect().width/375*365
            window.scrollTo(0, scrottop);
            this.$router.go(-1)
    },
    titlebtn(index){
      this.titlenumber=index
      this.titlenumber=='0'?this.mapurl=this.$url.URL.MAPHOUSESECONDHOUSE:this.mapurl=this.$url.URL.MAPHOUSERENTHOUSE
      this.mapbox();
    },  
    //初始化地图
    initMap(px, py) {
      this.createMap(px, py);
      this.setMapEvent();
    },
    //创建地图
    createMap(lng, lat) {
      //11 12      区域级别
      //13 14      片区级别
      //15 16      小区级别
      this.map = new BMap.Map("allmap", {
        minZoom: 11,
        maxZoom: 18
      });
      this.map.enableScrollWheelZoom(true)//启动滚轮放大缩小
      let pt = new BMap.Point(lng, lat);//初始时候 首先获取到目的城市的坐标 例如: 北海站坐标109.134582,21.459389
      this.map.centerAndZoom(pt, 12);//初始中心点和缩放比例 
      var DiTu = this.map.getZoom();
         // 获取经纬度范围参数
        var bs = this.map.getBounds();   //获取可视区域
        var bssw = bs.getSouthWest();   //可视区域左下角
        var bsne = bs.getNorthEast();   //可视区域右上角
      this._mapdatayd(DiTu,bsne.lng,bssw.lng,bsne.lat,bssw.lat)
    },
    //设置地图事件
    setMapEvent() {
      this.addEventListeners();//移动事件
      this.addEventListenertwo();//放大缩小事件
    },
    addEventListeners(){//移动事件
      this.map.addEventListener("dragend", (e)=>{
        this.movebtn="2"
        var DiTu = this.map.getZoom();
         // 获取经纬度范围参数
        var bs = this.map.getBounds();   //获取可视区域
        var bssw = bs.getSouthWest();   //可视区域左下角
        var bsne = bs.getNorthEast();   //可视区域右上角
          this._mapdatayd(DiTu,bsne.lng,bssw.lng,bsne.lat,bssw.lat)
        })
    },
    addEventListenertwo(){//放大缩小事件
      this.map.addEventListener("zoomend", () => {
        this.movebtn="1"
        var DiTu = this.map.getZoom();
         // 获取经纬度范围参数
        var bs = this.map.getBounds();   //获取可视区域
        var bssw = bs.getSouthWest();   //可视区域左下角
        var bsne = bs.getNorthEast();   //可视区域右上角
          this._mapdatayd(DiTu,bsne.lng,bssw.lng,bsne.lat,bssw.lat)
      })
    },
    mapbox() {
       let myGeo = new BMap.Geocoder();
        myGeo.getPoint(this.mapname, (point)=> {
          this.initMap(point.lng, point.lat);//初始化地图(中心) 
    })
    },

    addLabel(point, obj){
        //判断当前是处于什么zoom 级别的;
        var currentZoom = this.map.getZoom();
        //区域级别 和 片区级别 
        if(this.titlenumber=='0'){
           var html1=`<div class="bubble-2 bubble">
                      <p class="name">${obj.name}</p>
                      <p class="count">${obj.formatAvgPrice}</p>
                    </div>`;
        //片区级别
        var html2=`<div class="bubble-2 bubble">
                      <p class="name">${obj.name}</p>
                      <p class="count">${obj.formatAvgPrice}</p>
                    </div>`;

        //小区级别
        var html3 = `<div class="bubble-3 bubble">
                        <p class="name" 
                            data-areaName=${obj.name}
                            data-avgPrice=${obj.avgPrice}
                            data-buildName=${obj.buildName}
                            data-districtName=${obj.districtName}
                            data-formatAvgPrice=${obj.formatAvgPrice}
                            data-formatSaleCount=${obj.formatSaleCount}
                            data-buildSdid=${obj.buildSdid}>
                          <i class="num">${obj.buildName}<b>${obj.formatSaleCount}</i>
                          <i class="num triangle"></i>
                        </p>
                    </div>`;
        }else{
           var html1=`<div class="bubble-2 bubble">
                      <p class="name">${obj.name}</p>
                      <p class="count">${obj.formatRentCount}</p>
                    </div>`;
        //片区级别
        var html2=`<div class="bubble-2 bubble">
                      <p class="name">${obj.name}</p>
                      <p class="count">${obj.formatRentCount}</p>
                    </div>`;

        //小区级别
        var html3 = `<div class="bubble-3 bubble">
                        <p class="name" 
                            data-areaName=${obj.name}
                            data-avgPrice=${obj.avgPrice}
                            data-buildName=${obj.buildName}
                            data-districtName=${obj.districtName}
                            data-formatAvgPrice=${obj.formatAvgPrice}
                            data-formatSaleCount=${obj.formatSaleCount}
                            data-buildSdid=${obj.buildSdid}>
                          <i class="num">${obj.buildName}<b> ${obj.formatRentCount}</i>
                          <i class="num triangle"></i>
                        </p>
                    </div>`;
        }
       
                    
        var content;
        //13 15      区域级别
      //15 16     片区级别
      //17    小区级别
      
        if(currentZoom>16) {
          content = html3;
        }else if(currentZoom>14&&currentZoom<=16){
          content = html2;
        }else{
          content = html1;
        }
        var label = new BMap.Label(content,{
            offset: new BMap.Size(-40,-40),
            position: point, //指定文本标注所在的地理位置 
          })
          label.setStyle({
            border: 0,
            backgroundColor: 'none',
            overflow: 'hidden',
            width: '86px',
            height: '86px'
          })
      this.map.addOverlay(label);
      label.addEventListener("click",this.attribute);//给海量点添加点击事件
    },
    attribute(e){//给海量点添加点击事件
    this.movebtn="1"
      var p = e.target.point;
      var currentZoom = this.map.getZoom();
      if(currentZoom>16) {
          this.map.centerAndZoom(p, 18)
          this.itembtn(p);
      }else if(currentZoom>14&&currentZoom<=16){
          this.map.centerAndZoom(p, 17)
      }else{
          this.map.centerAndZoom(p, 15)
      }
    },
    itembtn(p){
      for(let i=0;i<this.mapdata.length;i++){
       if(p.lng==this.mapdata[i].px&&p.lat==this.mapdata[i].py){
         console.log(this.mapdata[i])
           if(this.mapdata[i].buildSdid){
             this.$router.push({ path: "/rentinglist/"+ this.mapdata[i].buildSdid, query: { id: parseInt(this.titlenumber)+1} });
           }else{
             this.$router.push({ path: "/rentinglist/"+ this.mapdata[i].sdid, query: { id: parseInt(this.titlenumber)+1} });
           }
       }
      }
    },
    _mapdatayd(levels,x1,x2,y1,y2){//根据坐标请求接口
      this.$http.post(this.mapurl,{
        level:levels,
        scity:this.scity,
        x1:x1,
        x2:x2,
        y1:y1,
        y2:y2
      })
      .then(res=>{
        if(this.movebtn=='2'){
          var list=[]
          for(let i=0;i<res.data.data.length;i++){
            if(JSON.stringify(this.mapdata).indexOf(JSON.stringify(res.data.data[i]))==-1){
              list.push(res.data.data[i])
              this.mapdata.push(res.data.data[i])
              console.log(this.mapdata)
            }
          }
          list.forEach((item)=>{
          let point = new BMap.Point(item.px, item.py);
          this.addLabel(point, item);
        })
        }else{
          this.mapdata=res.data.data
          this.map.clearOverlays(); //清空所有标注
          this.mapdata.forEach((item)=>{
          let point = new BMap.Point(item.px, item.py);
          this.addLabel(point, item);
        })
        }
      })
    },
  }
};
</script>



<style scoped lang="less">
@import "../../common/css/master.less";
#ul_1{
        width:100%;
        height:0.44rem;
        position: fixed;
        top:0;
        left:0;
        background:#ffffff;
        border-bottom:1px solid #cccccc;
        color:#333333;
        text-align: center;
        line-height: 0.44rem;
        font-size:0.19rem;
        z-index: 44;
        overflow: hidden;
  >li:nth-of-type(1){
    margin-right:0.4rem;
  }
  >li{
    display:inline-block;
    overflow: hidden;
    height:0.44rem;
    line-height: 0.44rem;
    font-size:@fontsize_3;
  }
  >img{
        position: absolute;
        width:0.12rem;
        height:0.2rem;
        top:0.1rem;
        left:0.12rem;
    }
}
#imgone_1{
  position:fixed;
  right:0.12rem;
  top:0.12rem;
  z-index: 555;
}
.li_1{
  color:@colorone !important;
  box-sizing: border-box;
  border-bottom:0.01rem solid @colorone !important;
}
.mapboxone {
  width: 100%;
  height: 100%;
}
#allmap {
  margin-top: 0.44rem;
  height: 100%;
  width: 100%;
}                                           
</style>
<style>


/* 百度地图样式 ----------------------------------------------<<<<<<*/
 #map {
  position: absolute;
  min-width: 1200px;
  top: 111px;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: hidden;
} 
.BMapLabel{
  width: auto!important;
  height: auto!important;
  overflow: visible!important;
}
.bubble:active{
  background: red;
  border: 1px solid rgb(255,0,0);
}
.bubble-3:hover .triangle{
  border-color: red transparent transparent transparent;
}
.bubble-2{
  color:red;
  position:absolute;
  top:0;
  left:0;
  width:86px;
  height:86px;
  border-radius: 50%;
  text-align:center;
  background-size: cover;
  color: #ffffff;
  cursor: pointer;
  border: 1px solid rgb(83,145,244);
  background: rgba(83,145,244,1);
}
.bubble-2 .name,
.bubble-2 .num,
.bubble-2 .count{
  font-size:10px;
  margin-top:28px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  padding:0 10px;
  line-height: 1.1;
}
.bubble-2 .num{
  font-size:10px;
  margin-top:5px;
}
.bubble-2 .count{
  font-size:10px;
  margin-top:5px;
}
#ul_2{
  width:90%;
  height:0.4rem;
  background:#ffffff;
  position:fixed;
  bottom:0.25rem;
  left:5%;
  font-size:0.14rem;
  border-radius: 0.05rem;
}
#ul_2>li{
  width:50%;
  float:left;
  height:0.18rem;
  margin-top:0.11rem;
  text-align: center;
}
#ul_2>li:nth-of-type(1){
  border-right:0.005rem solid #e6e6e6;
  box-sizing: border-box;
}
#ul_2>li>img{
  height:0.18rem;
  margin-right:0.1rem;
}
.bubble-3{
  height: 24px;
  line-height: 24px;
  cursor: pointer;
  text-align: center;
  background: rgba(83,145,244,1);
  position: relative;
  color: #ffffff;
  border-radius: 1rem;
}
.bubble-3 .name{
  font-size:10px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  padding:0 10px
}
.bubble-3 i{
  display: block;
  font-style: normal;
}
.bubble-3 .num{
  margin-top:8px;
}
.triangle{
  width: 0;
  height: 0;
  margin-left: 5%;
  margin-top:4px !important;
  border-width: 8px;
  border-style: solid;
  border-color: rgb(83,145,244) transparent transparent transparent;
}
/* 百度地图样式 ----------------------------------------------<<<<<<*/
</style>
