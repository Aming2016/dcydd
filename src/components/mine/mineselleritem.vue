<template>
  <div class="mineselleritem">
      <headertwo :dataname="dataname"></headertwo>
      <div class="title_div">
        <div>
          <div v-if="data.status=='ZERO'">
            <img src="../../imgs/mine/fhdhjsfhjso.png" alt="">
            <p style="background:#cacaca;"></p>
            <img src="../../imgs/mine/daiheshitwo.png" alt="">
            <p style="background:#cacaca;"></p>
            <img src="../../imgs/mine/daifabutwo.png" alt="">
          </div>
          <div v-else-if="data.status=='ONE'">
            <img src="../../imgs/mine/fhdhjsfhjso.png" alt="">
            <p></p>
            <img src="../../imgs/mine/uhffkishaa.png" alt="">
            <p style="background:#cacaca;"></p>
            <img src="../../imgs/mine/daifabutwo.png" alt="">
          </div>
          <div v-else>
            <img src="../../imgs/mine/fhdhjsfhjso.png" alt="">
            <p></p>
            <img src="../../imgs/mine/uhffkishaa.png" alt="">
            <p></p>
            <img src="../../imgs/mine/dhafhash.png" alt="">
          </div>
          <div v-if="data.status=='ZERO'">
            <span style="color:#FF4343">申请中</span>
            <span>核实中</span>
            <span>已发布</span>
          </div>
          <div v-else-if="data.status=='ONE'">
            <span style="color:#FF4343">申请中</span>
            <span style="color:#FF4343">核实中</span>
            <span>已发布</span>
          </div>
          <div v-else>
            <span style="color:#FF4343">申请中</span>
            <span style="color:#FF4343">核实中</span>
            <span style="color:#FF4343">已发布</span>
          </div>
        </div>
      </div>
      <div id="div_id_1">
        <span>[<span style="color:#ff4343;">{{data.applicationType|brokertype}}</span>]申请记录</span><span>{{data.applicationTime}}</span>
      </div>
       <div id="div_id_2">
        {{data.buildingName}}
      </div>
      <ul class="ul_1" v-show="gerenxinxinum">
        <li>
           <div>姓名</div>
           <div>{{data.linkman}}</div>
        </li>
        <li>
           <div>电话</div>
           <div>{{data.phone}}</div>
        </li>
        <li>
           <div>城市</div>
           <div>{{data.cityCode}}</div>
        </li>
        <li>
           <div>小区</div>
           <div>{{data.buildingName }} ( {{data.buildNum }}{{data.unitNum}}{{data.roomNum}} )</div>
        </li>
        <li>
           <div>具体地址</div>
           <div id="div_id_12">{{data.address}}</div>
        </li>
        <li v-if="id=='3'">
           <div>业务类型</div>
           <div id="div_id_12">{{data.applicationType }}</div>
        </li>
      </ul>
      <div id="div_id_3" @click="imgbtnone">
        <img src="../../imgs/mine/xiajiantou.png" alt="" v-if="imgbtn">
        <img src="../../imgs/mine/shangjiantou.png" alt="" v-else>
      </div>
      <div id="div_id_4">
        跟进人
      </div>
      <div id="div_id_5" @click="brokeritem">
        <div>
          <img :src="data.broker.photo|headimgfilter" alt="">
        </div>
        <div>
          <div>
             <p>
              <span>{{data.broker.emplName}}</span>
              <span>{{data.broker.positionName}}</span>
            </p>
            <p>
              <span>{{data.broker.grade}}</span>
              <span>评分</span>
            </p>
          </div>
          <div>{{data.broker.deptName}}</div>
          <ul>
            <li v-for="item in data.broker.emplFlag">{{item}}</li>
          </ul>
        </div>
      </div>
      <div v-if="data.house!==null">
      <div id="div_id_4">
        委托房源
      </div>
        <div class="cnxhlist" style="width:100%;margin:0;background:#ffffff;">
            <div class="cnxhlistitem" style="border:none;">
                <div class="cnxhcontnet" @click="rentingitembtn">
                    <div class="cnxhcontnetleft">
                        <!-- <p v-show="item.type=='ORIGINAL_HOUSE'">原始房源</p> -->
                        <img :src="data.house.housePic|imgfilter" alt="">
                    </div>
                    <div class="cnxhcontnetright" style="margin-left:0.2rem;">
                        <div class="cnxhconterone">
                            {{data.house.houseTitle}}
                        </div>
                        <div class="cnxhcontertwo">
                            {{data.house.areaName}} {{data.house.districtName}} {{data.house.houseDirection}}
                        </div>
                        <div class="cnxhconterthree">
                            {{data.house.roomsNum}}房{{data.house.livingRoomNum}}厅 {{data.house.builtArea}}m²  
                        </div>
                        <div class="cnxhconterfour">
                            <div v-for="item in data.house.houseTag">{{item}}</div>
                           
                         
                        </div>
                        <div class="cnxhconterfive" v-if="id=='1'">
                            <div>{{data.house.saleTotal}}万</div>
                            <div>{{data.house.saleTotal}}元/平</div>
                        </div>
                        <div class="cnxhconterfive" v-else>
                            <div>{{data.house.rentPrice}}元/月</div>
                        </div>
                    </div>
                </div>           
            </div>
        </div>
      <div id="div_id_4" style="float:left;">
        房源动态
      </div>
      <ul id="ul_id_2">
        <li>
          <div>近七日带看（次）</div>
          <div>{{data.house.day7Num}}</div>
        </li>
        <li>
          <div>近30日带看（次）</div>
          <div>{{data.house.day30Num}}</div>
        </li>
        <li>
          <div>收藏房源（人）</div>
          <div>{{data.house.collectNum}}</div>
        </li>
      </ul>
      <div id="div_id_6" @click="takelooklistbtn">
        <div>
          <p>带看记录</p>
          <p>最近带看{{data.house.recentlySee}}
            <img src="../../imgs/home/gengduojiantou.png" alt="">
          </p>
        </div>
      </div>
      </div>
  </div>
