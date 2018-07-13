<template>
    <div class="schedule">
        <headertwo :dataname="dataname"></headertwo>
        <div id="titlebtnid" @click="shadenumber=true" v-show="data.status!=='TO_CANCEL'">{{quxiaotitle}}</div>
        <div id="shadewarp" v-show="shadenumber">
            <div id="shadebox">
                <div>您是否要取消预约看房</div>
                <div>
                    <p>
                        <textarea maxlength="50" v-model="textareacontent" placeholder="取消预约的原因">
                            {{textareacontent}}
                        </textarea>
                    </p>
                    <span>{{textareacontent.length}}/50</span>
                </div>
                <div>
                    <p @click="shadecall">取消</p>
                    <p @click="shadeadd" :class="{class_14:colornumber}">确定</p>
                </div>
            </div>
        </div>
        <div id="topdiv_1" :class="{class_1:!moveset}">
            <p>{{data.appointDate}}</p>
            <p style="line-height:1.1;">看房{{data.houseNum}}套</p>
            <p><span>{{data.appointName}}</span><span>{{data.appointMobile}}</span></p>
        </div>
        <div id="contentdiv_1">
             <ul id="ul_1" v-if="data.procStep=='SUCCESS'">
                 <li class="li_2" style="padding-bottom:0.05rem;"  v-show="moveset">
                     <p>2</p>
                    <div>
                        <span style="color:#ff4343;">正在为您安排经纪人</span>
                    </div>
                    <div>
                        经纪人会与您电话联系，确定具体约看时间，请主动查看手机
                    </div>
                </li>
                 <li class="li_1" style="margin-left:0.2rem;">
                     <p :class="{class_1:!moveset}">1</p>
                    <div>
                        <span>提交预约成功</span><span>{{data.createDateTime}}</span>
                    </div>
                    <div>
                        <span>看房时间:</span>
                        <span>{{data.appointDate}}</span>
                    </div>
                    <div>
                        <span>看房套数:</span>
                        <span>看房{{data.houseNum}}套</span>
                    </div>
                    <div>
                        <span>联系方式:</span>
                        <span>{{data.appointName}}</span>
                        <span>{{data.appointMobile}}</span>
                    </div>
                </li>
            </ul>

            <ul id="ul_1" v-else>
                <li class="li_1" v-show="data.procStep=='TO_SCHEDULE'">
                    <p :class="{class_1:!moveset}">3</p>
                    <div>
                        <span>看房日期安排成功</span><span>{{data.scheduleTime}}</span>
                    </div>
                    <div>
                        <span>看房时间:</span>
                        <span>{{data.appointDate}}</span>
                    </div>
                    <div>
                        <span>看房套数:</span>
                        <span>看房{{data.houseNum}}套</span>
                    </div>
                    <div>
                        <span>联系方式:</span>
                        <span>{{data.appointName}}</span>
                        <span>{{data.appointMobile}}</span>
                    </div>
                    <div id="buttonone" :class="{class_1:!moveset}" @click="aboutlistbtn">
                        查看房源
                    </div>
                </li>
                 <li class="li_2">
                     <p :class="{class_1:!moveset}">2</p>
                    <div>
                        <span>经纪人安排成功</span><span>{{data.assignBrokerTime?data.assignBrokerTime:""}}</span>
                    </div>
                    <div>
                        经纪人会与您电话联系，APP会告知您经纪人的联系方式
                    </div>
                    <div>
                        <div><img :src="data.broker.photo?data.broker.photo:''" alt=""></div>
                        <div>
                            <p>{{data.broker.emplName?data.broker.emplName:""}}<span>{{data.broker.emplFlag?data.broker.emplFlag:""}}</span></p>
                            <p style="line-height:1.1;">{{data.broker.deptName?data.broker.deptName:""}}</p>
                        </div>
                        <a :href="'tel:'+data.broker.phone">
                            <img src="../../imgs/home/dianhua.png" alt="">
                        </a>
                        
                    </div>
                </li>
                 <li class="li_1" style="margin-left:0.2rem;">
                     <p :class="{class_1:!moveset}">1</p>
                    <div>
                        <span>提交预约成功</span><span>{{data.createDateTime}}</span>
                    </div>
                    <div>
                        <span>看房时间:</span>
                        <span>{{data.appointDate}}</span>
                        <!-- <span>14:30</span> -->
                    </div>
                    <div>
                        <span>看房套数:</span>
                        <span>看房{{data.houseNum}}套</span>
                    </div>
                    <div>
                        <span>联系方式:</span>
                        <span>{{data.appointName}}</span>
                        <span>{{data.appointMobile}}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import headertwo from "../module/headertwo";
