<template>
    <div class="rentinglist">
        <headertwo :dataname="dataname"></headertwo>
        <img id="tianjiaimgs" src="../../imgs/home/tianjiafangyuan.png" alt="" @click="addfangyuanbtn">
        <ul id="ul_1" v-if="movekong"
        v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
      infinite-scroll-immediate-check="true">
            <li @click="onTap(item,index)" @touchstart="btnleft(item,index,$event)" @touchend="diversionbtn(item,index,$event)" v-for="(item,index) in list">
                <div>
                  <div class="classbox" :class="{class_1:moveleft==index}">
                    <div v-if="item.status=='0'">
                        <img src="../../imgs/home/weixuanz.png" v-show="item.number" alt="" @click="imgbtn(item,index)">
                        <img src="../../imgs/home/xuanzhong.png" v-show="!item.number" alt="" @click="imgonebtn(item,index)">
                    </div>
                     <div v-else style="width:0.39rem;margin:0;text-align:center;height:0.75rem; line-height:0.75rem; font-size:0.1rem; color:#666666;">
                      {{item.status|stausfilter}}
                    </div>
                  <div>
                  <img :src="item.housePic|imgfilter" alt="">
                </div>
                <div>
                    <P :class="{class_33:item.status!='0'}">{{item.houseTitle}}</P>
                    <P>
                        <span>{{item.areaName}}</span><span>{{item.districtName}}</span><span>{{item.houseDirection}}</span>
                    </P>
                    <P>
                        <span>{{item.houseType}}</span><span>{{item.builtArea}}㎡</span>
                    </P>
                    <P>
                        <span>{{item.saleTotal}}万</span><span>{{item.salePrice}}元/平</span>
                    </P>
                </div> 
                </div> 
                </div>
                
                <div id="id_2" :class="{class_2:moveleft==index}" @click="movebtn(item,index)">
                    删除
                </div>
            </li>
        </ul>
        <div id="div_2" v-else>
            <img src="../../imgs/home/duibiliebiaokongbai.png" alt="">
            <p>还没有添加任何房源~~~</p>
            <div @click="addfangyuanbtn">添加房源</div>
        </div>
        <div id="div_btn" v-show="movekong">
            <span>已选{{stateid.length}}套房源</span>
            <div @click="contrastlistbtn">去预约</div>
        </div>
    </div>
