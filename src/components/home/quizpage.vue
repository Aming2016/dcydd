<template>  
    <div class="quizpage">
         <headertwo :dataname="dataname"></headertwo>
         <div v-show="id=='2'" id="div_14">正在向<span>{{namedata.name}}</span>咨询</div>
         <div id="div_11" :class="{div_11two:id=='2'}">
            <input type="text" id="text_1" placeholder="请输入提问标题" v-model="textone" maxlength="30">
            <p>{{textone.length}}/30</p>
         </div>
          <div id="div_12">
            <textarea id="text_2" placeholder="请输入提问详细说明" maxlength="100" v-model="texttwo"></textarea>
            <p>{{texttwo.length}}/100</p>
         </div>
         <div id="div_13">标签</div>
         <ul id="ul_1">
             <li v-for="(item,index) in list" :class="{li_1:active==index}" @click="libaioqbtn(item,index)">{{item.name}}</li>
         </ul>
        <buttonone :buttonname="buttonname" class="bottombtn" @click.native="btn"></buttonone>
    </div>
</template>
<script>
import headertwo from '../module/headertwo'
import buttonone from '../module/buttonone'
import { MessageBox, Toast } from "mint-ui";
export default{
    data(){
      return{
          dataname:"提问",
          buttonname:"提交",
          namedata:"",
          move:false,
          textone:"",//标题
          texttwo:"",//内容
          list:[],
          itemlist:"",//标签
          active:"0",
      }
    },
    created(){
      this.id = this.$route.params.id;
      this._querys();
      if(this.id=='1'){
          this.dataname="提问"
      }else{
          this.dataname="向他咨询"
          this.namedata=this.$store.counseloritem
      }
  },
    methods:{
        _querys(){
            this.$http.get(this.$url.URL.DEFAULTCITYITEM+"/QUESTION_TAG")
            .then(res=>{
                this.list=res.data.data
                this.itemlist=res.data.data[0]
            })
        },
        libaioqbtn(item,index){
            this.active=index
            this.itemlist=item
        },
        _querysone(){
            this.$http.post(this.$url.URL.CONSULTANTSUBPROBLEM,{
                employeeId:this.namedata.employeeId,//顾问id
                label:this.itemlist.value,//标签
                problemTitle:this.textone,//问题标题
                problemDescribe:this.texttwo//问题描述
            })
            .then(res=>{
                if(res.data.status=='1'){
                    MessageBox.alert("提交成功")
                    this.$router.go(-1)
                }else{
                    MessageBox.alert(res.data.msg)
                }
                console.log(res)
            })
        },
        btn(){
            if(this.textone){
                if(this.texttwo){
                    this._querysone()
                }else{
                    MessageBox.alert("请输入提问详情")
                }
            }else{
                    MessageBox.alert("请输入提问标题")
            }
            
        },
    },
    components:{
            headertwo,
            buttonone
        }
	}
</script>
<style scoped lang="less">
@import "../../common/css/master.less";
    .quizpage{
        width:100%;
        min-height:100%;
        background:@colorthree;
        border-top:1px solid #ffffff;
        box-sizing: border-box;
    }
    #div_11{
        width:100%;
        border-bottom:0.005rem solid @bordercolor_1;
        padding-top:0.2rem;
        padding-bottom:0.2rem;
        margin-top:0.44rem;
        background-color:#ffffff;
        overflow: hidden;
        position: relative;
        >p{
            font-size:@fontsize_5;
            color:@color_3;
            position: absolute;
            right:0.12rem;
            bottom:0.07rem;
            line-height: 1;
            overflow: hidden;
        }
    }
    .div_11two{
        margin-top:0 !important;
    }
    .bottombtn{
        margin-left:10%;
        margin-top:0.5rem;
    }
    #text_1{
        font-size:@fontsize_3;
        color:@color_3;
        float:left;
        text-indent: 0.12rem;
        width:95%;
    }
    #div_12{
        width:100%;
        padding-top:0.15rem;
        overflow: hidden;
        height:1.9rem;
        color:@color_3;
        background:#ffffff;
        position: relative;
        >p{
            font-size:@fontsize_5;
            color:@color_3;
            position: absolute;
            right:0.12rem;
            bottom:0.07rem;
            line-height: 1;
            overflow: hidden;
        }
    }
    #div_14{
        font-size:@fontsize_3;
        color:@color_2;
        margin-top:0.59rem;
        margin-bottom:0.15rem;
        text-indent: 0.12rem;
        >span{
            color:@colorone;
            margin-bottom:0.15rem;
        }
    }
    #text_2{
        width:100%;
        float:left;
        text-indent: 0.12rem;
        font-size:@fontsize_3;
        height:1.6rem;
        resize:none;
    }
    #div_13{
        font-size:@fontsize_2;
        color:@color_1;
        margin-left:0.12rem;
        margin-top:0.3rem;
        margin-bottom:0.15rem;
    }
    #ul_1{
        margin-left:0.12rem;
        margin-right:0.12rem;
        overflow: hidden;
    }
    #ul_1>li{
        font-size:@fontsize_8;
        color:@color_2;
        padding:0.1rem 0.16rem;
        background:@colorfour;
        float:left;
        margin-right:0.13rem;
        margin-top:0.15rem;
        border-radius: 0.05rem;
    }
    .li_1{
        background:@colorone !important;
        color:#ffffff !important;
    }
</style>