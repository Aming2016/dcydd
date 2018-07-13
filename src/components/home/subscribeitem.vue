<template>
    <div class="subscribeitem">
        <headerone :dataname="dataname"></headerone>
        <ul class="nameclass">
            <li>
                <span>姓名</span>
                <input type="text" placeholder="请输入您的姓名"  v-model="myname">
            </li>
            <li>
                <span>电话</span>
                <span style="font-size: 0.15rem; color: #999999; margin-left: 0.3rem;">{{phonename}}</span>
            </li>
        </ul>
        <div class="yuyuekanfagn"> 
            <span>预约看房时间</span>
            <img src="../../imgs/home/gengduojiantou.png" alt="" @click="pickerbtn">
            <div class="textname"><span v-for="item in dateteimitemone">{{item.value}}</span></div>
        </div>
        <div class="yuyuekanfagn" style="margin-top:0.1rem;"> 
            <span>待看经纪人</span>
            <img src="../../imgs/home/gengduojiantou.png" alt="" @click="jingjilistbtn">
            <div class="textname"><span style="margin:0;">{{brokername.emplName}}</span></div>
        </div>
        <buttonone class="buttonone" :buttonname="buttonname" @click.native="yuyuebtn"></buttonone>
        <div class="pickerbox" v-show="pickermover">
            <div class="pickertitle">
                <div @click="pickerbtnone">取消</div><div @click.stop="pickerbtntwo">确定</div>
            </div>
            <mt-picker value-key="value" class="pickerclass" :slots="slots" @change="onValuesChange"></mt-picker>
        </div>      
    </div>
