<template>  
       <ul class="consultlist">
           <li v-for="item in list" @click="questiondetails(item)">
               <div>
                   {{item.problemTitle}}
               </div>
               <div>
                  {{item.problemDescribe}}
               </div>
               <div>
                   <div>
                       <p>{{item.label}}</p>
                       <p>{{item.classifyName }}</p>
                   </div>
                   <p>{{item.pubTime}}</p>
                   <p>{{item.answerNum}}回答</p>
               </div>
           </li>
       </ul>
</template>
<script>
import { MessageBox} from "mint-ui";
export default {
  props: ["list"],
  methods: {
    questiondetails(item) {
        this.$router.push("/questiondetails/" + item.id);
    }
  }
};
</script>
<style scoped lang="less">
.consultlist {
  width: 100%;
  background: #ffffff;
  > li:nth-of-type(1) {
    border: none;
  }
  > li {
    margin-left: 0.12rem;
    margin-right: 0.12rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    border-top: 0.005rem solid #e6e6e6;
    overflow: hidden;
    > div:nth-of-type(1) {
      margin-left: 0;
      margin-right: 0.1rem;
      font-size: 0.16rem;
      color: #222222;
    }
    > div:nth-of-type(2) {
      margin-left: 0;
      margin-top: 0.13rem;
      margin-right: 0.1rem;
      margin-bottom: 0.15rem;
      font-size: 0.14rem;
      color: #999999;
    }
    > div:nth-of-type(3) {
      width: 100%;
      > div {
        float: left;
        > p {
          float: left;
          font-size: 0.1rem;
          color: #999999;
          background: #f2f2f2;
          padding: 0.04rem 0.07rem;
          border-radius: 0.05rem;
          margin-right: 0.07rem;
        }
      }
      > p {
        font-size: 0.1rem;
        color: #999999;
        float: left;
        margin-left: 0.13rem;
        margin-top: 0.04rem;
        line-height: 1;
      }
      > p:nth-of-type(2) {
        float: right;
        margin-left: 0;
      }
    }
  }
}
</style>