
<template>
    <div class="portrait">
        <headertwo :dataname="dataname"></headertwo>
		<!--图片裁剪-->
		<div class="clipbg displaynone">
			<div id="clipArea">
                <img :src="mydata.headImage" alt="" v-show="imgnuber">
            </div>
			<!-- <div class="loading displaynone">正在载入图片...</div> -->
			<ul class="footer">
             <li>打开相机<input type="file" id="file" accept="image/*"></li>
             <li>打开相册<input type="file" id="file" accept="camera"></li>
             <li id="clipBtn">完成裁剪</li>
             <li class="back" @click="rotueraddbtn"> 取消</li>
			</ul>
		</div>
    </div>
</template>
<script>
import headertwo from "../module/headertwo";
export default {
  data() {
    return {
      dataname: "头像",
      titleimg:"",
      mydata:JSON.parse(window.localStorage.dc_mydata),
      imgnuber:true,
    };
  },
  mounted(){
        $(".clipbg").fadeIn()
        var that=this
		var clipArea = new  PhotoClip("#clipArea", {
				size: [350, 300],//裁剪框大小
				outputSize:[0,0],//打开图片大小，[0,0]表示原图大小
				file: "#file",
				ok: "#clipBtn",
				loadStart() { //图片开始加载的回调函数。this 指向当前 PhotoClip 的实例对象，并将正在加载的 file 对象作为参数传入。（如果是使用非 file 的方式加载图片，则该参数为图片的 url）
					$(".loading").removeClass("displaynone");

				},
				loadComplete() {//图片加载完成的回调函数。this 指向当前 PhotoClip 的实例对象，并将图片的 <img> 对象作为参数传入。
					$(".loading").addClass("displaynone");

				},
                done(dataURL) { //裁剪完成的回调函数。this 指向当前 PhotoClip 的实例对象，会将裁剪出的图像数据DataURL作为参数传入。			
                //dataURL裁剪后图片地址base64格式提交给后台处理
                    that.imgnuber=false 
                     that.$http.post(that.$url.URL.UPDATAHEADIMAGE,{
                        base64Image:dataURL
                    })
                    .then(res=>{
                        if(res.data.status=='1'){
                                that.$http.get(that.$url.URL.MINEDATAINFO)
                                .then(res=>{
                                    window.localStorage.dc_mydata=JSON.stringify(res.data.data)
                                    that.$router.back(-1)
                                })
                        }
                    })
                    .catch(()=>{
                    })
				}
			});
  },
  created() {
  },
  methods: {
      _querys(imgurl){
          that.$http.post(that.$url.URL.UPDATAHEADIMAGE,{
                        base64Image:imgurl
                    })
                    .then(res=>{
                        console.log(res)
          })
      },
      rotueraddbtn(){
          this.$router.go(-1)
      }
  },
  components: {
    headertwo
  }
};
</script>
<style scoped lang="less">
@import "../../common/css/fulist.css";
.portrait {
  width: 100%;
  min-height: 100%;
}
/*截图上传页面*/
.clipbg {
  background: #ffffff;
  width: 100%;
  height: 100%;
}

.clipbg #clipArea {
  position: fixed;
  width: 100%;
  height:3rem;
  top:0.6rem;
  left:0;
  border:0.005rem solid #e6e6e6;
  background-size:100% 100%;
}
 #clipArea>img{
     width:100%;
     height:100%;
 }
.clipbg .footer {
  width: 100%;
  position: fixed;
  bottom: 0px;
  text-align: center;
  background:#ffffff;
  border-top:0.005rem solid #e6e6e6;
}
.footer>li{
    width:100%;
    height:0.5rem;
    text-align: center;
    line-height: 0.5rem;
    font-size:0.18rem;
    overflow: hidden;
    position: relative;
}
// .clipbg dl {
//   background: #ffffff;
//   overflow: hidden;
//   margin-bottom: 0.6rem;
// }
// .clipbg dd {
//   position: relative;
//   width:100%;
//   height:0.5rem;
//   line-height: 20.5rem;
//   font-size:0.18rem;
//   border-bottom: 1px solid #999999;
// }
// .clipbg .back {
//   height: 2.25rem;
//   line-height: 2.25rem;
//   border-radius: 0.4rem;
//   margin-bottom: 0.4rem;
//   background: #ffffff;
// }
.footer>li>input {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 11;
  filter: alpha(opacity=0);
  -moz-opacity: 0;
  -khtml-opacity: 0;
  opacity: 0;
}


</style>