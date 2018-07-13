<template>
    <div class="advisory">
        <headertwo :dataname="dataname"></headertwo>
        <div id="titleimg">
            <mt-swipe :auto="4000" class="swiperitem">
            <mt-swipe-item v-for="item in bannerimg">
                <a :href="item.contentUrl">
                    <img :src="item.picUrl" alt="" srcset="">
                </a>               
            </mt-swipe-item>           
            </mt-swipe>
        </div>
        <div id="div_1">
            <div>
                <p>世华顾问</p>
                <p @click="counselorlistbtn">查看更多 <img src="../../imgs/home/gengduojiantou.png" alt=""></p>
            </div>
        </div>
        <ul id="ul_1">
            <li v-for="item in gwlist" @click="counselorlistitembtn(item)">
                <div>
                    <img :src="item.photo|headimgfilter" alt="">
                </div>
                <div>{{item.name}}</div>
                <div>
                    <p>{{item.classifyName}}</p>
                </div>
            </li>
        </ul>
          <div id="div_1">
            <div>
                <p>常见问题</p>
            </div>
        </div>
        <div id="div_2">
            <ul>
                <li v-for="item in wentilist">
                  <a @click="btnurl(item)">
                    <img :src="item.imageUrl" alt="">
                    <div>
                        <p>{{item.title}}</p>
                    </div>
                  </a>
                    
                </li>
            </ul>
        </div>
        <div id="div_3">
            <p>热门咨询</p>
        </div>
        <consutlist style="margin-bottom:0.65rem;" :list="datalist"></consutlist>
        <ul id="ulbtn">
            <li @click="tiwenbtn">
                <img src="../../imgs/mine/woyaotiwen.png" alt="">
                <span>我的提问</span>
                
            </li>
       
            <li @click="guanzhubtn">
                <img src="../../imgs/mine/woguanzhude.png" alt="">
                <span>我关注的</span>                
            </li>
        </ul>
        <div id="btntiwen" @click="quizpagebtn">提问</div>
    </div>
