<template>
    <div class="handbookone"> 
      <div id="handbokonebox" v-if="movenum">
      <ul class="uil_1"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
        <li v-for="item in list" @click.stop="schedulebtn(item)">
          <p :class="{coloronep:item.status=='2'}">{{item.status=='0'?"确认中":item.status=='1'?"预约成功":"已取消"}}</p>
          <div>
            <p :class="{appointclass:item.status=='2'}">{{item.appointDate}}</p>
            <p>看房{{item.houseNum}}套</p>
            <p v-for="item in item.houseContent">{{item}}</p>
          </div>
          <div>
            <p>
              <img src="../../imgs/home/banner.png" alt="">
            </p>
            <span>{{item.broker.emplName}}</span>
            <a :href="'sms:'+item.broker.phone" @click.stop="''">
              <img src="../../imgs/home/duanxin.png" alt="">
            </a>
            <a :href="'tel:'+item.broker.phone" @click.stop="''">
              <img src="../../imgs/home/dianhua.png" alt="">
            </a>
          </div>
        </li>
    </ul>
    </div>
    <div id="div_67" v-else>
      <img src="../../imgs/home/duibiliebiaokongbai.png" alt="">
      <div>暂无待看日程~~~</div>
      <div @click="yuyuebtn">去预约</div>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      movenum:true,
      number: false,
      page: "1",
      list: [],
      itemdata:"",
    };
  },
  created() {
    this._querys();
  },
  methods:{
    yuyuebtn(){
      this.$router.push("/awaitlook")
    },
    loadMore(){
      if (this.page !== "1") {
        this.loading = true;
        this._querys();
        
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      }
    },
    schedulebtn(item){
      this.$router.push("/schedule/"+item.id)
    },
    _querys() {
      this.$http
        .get(this.$url.URL.APPOINTREADYLIST+"?pageNo="+this.page)
        .then(res => {
          for(let i=0;i<res.data.data.length;i++){
            res.data.data[i].houseContent=res.data.data[i].houseContent.split('\\')
          }
          if(res.data.data.length=='0'){
            Toast({
              message: "已全部加载完成",
              position: "bottom",
              duration: 500
            });
          }else{
            Toast({
              message: "正在加载。。。",
              position: "bottom",
              duration: 500
            });
          }
          this.list = this.list.concat(res.data.data);
          console.log(this.list)
          if(this.list.length>0){
            this.movenum=true
          }else{
            this.movenum=false
          }
          this.page++;
        });
    }
  }
};
</script>
<style scoped lang="less">
@import "../../common/css/master.less";
.handbookone {
  width: 100%;
  min-height: 100%;
  background-color: #f9f9f9;
}
#div_67{
  width:100%;
  height:100%;
  position: fixed;
  text-align: center;
  background: #ffffff;
  >img{
    width:35%;
    margin-top:1.3rem;
  }
  >div:nth-of-type(1){
    margin-top:0.7rem;
    font-size:@fontsize_4;
    color:@color_3;
  }
  >div:nth-of-type(2){
    width:50%;
    height:0.4rem;
    border-radius: @boxborder_2;
    border:0.01rem solid @colorone;
    color:@colorone;
    font-size:@fontsize_4;
    text-align: center;
    line-height: 0.4rem;
    margin:0.4rem auto;
  }
}
.appointclass{
  text-decoration:line-through;
  color:@color_3 !important;
}
.uil_1{
  width:100%;
  margin-top:0.44rem;
  margin-bottom:0.5rem;
  overflow: hidden;
  >li{
    background:#ffffff;
    width:100%;
    position: relative;
    margin-bottom:0.1rem;
    float:left;
    >p{
      width:0.6rem;
      height:0.2rem;
      color:#ffffff;
      font-size:0.11rem;
      line-height: 0.2rem;
      text-align: center;
      background:#00b696;
      position: absolute;
      right:0;
      top:0.18rem;
      border-radius: 0.1rem 0 0 0.1rem;
    }
    >div:nth-of-type(2){
      width:100%;
      overflow: hidden;
      padding:0.1rem 0;
      >p:nth-of-type(1){
        width:0.34rem;
        height:0.34rem;
        border-radius: 50%;
        margin-left:0.12rem;
        float:left;
        vertical-align: middle;
        >img{
          width:100%;
          height:100%;
          float:left;
          vertical-align: middle;
        }
      }
      >a:nth-of-type(1)>img{
        height:0.17rem;
        float:right;
        vertical-align: middle;
        margin-top:0.085rem;
        margin-right:0.12rem;
      }
      >a:nth-of-type(2)>img{
        height:0.17rem;
        float:right;
        vertical-align: middle;
        margin-top:0.085rem;
        margin-right:0.45rem;
      }
      >span{
        font-size:@fontsize_3;
        color:@color_1;
        float:left;
        vertical-align: middle;
        margin-top:0.095rem;
        margin-left:0.1rem;
      }
    }
    >div:nth-of-type(1){
      width:100%;
      padding:0.2rem 0;
      border-bottom:0.005rem solid @bordercolor_1;
      >p:nth-of-type(1){
        margin-top:0;
        font-size:@fontsize_2;
        color:@color_1;
      }
      >p{
        margin-left:0.12rem;
        font-size:@fontsize_8;
        color:@color_3;
        margin-top:0.12rem;
        overflow: hidden;
      }
    }
  }
}
.coloronep{
  background:@bordercolor_1 !important;
}
</style>
