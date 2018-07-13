<template>
    <div class="handbookone">
      <div v-if="movenum">
      <p class="alertbox" v-show="alertnumber">
        <ul>
          <li>
            <p>联系客服进行投诉</p>
            <p>400-123-1326</p>
          </li>
          <li>
            <p @click="alertnumber=false">取消</p>
            <a href="tel:4001231326">
              <p @click="alertnumber=false">确定</p>
            </a>
            
          </li>
        </ul>
      </p>
      <div class="listitem" v-for="item in datalist">
        <div class="listitemtitle">
          <span>{{item.scheduleTime}}</span> 
          <span>{{item.brokerName}}</span>
          <span>带看</span>
          <img src="../../imgs/home/tusouone.png" alt="" @click="alertbtn">
          <img src="../../imgs/home/yipingjiatwo.png" alt="" v-if="item.isEvaluate">
          <img src="../../imgs/home/pinglunone.png" alt="" v-else @click="appraisepeoplebtn(item)">
        </div>
        <ul class="ul_1">
          <li  v-for="item in item.houseList">
            <div @click="listitembtn(item)">
              <div>
                <div v-show="item.type=='ORIGINAL_HOUSE'||item.status!='0'" :class="{statusclass:item.status!='0'}">
                  <p :class="{pclass:item.status!='0'}">{{item.status|labelonefilter}}<span v-if="item.type=='ORIGINAL_HOUSE'&&item.status!='0'">/</span>{{item.type|labelfilter}}</p>
                </div>
                
                <img :src="item.housePic|imgfilter" alt="">
              </div>
              <div>
                <p :class="{decoration:item.status!='0'}">{{item.houseTitle}}</p>
                <p>
                  <span>{{item.areaName}}</span>
                  <span>{{item.districtName}}</span>
                  <span>{{item.houseDirection}}</span>
                </p>
                <p>
                  <span>{{item.roomsNum}}房{{item.livingRoomNum}}厅</span>
                  <span>{{item.builtArea}}㎡</span>
                </p>
                <p>
                  <span v-for="item in item.houseTag">{{item}}</span>
                </p>
                <p>
                  <span>{{item.saleTotal}}万</span>
                  <span>{{item.salePrice}}元/平</span>
                </p>
              </div>
            </div>
            <div @click="houseremarkbtn(item)">添加房源备注</div>
          </li>
          </ul>
      </div>
      </div>
      <div id="div_67" v-else>
        <img src="../../imgs/home/duibiliebiaokongbai.png" alt="">
        <div>暂无已看记录~~~</div>
      </div>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      movenum: true,
      alertnumber: false,
      page: 1,
      datalist: "" //数据
    };
  },
  created() {
    this._querys();
  },
  methods: {
    listitembtn(item) {
      //详情
      this.$router.push({
        path: "/rentingitem/" + item.houseSdid,
        query: { id: "1" }
      });
    },
    _querys() {
      this.$http
        .get(this.$url.URL.APPOINTCOMPLETE + "/?pageNo=" + this.page)
        .then(res => {
          if (res.data.status == "1") {
            for (let i = 0; i < res.data.data.length; i++) {
              for (let l = 0; l < res.data.data[i].houseList.length; l++) {
                if (res.data.data[i].houseList[l].houseTag.length > 3) {
                  res.data.data[i].houseList[l].houseTag = res.data.data[
                    i
                  ].houseList[l].houseTag.split(",");
                  res.data.data[i].houseList[l].houseTag = res.data.data[
                    i
                  ].houseList[l].houseTag.splice(-3);
                } else {
                  res.data.data[i].houseList[l].houseTag =
                    res.data.data[i].houseList[l].houseTag;
                }
              }
            }
            this.datalist = res.data.data;
            console.log(this.datalist);
            if (this.datalist.length > 0) {
              this.movenum = true;
            } else {
              this.movenum = false;
            }
          } else {
            Toast({
              message: res.data.msg,
              position: "bottom"
            });
          }
        });
    },
    alertbtn() {
      this.alertnumber = true;
    },
    houseremarkbtn(item) {
      this.$store.houseremark = {
        brokerName: item.houseTitle,
        houseType: item.houseType,
        builtArea: item.builtArea + "万"
      };
      this.$router.push("/houseremark/" + item.id);
    },
    appraisepeoplebtn(item) {
      this.$store.brokermessage = {
        brokerName: item.brokerName,
        houseContent: item.houseContent
      };
      this.$router.push("/appraisepeople/" + item.brokerId + "a" + item.id);
    }
  }
};
</script>
<style scoped lang="less">
@import "../../common/css/master.less";
.handbookone {
  width: 100%;
  // height:100%;
  // min-height: 100%;
  background: @colorthree;
  overflow: hidden;
  box-sizing: border-box;
  border-top: 1px solid #ffffff;
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
  height: 100% !important;
   position: fixed;
  text-align: center;
  background: #ffffff;
  > img {
    width: 35%;
    margin-top: 1.36rem;
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
.alertbox {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9999;
  > ul {
    width: 2.6rem;
    height: 1.2rem;
    background: #ffffff;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -1.3rem;
    margin-top: -0.6rem;
    border-radius: @boxborder_2;
    overflow: hidden;
    > li:nth-of-type(1) {
      border-top: 0.005rem solid #ffffff;
      box-sizing: border-box;
      width: 100%;
      height: 0.8rem;
      text-align: center;
      font-size: @fontsize_3;
      > p {
        overflow: hidden;
      }
      > p:nth-of-type(1) {
        margin-top: 0.2rem;
      }
      > p:nth-of-type(2) {
        margin-top: 0.1rem;
        color: @color_1;
      }
    }
    > li:nth-of-type(2) {
      width: 100%;
      height: 0.4rem;
      border-top: 0.005rem solid @bordercolor_1;
      box-sizing: border-box;
      > a > p:nth-of-type(1) {
        border-left: 0.005rem solid @bordercolor_1;
        box-sizing: border-box;
        color: @colortwo;
      }
      p {
        width: 50%;
        float: left;
        text-align: center;
        line-height: 0.4rem;
        font-size: @fontsize_3;
        color: @color_2;
      }
    }
  }
}
.handbookone > div:nth-last-of-type(1) {
  margin-bottom: 0.6rem;
}
.handbookone > div:nth-of-type(1) {
  margin-top: 0.44rem;
}
.listitem {
  width: 100%;
  margin-bottom: 0.1rem;
  background: @colorfour;
  overflow: hidden;
}
.listitemtitle {
  width: 100%;
  height: 0.5rem;
  background: @colorfour;
  > span:nth-of-type(2) {
    color: @colorone;
  }
  > span:nth-last-of-type(1) {
    margin-left: 0;
  }
  > span {
    line-height: 0.5rem;
    float: left;
    font-size: @fontsize_8;
    margin-left: 0.12rem;
    color: @color_3;
  }
  > img:nth-of-type(1) {
    margin-right: 0.22rem;
    margin-left: 0.35rem;
  }
  > img {
    float: right;
    height: 0.25rem;
    margin-top: 0.1rem;
  }
}
.ul_1 {
  width: 100%;
  > li:nth-of-type(1) {
    margin-top: 0;
    overflow: hidden;
  }
  > li {
    margin-top: 0.05rem;
    background: #ffffff;
    > div:nth-of-type(2) {
      width: 100%;
      height: 0.45rem;
      border-top: 0.005rem solid @bordercolor_1;
      text-align: center;
      line-height: 0.45rem;
      font-size: @fontsize_3;
      color: @color_3;
    }
    > div:nth-of-type(1) {
      padding: 0.15rem 0;
      width: 100%;
      overflow: hidden;
      > div:nth-of-type(2) {
        width: 2.1rem;
        margin-left: 0.2rem;
        font-size: @fontsize_6;
        color: @color_2;
        > p:nth-of-type(5) {
          > span:nth-of-type(1) {
            font-size: @fontsize_4;
            color: @colorone;
            margin-right: 0.15rem;
          }
          > span:nth-of-type(2) {
            font-size: 0.11rem;
          }
        }
        > p:nth-of-type(4) {
          > span:nth-of-type(1) {
            background-color: #edf9ff;
            color: #00a8ff;
          }
          > span:nth-of-type(2) {
            background-color: #fff2fd;
            color: #ff7f50;
          }
          > span:nth-of-type(3) {
            background-color: #ebfff3;
            color: #00b969;
          }
          > span {
            font-size: 0.1rem;
            float: left;
            padding: 0.02rem 0.05rem;
            padding-top: 0.04rem;
          }
        }
        > p {
          margin-top: 0.08rem;
          line-height: 1.1;
          > span {
            margin-right: 0.05rem;
          }
        }
        > p:nth-of-type(1) {
          font-size: @fontsize_4;
          color: @color_1;
          line-height: 1.1;
          margin-top: 0;
        }
      }
      > div:nth-of-type(1) {
        width: 1.2rem;
        height: 1rem;
        margin-left: 0.12rem;
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
        > img {
          width: 100%;
          height: 100%;
          float: left;
        }
      }
      > div {
        float: left;
      }
    }
  }
}
</style>
