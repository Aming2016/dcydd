<template>
    <div class="calculator">
      <div class="div_title">
          <img src="../../imgs/home/fanhui.png" alt="" @click="backbtn">
          <p :class="{titileactive:active==index}" v-for="(item,index) in titlelist" @click.stop="activebtn(index)">{{item}}</p>
      </div>

      <ul id="ul_1" v-if="active=='0'">
          <li @click.stop="btnone">
              <span>计算方式</span>
              <img src="../../imgs/home/gengduojiantou.png" alt="">
              <span>{{activeonename.name}}</span>
          </li>
          <li>
              <span>贷款总额</span>
              <span style="margin:0;color:#999999;">万</span>
              <input type="text" placeholder="0">
          </li>
          <li @click.stop="btntwo">
              <span>贷款年限</span>
              <img src="../../imgs/home/gengduojiantou.png" alt="">
              <span>{{activetwoname.name}}</span>
          </li>
          <li>
              <span>贷款利率</span>
              <img src="../../imgs/home/gengduojiantou.png" alt="">
              <span>公积金基准利率(3.25%)</span>
          </li>
      </ul>

      <ul id="ul_1" v-else-if="active=='1'">
          <li @click.stop="btnone">
              <span>计算方式</span>
              <img src="../../imgs/home/gengduojiantou.png" alt="">
              <span>{{activeonename.name}}</span>
          </li>
          <li>
              <span>贷款总额</span>
              <span style="margin:0;color:#999999;">万</span>
              <input type="text" placeholder="0">
          </li>
          <li @click.stop="btntwo">
              <span>贷款年限</span>
              <img src="../../imgs/home/gengduojiantou.png" alt="">
              <span>{{activetwoname.name}}</span>
          </li>
          <li>
              <span>贷款利率</span>
              <img src="../../imgs/home/gengduojiantou.png" alt="">
              <span>商业贷款基准利率(3.25%)</span>
          </li>
      </ul>

      <ul id="ul_1" v-else>
          <li @click.stop="btnone">
              <span>计算方式</span>
              <img src="../../imgs/home/gengduojiantou.png" alt="">
              <span>{{activeonename.name}}</span>
          </li>
          <li>
              <span>贷款总额</span>
              <span style="margin:0;color:#999999;">万</span>
              <input type="text" placeholder="0">
          </li>
          <li>
              <span>公积金贷款</span>
              <span style="margin:0;color:#999999;">万</span>
              <input type="text" placeholder="0">
          </li>
          <li>
              <span>公积金利率</span>
              <img src="../../imgs/home/gengduojiantou.png" alt="">
              <span>公积金基准利率(3.25%)</span>
          </li>
          <li>
              <span>商业贷款</span>
              <span style="margin:0;color:#999999;">万</span>
              <input type="text" placeholder="0">
          </li>
          <li>
              <span>商贷利率</span>
              <img src="../../imgs/home/gengduojiantou.png" alt="">
              <span>商业贷款基准利率(3.25%)</span>
          </li>
          <li @click.stop="btntwo">
              <span>贷款年限</span>
              <img src="../../imgs/home/gengduojiantou.png" alt="">
              <span>{{activetwoname.name}}</span>
          </li>
      </ul>
      <div class="warpbox" v-show="activenum" @click.stop="activenum=false">
          <div class="warp" @click.stop="congdea">
              <div class="title">
                  {{title}}
                  <span @click.stop="activenum=false">取消</span>
              </div>
              <ul>
                  <li v-for="(item,index) in list" @click.stop="btnlist(item,index)" :class="{activecolor:item.key}">{{item.name}}</li>
              </ul>
          </div>
      </div>
      <div id="div_id_1">贷款利率仅供计算使用，实际交易利率折扣由银行评估</div>
      <div id="btnid">开始计算</div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      titlelist: ["公积金贷款", "商业贷款", "组合贷款"],
      active: 0,
      title: "计算方法",
      list: "",
      listone: [//计算方式
        { name: "按房价总额", key: true },
        { name: "按贷款总额", key: false }
      ],
      listtwo: [//贷款年限
        { name: "1年", key: true },
        { name: "2年", key: false },
        { name: "2年", key: false },
        { name: "3年", key: false },
        { name: "4年", key: false },
        { name: "5年", key: false },
        { name: "6年", key: false },
        { name: "7年", key: false },
        { name: "8年", key: false },
        { name: "9年", key: false },
        { name: "10年", key: false },
        { name: "11年", key: false },
        { name: "12年", key: false },
        { name: "13年", key: false },
        { name: "14年", key: false },
        { name: "15年", key: false },
        { name: "16年", key: false },
        { name: "17年", key: false },
        { name: "18年", key: false },
        { name: "19年", key: false },
        { name: "20年", key: false },
        { name: "21年", key: false },
        { name: "22年", key: false },
        { name: "23年", key: false },
        { name: "24年", key: false },
        { name: "25年", key: false },
        { name: "26年", key: false },
        { name: "27年", key: false },
        { name: "28年", key: false },
        { name: "29年", key: false },
        { name: "30年", key: false }
      ],
      activenum: false,
      activeonename: { name: "按房价总额", key: false }, //计算方式方法
      activetwoname:{ name: "1年", key: false },//贷款年限
    };
  },
  methods: {
    activebtn(index){
        this.active=index;
    },
    congdea(){

    },
    btnlist(item, index) {
      //点击弹出框列表
      if (this.list[0].name == "按房价总额") {
        for (let i = 0; i < this.listone.length; i++) {
          if (this.listone[i] == item) {
            this.listone[i].key = true;
          } else {
            this.listone[i].key = false;
          }
        }
        this.activeonename = item;
        this.activenum = false;
      } else if (this.list[0].name == "1年") {
        for (let i = 0; i < this.listtwo.length; i++) {
          if (this.listtwo[i] == item) {
            this.listtwo[i].key = true;
          } else {
            this.listtwo[i].key = false;
          }
        }
         this.activenum = false;
         this.activetwoname = item;
      }
    },
    btnone() {
      //点击计算方式
      this.title="计算方式"
      this.activenum = true;
      this.list = this.listone;
    },
    btntwo() {
      //点击贷款年限
      this.title="贷款年限"
      this.activenum = true;
      this.list = this.listtwo;
    },
    backbtn() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped lang="less">
@import "../../common/css/master.less";
.calculator {
  width: 100%;
  min-height: 100%;
  overflow: hidden;
}
.activecolor {
  color: @colorone !important;
}
.warpbox {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  > div {
    width: 100%;
    height: 2.4rem;
    background: #ffffff;
    position: fixed;
    bottom: 0;
    left: 0;
    > ul {
      margin-left: 0.12rem;
      margin-right: 0;
      height: 2rem;
      overflow-y: scroll;
      > li:nth-last-of-type(1) {
        border: none;
      }
      > li {
        width: 100%;
        height: 0.4rem;
        border-bottom: 0.005rem solid @bordercolor_1;
        box-sizing: border-box;
        line-height: 0.4rem;
        font-size: @fontsize_3;
        color: @color_1;
      }
      > li:active {
        color: @colorone;
      }
    }
    > div {
      width: 100%;
      height: 0.4rem;
      border-bottom: 0.005rem solid @bordercolor_1;
      text-align: center;
      line-height: 0.4rem;
      font-size: @fontsize_4;
      color: @color_1;
      position: relative;
      > span {
        position: absolute;
        font-size: @fontsize_3;
        color: @color_3;
        line-height: 0.4rem;
        right: 0.12rem;
      }
    }
  }
}
#btnid{
    width: 3rem;
    height:0.45rem;
    background:@colorone;
    color:#ffffff;
    font-size:0.18rem;
    text-align: center;
    line-height: 0.45rem;
    margin:0.45rem auto;
    border-radius: @boxborder_2;
}
#div_id_1{
    font-size:0.12rem;
    color:@color_4;
    margin-left:0.12rem;
    margin-top:0.1rem;
}
#ul_1 {
  margin-left: 0.12rem;
  margin-right: 0.12rem;
  padding-top: 0.44rem;
  > li {
    width: 100%;
    height: 0.5rem;
    border-bottom: 0.005rem solid @bordercolor_1;
    > span:nth-of-type(1) {
      float: left;
      line-height: 0.5rem;
      font-size: @fontsize_2;
      color: #282828;
    }
    > span:nth-of-type(2) {
      float: right;
      line-height: 0.5rem;
      font-size: @fontsize_3;
      color: #333333;
      margin-right: 0.1rem;
    }
    > img {
      float: right;
      height: 0.18rem;
      margin-top: 0.16rem;
    }
    > input {
      float: right;
      height: 0.5rem;
      width: 60%;
      margin-right: 0.06rem;
      text-align: right;
      font-size: @fontsize_3;
    }
  }
}
.div_title {
  width: 100%;
  height: 0.44rem;
  border-bottom: 0.005rem solid @bordercolor_1;
  position: fixed;
  box-sizing: border-box;
  top: 0;
  left: 0;
  text-align: center;
  > p:nth-of-type(1) {
    margin-left: 16%;
  }
  > p:nth-last-of-type(1) {
    margin: 0;
  }
  > p {
    font-size: @fontsize_8;
    height: 0.44rem;
    line-height: 0.44rem;
    float: left;
    margin-right: 0.33rem;
    overflow: hidden;
  }
  > img {
    height: 0.2rem;
    position: fixed;
    top: 0.11rem;
    left: 0.12rem;
  }
}
.titileactive {
  color: @colorone !important;
  border-bottom: 0.02rem solid @colorone;
  box-sizing: border-box;
}
</style>