</template>
<script>
import headertwo from "../module/headertwo";
import consutlist from "../module/consultlist";
import { MessageBox, Toast } from "mint-ui";
export default {
  data() {
    return {
      dataname: "咨询",
      id: "",
      site: window.localStorage.site,
      bannerimg: "", //banner
      gwlist: "", //顾问推荐推荐列表
      datalist: "", //热门咨询
      wentilist:"",//问题
    };
  },
  created() {
    this._querys();
  },
  methods: {
    counselorlistitembtn(item) {
      this.$router.push("/counselorlistitem/" + item.employeeId);
    },
    btnurl(item){
        location.href=item.phoneContentUrl
      
    },
    _querys() {
      let bannerurl =
        this.$url.URL.BANNER +
        "/" +
        this.site +
        this.$url.URL.CONSULT_INDEX_BANNER;
      this.$http.get(bannerurl).then(res => {
        this.bannerimg = res.data.data;
      });
      this.$http
        .get(this.$url.URL.CONSULTANTREMD) //顾问列表
        .then(res => {
          if (res.data.data.length > 4) {
            res.data.data = res.data.data.slice(0, 4);
          }
          this.gwlist = res.data.data;
        });
      this.$http.get(this.$url.URL.INFOQUERYERMENTUIJIAN+"/13")//问题
      .then(res=>{
        this.wentilist=res.data.data
      })
      this.$http.get(this.$url.URL.CONSULTANTHOT).then(res => {
        //热门咨询
        if (res.data.status == "1") {
          this.datalist = res.data.data;
        } else {
          Toast({
            message: res.data.msg,
            position: "bottom",
            duration: 500
          });
        }
      });
    },
    guanzhubtn() {
      if(window.localStorage.token){
       this.$router.push("/acttention/1");
      }else{
        MessageBox.confirm('还未登录，是否前往登录页面?').then(action => {
          this.$router.push("/register")
        })
        .catch(val=>{
        })
      }
    },
    tiwenbtn(){
      if(window.localStorage.token){
       this.$router.push("/acttention/2");
      }else{
        MessageBox.confirm('还未登录，是否前往登录页面?').then(action => {
          this.$router.push("/register")
        })
        .catch(val=>{
        })
      }
    },
    quizpagebtn() {
      if(window.localStorage.token){
       this.$router.push("/quizpage/1");
      }else{
        MessageBox.confirm('还未登录，是否前往登录页面?').then(action => {
          this.$router.push("/register")
        })
        .catch(val=>{
        })
      }
    },
    counselorlistbtn() {
      this.$router.push("/counselorlist");
    }
  },
  components: {
    headertwo,
    consutlist
  }
};
</script>
<style scoped lang="less">
@import "../../common/css/master.less";
.advisory {
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  background-color: @colorthree;
}
#titleimg {
  width: 100%;
  height: 1.8rem;
  margin-top: 0.44rem;
  > img {
    width: 100%;
    height: 100%;
  }
}
#div_1 {
  width: 100%;
  height: 0.6rem;
  background: #ffffff;
  margin-top: 0.1rem;

  > div {
    margin-left: 0.12rem;
    margin-right: 0.12rem;
    height: 100%;
    border-bottom: 0.005rem solid @bordercolor_1;
    box-sizing: border-box;
    > p:nth-of-type(1) {
      float: left;
      font-size: @fontsize_1;
      color: @color_1;
      height: 0.6rem;
      line-height: 0.6rem;
    }
    > p:nth-of-type(2) {
      float: right;
      font-size: @fontsize_5;
      color: @color_3;
      height: 0.6rem;
      line-height: 0.6rem;
      > img {
        height: 0.14rem;
        margin-top: -0.03rem;
        margin-left: 0.05rem;
      }
    }
    > p {
      vertical-align: middle;
    }
  }
}
#ul_1 {
  width: 100%;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  background: #ffffff;
  overflow: hidden;
  > li {
    width: 25%;
    float: left;
    text-align: center;
    overflow: hidden;
    > div:nth-of-type(1) {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      overflow: hidden;
      > img {
        width: 100%;
        height: 100%;
        float: left;
      }
    }
    > div:nth-of-type(2) {
      font-size: @fontsize_3;
      color: @color_1;
      text-align: center;
      margin-top: 0.1rem;
      margin-bottom: 0.08rem;
    }
    > div:nth-of-type(3) {
      font-size: 0.1rem;
      color: @color_3;
      > p {
        padding: 0.04rem 0.07rem;
        border: 0.005rem solid @color_3;
        border-radius: 0.05rem;
        display: inline-block;
      }
    }
    > div {
      margin: auto;
    }
  }
}
.swiperitem img {
  width: 100%;
  height: 100%;
}
#div_2 {
  width: 100%;
  background-color: #ffffff;
  > ul {
    margin-left: 0.12rem;
    margin-right: 0.12rem;
    overflow: hidden;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    li:nth-of-type(3),
    li:nth-of-type(4) {
      margin-top: 0.08rem;
    }
    > li:nth-of-type(2n-1) {
      margin-right: 0.09rem;
    }
    > li {
      width: 1.7rem;
      height: 1rem;
      float: left;
      border-radius: @boxborder_2;
      position: relative;
      overflow: hidden;
      >a> img {
        width: 100%;
        height: 100%;
        float: left;
      }
      >a> div {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.4);
        > p {
          text-align: center;
          line-height: 0.23rem;
          font-size: @fontsize_5;
          color: #ffffff;
          margin-left: 0.2rem;
          margin-right: 0.2rem;
          padding-top: 0.3rem;
        }
      }
    }
  }
}
#div_3 {
  background-color: #ffffff;
  height: 0.6rem;
  margin-top: 0.1rem;
  > p {
    margin-left: 0.12rem;
    height: 0.6rem;
    line-height: 0.6rem;
    font-size: @fontsize_1;
    box-sizing: border-box;
    overflow: hidden;
    border-bottom: 0.005rem solid @bordercolor_1;
  }
}
#ulbtn {
  width: 100%;
  height: 0.6rem;
  background: #ffffff;
  position: fixed;
  bottom: 0;
  left: 0;
  overflow: hidden;
  > li:nth-of-type(1) {
    border-right: 0.005rem solid @bordercolor_1;
    box-sizing: border-box;
  }
  > li {
    width: 50%;
    height: 0.3rem;
    height: 0.3rem;
    line-height: 0.3rem;
    text-align: center;
    font-size: @fontsize_3;
    color: @color_2;
    float: left;
    margin-top: 0.15rem;
    overflow: hidden;
    > img {
      vertical-align: middle;
      height: 0.18rem;
      margin-right: 0.1rem;
    }
    > span {
      vertical-align: middle;
    }
  }
}
#btntiwen {
  width: 0.5rem;
  height: 0.5rem;
  font-size: @fontsize_3;
  line-height: 0.5rem;
  text-align: center;
  position: fixed;
  right: 0.12rem;
  bottom: 1.1rem;
  border-radius: 50%;
  color: #ffffff;
  background: #0064ed;
}
</style>