</template>
<script>
import headerone from "../module/headertwo";
import buttonone from "../module/buttonone";
import { MessageBox,Toast} from "mint-ui";
export default {
  data() {
    return {
      dateone:"",//当前时间
      site:window.localStorage.site,
      dataone: "",
      dataname: "预约时间",
      buttonname: "提交",
      mydata:JSON.parse(window.localStorage.mydata),
      brokername:"",//选择的经纪人
      dateitem:[],//时间戳
      dateitemtwo:[],//传递后台的时间2018-12-25
      datetiem:[],//转化的时间
      dateteimitems:"",//滑动选取的时间
      dateteimitemone:"",//往后台传递的时间
      phonename:JSON.parse(window.localStorage.mydata).mobile.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3"),//手机号码
      myname:"",//我的姓名
      slots: [
        {
          flex: 1,
          values: [  

          ],
          className: "slot1",
          textAlign: "center" 
        },  
        {
          flex:1,
          values: [{key:'ALL_DAY',value:'全天'},{key:'FORENOON',value:'上午'},{key:'AFTERNOON',value:'下午'},{key:'NIGHT',value:'晚上'}],
          className: "slot1",
          textAlign: "center"
        }
      ],
      pickermover: false
    };
  },
  created() {
    this.dataone = JSON.parse(window.localStorage.dataone);
    this._querys();
    this.dataone.houseTag = this.dataone.houseTag.split(",");
    if (this.dataone.houseTag.length > 3) {
      this.dataone.houseTag.splice(
        -1,
        this.dataone.houseTag.length - 3
      );
    } else {
      this.dataone.houseTag = this.dataone.houseTag;
    }
  },
  components: {
    headerone,
    buttonone
  },
  activated(){
    this.$store.brokername
      ? (this.brokername = this.$store.brokername)
      : (this.brokername = { emplName: "", id: "" });
    console.log(this.$store.brokername);
  },
  methods: {
    jingjilistbtn(){
      this.$store.cityname={name:window.localStorage.sitename,key:this.site}
      this.$router.push("/brokerlist/3");
    },
    _querys(){
      this.$http.get(this.$url.URL.CURRENTDATETIME)
      .then((res)=>{
        this.dateone=res.data.data.currentDateTime
        this.datetiemfcg();
      })
    },
    yuyuebtn(){
      if(this.myname){
        if(this.dateteimitemone){
           if(this.brokername.emplName){
             this._querystwo();
            }else{
              MessageBox.alert("请选择带看经纪人")
            }
        }else{
           MessageBox.alert("请选择看房时间")
        }
      }else{
        MessageBox.alert("请输入姓名")
      }
    },
    _querystwo(){
       this.$http.post(this.$url.URL.APPOINTHOUSE,{
            appointDate:this.dateteimitemone[0].key,//预约时间2017-12-15,不需要时分秒 
            appointMobile:this.mydata.mobile,//手机号码
            appointName:this.myname,//姓名
            appointRange:this.dateteimitemone[1].key,//预约时段类型,必填 ALL_DAY=全天 FORENOON=上午 AFTERNOON=下午 NIGHT=晚上 
            brokerId:this.brokername.id,
            houseList:this.$store.awaitlist
        })
        .then(res=>{
            console.log(res)
            if(res.data.status=='1'){
              MessageBox.alert("预约成功", "提示")
              this.$router.push("/lookhouseone")
            }else{
              Toast({
                message: res.data.msg,
                position: 'bottom',
                duration:1000
              });
            }
        })
    },
    datetiemfcg(){
      for(let i=0;i<7;i++){
        this.dateitem.push(this.dateone)
        var dateitemone = new Date(this.dateone)
        var dateyue="";
        var dateri="";
        parseInt(dateitemone.getMonth())+1>9?dateyue=parseInt(dateitemone.getMonth())+1:dateyue="0"+(parseInt(dateitemone.getMonth())+1);
        parseInt(dateitemone.getDate())>9?dateri=dateitemone.getDate():dateri="0"+dateitemone.getDate();
        this.dateitemtwo.push(dateitemone.getFullYear()+"-"+dateyue+"-"+dateri)
        this.dateone=this.dateone+86400*1000
      }
      for(let i=0;i<this.dateitem.length;i++){
        var date = new Date(this.dateitem[i])
        var item=""
        var  set={
          key:this.dateitemtwo[i],
          value:""
        }
        if(i=='0'){
          set.value="今天"
        }else if(i=="1"){
          set.value="明天"
        }else{
          set.value=date.getMonth()+1+"-"+date.getDate()+" "+this.getWeek(date)
        }
        this.slots[0].values.push(set)
      }
      
    },
    getWeek(date) { 
    var week; 
    if(date.getDay() == 0) week = "星期日" 
    if(date.getDay() == 1) week = "星期一" 
    if(date.getDay() == 2) week = "星期二" 
    if(date.getDay() == 3) week = "星期三" 
    if(date.getDay() == 4) week = "星期四" 
    if(date.getDay() == 5) week = "星期五" 
    if(date.getDay() == 6) week = "星期六" 
    return week; 
    } ,
    pickerbtntwo(){
      //picker确定按钮
      this.pickermover = false;
      console.log("aaaaa")
      this.dateteimitemone=this.dateteimitems
      console.log(this.dateteimitemone)
    },
    onValuesChange(picker,values){
      this.dateteimitems=values     
      // console.log(this.dateteimitemone)
    },
    pickerbtn() {
      this.pickermover = true;
    },
    pickerbtnone() {
      //picker取消按钮
      this.pickermover = false;
      this.dateteimitemone=""
    },
  }
};
</script>
<style scoped lang="less">
.subscribeitem {
  width: 100%;
  min-height: 100%;
  background-color: #f8f8f8;
}
.nameclass {
  width: 100%;
  overflow: hidden;
  background-color: #ffffff;
  margin-top: 0.44rem;
  float: left;
}
.nameclass > li {
  margin-left: 0.12rem;
  margin-right: 0.12rem;
  height: 0.5rem;
}
.nameclass > li{
  border-bottom:0.005rem solid #cacaca;
}
.nameclass > li > span {
  font-size: 0.17rem;
  color: #282828;
  float: left;
  line-height: 0.5rem;
}
.nameclass > li > input {
  float: left;
  height: 0.25rem;
  font-size: 0.15rem;
  color: #999999;
  float: left;
  margin-left: 0.3rem;
  padding-top: 0.125rem;
}
.yuyuekanfagn {
  width: 100%;
  height: 0.5rem;
  float: left;
  background-color: #ffffff;
}
.yuyuekanfagn > span {
  margin-left: 0.12rem;
  font-size: 0.17rem;
  color: #282828;
  float: left;
  line-height: 0.5rem;
}
.yuyuekanfagn > img {
  float: right;
  width: 0.1rem;
  height: 0.18rem;
  margin-right: 0.12rem;
  padding-top: 0.16rem;
}
.buttonone {
  float: left;
  margin-left: 10%;
  margin-top: 0.8rem;
}
.textname{
  float:right;
  font-size:0.15rem;
  margin-right:0.2rem;
  line-height: 0.5rem;
  color:#666666;
}
.textname>span:nth-of-type(1){
  margin-right:0.1rem;
}
.pickerclass {
  width: 100%;
  height: 1.5rem;
  background-color: #ffffff;
  float: left;
}
.pickertitle {
  width: 100%;
  height: 0.4rem;
  float: left;
  font-size: 0.15rem;
  background-color: #eeeeee;
}
.pickertitle > div:nth-of-type(1) {
  float: left;
  margin-left: 0.12rem;
  height: 0.4rem;
  line-height: 0.4rem;
}
.pickertitle > div:nth-of-type(2) {
  float: right;
  margin-right: 0.12rem;
  height: 0.4rem;
  line-height: 0.4rem;
}
.pickerbox {
  width: 100%;
  overflow: hidden;
  position: fixed;
  bottom: 0;
}
</style>