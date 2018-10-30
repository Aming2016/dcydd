<template>
    <div class="invitation">
        <div class="titlename">
            <img src="../../imgs/home/fanhuitwo.png" alt="" @click="addhui">
            我的邀请码
        </div>
        <div class="warp">
            <div class="warptop">
                <img :src="my_data.headImage" alt="">
                <span>{{my_data.nickname}}</span>
            </div>
            <img class="twocodeimg" :src="imgurl" alt="">
            <div class="div_1">
                <span>扫一扫轻松加入</span><span>世华易居</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      dataname: "我的邀请码",
      imgurl:"",
      my_data:JSON.parse(window.localStorage.dc_mydata)
    };
  },
  created(){
      this._querys()
  },
  methods: {
    addhui() {
      this.$router.go(-1);
    },
    _querys(){
        this.$http.post(this.$url.URL.FETCHQRCODEURL)
        .then(res=>{
            this.imgurl=res.data.data.codeUrl
        })
    }
  }
};
</script>
<style scoped lang="less">
.invitation {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #333333;
}
.titlename {
  margin: 0 0.12rem;
  text-align: center;
  padding-top: 0.12rem;
  color: #ffffff;
  font-size: 0.19rem;
  > img {
    float: left;
    height: 0.195rem;
  }
}
.warp {
  width: 3rem;
  height: 4.5rem;
  background: #ffffff;
  margin-top: 0.5rem;
  position: absolute;
  left: 50%;
  margin-left: -1.5rem;
}
.warptop {
  margin: 0 0.3rem;
  overflow: hidden;
  > img {
    width: 0.65rem;
    height: 0.65rem;
    border-radius: 50%;
    vertical-align: middle;
  }
  > span {
    font-size: 0.2rem;
    vertical-align: middle;
  }
}
.twocodeimg {
  width: 2.25rem;
  height: 2.25rem;
  margin-top: 0.3rem;
  margin-left: 0.375rem;
}
.div_1 {
  color: #2f81f1;
  font-size: 0.15rem;
  text-align: center;
  margin-top:0.38rem;
  >span:nth-of-type(1){
      margin-right:0.2rem;
  }
}
</style>