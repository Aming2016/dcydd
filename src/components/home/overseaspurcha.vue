<template>
    <div class="handbook">
       <headerone :dataname="dataname"></headerone>
       <iframe id="box" :src="ahtml"></iframe>
    </div>
    
</template>
<script>
import headerone from "../module/headertwo";
import {Toast}from"mint-ui"
export default {
  data() {
    return {
      dataname: "海外置业",
      ahtml:"",
      htmlurl:JSON.parse(window.sessionStorage.htmlurl),
    };
  },
  created(){
    for(let i=0;i<this.htmlurl.length;i++){
      if(this.htmlurl[i].name=='overseasPurcha'){
        this.ahtml=this.htmlurl[i].value
        console.log(this.htmlurl[i].value)
      }
    }
  },
  components: {
    headerone
  },
  methods:{
 
  }
}
</script>
<style scoped lang="less">
.handbook {
  width: 100%;
  height: 100%;
  border-top:0.005rem solid #ffffff;
  box-sizing: border-box;
}
#box{
    width:100%;
    top:0.44rem;
    position: absolute;
    bottom:0;
    height:6.23rem;
    border:none;
  }
</style>


