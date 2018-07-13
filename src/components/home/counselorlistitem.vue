<template>
  <div class="searchlist">
    <headertwo :dataname="dataname"></headertwo>
    <iframe id="box" :src="ahtml"></iframe>
    </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import headertwo from "../module/headertwo";
export default {
  name: 'HelloWorld',
  data () {
    return {
      dataname: "顾问详情",
      ahtml:"",
      htmlurl:JSON.parse(window.sessionStorage.htmlurl),
      id:""
    }
  },
  created(){
    this.id=this.$route.params.id;
    for(let i=0;i<this.htmlurl.length;i++){
      if(this.htmlurl[i].name=='consultantDetail'){
        this.ahtml=this.htmlurl[i].value+"?id="+this.id
      }
    }
  },
  mounted(){
    var mainFrame=document.getElementById('box'); 
      console.log(mainFrame.contentWindow.document)
  
  },
  components: {
    headertwo
  }
  }
</script>     
<style lang="less" scoped>
.searchlist{
  width:100%;
  height:100%;
  margin-top:0.44rem;
}
  #box{
    width:100%;
    height:100%;
    border:none;
  }
</style>