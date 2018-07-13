<template>
    <div class="hotdistrict">
        <headerone :dataname="dataname"></headerone>
         <div class="cnxhlist" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10">
            <div class="cnxhlistitem" @click="hotdisitembtn(item)" v-for="item in buldlist">
                <div class="cnxhcontnet">
                    <div class="cnxhcontnetleft">
                        <img :src="item.housePic" alt="">
                    </div>
                    <div class="cnxhcontnetright">
                        <div class="cnxhconterone">
                            {{item.buildName}}
                        </div>
                         <div class="cnxhconterthree">
                            {{item.areaName}} {{item.districtName }} {{item.buildAge}}年 {{item.buildType}}
                        </div>
                        <div class="cnxhcontertwo">
                            在售{{item.saleCount }}套/在租{{item.rentCount}}套
                        </div>
                        
                         <div class="cnxhconterfive">
                            <div>{{item.avgSalePrice}}<span>元/平</span></div>           
                        </div>
                    </div>
                </div>              
            </div>
            
        </div>
       
    </div>
</template>
<script>
import headerone from '../module/headertwo'
import {Toast} from "mint-ui"
export default {
   data(){
       return{
           dataname:"热门小区",
           buldlist:[],
           site:window.localStorage.site,
           page:'1',
           loading:false,
       } 
   },
   created(){
       this._buildList();
   },
   methods:{
       _buildList(){
           //热门小区列表
            this.$http.get(this.$url.URL.HOTBUILDING+"/"+this.site+"?pageNo="+this.page)
            .then((res)=>{
                this.buldlist=this.buldlist.concat(res.data.data)
                this.page++
            })
            .catch(()=>{
                Toast({
                message: '全部加载完成',
                position: 'bottom'
                });
            })
       },
       hotdisitembtn(item){
           this.$router.push({path:'/hotdisitem/'+ item.sdid})
       },
       loadMore() {
        if(this.page!=="1"){
            this.loading = true;
            this._buildList();
            Toast({
            message: '正在加载。。。',
            position: 'bottom'
            });
            setTimeout(() => {
                this.loading = false;
            }, 2000);
            }
        }
        
   },
   components:{
    headerone
   },
}
</script>
<style scoped lang="less">
    .hotdistrict{
        width:100%;
        height:100%;
    }
</style>
<style scoped lang="less">
@import '../../common/css/fulist.css';
.cnxhlist{
    margin-top:0.44rem;
    margin-bottom:0;
}
.cnxhconterone{
    font-size:0.18rem;
}
.cnxhcontertwo{
    font-size:0.13rem;
    margin-top:0.05rem;
    margin-bottom:0.2rem;
}
.cnxhconterthree{
    margin-top:0.05rem;
    font-size:0.13rem;
}
.cnxhconterfive{
    font-size:0.19rem;
    margin-top:-0.1rem;
}
.cnxhconterfive span{
    font-size:0.11rem;
}
</style>
