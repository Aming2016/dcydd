<template>
  <div class="indexlist">
    <div class="topseatch">
        <img src="../../imgs/home/fanhui.png" alt="" @click="gohomebtn">
        <div id="topserchbox">
            <img src="../../imgs/home/homesousuo.png" alt="" srcset="">
            <input style="font-size:0.14rem; float:left;margin-left:0.05rem;line-height:0.35rem;" type="text" placeholder="输入城市名" v-model="inputsite">
        </div>
    </div>

    <mt-index-list class="indexlistbox" v-if="movelist">
        <mt-index-section index="当前">
            <mt-cell :title="sitename"></mt-cell>
        </mt-index-section>
        <mt-index-section :index="item.title" v-for="item in indexlisttwo">
            <mt-cell :title="item.name" v-for="item in item.item" @click.native="btnset(item)"></mt-cell>
        </mt-index-section>
        <mt-index-section :index="item.title" v-for="item in indexlistone">
            <mt-cell :title="item.name" v-for="item in item.item"  @click.native="btnset(item)"></mt-cell>
        </mt-index-section>
    </mt-index-list>
    <ul v-else class="listul">
        <li v-for="item in indexlistboxone"  @click="btnset(item)">
            {{item.name}}
        </li>
       
    </ul>
    <div id="allmap"></div>
  </div>
</template>

<script>
import { IndexList, IndexSection, Cell } from "mint-ui";
export default {
  name: "HelloWorld",
  data() {
    return {
      indexlist: "", //
      indexlistone: [],
      indexlisttwo: [{item:[{name:"北海",key:"beihai"},{name:"南宁",key:"nanning"}],title:"热门"}], //热门
      sitename: "",
      movelist: true, //控制list显示
      inputsite: "", //输入的地点
      indexlistbox: [], //一共的list
      indexlistboxone: [] //遍历的
    };
  },
  created() {
    this._request();
    this.sitename = window.localStorage.sitename;
  },
  watch: {
    inputsite(val) {
      this.indexlistboxone = [];
      if (val) {
        this.movelist = false;
      } else {
        this.movelist = true;
      }
      for (let i = 0; i < this.indexlistbox.length; i++) {
        if (
          this.indexlistbox[i].shou == val ||
          this.indexlistbox[i].key == val ||
          this.indexlistbox[i].name == val
        ) {
          this.indexlistboxone.push(this.indexlistbox[i]);
        }
      }
      deep: true;
    }
  },
  methods: {
    gohomebtn() {
      this.$router.go(-1);
    },
    btnset(item) {
      if(this.$store.citynumber){
        window.localStorage.setItem("site", item.key);
        window.localStorage.setItem("sitename", item.name);
        this.$router.go(-1)
        this._mapquerys(item);

        //地图获取坐标
        var map = new BMap.Map("allmap");
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
        // 创建地址解析器实例
        var myGeo = new BMap.Geocoder();
        // 将地址解析结果显示在地图上，并调整地图视野
        myGeo.getPoint(item.name, function(point) {
          window.localStorage.mapxy = JSON.stringify(point);
        });
      }else{
        this.$store.cityname=item
       this.$router.go(-1)
      }
      
    },
    _request() {
      //获取城市列表
      this.$http.get(this.$url.URL.CITYS).then(res => {
        this.indexlist = res.data.data;
        this._requestff();
      });
    },
    _mapquerys(item) {
      this.$http
        .post(this.$url.URL.MAPHOUSEALL, {
          scity: item.key
        })
        .then(res => {
          window.localStorage.mapdata = JSON.stringify(res.data.data);
        });
    },
    _requestff() {
      //更改数据格式
      var hot_city = "热门";
      var map = {
        hot: {
          title: hot_city,
          item: []
        }
      };
      var hot_city_len = this.indexlist.length;
      this.indexlist.forEach((item, index) => {
        if (index < hot_city_len) {
          map["hot"].item.push({
            key: item.value,
            name: item.name
          });
          const type = item.value.slice(0, 1).toUpperCase();
          if (!map[type]) {
            map[type] = {
              title: type,
              item: []
            };
          }
          map[type].item.push({
            key: item.value,
            name: item.name
          });
          var hot = [],
            ret = [];
          for (var key in map) {
            var val = map[key];
            if (val.title.match(/[a-zA-Z]/)) {
              ret.push(val);
            } else if (val.title == hot_city) {
              hot.push(val);
            }
          }
          ret.sort((a, b) => {
            return a.title.charCodeAt() - b.title.charCodeAt();
          });
          this.indexlistone = ret;
        }
      });
      for (let i = 0; i < this.indexlistone.length; i++) {
        for (let l = 0; l < this.indexlistone[i].item.length; l++) {
          this.indexlistone[i].item[l].shou = this.indexlistone[
            i
          ].title.toLowerCase();
        }
        this.indexlistbox = this.indexlistbox.concat(this.indexlistone[i].item);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="less">
@import "../../common/css/search.css";
.indexlist{
  width:100%;
  height:100%;
  overflow: hidden;
}
.listul {
  width: 100%;
  overflow: hidden;
  position: absolute;
  top:0.44rem;
}
.listul > li {
  width: 100%;
  height: 0.4rem;
  line-height: 0.4rem;
  text-align: left;
  text-indent: 0.12rem;
  float: left;
  font-size: 0.16rem;
  border-bottom: 1px solid #cacaca;
}
</style>
