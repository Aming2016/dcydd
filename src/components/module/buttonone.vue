<template>  
       <div class="button">{{buttonname}}</div>
</template>
<script>
export default{
		props:["buttonname"]
	}
</script>
<style scoped lang="less">
@import '../../common/css/master.less';
    .button{
        width:80%;
        // height:0.45rem;
        line-height:normal;
        padding:0.1rem 0;
        background:@colorone;
        border-radius: 0.06rem;
        color:#ffffff;
        font-size:0.18rem;
        text-align: center;
        // line-height: 0.45rem;
    }
</style>