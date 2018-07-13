<template>
    <div class="handbookthree">
      <div v-if="movenum">
      <ul id="contentul"  v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10">
          <li v-for="item in list">
              <div class="contentdiv">
                  {{item.summary}} 
              </div>
              <div class="contenttwo">
                  <span>{{item.createDateTime[0]}}</span>
                  <span>{{item.createDateTime[1]}}</span>
              </div>
          </li>
      </ul>
      </div>
      <div id="div_67" v-else>
        <img src="../../imgs/home/duibiliebiaokongbai.png" alt="">
        <div>暂无看房报告~~~</div>
      </div>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      page: "1",
      list: [],
      movenum:true
    };
  },
  created() {
    this._querys();
  },
  methods: {
    loadMore() {
      if (this.page !== "1") {
        this.loading = true;
        this._querys();
        Toast({
          message: "正在加载。。。",
          position: "bottom"
        });
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      }
    },
    _querys() {
      this.$http
        .get(this.$url.URL.REPORTLIST + "?pageSize=10&pageNo=" + this.page)
        .then(res => {
          for (let i = 0; i < res.data.data.length; i++) {
            res.data.data[i].createDateTime = res.data.data[
              i
            ].createDateTime.split(" ");
          }
          this.list = this.list.concat(res.data.data);
          if(this.list.length>0){
            this.movenum=true
          }else{
            this.movenum=false
          }
          this.page++;
        })
        .catch(res=>{
          this.movenum=false
        })
    }
  }
};
</script>
<style scoped lang="less">
@import "../../common/css/master.less";
.handbookthree {
  width: 100%;
  min-height: 100%;
  border-top: 1px solid #ffffff;
  box-sizing: border-box;
}
#div_67{
  width:100%;
  height:100%;
  position: fixed;
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
#contentul {
  width: 100%;
  margin-top: 0.44rem;
  margin-bottom: 0.5rem;
}
#contentul > li {
  width: 100%;
  border-bottom: 1px solid #cacaca;
}
.contentdiv {
  margin-left: 0.12rem;
  margin-right: 0.12rem;
  margin-top: 0.2rem;
  font-size: 0.18rem;
  font-weight: bold;
}
.contenttwo {
  margin-left: 0.12rem;
  margin-right: 0.12rem;
  font-size: 0.12rem;
  color: #999999;
  margin-top: 0.15rem;
  margin-bottom: 0.2rem;
}
.contenttwo > span {
  margin-right: 0.15rem;
}
</style>

