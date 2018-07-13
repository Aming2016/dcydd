<template>
    <div class="minsellertwo">
         <div class="cnxhlist" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10"
  infinite-scroll-immediate-check="true" v-if="movenum">
            <div class="cnxhlistitem"  @click="rentingitembtn(item)" v-for="item in houselist">
                <div class="cnxhcontnet">
                    <div class="cnxhcontnetleft">
                        <div v-show="item.type=='ORIGINAL_HOUSE'||item.status!='0'" :class="{statusclass:item.status!='0'}">
                          <p :class="{pclass:item.status!='0'}">{{item.status|labelonefilter}}<span v-if="item.type=='ORIGINAL_HOUSE'&&item.status!='0'">/</span>{{item.type|labelfilter}}</p>
                        </div>
                        <img :src="item.housePic|imgfilter" alt="">
                    </div>
                    <div class="cnxhcontnetright">
                        <div class="cnxhconterone" :class="{decoration:item.status!='0'}">
                            {{item.houseTitle}}
                        </div>
                        <div class="cnxhcontertwo">
                            {{item.areaName}} {{item.districtName}} {{item.houseDirection}} 
                        </div>
                        <div class="cnxhconterthree">
                            {{item.roomsNum}}房{{item.livingRoomNum}}厅 {{item.builtArea}}m²  
                        </div>
                        <div class="cnxhconterfour">
                            <div>{{item.houseTag.split(",")[0]?item.houseTag.split(",")[0]:''}}</div>
                            <div>{{item.houseTag.split(",")[1]?item.houseTag.split(",")[1]:''}}</div>
                            <div>{{item.houseTag.split(",")[2]?item.houseTag.split(",")[2]:''}}</div>
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
         <div id="div_67" v-else>
          <img src="../../imgs/home/duibiliebiaokongbai.png" alt="">
          <div>暂无房源~~~</div>
        </div>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      id: "",
      movenum: true,
      page: "1",
      site: window.localStorage.site,
      url: "",
      houselist: 3 //列表list
    };
  },
  created() {
    this.id = this.$route.params.id;
    if(this.id=='1'){
      this.url = this.$url.URL.TRUSTAPPLYQUERYSELLHOUSELIST
    }else if(this.id=='2'){
      this.url = this.$url.URL.TRUSTAPPLYQUERYRENHOUSELIST  
    }else{
      this.url = this.$url.URL.QUERYLOANHOUSELIST
    }
    this._querys();
  },
  methods: {
    loadMore() {
      if (this.page != "1") {
        this.loading = true;
        // this._querys();
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
      this.$http.get(this.url + "?pageNo=" + this.page).then(res => {
        console.log(res);
        this.houselist = res.data.data;
        res.data.data.length > 0
          ? (this.movenum = true)
          : (this.movenum = false);
      });
    },
    rentingitembtn(item) {
      if (item.status=="0") {
        this.$router.push({
          path: "/rentingitem/" + item.sdid,
          query: { id: this.id }
        });
      }
    }
  }
};
</script>
<style scoped lang="less">
@import "../../common/css/fulist.css";
@import "../../common/css/master.less";
.minsellertwo {
  width: 100%;
  height: 100%;
  min-height: 100%;
  background: #ffffff;
}
.cnxhlist {
  margin-top: 0.44rem;
  margin-bottom: 0;
}
.statusclass {
  background: rgba(0, 0, 0, 0.2) !important;
}
.decoration {
  text-decoration: line-through;
  color: #666666 !important;
}
.pclass {
  background: #666666 !important;
}
#div_67 {
  width: 100%;
  height: 100%;
  position: fixed;
  text-align: center;
  background: #ffffff;
  > img {
    width: 35%;
    margin-top: 1.8rem;
  }
  > div:nth-of-type(1) {
    margin-top: 0.7rem;
    font-size: @fontsize_4;
    color: @color_3;
  }
  > div:nth-of-type(2) {
    width: 50%;
    height: 0.4rem;
    border-radius: @boxborder_2;
    border: 0.01rem solid @colorone;
    color: @colorone;
    font-size: @fontsize_4;
    text-align: center;
    line-height: 0.4rem;
    margin: 0.4rem auto;
  }
}
.cnxhcontnetleft {
  position: relative;
  > div {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0);
    > p {
      position: absolute;
      top: 0;
      left: 0;
      padding: 0 0.08rem;
      height: 0.2rem;
      background: #00b969;
      text-align: center;
      line-height: 0.2rem;
      font-size: @fontsize_7;
      color: #ffffff;
      border-radius: 0 0.1rem 0.1rem 0;
    }
  }
}
</style>