import { MessageBox, Toast } from "mint-ui";
export default {
  data() {
    return {
      dataname: "日程详情",
      moveset: true,
      id: "",
      data: "", //详情
      shadenumber: false, //蔗渣层
      quxiaotitle: "取消预约",
      textareacontent: "",
      colornumber: false
    };
  },
  created() {
    this.id = this.$route.params.id;
    this._querys();
  },
  watch: {
    textareacontent(val) {
      if (this.textareacontent) {
        this.colornumber = true;
      } else {
        this.colornumber = false;
      }
    }
  },
  methods: {
    shadeadd() {
      //取消预约看房的确定按钮
      if (this.colornumber) {
        this._queryscanel();
      } else {
        Toast({
          message:"请填写取消预约原因",
          position: "bottom"
        });
      }
    },
    shadecall() {
      //取消预约看房的取消按钮
      this.shadenumber = false;
    },
    aboutlistbtn() {
      console.log(this.data)
      this.$router.push("/aboutlist/"+this.id);
    },
    _querys() {
      this.$http
        .get(this.$url.URL.APPONTREADYDETIL + "/" + this.id)
        .then(res => {
          this.data = res.data.data;
          this.data.status == "TO_CANCEL"
            ? (this.moveset = false)
            : (this.moveset = true);
        });
    },
    _queryscanel() {
      this.$http
        .post(this.$url.URL.APPOINTCANCEL, {
          cancelCause: this.textareacontent,
          id: this.id
        })
        .then(res => {
          if (res.data.status == "1") {
            this.shadenumber = false;
            this.quxiaotitle = "";
            this.moveset = false;
          } else {
            this.shadenumber = false;
            Toast({
              message: res.data.msg,
              position: "bottom"
            });
          }
          this.shadenumber = false;
        });
    }
  },
  components: {
    headertwo
  }
};
</script>
<style scoped lang="less">
@import "../../common/css/master.less";
.schedule {
  width: 100%;
  min-height: 100%;
  border-top: 0.005rem solid #ffffff;
  box-sizing: border-box;
  background: @colorthree;
}
#topdiv_1 {
  margin: 0 0.12rem;
  margin-top: 0.54rem;
  height: 1.2rem;
  background: #7caef2;
  box-sizing: border-box;
  border-radius: @boxborder_2;
  > p:nth-of-type(1) {
    font-size: 0.18rem;
    color: #333333;
    padding-top: 0.2rem;
  }
  > p {
    font-size: @fontsize_3;
    color: @color_2;
    margin-top: 0.15rem;
    margin-left: 0.15rem;
    overflow: hidden;
    > span {
      margin-right: 0.1rem;
    }
  }
}
#contentdiv_1 {
  margin: 0 0.22rem;
  margin-top: 0.15rem;
  padding-bottom: 0.1rem;
}
.class_1 {
  background: #e6e6e6 !important;
  border-top: none !important;
}
#ul_1 {
  width: 100%;
  border-left: 0.02rem solid @bordercolor_1;
  > li:nth-last-of-type(1) {
    margin: 0;
  }
  > li {
    margin-bottom: 0.1rem;
    position: relative;
    margin-left: 0.2rem;
    > p {
      position: absolute;
      width: 0.2rem;
      height: 0.2rem;
      border-radius: 50%;
      background: @colorone;
      color: #ffffff;
      text-align: center;
      line-height: 0.2rem;
      font-size: @fontsize_5;
      left: -0.31rem;
    }
  }
}
#titlebtnid {
  font-size: @fontsize_4 !important;
  position: fixed;
  top: 0.15rem;
  right: 0.12rem;
  z-index: 999;
  color: #333333;
}
#shadewarp {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  z-index: 9999;
}
#shadebox {
  width: 2.9rem;
  height: 2.65rem;
  position: absolute;
  border-radius: @boxborder_2;
  top: 50%;
  margin-top: -1.325rem;
  left: 50%;
  margin-left: -1.45rem;
  background: #ffffff;
  > div:nth-of-type(2) {
    margin: 0 0.1rem;
    height: 1.6rem;
    border-radius: @boxborder_2;
    border-top: 0.005rem solid #ffffff;
    box-sizing: border-box;
    background: @colorthree;
    border-radius: @boxborder_2;
    position: relative;
    span {
      font-size: @fontsize_7;
      color: @color_3;
      position: absolute;
      bottom: 0.05rem;
      right: 0.05rem;
    }
    > p {
      margin: 0 0.1rem;
      height: 1.3rem;
      margin-top: 0.15rem;
      overflow: hidden;
      textarea {
        width: 100%;
        height: 100%;
        font-size: @fontsize_3;
        color: @color_3;
        text-indent: 0.12rem;
        border:none;
      }
    }
  }
  > div:nth-of-type(1){
    width: 100%;
    padding-top: 0.25rem;
    padding-bottom: 0.15rem;
    font-size: @fontsize_3;
    color: @color_1;
    text-align: center;
  }
  > div:nth-last-of-type(1){
    width: 100%;
    height: 0.4rem;
    border-top: 0.005rem solid @bordercolor_1;
    box-sizing: border-box;
    margin-top: 0.1rem;
    > p:nth-of-type(2) {
      border-left: 0.005rem solid @bordercolor_1;
      box-sizing: border-box;
    }
    > p {
      width: 50%;
      float: left;
      height: 0.38rem;
      text-align: center;
      line-height: 0.4rem;
      font-size: @fontsize_3;
      color: @color_2;
      overflow: hidden;
    }
  }
}
.class_14 {
  color: #0064eb !important;
}
.li_2 {
  width: 3.1rem;
  margin-left: 0.2rem;
  background: #ffffff;
  padding: 0.2rem 0;
  padding-bottom: 0;
  border-radius: @boxborder_2;
  > div:nth-of-type(3) {
    margin: 0 0.1rem;
    padding: 0.15rem 0;
    overflow: hidden;
    border-top: 0.005rem solid @bordercolor_1;

    > a > img {
      height: 0.25rem;
      width: 0.24rem;
      margin-right: 0.15rem;
      margin-top: 0.2rem;
      float: right;
    }
    > div:nth-of-type(2) {
      float: left;
      margin-left: 0.15rem;
      padding-top: 0.1rem;
      > p:nth-of-type(2) {
        font-size: @fontsize_3;
        color: @color_2;
        margin-top: 0.12rem;
      }
      > p {
        font-size: 0.18rem;
        color: @color_1;
        overflow: hidden;
        > span {
          font-size: @fontsize_6;
          color: @color_3;
          margin-left: 0.15rem;
        }
      }
    }
    > div:nth-of-type(1) {
      float: left;
      width: 0.6rem;
      height: 0.6rem;
      margin-left: 0.05rem;
      border-radius: 50%;
      > img {
        width: 100%;
        height: 100%;
        float: left;
      }
    }
  }
  > div:nth-of-type(2) {
    margin-left: 0.1rem;
    margin-right: 0.25rem;
    font-size: @fontsize_8;
    color: @color_2;
    line-height: 1.5;
    padding-top: 0.05rem;
    padding-bottom: 0.1rem;
  }
  > div:nth-of-type(1) {
    width: 100%;
    overflow: hidden;
    margin-bottom: 0.1rem;
    > span:nth-of-type(2) {
      font-size: 0.11rem;
      color: @color_3;
      float: right;
      margin-right: 0.1rem;
    }
    > span {
      font-size: @fontsize_4;
      color: @color_1;
      float: left;
      margin-left: 0.1rem;
    }
  }
}
.li_1 {
  width: 3.1rem;
  margin-left: 0.2rem;
  background: #ffffff;
  padding: 0.2rem 0;
  border-radius: @boxborder_2;
  > div {
    margin-top: 0.1rem;
    font-size: @fontsize_8;
    color: @color_2;
    > span:nth-of-type(1) {
      color: @color_3;
      margin-left: 0.1rem;
    }
    > span {
      margin-right: 0.1rem;
    }
  }
  #buttonone {
    width: 2.45rem;
    height: 0.4rem;
    background: rgba(255, 67, 67, 0.2);
    margin: auto;
    font-size: @fontsize_3;
    color: @colorone;
    text-align: center;
    line-height: 0.4rem;
    border-radius: @boxborder_2;
    margin-top: 0.2rem;
  }
  > div:nth-of-type(1) {
    width: 100%;
    overflow: hidden;
    margin-bottom: 0.1rem;
    > span:nth-of-type(2) {
      font-size: 0.11rem;
      color: @color_3;
      float: right;
      margin-right: 0.1rem;
    }
    > span {
      font-size: @fontsize_4;
      color: @color_1;
      float: left;
      margin-left: 0.1rem;
    }
  }
}
</style>

