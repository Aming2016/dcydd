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
      dataname: "购房指南",
      ahtml:"",
      htmlurl:JSON.parse(window.sessionStorage.htmlurl),
    };
  },
  created(){
    for(let i=0;i<this.htmlurl.length;i++){
      if(this.htmlurl[i].name=='purchaseGuide'){
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
  margin-top:0.44rem;
}
#box{
    width:100%;
    min-height:100%;
    border:none;
  }
</style>