</template>
<script>
import headertwo from "../module/headertwo";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      imgbtn: true,
      gerenxinxinum: false,
      dataname: "委托详情",
      id: "",
      itemid: "",
      url: "",
      data: ""
    };
  },
  created() {
    this.id = this.$route.params.id.split("a")[0];
    this.itemid = this.$route.params.id.split("a")[1];
    if (this.id == "1") {
      this.url = this.$url.URL.HOUSEENTRUSTAPPLYSELL;
    } else if (this.id == "2") {
      this.url = this.$url.URL.HOUSEENTRUSTAPPLYRENT;
    } else {
      this.url = this.$url.URL.LOANAGENCYAPPLYRESTLOAN;
    }
    this._querys();
  },
  methods: {
    imgbtnone() {
      this.gerenxinxinum = !this.gerenxinxinum;
      this.imgbtn = !this.imgbtn;
    },
    _querys() {
      this.$http
        .get(this.url + "/" + this.itemid)
        .then(res => {
          if (res.data.status == "1") {
            if (res.data.data.broker) {
              console.log("ddddd")
              res.data.data.broker.emplFlag = res.data.data.broker.emplFlag.split(
                ","
              );
            }
            if (res.data.data.house) {
              res.data.data.house.houseTag = res.data.data.house.houseTag.split(
                ","
              );
            }

            this.data = res.data.data;
            console.log(this.data);
          } else {
            Toast({
              message: res.data.msg,
              position: "bottom",
              duration: 500
            });
          }
        })
        .catch(res => {
          Toast({
            message: res.data.msg,
            position: "bottom",
            duration: 500
          });
        });
    },
    brokeritem() {
      this.$router.push({ path: "/brokeritem/" + this.data.broker.id });
    },
    rentingitembtn() {
      this.$router.push({
        path: "/rentingitem/" + this.data.house.sdid,
        query: { id: this.id }
      });
    },
    takelooklistbtn() {
      this.$router.push("/takelooklist/" + this.id + "a" + this.data.house.id);
    }
  },
  components: {
    headertwo
  }
};
</script>
<style lang="less" scoped>
@import "../../common/css/master.less";
@import "../../common/css/fulist.css";
.mineselleritem {
  width: 100%;
  min-height: 100%;
  background-color: #f9f9f9;
  border-top: 1px solid #ffffff;
  box-sizing: border-box;
  overflow: hidden;
}
#div_id_6 {
  width: 100%;
  height: 0.45rem;
  background: #ffffff;
  margin-bottom: 0.25rem;
  > div {
    margin: 0 0.12rem;
    height: 100%;
    border-top: 0.005rem solid @bordercolor_1;
    > p:nth-of-type(2) {
      float: right;
      color: @color_3;
      font-size: @fontsize_6;
      > img {
        height: 0.165rem;
        margin-top: -0.05rem;
        margin-left: 0.1rem;
      }
    }
    > p:nth-of-type(1) {
      float: left;
      font-size: @fontsize_3;
      color: @color_1;
    }
    > p {
      line-height: 0.45rem;
    }
  }
}
.cnxhcontnetleft {
  position: relative;
  > p {
    position: absolute;
    top: 0;
    left: 0;
    width: 0.6rem;
    height: 0.2rem;
    background: #00b969;
    text-align: center;
    line-height: 0.2rem;
    font-size: @fontsize_7;
    color: #ffffff;
    border-radius: 0 0.1rem 0.1rem 0;
  }
}
#ul_id_2 {
  width: 100%;
  padding: 0.2rem 0;
  background: #ffffff;
  overflow: hidden;
  > li {
    width: 33.33333%;
    float: left;
    font-size: @fontsize_5;
    color: @color_2;
    > div:nth-of-type(2) {
      margin-top: 0.1rem;
      font-size: @fontsize_2;
      color: @colorone;
    }
    > div {
      margin-left: 0.12rem;
    }
  }
}
#div_id_12 {
  width: 2rem;
  overflow: hidden; /*内容超出后隐藏*/
  text-overflow: ellipsis; /* 超出内容显示为省略号*/
  white-space: nowrap; /*文本不进行换行*/
}
#div_id_4 {
  width: 100%;
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 0.19rem;
  color: @color_1;
  text-indent: 0.12rem;
  border-bottom: 0.005rem solid @bordercolor_1;
  background: #ffffff;
  margin-top: 0.1rem;
}
.ul_1 {
  width: 100%;
  background: #ffffff;
  > li:nth-last-of-type(1) {
    border-bottom: 0.005rem solid @bordercolor_1;
  }
  > li {
    margin: 0 0.12rem;
    height: 0.5rem;
    border-top: 0.005rem solid @bordercolor_1;
    > div:nth-of-type(1) {
      width: 30%;
      font-size: @fontsize_4;
      color: #222222;
    }
    > div {
      float: left;
      width: 70%;
      overflow: hidden; /*内容超出后隐藏*/
      text-overflow: ellipsis; /* 超出内容显示为省略号*/
      white-space: nowrap; /*文本不进行换行*/
      font-size: @fontsize_3;
      color: @color_2;
      line-height: 0.5rem;
    }
  }
}
#div_id_3 {
  width: 100%;
  height: 0.4rem;
  background: #ffffff;
  line-height: 0.2rem;
  text-align: center;
}
#div_id_2 {
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  font-size: 0.18rem;
  color: @color_1;
  background: #ffffff;
  text-indent: 0.12rem;
}
#div_id_5 {
  width: 100%;
  padding: 0.15rem 0;
  background: #ffffff;
  overflow: hidden;
  > div:nth-of-type(2) {
    width: 2.68rem;
    float: left;
    ul {
      width: 100%;
      overflow: hidden;
      > li {
        font-size: @fontsize_6;
        color: @color_3;
        background: @colorthree;
        padding: 0.05rem 0.08rem;
        float: left;
        margin-right: 0.05rem;
        border-radius: @boxborder_2;
      }
    }
    > div:nth-of-type(2) {
      font-size: @fontsize_3;
      color: @color_2;
      margin: 0.1rem 0;
    }
    > div:nth-of-type(1) {
      overflow: hidden;
      > p:nth-of-type(1) {
        float: left;
        font-size: 0.18rem;
        color: @color_1;
        overflow: hidden;
        > span:nth-of-type(2) {
          font-size: @fontsize_8;
          color: @color_3;
          margin-left: 0.05rem;
        }
      }
      > p:nth-of-type(2) {
        float: right;
        margin-right: 0.12rem;
        font-size: 0.17rem;
        color: @colorone;
        overflow: hidden;
        > span:nth-of-type(2) {
          font-size: @fontsize_5;
          color: @color_3;
        }
      }
    }
  }
  > div:nth-of-type(1) {
    width: 0.75rem;
    height: 0.75rem;
    float: left;
    border-radius: 50%;
    overflow: hidden;
    margin-left: 0.12rem;
    margin-right: 0.2rem;
    > img {
      width: 100%;
      height: 100%;
      float: left;
    }
  }
}
#div_id_1 {
  width: 100%;
  height: 0.6rem;
  margin-top: 0.1rem;
  background: #ffffff;
  border-bottom: 0.005rem solid @bordercolor_1;
  box-sizing: border-box;
  > span:nth-last-of-type(1) {
    font-size: @fontsize_5;
    color: @color_3;
    float: right;
    line-height: 0.6rem;
    margin-right: 0.12rem;
  }
  > span:nth-of-type(1) {
    float: left;
    font-size: 0.19rem;
    color: @color_1;
    line-height: 0.6rem;
    margin-left: 0.12rem;
  }
}
.title_div {
  margin-top: 0.44rem;
  width: 100%;
  overflow: hidden;
  background: #ffffff;
  padding: 0.35rem 0;
  > div {
    margin-left: 0.4rem;
    margin-right: 0.4rem;
    overflow: hidden;
    position: relative;
    > div:nth-of-type(2) {
      overflow: hidden;
      font-size: @fontsize_5;
      color: @color_4;
      margin-top: 0.1rem;
      position: relative;
      > span:nth-of-type(1) {
        position: absolute;
        left: 0;
      }
      > span:nth-of-type(2) {
        display: block;
        text-align: center;
      }
      > span:nth-last-of-type(1) {
        position: absolute;
        right: 0;
        top: 0;
      }
    }
    > div:nth-of-type(1) {
      overflow: hidden;
      > img:nth-of-type(1) {
        margin-left: 0.06rem;
      }
      > img {
        float: left;
        width: 0.25rem;
      }
      > p {
        float: left;
        width: 1rem;
        height: 0.03rem;
        background: @colorone;
        margin: 0 0.02rem;
        margin-top: 0.1rem;
      }
    }
  }
}
</style>

