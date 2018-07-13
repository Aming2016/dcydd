<template>
  <div class="minsellerone">
     <ul id="ul_1" v-if="movenum" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10"
  infinite-scroll-immediate-check="true">
         <li @click="mineselleritembtn(item)" v-for="item in datalist">
             <div>{{item.buildingName}}</div>
             <div>
                 <p>{{item.applicationTime.split(" ")[0]}}</p>
                 <p>{{item.status|statuskey}}</p>
             </div>
         </li>
     </ul>
     <div id="div_67" v-else>
        <img src="../../imgs/home/duibiliebiaokongbai.png" alt="">
        <div>暂无申请房源~~~</div>
      </div>
  </div>
</template>
<script>
import headertwo from "../module/headertwo";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
        id:"",
        url:"",
        page:"1",
        datalist:[],
        movenum:true
    };
  },
  created() {
      this.id=this.$route.params.id;
      if(this.id=='1'){
          this.url=this.$url.URL.TRUSTAPPLYQUERYSELLHOUSE
      }else if(this.id=='2'){
         this.url = this.$url.URL.TRUSTAPPLYQUERYRENTHOUS;
      }else{
          this.url=this.$url.URL.QUERYLOANAPPLYLIST;
      }
      this._querys();
  },
  filters:{
      statuskey(val){
          if(val=='ZERO'){
              return "申请中"
          }else if(val=='ONE'){
              return "核实中"
          }else{
              return "已发布"
          }
      }
  },
  methods: {
      loadMore() {
      if (this.page != "1") {
        this.loading = true;
        console.log("ddddd")
        this._querys();
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      }
    },
      mineselleritembtn(item){
          this.$router.push("/mineselleritem"+"/"+this.id+"a"+item.id)         
      },
      _querys(){
          this.$http.get(this.url+"?pageNo="+this.page)
          .then(res=>{
              this.datalist.push(...res.data.data)
              if(this.page=='1'){
                  this.datalist.length==0?this.movenum=false:this.movenum=true
              }
              if(res.data.data.length=='0'){
                  Toast({
                    message: "已全部加载。。。",
                    position: "bottom",
                    duration:500
                  });
              }else{
                  Toast({
                    message: "正在加载。。。",
                    position: "bottom",
                    duration:500
                  });
              }
              this.page++
          })
      }
  }
};
</script>
<style scoped lang="less">
@import "../../common/css/master.less";
.minsellerone {
//   margin-top: 0.44rem;
  border-top: 1px solid #ffffff;
  box-sizing: border-box;
  width: 100%;
  min-height: 100%;
  background: #f9f9f9;
}
#div_67{
  position: fixed;
  width:100%;
  height:100%;
  text-align: center;
  background: #ffffff;
  >img{
    width:35%;
    margin-top:1.8rem;
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
#ul_1 {
  width: 100%;
  padding-top:0.44rem;
  > li {
    width:100%;
    padding: 0.2rem 0;
    overflow: hidden;
    background: #ffffff;
    margin-top:0.05rem;
    > div:nth-of-type(1) {
      font-size: @fontsize_2;
      color: @color_1;
      float: left;
      width: 63%;
      line-height: 1.3;
      vertical-align: middle;
      margin-left:0.12rem;
    }
    > div:nth-of-type(2) {
      font-size: @fontsize_5;
      color: @color_3;
      float: right;
      text-align: center;
      width: 25%;
      vertical-align: middle;
      >p:nth-of-type(2){
          margin-top:0.05rem;
          font-size:@fontsize_3;
          color:@colorone;
      }
      >p{
          line-height: 1.3;
      }
    }
  }
}
</style>


