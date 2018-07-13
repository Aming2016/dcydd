<template>
  <div class="worktype">
      <headertwo :dataname="dataname"></headertwo>
      <ul class="ul_1">
          <li v-for="(item,index) in list" @click="btn(item)">{{item.name}}</li>
          
      </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import headertwo from "../module/headertwo";
export default {
  name: "HelloWorld",
  data() {
    return {
        list:"",
        dataname:"代办业务类型",
    };
  },
  created(){
      this._querys()
  },
  methods: {
      _querys(){
            this.$http.get(this.$url.URL.DEFAULTCITYITEM+"/AGENT_BIZ_TYPE")
            .then(res=>{
                console.log(res)
                this.list=res.data.data
            })
        },
      btn(item){
          this.$store.business=item
          this.$router.go(-1);
      }
  },
  components: {
    headertwo
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="less">
@import "../../common/css/master.less";
.worktype {
  width: 100%;
  height: 100%;
}
.ul_1{
    padding-top:0.44rem;
    margin:0 0.12rem;
    >li{
        width:100%;
        height:0.5rem;
        border-bottom:0.005rem solid @bordercolor_1;
        font-size:@fontsize_4;
        line-height: 0.5rem;
    }
}
</style>
