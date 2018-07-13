<template>
    <div class="estatechoose">
        <div class="header">
           <img src="../../imgs/home/fanhui.png" alt="" @click="quitbtn">
           {{dataname}}
        </div>  
        <div id="titleserch">
            <div id="serchbox">
                <img src="../../imgs/home/homesousuo.png" alt="">
                <input type="text" :placeholder="placeholder" v-model="text">
                <p v-if="setse">
                    确定
                </p>
                <p v-else class="btnclass" @click="btn">
                     确定
                </p>
            </div>
            <p>快捷选择</p>
        </div>
        <ul id="ul_1"  v-if="dataname=='小区名称'" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10"
  infinite-scroll-immediate-check="true">
            <li v-for="item in list" @click="btntwo(item)">
                <p>{{item.buildName}}</p>
                <p>{{item.saleCount}}套</p>
            </li>
        </ul>
        <ul id="ul_1"  v-else-if="dataname=='栋座号'" v-infinite-scroll="loadMoreone"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10"
  infinite-scroll-immediate-check="true">
            <li @click="btntrhee('')"><p>无栋座号</p></li>
            <li v-for="item in listone" @click="btntrhee(item)">
                <p>{{item.name}}</p>
            </li>
        </ul>
        <ul id="ul_1"  v-else-if="dataname=='单元号'"
        v-infinite-scroll="loadMoreone"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
        infinite-scroll-immediate-check="true">
            <li @click="btnfour('')"><p>无单元号</p></li>
            <li v-for="item in listtwo" @click="btnfour(item)">
                <p>{{item}}</p>
            </li>
        </ul>
        <ul id="ul_1"  v-else v-infinite-scroll="loadMoreone"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10"
  infinite-scroll-immediate-check="true">
            <li @click="btnfive('')"><p>无门牌号</p></li>
            <li v-for="item in listthree" @click="btnfive(item)">
                <p>{{item}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
import { MessageBox, Toast } from "mint-ui";
export default {
  data() {
    return {
      dataname: "小区名称",
      placeholder: "",
      text: "", //input
      setse: true,
      page: "1",
      pageone: "1",
      pagetwo: "1",
      pagethree: "1",
      id: "",
      list: [], //获取的小区数据
      listone: [], //获取栋数
      listtwo: [], //获取单元号
      listthree: [] //获取门房号
    };
  },
  created() {
    this.id = this.$route.params.id;
    if (this.id == "1") {
      this.dataname = "小区名称";
      this.placeholder = "请输入小区名称";
    } else {
      this.dataname = "栋座号";
      this.placeholder = "请输入栋座号";
    }
    this._querysone();
  },
  watch: {
    text(val) {
      if (val) {
        this.setse = false;
        if (this.id == "1") {
          this.page = "1";
          this.list = [];
          this._querysone();
        }
      } else {
        this.page = "1";
        this.list = [];
        this._querysone();
        this.setse = true;
      }
    },
    dataname(val) {
      if (this.id == "2") {
        if (val == "栋座号") {
          if (this.$store.housing.id) {
            this._querystwo();
          }
        } else if (val == "单元号") {
          if (this.$store.dzitem.id) {
            this._querysthree();
          }
        } else {
          if (this.$store.dyitem) {
            this._querysfive();
          }
        }
      }
    }
  },
  methods: {
    loadMore() {
      if (this.page !== "1") {
        this.loading = true;
        this._querysone();
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      }
    },
    loadMoreone() {
      if (this.dataname == "栋座号") {
        if (this.pageone !== "1") {
          this.loading = true;
          this._querystwo();
          setTimeout(() => {
            this.loading = false;
          }, 2000);
        }
      } else if (this.dataname == "单元号") {
        if (this.pagetwo !== "1") {
          this.loading = true;
          this._querysthree();
          setTimeout(() => {
            this.loading = false;
          }, 2000);
        }
      } else {
        if (this.pagethree !== "1") {
          this.loading = true;
          this._querysfive();
          setTimeout(() => {
            this.loading = false;
          }, 2000);
        }
      }
    },

    quitbtn() {
      //返回键
      if (this.id == "1") {
        this.$router.go(-1);
      } else {
        if (this.dataname == "栋座号") {
          this.$router.go(-1);
        } else if (this.dataname == "单元号") {
          this.dataname = "栋座号";
          this.placeholder = "请输入栋座号";
          this.text = "";
        } else {
          this.dataname = "单元号";
          this.placeholder = "请输入单元号";
          this.text = "";
        }
      }
    },
    btntwo(item) {
      //点击小区列表
      if (this.id == "1") {
        this.$store.dzitem = "";
        this.$store.dyitem = "";
        this.$store.mpitem = "";
        this.$store.housing = item;
        this.$router.go(-1);
      } else {
      }
    },
    btntrhee(item) {
      //点击栋座列表
      this.$store.dzitem = item;
      this.dataname = "单元号";
      this.placeholder = "请输入单元号";
      this.text = "";
    },
    btnfour(item) {
      //点击单元列表
      this.$store.dyitem = item;
      this.dataname = "门牌号";
      this.placeholder = "请输入门牌号";
      this.text = "";
    },
    btnfive(item) {
      //点击门口
      this.$store.mpitem = item;
      this.$router.go(-1);
    },
    btn() {
      if (this.id == "1") {
        if (this.text) {
          this.$store.housing = { buildName: this.text };
          this.$store.dzitem = "";
          this.$store.dyitem = "";
          this.$store.mpitem = "";
          this.$router.go(-1);
        }
      } else {
        if (this.dataname == "栋座号") {
          this.$store.dzitem = { name: this.text };
          this.dataname = "单元号";
          this.placeholder = "请输入单元号";
          this.text = "";
        } else if (this.dataname == "单元号") {
          this.$store.dyitem = this.text;
          this.dataname = "门牌号";
          this.placeholder = "请输入门牌号";
          this.text = "";
        } else {
          this.$store.mpitem = this.text;
          this.text = "";
          this.$router.go(-1);
        }
      }
    },
    _querysone() {
      //获取小区list
      let scityname = window.localStorage.site;
      window.localStorage.site = this.$store.cityname.key;

      this.$http
        .post(this.$url.URL.BUILDLIST, {
          keyword: this.text,
          scity: this.$store.cityname.key,
          pageNo: this.page
        })
        .then(res => {
          this.list.push(...res.data.data);
          if (res.data.data.length == "0") {
            Toast({
              message: "已全部加载完成",
              position: "bottom",
              duration: 500
            });
          } else {
            Toast({
              message: "正在加载。。。",
              position: "bottom",
              duration: 500
            });
            this.page++;
          }
          window.localStorage.site = scityname;
        })
        .catch(res => {
          window.localStorage.site = scityname;
        });
    },
    _querystwo() {
      //获取栋数
      this.$http
        .get(
          this.$url.URL.BUILDBUILDINGDZ +
            "/" +
            this.$store.housing.id +
            "?pageNo=" +
            this.pageone
        )
        .then(res => {
          if (res.data.data.length != "0") {
            this.listone.push(...res.data.data);
            Toast({
              message: "正在加载。。。",
              position: "bottom",
              duration: 500
            });
            this.pageone++;
          } else {
            Toast({
              message: "已全部加载完成",
              position: "bottom",
              duration: 500
            });
          }
        });
    },
    _querysthree() {
      //获取单元列表
      this.$http
        .post(this.$url.URL.BUILDBUILDINGDYFH, {
          buildId: this.$store.housing.id,
          dzId: this.$store.dzitem.id,
          pageNo: this.pagetwo
        })
        .then(res => {
          if (res.data.data.length != "0") {
            this.listtwo.push(...res.data.data);
            Toast({
              message: "正在加载。。。",
              position: "bottom",
              duration: 500
            });
          } else {
            Toast({
              message: "已全部加载完成",
              position: "bottom",
              duration: 500
            });
          }
          this.pagetwo++;
        });
    },
    _querysfive() {
      //获取房号列表
      this.$http
        .post(this.$url.URL.BUILDBUILDINGDYFH, {
          buildId: this.$store.housing.id,
          dzId: this.$store.dzitem.id,
          dyname: this.$store.dyitem,
          pageNo: this.pagethree
        })
        .then(res => {
          if (res.data.data.length != "0") {
            this.listthree.push(...res.data.data);
            Toast({
              message: "正在加载。。。",
              position: "bottom",
              duration: 500
            });
          } else {
            Toast({
              message: "已全部加载完成",
              position: "bottom",
              duration: 500
            });
          }
          this.pagethree++;
        });
    }
  }
};
</script>
<style scoped lang="less">
@import "../../common/css/master.less";
.estatechoose {
  width: 100%;
  min-height: 100%;
  border-top: 0.005rem solid #ffffff;
  box-sizing: border-box;
}
.btnclass {
  background: @colorone !important;
  color: #ffffff !important;
}
.header {
  width: 100%;
  height: 0.44rem;
  position: fixed;
  top: 0;
  left: 0;
  background: #ffffff;
  border-bottom: 1px solid #cccccc;
  color: #333333;
  text-align: center;
  line-height: 0.44rem;
  font-size: 0.19rem;
  z-index: 999;
}
.header > img {
  position: absolute;
  width: 0.12rem;
  height: 0.2rem;
  top: 0.1rem;
  left: 0.12rem;
}
#titleserch {
  width: 100%;
  position: fixed;
  top: 0.44rem;
  background: @colorthree;
  border-top: 0.005rem solid @colorthree;
  > p {
    font-size: @fontsize_3;
    color: @color_3;
    margin-top: 0.35rem;
    padding-bottom: 0.15rem;
    margin-left: 0.2rem;
    overflow: hidden;
  }
}
#serchbox {
  width: 3.4rem;
  height: 0.45rem;
  margin: auto;
  margin-top: 0.2rem;
  margin-bottom: 0.35rem;
  background: #ffffff;
  overflow: hidden;
  border-radius: @boxborder_2;
  > img {
    height: 0.16rem;
    padding-top: 0.145rem;
    margin-left: 0.1rem;
    float: left;
    line-height: 0.45rem;
  }
  > input {
    font-size: @fontsize_8;
    color: @color_4;
    float: left;
    text-indent: 0.07rem;
    height: 0.45rem;
    line-height: 0.45rem;
  }
  > p {
    float: right;
    width: 0.6rem;
    height: 0.45rem;
    background: @bordercolor_1;
    text-align: center;
    line-height: 0.45rem;
    color: @color_2;
    font-size: @fontsize_3;
  }
}
#ul_1 {
  margin-top: 1.8rem;
  margin-left: 0.12rem;
  margin-right: 0.12rem;
  > li {
    width: 100%;
    height: 0.5rem;
    border-bottom: 0.005rem solid @bordercolor_1;
    > p:nth-of-type(1) {
      float: left;
      line-height: 0.5rem;
      color: @color_1;
      font-size: @fontsize_4;
    }
    > p:nth-of-type(2) {
      float: right;
      line-height: 0.5rem;
      font-size: @fontsize_5;
      color: @color_3;
    }
  }
}
</style>

