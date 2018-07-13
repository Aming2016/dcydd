<template>  
    <div class="counselorlist">
         <headertwo :dataname="dataname"></headertwo>
         <ul class="list">
             <li v-for="item in datalist" @click="counselorlistitembtn(item)">
                 <div>
                     <img :src="item.photo|headimgfilter" alt="">
                 </div>
                 <div>
                     <p>{{item.name}}</p>
                     <div>
                         <p v-for="item in item.label">{{item}}</p>
                      
                     </div>
                 </div>
                 <div @click.stop="quizpagebtn(item)">
                     向他咨询
                 </div>
             </li>
        
         </ul>
    </div>
</template>
<script>
import headertwo from "../module/headertwo";
import buttonone from "../module/buttonone";
import { MessageBox, Toast } from "mint-ui";
export default {
  data() {
    return {
      dataname: "顾问",
      datalist:""
    };
  },
  created() {
      this._querys();
  },
  methods: {
    counselorlistitembtn(item){
      this.$router.push("/counselorlistitem/"+item.employeeId)
    },
    _querys() {
      this.$http.get(this.$url.URL.CONSULTANTLIST).then(res => {
          console.log(res)
        if (res.data.status == "1") {
            for(let i =0;i<res.data.data.length;i++){
                res.data.data[i].label=res.data.data[i].label.split(",")
            }
            
            this.datalist=res.data.data
            console.log(this.datalist)
        } else {
          Toast({
            message: res.data.msg,
            position: "bottom",
            duration: 500
          });
        }
      });
    },
    quizpagebtn(item) {
      if(window.localStorage.token){
        this.$store.counseloritem=item
      this.$router.push("/quizpage/2");
      }else{
        MessageBox.confirm('还未登录，是否前往登录页面?').then(action => {
          this.$router.push("/register")
        })
        .catch(val=>{
        })

      }
    }
  },
  components: {
    headertwo
  }
};
</script>
<style scoped lang="less">
@import "../../common/css/master.less";
.counselorlist {
  width: 100%;
  min-height: 100%;
  background: @colorthree;
  border-top: 1px solid #ffffff;
  box-sizing: border-box;
  background: #ffffff;
}
.list {
  width: 100%;
  overflow: hidden;
  margin-top: 0.44rem;
  background-color: #ffffff;
  > li {
    margin-left: 0.12rem;
    margin-right: 0.12rem;
    padding: 0.2rem 0;
    border-bottom: 0.005rem solid @bordercolor_1;
    overflow: hidden;
    > div:nth-of-type(1) {
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 50%;
      overflow: hidden;
      float: left;
      > img {
        float: left;
        width: 100%;
        height: 100%;
      }
    }
    > div:nth-of-type(2) {
      float: left;
      margin-left: 0.2rem;
      > p {
        font-size: @fontsize_4;
        color: @color_1;
        margin-top: 0.1rem;
        overflow: hidden;
      }
      > div {
        margin-top: 0.1rem;
        font-size: 0.11rem;
        color: @color_3;
        overflow: hidden;
        > p {
          float: left;
          padding: 0.03rem 0.07rem;
          background: @colorthree;
          margin-right: 0.07rem;
          border-radius: @boxborder_2;
        }
      }
    }
    > div:nth-of-type(3) {
      width: 0.75rem;
      background: rgba(255, 67, 67, 0.2);
      border-radius: @boxborder_2;
      border: 0.005rem solid @colorone;
      color: @colorone;
      text-align: center;
      padding:0.07rem 0;
      font-size: @fontsize_8;
      float: right;
      margin-top: 0.15rem;
    }
  }
}
</style>