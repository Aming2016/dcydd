<template>
    <div class="houseremark">
        <headertwo :dataname="dataname"></headertwo>
        <div id="titlebtnid" @click="btn">{{btnname}}</div>
        <div id="titlename">
            <span>{{data.brokerName}}</span>
            <span>{{data.houseType}}</span>
            <span>{{data.builtArea}}</span>
        </div>
        <div id="div_1">
            标签备注
        </div>
        <ul id="ul_1">
            <li :class="{classli:item.num}" v-for="(item,index) in list" @click="itembtn(index)">{{item.name}}</li>
           
        </ul>
        <div id="div_2">
            文字备注
        </div>
        <textarea rows="10" v-model="content">
            {{content}}
        </textarea>

    </div>
</template>
<script>
import headertwo from "../module/headertwo";
import { MessageBox, Toast } from "mint-ui";
export default {
  data() {
    return {
      dataname: "看房备注",
      bqlist:["十大","烦死哒","发生的","范德萨发生","发送到发大水","防守打法","发生的","刚","发生的","而我","发斯蒂芬","范德萨发"],
      btnname:"",
      id:"",
      data:"",
      site:window.localStorage.site,
      list:"",//获取的全部标签
      item:"",//获取的选中的标签
      remarkTag:"",//选中的表圈
      content:"",//输入的备注
    };
  },
  created() {
      this.id=this.$route.params.id
      this.data=this.$store.houseremark
      this._querys()
  },
  methods: {
     btn(){
         this.remarkTag=""
         for(let i=0;i<this.list.length;i++){
             if(this.list[i].num){
                 if(this.remarkTag==''){
                     this.remarkTag=this.list[i].value
                 }else{
                     this.remarkTag=this.remarkTag+","+this.list[i].value
                 }
             }
         }
         if(this.content||this.remarkTag){
            this._querysbtn()
         }else{
             MessageBox.alert("请提交备注信息")
         }
         
     },
     _querysbtn(){
         this.$http.post(this.$url.URL.APPOINTFILMENBERREMARK,{
             id:this.id,//房子id
             memberRemark:this.content,//备注内容
             remarkTag:this.remarkTag//备注标签
         })
         .then(res=>{
             if(res.data.status=="1"){
                 MessageBox.alert("提交成功")
                 this.$router.go(-1)
             }
         })
     },
     itembtn(index){//标签按钮
        this.list[index].num=!this.list[index].num
     },
     _querys(){
          this.$http.get(this.$url.URL.APPOINTMEMBERREMARK+"/"+this.id)//看房备注已选标签
          .then(res=>{
              this.item=res.data.data
              if(this.item.remarkTag==null){
                this.btnname="确定"
              }else{
                  res.data.data.remarkTag=res.data.data.remarkTag.split(",")
                  this.btnname="修改"
              }
              this._querysone()
          })
     },
     _querysone(){
         this.$http.get(this.$url.URL.DEFAULTCITYITEM+"/USER_REMARK_TAG")//看房备注所有标签
         .then(res=>{
             for(let s=0;s<res.data.data.length;s++){
                 if(this.item.remarkTag!=null){
                    for(let l=0;l<this.item.remarkTag.length;l++){
                     if(res.data.data[s].value==this.item.remarkTag[l]){
                         res.data.data[s].num=true
                     }else{
                         res.data.data[s].num=false
                     }
                    } 
                 }else{
                     res.data.data[s].num=false
                 }
                 
             }
             this.list=res.data.data
         })
     }
  },
  components: {
    headertwo
  }
};
</script>
<style scoped lang="less">
@import "../../common/css/master.less";
.houseremark{
    width:100%;
    min-height: 100%;
    border-top:0.005rem solid #ffffff;
    box-sizing: border-box;
}
#titlebtnid{
      font-size:@fontsize_4 !important;
      position:fixed;
      top:0.15rem;
      right:0.12rem;
      z-index:999;
      color:#333333;
  }
#titlename{
    margin-top:0.44rem;
    width:100%;
    height:0.5rem;
    font-size:@fontsize_3;
    color:@color_2;
    overflow: hidden;
    background:@colorfour;
    >span:nth-of-type(1){
        width:50%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    >span{
        line-height: 0.5rem;
        margin-left:0.12rem;
        float:left;
    }
}
#div_1{
    padding-top:0.25rem;
    padding-bottom:0.2rem;
    font-size:0.18rem;
    color:@color_1;
    margin-left:0.12rem;
}
#div_2{
    padding-top:0.2rem;
    padding-bottom:0.15rem;
    font-size:0.18rem;
    color:@color_1;
    margin-left:0.12rem;
}
#ul_1{
    margin-left:0.12rem;
    margin-right:0.12rem;
    overflow: hidden;
    >li{
        padding:0.06rem 0.1rem;
        background:@colorfour;
        color:@color_2;
        font-size:@fontsize_5;
        float:left;
        margin-right:0.2rem;
        border-radius: @boxborder_2;
        margin-bottom:0.1rem;
    }
}
.classli{
    background:@colorone !important;
    color:#ffffff !important;
}
textarea{
    width:100%;
    font-size:@fontsize_3;
    color:@color_3;
    text-indent: 0.12rem;
}
</style>

