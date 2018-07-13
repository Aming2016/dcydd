<template>
    <div class="rentinglist">
        <headertwo :dataname="dataname"></headertwo>
         <div class="cnxhlist" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10"
  infinite-scroll-immediate-check="true">
            <div class="cnxhlistitem" v-for="item in litetwo" @click="rentingitembtn(item)" >
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
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
import headertwo from "../module/headertwo";
export default {
  data() {
    return {
      dataname: "小区二手房",
      id: "1",
      page: "1",
      site: window.localStorage.site,
      litetwo: [], //列表
      sdid: "",
      urlfour: "", //同小区二手房租房url
      xiaoquid: "", //小区id
      xiaoquids: "" //判断显示
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.sdid = this.$route.params.id;
    if (this.id == "1") {
      this.dataname = "小区二手房";
    } else if (this.id == "2") {
      this.dataname = "小区租房";
    } else {
      this.dataname = "同小区房源";
      this.xiaoquids = this.id.split("")[0];
      if (this.id.split("")[0] == "1") {
        this.urlfour = this.$url.URL.BUILDSAMEUSED;
        this.xiaoquid = this.id.substring(1, 100);
      } else {
        this.urlfour = this.$url.URL.UILDSAMEREND;
        this.xiaoquid = this.id.substring(1, 100);
      }
    }
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
    },
    _querys() {
      var url = "";
      if (this.id == "1" || this.id == "2") {
        this.id == "1"
          ? (url =
              this.$url.URL.SECONDHOUSELIST +
              "/" +
              this.site +
              "/" +
              this.sdid +
              "?pageNo=" +
              this.page +
              "&pageSize=10")
          : (url =
              this.$url.URL.RENTHOUSELIST +
              "/" +
              this.site +
              "/" +
              this.sdid +
              "?pageNo=" +
              this.page +
              "&pageSize=10");
        this.$http.get(url).then(res => {
          for (let i = 0; i < res.data.data.length; i++) {
            res.data.data[i].houseTag = res.data.data[i].houseTag.split(",");
            if (res.data.data[i].houseTag.length > 3) {
              res.data.data[i].houseTag.splice(3);
            } else {
              res.data.data[i].houseTag = res.data.data[i].houseTag;
            }
          }
          this.litetwo = this.litetwo.concat(res.data.data);
          
          this.page++;
        });
      } else {
        this.$http
          .get(
            this.urlfour +
              "/" +
              this.site +
              "/" +
              this.xiaoquid +
              "?pageNo=" +
              this.page +
              "&pageSize=10"
          )
          .then(res => {
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
            this.litetwo = this.litetwo.concat(res.data.data);
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
.rentinglist {
  width: 100%;
  min-height: 100%;
}
.cnxhlist {
  margin-top: 0.44rem;
  margin-bottom: 0;
}
</style>

