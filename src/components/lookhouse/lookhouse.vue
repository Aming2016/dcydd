<template>
    <div class="handbook">
        <img class="imgtitle" @click="clickbtn" src="../../imgs/home/daikanliebiaohuise.png" alt="">
        <div class="titlename">
            <div></div>
            <div :class="{yuekanone:indexs=='1'}" @click="lookhouseone">待看日程</div>
            <div></div>
            <div :class="{yuekanone:indexs=='2'}" @click="lookhousetwo">已看记录</div>
            <div></div>
            <div :class="{yuekanone:indexs=='3'}" @click="lookhousethree">看房报告</div>
            <div></div>
        </div>
        <router-view/> 
    </div>
</template>
<script>
import router from '../../router'
export default {
    data(){
       return{
           indexs:window.sessionStorage.btnindexs
       } 
    },
    methods:{
        clickbtn(){
             this.$router.push("/awaitlook")
        },
        lookhouseone(){
            this.indexs='1'
            this.$router.push("/lookhouseone")
        },
        lookhousetwo(){
            this.indexs='2'
            this.$router.push("/lookhousetwo")
        },
        lookhousethree(){
            this.indexs='3'
            this.$router.push("/lookhousethree")
        }
    },
     created(){
	  if(window.sessionStorage.btnindexs==undefined){
          window.sessionStorage.btnindexs="1"
          this.indexs="1"
	  }else{
		  this.indexs=window.sessionStorage.btnindexs;
    }
    },
    mounted(){
        router.beforeEach((to,from,next)=>{
				var path=to.path
				if(path=='/lookhouseone'){
				  
                     window.sessionStorage.btnindexs="1"					 
				}else if(path=='/lookhousetwo'){
					 window.sessionStorage.btnindexs="2"
				}else if(path=='/lookhousethree'){
				
					 window.sessionStorage.btnindexs="3"
				}else{
					 window.sessionStorage.btnindexs="5"
				}
				next()
		})
    }
};
</script>
<style scoped lang="less">
@import "../../common/css/master.less";
.handbook {
  width: 100%;
  height: 100%;
}
.imgtitle{
    width:0.22rem;
    position: fixed;
    top:0.11rem;
    right:0.11rem;
    z-index:99999;
}
.titlename{
    width:100%;
    height:0.44rem;
    position: fixed;
    top:0;
    left:0;
    border-bottom:1px solid #cacaca;
    box-sizing: border-box;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    white-space: nowrap;
    background:#ffffff;
    z-index:999;
}
.titlename>div{
    height:0.44rem;
    border-bottom:1px solid #cacaca;
    line-height: 0.44rem;
    box-sizing: border-box;
    font-size:0.15rem;
    color:#333333;
    flex: 1;
}
.yuekanone{
    color:@colorone !important;
    border-color: @colorone !important;
}
</style>

