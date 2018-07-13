<template>
  <div>
        <div id="ul_3" v-for="item in message">
            <div>
                <img :src="item.headUrl|headimgfilter" alt="">
            </div>
            <div>
                <div>
                    <p>{{item.memberName}}</p>
                    <p>{{item.evaluateDate}}</p>
                </div>
                <div>
                    <img src="../../imgs/home/hongxing.png" v-for="i in item.grade" alt="">
                    <img src="../../imgs/home/huixing.png" alt="" v-for="i in 5-item.grade">
                </div>
                <div>
                    <div>
                        {{item.content}}
                    </div>
                    <ul>
                        <li v-for="item in item.tag">{{item}}</li>
                        
                    </ul>
                </div>
            </div>
        </div>
    </div>
  
</template>
<script>
  export default {
    props:['message'],
  }
</script>
<style lang="less" scoped>
@import '../../common/css/master.less';
@import "../../common/css/fulist.css";
    #ul_3{
        >div:nth-of-type(1){
            width:0.34rem;
            height:0.34rem;
            opacity: 50%;
            float:left;
            overflow: hidden;
            >img{
                width:0.34rem;
                height:0.34rem;
                float:left;
            }
        }
        >div:nth-of-type(2){
            width:3.07rem;          
            float:right;
            >div:nth-of-type(3){
                margin-top:0.1rem;
                padding:0.1rem;
                background:@colorthree;
                overflow: hidden;
                color:@color_2;
                >div{
                    font-size:@fontsize_8;
                }
                >ul{
                    font-size:@fontsize_6;
                    margin-top:0.05rem;
                    >li{
                        padding:0.05rem 0.07rem;
                        border:0.005rem solid  @bordercolor_1;
                        border-radius: @boxborder_2;
                        float:left;
                        margin-right:0.05rem;
                        margin-top:0.05rem;
                    }
                }
            }
            >div:nth-of-type(2){
                overflow: hidden;
                margin-top:0.13rem;
                >img{
                    float:left;
                    margin-right:0.07rem;
                    width:0.145rem;
                    height:0.13rem;
                }
            }
            >div:nth-of-type(1){
                width:100%;
                height:0.34rem;
                line-height: 0.34rem;
                overflow: hidden;
                >p:nth-of-type(1){
                    float:left;
                    height:100%;
                    line-height: 0.34rem;
                    font-size:@fontsize_3;
                    color:@color_1;
                }
                >p:nth-of-type(2){
                    float:right;
                    height:100%;
                    line-height: 0.34rem;
                    font-size:@fontsize_6;
                    color:@color_3;
                }
            }
        }
        width:100%;
        margin-top:0.15rem;
        border-bottom:0.005rem solid @bordercolor_1;
        overflow: hidden;
        padding-bottom:0.15rem;
    }

</style>
