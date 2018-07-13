<template>
    <div class="appraisepeople">
        <headertwo :dataname="dataname"></headertwo>
        <div id="id_1">{{data.brokerName}}</div>
        <div id="id_2">
          带看
          <span>{{data.houseContent}}</span>
        </div>
        <div id="id_3">星级</div>
        <div id="id_4">
          <img src="../../imgs/home/hongxing.png" alt="" v-for="(item,index) in biaoxing" @click="xinxinonebtn(index)">
          <img src="../../imgs/home/huixing.png" alt=""  v-for="(item,index) in 5-biaoxing" @click="xinxintwobtn(index)">
        </div>
        <div id="id_5">
          <p>
            <textarea v-model="content">
              {{content}}
            </textarea>
          </p>
        </div>
        <div id="div_1">
            标签备注
        </div>
        <ul id="ul_1">
            <li :class="{classli: item.num}" v-for="(item,index) in bqlist" @click="bqlistbtn(index)">{{item.name}}</li>
           
        </ul>
        <div class="button" @click="tjbtn">提交</div>
    </div>
</template>
<script>
import headertwo from "../module/headertwo";
import { MessageBox, Toast } from "mint-ui";
export default {
  data() {
    return {
      dataname: "评价经纪人",
      data:"",
      bqlist:"",//标签
      content:"",//输入的内容
      biaoxing:0,//评星
      brokerId:"",//经纪人id
      appHouseRecId:"",//已看记录id
      taglist:"",//选中标签
    };
  },
  created() {
    this.data=this.$store.brokermessage
    this.brokerId=this.$route.params.id.split("a")[0]
    this.appHouseRecId=this.$route.params.id.split("a")[1]
    this._querysone()
  },
  methods: {
    tjbtn(){
      console.log(this.bqlist)
      this.taglist=""
      for(let i=0;i<this.bqlist.length;i++){
        if(this.bqlist[i].num){
          if(this.taglist==''){
            this.taglist=this.bqlist[i].value
          }else{
            this.taglist=this.taglist+","+this.bqlist[i].value
          }
        }       
      }
      if(this.biaoxing>0){
        if(this.content){
            if(this.taglist){
              this._querys()
            }else{
               MessageBox.alert("标签注备不能为空")
            }
        }else{
          MessageBox.alert("请输入评价内容")
        }
      }else{
          MessageBox.alert("评分不能为空并且不能大于5")
      }
    },
    _querys(){//提交按钮
      this.$http.post(this.$url.URL.BROKEREVALFILL,{
          appHouseRecId:this.appHouseRecId,//已看记录id,必填
          brokerId:this.brokerId,//经纪人id
          content:this.content,//评价内容,
          grade: this.biaoxing,//评分
          tag:this.taglist,//标签
      })
      .then(res=>{
        if(res.data.status=='1'){
          this.$router.go(-1)
          MessageBox.alert("经纪人评价成功")
        }else{
          MessageBox.alert(res.data.msg)
        }
      })
    },
    _querysone(){
         this.$http.get(this.$url.URL.DEFAULTCITYITEM+"/BROKER_EVALUATE_TAG")//看房备注所有标签
         .then(res=>{
             for(let i=0;i<res.data.data.length;i++){
               res.data.data[i].num=false
             }
             this.bqlist=res.data.data
         })
     },
     bqlistbtn(index){//点击标签
        this.bqlist[index].num=!this.bqlist[index].num
     },
     xinxinonebtn(index){
       this.biaoxing=index+1
     },
     xinxintwobtn(index){
       this.biaoxing=this.biaoxing+index+1
     }
  },
  components: {
    headertwo
  }
};
</script>
<style scoped lang="less">
@import "../../common/css/master.less";
.appraisepeople{
    width:100%;
    min-height: 100%;
    border-top:0.005rem solid #ffffff;
    box-sizing: border-box;
    overflow: hidden;
    margin-bottom:0.3rem;
}
#id_1{
  font-size:@fontsize_3;
  color:@color_2;
  margin-top:0.64rem;
  margin-left:0.12rem;
}
#id_2{
  margin-left:0.12rem;
  margin-right:0.6rem;
  margin-top:0.1rem;
  margin-bottom:0.4rem;
  font-size:@fontsize_3;
  color:@color_2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  >span{
    margin-left:0.1rem;
  }
}
.classli{
    background:@colorone !important;
    color:#ffffff !important;
}
#id_3{
  font-size:0.18rem;
  color:@color_1;
  margin-left:0.12rem;
}
#div_1{
    padding-top:0.25rem;
    padding-bottom:0.2rem;
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
#id_4{
  width:100%;
  text-align: center;
  padding:0.3rem 0;
  overflow: hidden;
  margin-left:20%;
  >img:nth-of-type(1){
    margin:0;
  }
  >img{
    margin-left:0.2rem;
    width:0.31rem;
    height:0.3rem;
    float:left;
    display: inline-block;
  }
}
#id_5{
  margin:0 0.12rem;
  height:2rem;
  background:@colorthree;
  border-radius: @boxborder_2;
  border-top:0.005rem solid @colorthree;
  >p{
    margin:0 0.1rem;
    height:1.7rem;
    margin-top:0.15rem;
  }
}
textarea{
    width:100%;
    height:100%;
    font-size:@fontsize_3;
    color:@color_3;
    text-indent: 0.12rem;
}
.button{
  width:80%;
  margin-left:10%;
  height:0.4rem;
  text-align: center;
  line-height: 0.4rem;
  font-size:@fontsize_3;
  color:#ffffff;
  background:@colorone;
  border-radius: @boxborder_2;
  margin-top:0.65rem;
}
</style>

