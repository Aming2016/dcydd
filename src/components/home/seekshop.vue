<template>
  <div class="seekshop">
    <div class="topseatch">
        <img src="../../imgs/home/fanhui.png" alt="" @click="gohomebtn">
        <div id="topserchbox">
            <img src="../../imgs/home/homesousuo.png" alt="" srcset="">
            <form action="javascript:search();"> 
            <input type="text" placeholder="请输入您要查询的信息" v-model="serchname" @keyup.enter="serchbtn($event)">
             </form>
        </div>
    </div>
    <ul class="seekshoopul"  v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10"
    infinite-scroll-immediate-check="true">
        <li v-for="item in list">
            <div class="seekshoopone">
                <img src="../../imgs/home/mendianzhao.png" alt="">
                <span>{{item.distance}}km</span>
            </div>
            <div class="seeklione">{{item.deptName}}</div>
            <div class="seeklitwo">{{item.addr}}</div>
            <div class="seeklithree">
                <div @click="mapboxonebtn(item)">门店位置</div>
                <div @click="phonbtnone(item)">电话咨询</div>
            </div>
        </li>
    </ul>
    <div class="falxclass" v-show="number">
        <div>
            <div id="falxboxone">
              <span>拨号</span>{{telNum}}
            </div>
            <div id="falxboxtwo">
                <div @click="number=false">取消</div>
                <div @click="phonbtn">
                    <a :href="tel">拨号</a>
                </div>
            </div>
        </div>
    </div>   
  </div> 
</template>
<script>
import {Toast} from "mint-ui"
export default {
  name: 'seekshop',
  data () {
    return {
     number:false,
     serchname:"",//门店
     page:"1",
     site:window.localStorage.site,
     mapxy:JSON.parse(window.localStorage.mapxy) ,
     list:[],
     telNum:"",//拨打的手机号码
     keyword:"",//门店传值
     tel:"",
     numberlor:true,
    }
  },
  created(){
      this._querys();
  },
  methods:{
    loadMore(){
        if(this.numberlor){
            this.loading = true;
            this._querys();
            Toast({
            message: '正在加载。。。',
            position: 'bottom'
            });
            setTimeout(() => {
                this.loading = false;
            }, 2000);
        }
    },
   _querys(){
       this.$http.post(this.$url.URL.SHOPS,{
           pageNo:this.page,
           keyword:this.keyword,
           pageSize:"10",
           scity:this.site,
       })
       .then((res)=>{
           this.numberlor=true
           for(let i=0;i<res.data.data.length;i++){
            var juli=this.getFlatternDistance(res.data.data[i].px,res.data.data[i].py,this.mapxy.lng,this.mapxy.lat)/1000
            res.data.data[i].distance=juli.toFixed(2)
           }
           this.list=this.list.concat(res.data.data)
           this.page++;
       })
   },
   getFlatternDistance(lat1,lng1,lat2,lng2){//计算两点距离方法
        // var map = new BMap.Map("container");  
        // var point1 = new BMap.Point(lng1,lat1);  
        // var point2 = new BMap.Point(lng2,lat2);  
        // return map.getDistance(point1,point2)
        var f = this.getRad((lat1 + lat2)/2);
        var g = this.getRad((lat1 - lat2)/2);
        var l = this.getRad((lng1 - lng2)/2);       
        var sg = Math.sin(g);
        var sl = Math.sin(l);
        var sf = Math.sin(f);       
        var s,c,w,r,d,h1,h2;
        var a = 6378137;
        var fl = 1/298.257;       
        sg = sg*sg;
        sl = sl*sl;
        sf = sf*sf;      
        s = sg*(1-sl) + (1-sf)*sl;
        c = (1-sg)*(1-sl) + sf*sl;
        w = Math.atan(Math.sqrt(s/c));
        r = Math.sqrt(s*c)/w;
        d = 2*w*a;
        h1 = (3*r -1)/2/c;
        h2 = (3*r +1)/2/s;    
        return d*(1 + fl*(h1*sf*(1-sg) - h2*(1-sf)*sg));
    },
    getRad(d){
        return d*Math.PI/180.0;
     },
   serchbtn(ev){
       this.numberlor=false
       scrollTo(0,0)
       this.keyword=this.serchname
       this.page="1"
       this.list=[]
       this._querys();
   },
   mapboxonebtn(item) {
      var map=[item.px,item.py]
      window.localStorage.setItem("mapone", JSON.stringify(map));
      this.$router.push("/mapboxone");
    },
   gohomebtn(){
       this.$router.go(-1)
   },
   phonbtnone(item){
       this.number=true
       this.telNum=item.telNum
       this.tel='tel:'+item.telNum
   },
   phonbtn(){
       this.number=false
   }
  }
}
</script>
<style scoped lang="less">
@import '../../common/css/master.less';
@import '../../common/css/search.css';
.seekshop{
    width:100%;
    min-height: 100%;
    border-top:1px solid #ffffff;
    box-sizing: border-box;
    background:#f9f9f9;
}
.seekshoopul{
    width:100%;
    margin-top:0.49rem;
    overflow: hidden;
}
.seekshoopul>li{
    width:100%;
    background: #ffffff;
    margin-bottom:0.1rem;
    position: relative;
    overflow: hidden;
}
.seeklione{
    font-size:0.2rem;
    font-weight: bold; 
    margin-left:0.12rem;
    margin-top:0.2rem;
}
.seeklitwo{
    font-size:0.15rem;
    margin-top:0.15rem;
    margin-left:0.12rem;
    margin-bottom:0.2rem;
}
.seeklithree{
    width:100%;
    height:0.4rem;
    border-top:1px solid #cacaca;
}
.seeklithree>div{
    width:50%;
    height:100%;
    float:left;
    text-align: center;
    line-height: 0.4rem;   
    font-size:0.17rem;
    color:#5d9aff;
}
.seeklithree>div:nth-of-type(1){
    border-right:1px solid #cacaca;
    box-sizing: border-box;
    color:#666666;
}
.seekshoopone{
    position: absolute;
    top:0.35rem;
    right:0.12rem;
}
.seekshoopone>img{
    width:0.2rem;
    height:0.2rem;
    float:left;
    vertical-align: center;
}
.seekshoopone>span{
    font-size:0.15rem;
    color:#999999;
    margin-left:0.1rem;
    float:left;
    margin-top:0.05rem;
}
.falxclass{
    width:100%;
    height:100%;
    background:rgba(1, 1, 1, 0.5);
    position:fixed;
    top:0;
    left:0;
    z-index:999999;
}
.falxclass>div{
    width:2.6rem;
    height:1.1rem;
    position: fixed;
    top:50%;
    left: 50%;
    margin-left:-1.3rem;
    margin-top:-0.55rem;
    background:#ffffff;
    border-radius: 0.04rem;
}
#falxboxone{
    width:100%;
    height:0.7rem;
    text-align: center;
    line-height: 0.7rem;
    font-size:0.17rem;
    border-bottom:1px solid #cacaca;
    box-sizing: border-box;
}
#falxboxone>span{
    margin-right:0.2rem;
    font-weight: bold;
}
#falxboxtwo{
    width:100%;
    height:0.4rem;
}
#falxboxtwo>div{
    width:50%;
    height:100%;
    float:left;
    text-align: center;
    line-height: 0.4rem;
    font-size:0.15rem;
    color:#666666;
}
#falxboxtwo>div:nth-of-type(2){
    color:#2f81fd;
}
</style>
