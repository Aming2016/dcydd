<template>
  <div class="searchbox">
    <div class="searchboxitem">
         <div class="searchdiv_1">
            <div class="selectbox" @click.stop="select=!select">
                 {{selectitem}}
                <img src="../../imgs/home/xiangxia.png" alt="">
                <ul v-show="select">
                    <li v-for="(item,index) in selectlist" @click="selectbtn(item,index)">{{item}}</li>
                </ul>
            </div>
            <div id="searchbox_1">
                <img src="../../imgs/home/homesousuo.png" alt="">
                <form action="javascript:search();"> 
                <input type="search" placeholder="请输入您要搜索的内容" v-model="message" @focus="removecontentbtn" @keyup.enter="showbtn($event)">
                </form>
            </div>
         </div>
         <div class="searchdiv_2" @click="gohomebtn">取消</div>
    </div>

    <div>
        <div class="contenttite">
            历史记录
        </div>
        <div class="content">
            <div v-for="item in messagelist" @click="messageitembtn(item)">{{item}}</div>
            
        </div>
    </div>
        
  </div>
</template>

<script scoped>
import {MessageBox} from 'mint-ui'
export default {
  data () {
    return {
        message:"",
        select:false,
        selectlist:["二手房","租房","小区"],
        selectitem:"二手房",
        id:"1",
        messagelist:[],
        active:"3",
        rangeValue:2
    }
  },
  created(){
   if(window.localStorage.dc_token){
       this._querys()
   }
  },
  methods:{
    _querys(){
        this.$http.get(this.$url.URL.SEARCHRECORDLIST)
        .then(res=>{
            this.messagelist=res.data.data
        })
    },
    removecontentbtn(){
        this.remove=true
    },
    showbtn(ev) {
        this.remove=true
        this.$store.searchname=this.message
        if(this.id=='3'){
            this.$router.push("/regionlist")
        }else{
            this.$router.push({path:'/searchlist/', query: {id:this.id}})
        }
 
    },
    messageitembtn(item){
        this.message=item
        this.$store.searchname=item
        if(this.id=='3'){
            this.$router.push("/regionlist")
        }else{
            this.$router.push({path:'/searchlist/', query: {id:this.id}})
        }
    },
    selectbtn(item,index){
    this.selectitem=item
    this.id=index+1
    },
    gohomebtn(){
        this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="less">
@import '../../common/css/master.less';
@import '../../common/css/fulist.css';
.searchbox{
    width:100%;
    overflow: hidden;
}
.searchboxitem{
    width:100%;
    height:0.44rem;
    position: fixed;
    top:0;
    left:0;
    border-bottom:1px solid #cccccc;
    z-index:9999;
    background:#ffffff;
}
.searchdiv_1{
    width:2.9rem;
    height:0.35rem;
    margin-top:0.045rem;
    margin-left:0.2rem;
    background:#f2f2f2;
    border-radius: 0.03rem;
    float:left;
}
.searchdiv_2{
    height:100%;
    float:left;
    font-size:0.16rem;
    line-height: 0.44rem;
    margin-left:0.15rem;
}
.selectbox{
    float:left;
    height: 0.35rem;
    line-height: 0.35rem;
    float:left;
    margin-left:0.1rem;
    font-size:0.15rem;
    text-align: center;
    position: relative;
}
.selectbox>ul{
    width:0.95rem;
    left:-0.15rem;
    position: absolute;
    top:0.38rem;
    background:url(../../imgs/home/sousuotankuang.png) no-repeat;
    height:1.3rem;
    background-size:100% 100%;

}
.selectbox>ul>li{
    height:0.4rem;
    width:95%;
    // float:left;
    line-height: 0.35rem;
    margin:auto;
    border-bottom:1px solid #cccccc;
    text-align: center;
    box-sizing: border-box;
}
.selectbox>ul>li:nth-of-type(1){
    margin-top:0.1rem;
    
}
.selectbox>ul>li:nth-last-of-type(1){
    border:none;
}
.selectbox>ul>li:active{
    color:@colorone;
}
#searchbox_1{
    width:2rem;
    height:0.35rem;
    float:left;
    font-size:0.16rem;
    line-height: 0.35rem;
    margin-left:0.1rem;

}
#searchbox_1>img{
    width:0.16rem;
    vertical-align: middle;
}
#searchbox_1>form{
    height:100%;
    width:1.6rem;
    display: inline-block;
    vertical-align: middle;
    
}
#searchbox_1>form>input{
    width:1.6rem;
    height:100%;
    -webkit-appearance: none;
    font-size:0.13rem;
    color: #999999;
}
.contenttite{
    width:100%;
    font-size:0.18rem;
    font-weight:bold;
    padding-top:0.9rem;
    margin-left:0.12rem;
}
.content{
    padding-left:0.12rem;
    padding-right:0.3rem;
    margin-top:0.2rem;
    overflow: hidden;
}
.content>div{
    font-size:0.15rem;
    padding:0.1rem;
    color:#666666;
    background: #f9f9f9;
    float:left;
    margin-bottom:0.1rem;
    margin-left:0.05rem;
    border-radius: 0.04rem;
}
.taberlist{
    position:fixed;
    top:0.45rem;
    left:0;
}
.taberlist>li{
    width:20%;
}
.cnxhlist {
    margin-bottom:0;
    margin-top:0.35rem;
  }
</style>
