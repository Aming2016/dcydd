<template>
    <div class="rentinglist">
        <headertwo :dataname="dataname"></headertwo>
         <div class="cnxhlist" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10"
  infinite-scroll-immediate-check="true">
            <div class="cnxhlistitem"  @click="rentingitembtn(item)" v-for="item in houselist">
                <div class="cnxhcontnet">
                    <div class="cnxhcontnetleft">
                        <div v-show="item.type=='ORIGINAL_HOUSE'||item.status!='0'" :class="{statusclass:item.status!='0'}">
                          <p :class="{pclass:item.status!='0'}">{{item.status|labelonefilter}}<span v-if="item.type=='ORIGINAL_HOUSE'&&item.status!='0'">/</span>{{item.type|labelfilter}}</p>
                        </div>
                        <img :src="item.housePic|imgfilter" alt="">
                    </div>
                    <div class="cnxhcontnetright">
                        <div class="cnxhconterone"  :class="{decoration:item.status!='0'}">
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
                            <div>{{item.rentPrice}}元/月</div>>
                        </div>
                    </div>
                </div>           
            </div>
            <!-- <div class="cnxhlistitem" v-for="item in litetwo"  @click="rentingitembtn(item)" >
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
                            {{item.roomsNum}}房{{item.livingRoomNum}}厅 {{item.builtArea}}m² 
                        </div>
                        <div class="cnxhconterfour">
                            <div v-for="item in item.houseTag">{{item}}</div>
                        </div>
                        <div class="cnxhconterfive" v-if="xiaoquids=='1'||id=='1'">
                            <div>{{item.saleTotal}}万</div>
                            <div>{{item.salePrice}}元/平</div>
                        </div>
                        <div class="cnxhconterfive" v-else>
                            <div>{{item.rentPrice}}元/月</div>
                        </div>
                    </div>
                </div>           
            </div> -->
        </div>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
import headertwo from "../module/headertwo";
export default {
  data() {
    return {
      dataname: "约看列表",
      id: "1",
      page: "1",
      site: window.localStorage.site,
      litetwo: [], //列表
      houseid: "", //待看日程id
      houselist: "" //列表list
    };
  },
  created() {
    this.houseid = this.$route.params.id;
    this._querys();
  },
  methods: {
    loadMore() {
      if (this.page != "1") {
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
        .get(this.$url.URL.APPOINTREADYHOUSELIST + "/" + this.houseid)
        .then(res => {
          if (res.data.status == "1") {
            this.houselist = res.data.data;
          } else {
            Toast({
              message: res.data.msg,
              position: "bottom"
            });
          }
        });
    },
    rentingitembtn(item) {
      if (this.id == "1" || this.id == "2") {
        this.$router.push({
          path: "/rentingitem/" + item.sdid,
          query: { id: this.id }
        });
      } else {
        this.$router.push({
          path: "/rentingitem/" + item.sdid,
          query: { id: this.id.split("")[0] }
        });
      }
    }
  },
  components: {
    headertwo
  }
};
</script>
<style scoped lang="less">
@import "../../common/css/fulist.css";
@import "../../common/css/master.less";
.rentinglist {
  width: 100%;
  min-height: 100%;
}
.cnxhlist {
  margin-top: 0.44rem;
  margin-bottom: 0;
}
.statusclass{
  background:rgba(0, 0, 0, 0.2) !important;
}
.decoration{
  text-decoration:line-through;
  color:#666666 !important;
}
.pclass{
  background:#666666 !important;
}
.cnxhcontnetleft {
  position: relative;
  >div{
          width:100%;
          height:100%;
          position: absolute;
          top:0;
          left:0;
          background:rgba(0, 0, 0,0);
          >p{
          position: absolute;
          top:0;
          left:0;
          padding:0 0.08rem;
          height:0.2rem;
          background:#00b969;
          text-align: center;
          line-height: 0.2rem;
          font-size:@fontsize_7;
          color:#ffffff;
          border-radius: 0 0.1rem 0.1rem 0;
        }
        }
}
</style>

