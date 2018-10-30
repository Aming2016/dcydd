<template>
    <div class="minecentre">
        <headertwo :dataname="dataname"></headertwo>
        <iframe class="htmlpageclass" :src="htmlpageurl" frameborder="0"></iframe>
    </div>
</template>
<script>
import headertwo from "../module/headertwo";
import buttonone from "../module/buttonone";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      dataname: "系统设置",
      htmlpageurl:window.sessionStorage.htmlpageurl
    };
  },
  created(){
          var iframe = document.querySelector(".htmlpageclass")
          console.log(iframe)
          console.dir(iframe)
          this.dataname=iframe.contentWindow.document.getElementsByTagName("title")[0].innerHTML
  },
  methods: {
  },
  components: {
    headertwo,

  }
};
</script>
<style scoped lang="less">
.minecentre {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #f8f8f8;
}
.htmlpageclass{
        width:100%;
        height:calc(100% - 0.45rem);
        position:absolute;
        bottom:0;
        left:0;
}
</style>