</template>
<script>
import headertwo from "../module/headertwo";
import { MessageBox, Toast } from "mint-ui";
export default {
  data() {
    return {
      dataname: "待看列表",
      movekong: true,
      moveleft: null,
      list: [],
      stateid: [], //存储的id
      page: "1",
      site: window.localStorage.site,
      moveone: 0, //移动前；
      movetwo: 0, //移动后
      movethree: 0 //移动距离
    };
  },
  created() {
    this._qureys();
  },
  filters: {
    stausfilter(val) {
      if (val == "1") {
        return "已售";
      } else if (val == "2") {
        return "已失效";
      } else if (val == "3") {
        return "已停售";
      }
    }
  },
  methods: {
    loadMore() {
      if (this.page !== "1") {
        this.loading = true;
        this._qureys();
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    },
    contrastlistbtn() {
      //跳转对比列表
      if (this.stateid.length > 0 && this.stateid.length < 7) {
        var lists = [];
        for (let i = 0; i < this.list.length; i++) {
          if (!this.list[i].number) {
            var obj = {
              scity: this.list[i].houseScity,
              sdid: this.list[i].houseSdid
            };
            lists.push(obj);
          }
        }
        this.$store.awaitlist = lists;
        this.$router.push("/subscribeitem");
      } else {
        MessageBox.alert("请选择1到6个加入待看列表");
      }
    },
    _qureys() {
      this.$http
        .get(
          this.$url.URL.APPOINTDETAILIST +
            "?pageNo=" +
            this.page +
            "&pageSize=10"
        )
        .then(res => {
          if (res.data.data.length == "0" && this.page == "1") {
            this.movekong = false;
          } else {
            for (let i = 0; i < res.data.data.length; i++) {
              res.data.data[i].number = true;
            }
            if (res.data.data.length == "0") {
              Toast({
                message: "已全部加载完",
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
            this.list = this.list.concat(res.data.data);
            this.page++;
          }
        });
    },
    imgbtn(item, index) {
      if (this.stateid.length >5) {
        MessageBox.alert("最多只能选择6套房源");
      } else {
        this.list[index].number = false;
        this.stateid.push(item.id);
      }
    },
    addfangyuanbtn() {
      this.$router.push({ path: "/searchlist/", query: { id: "1" } });
    },
    imgonebtn(item, index) {
      this.list[index].number = true;
      var indexone = this.stateid.indexOf(item.id);
      this.stateid.splice(indexone, 1);
    },
    btnleft(item, index, event) {
      //触碰屏幕
      this.moveone = event.touches[0].clientX;
    },
    diversionbtn(item, index, event) {
      //移开屏幕
      this.movetwo = event.changedTouches[0].clientX;
      this.movethree = this.moveone - this.movetwo;
      if (this.movethree > 50) {
        this.moveleft = index;
      }
      if (this.movethree < -50) {
        this.moveleft = null;
      }
    },
    onTap(item, index) {
      this.moveleft = null;
    },
    movebtn(item, index) {
      this.list.splice(index, 1);
      for (let i = 0; i < this.stateid.length; i++) {
        if (this.stateid[i] == item.id) {
          this.stateid.splice(this.stateid.indexOf(this.stateid[i]), 1);
        }
      }
      if (this.list.length == "0") {
        this.movekong = false;
      }
      this.$http
        .delete(this.$url.URL.APPOINTDELETE + "/" + item.id)
        .then(res => {});
    }
  },
  components: {
    headertwo
  }
};
</script>
<style scoped lang="less">
@import "../../common/css/master.less";
.rentinglist {
  width: 100%;
  min-height: 100%;
  border-top: 1px solid #ffffff;
  box-sizing: border-box;
}
.class_33 {
  text-decoration: line-through;
  color: #666666 !important;
}
#tianjiaimgs {
  width: 0.18rem;
  height: 0.18rem;
  position: fixed;
  top: 0.13rem;
  right: 0.13rem;
  z-index: 999;
}
#div_2 {
  width: 100%;
  margin-top: 0.44rem;
  margin-bottom: 0.5rem;
  border-top: 1px solid #ffffff;
  box-sizing: border-box;
  text-align: center;
  > img {
    width: 1.235rem;
    // margin:auto;
    margin-top: 0.7rem;
  }
  > p {
    font-size: @fontsize_4;
    color: @color_2;
    margin-top: 0.55rem;
    margin-bottom: 0.35rem;
  }
  > div {
    width: 2rem;
    height: 0.45rem;
    text-align: center;
    line-height: 0.45rem;
    border: 1px solid @colorone;
    font-size: @fontsize_2;
    color: @colorone;
    margin: auto;
    border-radius: @boxborder_2;
  }
}
#ul_1 {
  width: 100%;
  margin-top: 0.44rem;
  margin-bottom: 0.5rem;
  overflow: hidden;
  > li {
    position: relative;
    width: 100%;
    height: 1.06rem;
    float: left;
    > div:nth-of-type(1) {
      margin-left: 0.12rem;
      margin-right: 0.12rem;
      height: 0.75rem;
      border-bottom: 0.005rem solid @bordercolor_1;
      padding: 0.15rem 0;
      position: relative;
      > div {
        width: 100%;
        height: 100%;
        > div:nth-of-type(1) {
          margin-left: 0.08rem;
          margin-right: 0.15rem;
          height: 100%;
          // line-height: 0.75rem;
          > img {
            width: 0.16rem;
            float: left;
            margin-top: 0.27rem;
          }
        }
        div:nth-of-type(2) {
          margin-right: 0.15rem;
          height: 100%;
          width: 0.9rem;
          > img {
            width: 100%;
            height: 100%;
            float: left;
          }
        }
        div:nth-of-type(3) {
          height: 100%;
          width: 1.96rem;
          > p {
            overflow: hidden;
          }
          > p:nth-of-type(1) {
            font-size: @fontsize_4;
            color: @color_1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          > p:nth-of-type(2),
          p:nth-of-type(3) {
            font-size: @fontsize_6;
            color: @color_2;
            margin-top: 0.06rem;

            > span {
              margin-right: 0.05rem;
            }
          }

          > p:nth-of-type(4) {
            font-size: @fontsize_4;
            color: @colorone;
            margin-top: 0.06rem;
            > span:nth-of-type(2) {
              font-size: 0.11rem;
              color: @color_2;
            }
            > span {
              margin-right: 0.05rem;
            }
          }
        }
        > div {
          height: 100%;
          float: left;
        }
      }
    }
  }
}
#id_2 {
  width: 1.09rem;
  height: 1.05rem;
  position: absolute;
  top: 0;
  right: -1.09rem;
  background: @colorone;
  font-size: @fontsize_3;
  color: #ffffff;
  text-align: center;
  line-height: 1.05rem;
}
.class_2 {
  right: 0 !important;
  transition: all 0.6s ease;
}
.class_1 {
  margin-left: -1.09rem !important;
  transition: all 0.2s ease;
}
#div_btn {
  width: 100%;
  height: 0.5rem;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: @colorthree;
  > span {
    float: left;
    line-height: 0.5rem;
    font-size: @fontsize_5;
    color: @color_2;
    margin-left: 0.12rem;
  }
  > div {
    width: 1.1rem;
    height: 0.5rem;
    float: right;
    background: @colorone;
    font-size: @fontsize_3;
    color: #ffffff;
    text-align: center;
    line-height: 0.5rem;
  }
}
</style>

