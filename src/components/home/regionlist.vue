<template>
  <div class="searchlist">
    <div class="topseatch">
        <img src="../../imgs/home/fanhui.png" alt="" @click="gohomebtn">
        <div id="topserchbox">
            <img src="../../imgs/home/homesousuo.png" alt="" srcset="">
            <form action="javascript:search();"> 
            <input type="text" placeholder="请输入您要查询的信息" v-model="serchname" @keyup.enter="serchbtn($event)">
            </form>
        </div>
    </div>
    
    <div class="tabercontent">
    <div class="shuaixuan" :class="{shuaixuanonese:removerone}"  @click.self="removebtn">
    <ul class="taberlist">
        <li v-for="(item,index) in taberlist" @click.stop="activebtn(index)" class="taberclass">
            {{item}}
            <img src="../../imgs/home/xiangxia.png" alt="" srcset="">
        </li>         
    </ul>
    <div class="shuaixuanone" v-if="active=='0'">
        <ul>
            <li :class="{activesetcolor:sctiveoneone=='100'}" @click="btndistrictsone">不限</li>
            <li v-for="(item,index) in erealistone" @click="btndistricts(item,index)" :class="{activesetcolor:sctiveoneone==index}">{{item.name}}</li>          
        </ul>
        <ul>
            <li :class="{activesetcolor:sctiveonetwo=='100'}" @click="btndistrictstwotwo">不限</li>
            <li v-for="(item,index) in erealisttwo" :class="{activesetcolor:sctiveonetwo==index}" @click="btndistrictstwo(item,index)">{{item.name}}</li>            
        </ul>
    </div>
    <div class="shuaixuantwo" v-else-if="active=='1'">
        <div v-for= "(item,index) in shuaixuanlist.HOUSE_USE"  @click="itemonebtn(item,index)" :class="{sxuanitem:activeone==index}">{{item.name}}</div>
        <div class="bottomdiv_1">
        <p class="gobtnclasstwo" @click="businessTypebtn">条件不限</p>
        <p class="gobtnclass" @click="businessTypeonebtn">确定</p>
        </div>
        
    </div>
    <div class="shuaixuantwo shuaixuantwo_1 shuaixuantwo_input" v-else-if="active=='2'">
       <div v-for="(item,index) in shuaixuanlist.HOUSE_TYPE" @click="itemtwobtn(item,index)" :class="{sxuanitem:activetwo==index}">{{item.name}}</div>
      
       <div class="bottomdiv_1">
        <p class="gobtnclasstwo" @click="houseTypebtn">条件不限</p>
        <p class="gobtnclass" @click="houseTypeonebtn">确定</p>
        </div>  
    </div>
    <div class="shuaixuantwo shuaixuantwo_1" v-else-if="active=='3'">
        <div v-for="(item,index) in shuaixuanlist.HOUSE_AGE" @click="itemthreebtn(item,index)" :class="{sxuanitem:activethree==index}">{{item.name}}</div>
        <div class="bottomdiv_1">
        <p class="gobtnclasstwo" @click="useYearbtn">条件不限</p>
        <p class="gobtnclass" @click="useYearonebtn">确定</p>
        </div>    
    </div>
    </div>
     <div class="cnxhlist"v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10"
   infinite-scroll-immediate-check="true">
            <div class="cnxhlistitem" @click="rentingitembtn(item)" v-for="item in list">
                <div class="cnxhcontnet">
                    <div class="cnxhcontnetleft">
                        <img v-lazy="item.housePic" alt="">
                    </div>
                    <div class="cnxhcontnetright">
                        <div class="cnxhconterone">
                            {{item.buildName?item.buildName:"&#12288"}}
                        </div>
                         <div class="cnxhconterthree">
                            {{item.districtName}}/{{item.buildAge}}/年建成/{{item.buildType }}
                        </div>
                        <div class="cnxhcontertwo">
                            在售{{item.saleCount}}套/在租{{item.rentCount }}套
                        </div>
                        
                         <div class="cnxhconterfive">
                            <div>{{item.avgSalePrice}}<span>元/平</span></div>           
                        </div>
                    </div>
                </div>              
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {Toast} from "mint-ui"
export default {
  name: 'HelloWorld',
  data () {
    return {
      activeone:null,//用途筛选样式控制
      activetwo:null,//类型筛选样式控制
      activethree:null,//楼龄帅选样式控制
      sctiveoneone:"100",
      sctiveonetwo:"100",
      removerone:false,
      site:window.localStorage.site,
      page:"1",
      list:[],
      active:"5",//过滤控制
      serchname:"",//搜索条件
      moneylist:["50万以下","50-80万","80-110万","110万以上"],
      taberlist:['区域','用途','类型','楼龄'],
      erealistone:["宝安区","龙岗区","龙华区","南山区","福田区"],//帅选区域列表
      erealisttwo:['A片区','B片区','C片区','D片区','E片区','F片区','G片区','W片区','H片区'],//帅选区域列表
      houselist:['单间','一房','两房','三房','三房以上'],//户型帅选
      acreagelist:["50㎡以下","50-70㎡","70-90㎡","90-110㎡","110-140㎡","140-170㎡","170-200㎡","200㎡以上"],//面积帅选
      typelist:["普通住宅","别墅","商业类"],//住宅类型筛选
      shuaixuanlist:"",//存储筛选列表
      areaId:"",//区域id
      districtId:"",//片区id
      businessType:"",//用途
      houseType:"",//类型
      useYear:"",//楼龄
      keyword:"",//搜索穿参
      numberlor:false
    }
  },
  created(){
      this.keyword = this.$store.searchname;
      this.serchname = this.$store.searchname;
      this._querys();//进页面请求的数据
      this._shaixuanlist();//进页面请求的筛选列表
      this._quyulist();//获取区域帅选接口
  },
  methods:{
      serchbtn(ev) {
      //搜索确定按钮
      this.numberlor=false
      scrollTo(0,0)
      this.taberlist=['区域','用途','类型','楼龄']
      this.areaId="",//区域id
      this.districtId="",//片区id
      this.businessType="",//用途
      this.houseType="",//类型
      this.useYear="",//楼龄
      this.keyword = this.serchname;
      this.page = 1;
      this.list=[]//先清空数据列表
      this._querys()//获取数据
    },
      loadMore() {//滑动获取的数据
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
    _querys(){//进页面获取的数据
        this.$http.post(this.$url.URL.BUILDLIST,{
            scity:this.site,//城市
            pageSize:"10",//一页显示条数
            pageNo:this.page,//第几页
            areaId:this.areaId,//区域id
            districtId:this.districtId,//片区id
            keyword:this.keyword,//搜索
            businessType:this.businessType.value,//用途
            houseType:this.houseType.value,//类型
            useYear:this.useYear.value,//楼龄
        })
        .then((res)=>{
            this.list=this.list.concat(res.data.data)
            this.page++
            this.numberlor=true
        })
        .catch(()=>{
            Toast({
            message: '全部加载完成',
            position: 'bottom'
            });
        })
    },
    _shaixuanlist(){//筛选列表
        var sxurl = ["HOUSE_USE","HOUSE_TYPE","HOUSE_AGE"]
        this.$http.post(this.$url.URL.DICTIONARYS,sxurl).then(response => {
        this.shuaixuanlist = response.data.data;
        })
    },
    _quyulist(){//获取区域筛选列表
        this.$http.get(this.$url.URL.AREADISTRICTS+"/"+this.site)//获取城市以下的片区
        .then(res=>{
            this.erealistone=res.data.data
            this.erealisttwo=[];
        })
    },
    gohomebtn(){
        this.$router.go(-1)
    },
    activebtn(index){
        this.active=index
        this.removerone=true
    },
    removebtn(){
        this.removerone=false
        this.active=null
    },
    btndistrictsone(){//点击区域不限
      this.numberlor=false
      scrollTo(0,0)
      this.taberlist[0]="区域"
      this.sctiveoneone='100'
      this.sctiveonetwo='100'
      this.page="1"//获取第一页数据
      this.areaId=""//区域
      this.districtId=""//片区不限
      this.list=[]//先清空数据列表
      this._querys()//获取数据
      this.active = "5";//影藏刷ui选条件
      this.removerone = false;//影藏刷ui选条件
    },
     btndistricts(item,index){//点击帅选区域
      this.erealisttwo=item.districts
      this.sctiveoneone=index
      this.taberlist[0]=item.name
      this.areaId=item.id//获取的区域id
      this.sctiveonetwo='100'
    },
     btndistrictstwotwo(){//点击街道不限
     this.numberlor=false
      scrollTo(0,0)
      this.sctiveonetwo='100'
      this.active = "5";
      this.districtId=""
      this.page="1"//获取第一页数据
      this.list=[]//先清空数据列表
      this._querys()//获取数据
      this.removerone = false;
    },
    btndistrictstwo(item,index){//点击街道筛选
      this.numberlor=false
      scrollTo(0,0)
      this.taberlist[0]=item.name
      this.sctiveonetwo=index
      this.active = "5";
      this.districtId=item.id;
      this.page="1"//获取第一页数据
      this.list=[]//先清空数据列表
      this._querys()//获取数据
      this.removerone = false;
      
    },
    itemonebtn(item,index){//用途晒选选择
     this.activeone=index
     this.businessType=item
    },
    itemtwobtn(item,index){//类型晒选选择
     this.activetwo=index
     this.houseType=item
    },
    itemthreebtn(item,index){//楼龄晒选选择
     this.activethree=index
     this.useYear=item
    },
    businessTypebtn(){//筛选按钮条件不限
    this.numberlor=false
    scrollTo(0,0)
    this.taberlist[1]="用途"
     this.businessType=""
     this.page="1"//获取第一页数据
     this.list=[]//先清空数据列表
     this._querys()//获取数据
     this.active = "5";
     this.activeone=null;
     this.removerone = false;
    },
    businessTypeonebtn(){//筛选按钮确定
    this.numberlor=false
    scrollTo(0,0)
    this.taberlist[1]=this.businessType.name
     this.page="1"//获取第一页数据
     this.list=[]//先清空数据列表
     this._querys()//获取数据
     this.active = "5";
     this.removerone = false;
    },
    houseTypebtn(){//类型的条件不限
    this.numberlor=false
    scrollTo(0,0)
    this.taberlist[2]="类型"
     this.houseType=""
     this.page="1"//获取第一页数据
     this.list=[]//先清空数据列表
     this._querys()//获取数据
     this.active = "5";
     this.activetwo=null;
     this.removerone = false;
    },
    houseTypeonebtn(){//类型的确定按钮
     this.page="1"//获取第一页数据
     this.taberlist[2]=this.houseType.name
     this.list=[]//先清空数据列表
     this._querys()//获取数据
     this.active = "5";
     this.removerone = false;
    },
    useYearbtn(){//楼龄的条件不限按钮
    this.numberlor=false
    scrollTo(0,0)
    this.taberlist[3]="楼龄"
     this.useYear=""
     this.page="1"//获取第一页数据
     this.list=[]//先清空数据列表
     this._querys()//获取数据
     this.active = "5";
     this.activethree=null;
     this.removerone = false;
    },
    useYearonebtn(){//楼龄的确定按钮
    this.numberlor=false
    scrollTo(0,0)
    this.taberlist[3]=this.useYear.name
     this.page="1"//获取第一页数据
     this.list=[]//先清空数据列表
     this._querys()//获取数据
     this.active = "5";
     this.removerone = false;
    },
    rentingitembtn(item){
        this.$router.push({path:'/hotdisitem/'+ item.sdid})
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="less">
@import '../../common/css/master.less';
@import '../../common/css/search.css';
@import '../../common/css/fulist.css';
.tabercontent{
    margin-top:0.44rem;
}
#shuaixuancolor{
    color:@colorone;
}
.shuaixuanname{
    color:@colorone;
}
// .taberlist{
//     position: fixed;
//     top:0.45rem;
// }
.cnxhlist{
    margin-top:0.34rem;
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
.shuaixuan{
    position: fixed;
    top:0.44rem;
    width:100%;
    background:rgba(1, 1, 1, 0.5);
}
.shuaixuanonese{
    height:100%;
}
 .cnxhcontnetright>div{
    margin-bottom:0.09rem !important;         
}
.cnxhconterfive{
    font-size:0.19rem;
    margin-top:-0.1rem;
}
.cnxhconterfive span{
    font-size:0.11rem;
}
.gobtnclass{
    background:@colorone;
}
.taberclass{
    width:25% !important;
}
</style>
