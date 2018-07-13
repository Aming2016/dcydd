<template>
  <div class="mapboxone">
    <headerone :dataname="dataname"></headerone>
    <div class="bottombtn" @click="btndaohang">导航</div>
    <div id="allmap" tabindex="0"></div>
  </div>
</template>

<script>
import headerone from "../module/headertwo";
export default {
  name: "HelloWorld",
  data() {
    return {
      dataname: "房源位置",
      mapcontent: "", //坐标
      mapxy: "", //我的坐标
      sitename: window.localStorage.sitename //地址
    };
  },
  created() {
    this.mapcontent = JSON.parse(window.localStorage.mapone);
    this.mapxy = window.localStorage.mapmine
      ? JSON.parse(window.localStorage.mapmine)
      : JSON.parse(window.localStorage.mapxy);
  },
  mounted() {
    this.map();
  },
  methods: {
    btndaohang() {
      window.location.href =
        "http://api.map.baidu.com/direction?origin=" +
        this.mapxy.lat +
        "," +
        this.mapxy.lng +
        "&destination=" +
        this.mapcontent[1] +
        "," +
        this.mapcontent[0] +
        "&mode=driving&region=" +
        this.sitename +
        "&output=html";
    },
    map() {
      // 百度地图API功能
      var map = new BMap.Map("allmap"); // 创建Map实例
      var point = new BMap.Point(this.mapcontent[0], this.mapcontent[1]);
      map.centerAndZoom(point, 13); // 初始化地图,设置中心点坐标和地图级别
      var marker = new BMap.Marker(point); // 创建标注
      map.addOverlay(marker); // 将标注添加到地图中
      marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
      // //添加地图类型控件
      // map.addControl(new BMap.MapTypeControl({
      // 	mapTypes:[
      //         BMAP_NORMAL_MAP,
      //         BMAP_HYBRID_MAP
      //     ]}));
      map.enableScrollWheelZoom(true);
    }
  },
  components: {
    headerone
  }
};
</script>



<style scoped lang="less">
@import "../../common/css/master.less";
.mapboxone {
  width: 100%;
  height: 100%;
}
.bottombtn {
  font-size: @fontsize_4;
  position: fixed;
  top: 0.15rem;
  right: 0.12rem;
  z-index: 999999;
}
#allmap {
  width: 100%;
  height: 100%;
}
</style>
