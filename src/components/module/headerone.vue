<template>  
       <mt-header class="header" fixed :title="dataname"></mt-header>   
</template>
<script>
export default{
		props:["dataname"]
	}
</script>
<style scoped lang="less">
    .header{
        height:0.6rem;
        font-size:0.24rem;
        background:red;
    }
</style>