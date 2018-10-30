// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'//共享数据
import 'babel-polyfill'//兼容问题
//调试
// import Vconsole from 'vconsole';
// const vConsole = new Vconsole();
//二维码生成包
import QRCode from 'qrcodejs2'
Vue.prototype.$qrcode = QRCode;
//图片懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  error: '../static/imgs/moveone.png',
  loading: '../static/imgs/moveone.png',
  preLoad:0.5
})
//全局配置过滤器
import vfilter from "./common/js/vfilter.js"
for (let key in vfilter) {
  Vue.filter(key, vfilter[key])
}

Vue.config.debug = true;
//touchu
import Vuetouchu from 'vue-touch'
Vue.use(Vuetouchu, { name: 'v-touch' })
//引入mint-ui
import { Toast } from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.component(Toast.name, Toast)
//引入axios
import axios from './common/js/axios.js'
//http接口文档
import URL from './common/js/url.js'
Vue.prototype.$url = URL;
//swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)


//分享
import {wxfx} from "./common/js/wxfx.js"
Vue.prototype.$wxfx = wxfx;

//添加点击事件
import {addevent} from "./common/js/addmethod.js";
Vue.prototype.$addevent = addevent;


Vue.directive('iosinput', { //解决键盘挡住输入框指令
  inserted: function (el) {
    const oHeight = document.body.clientHeight;
    window.addEventListener('resize', function (params) {
      if (oHeight > document.body.clientHeight) { //键盘弹出
        el.scrollIntoView(false);
      }
    }, false);
  }
})
// //环信引入
import websdk from 'easemob-websdk'
let webIM = window.WebIM = websdk
Vue.prototype.$WebIM = webIM
var imConn = new webIM.connection({
  isMultiLoginSessions: webIM.config.isMultiLoginSessions,
  https: typeof webIM.config.https === 'boolean' ? webIM.config.https : location.protocol === 'https:',
  url: webIM.config.xmppURL,
  isAutoLogin: true,
  heartBeatWait: webIM.config.heartBeatWait,
  autoReconnectNumMax: webIM.config.autoReconnectNumMax,
  autoReconnectInterval: webIM.config.autoReconnectInterval,
  apiUrl: webIM.config.apiURL
})
var options = {  
  xmppURL:  webIM.config.xmppURL,
  apiUrl: WebIM.config.apiURL,  
  user:"",  
  pwd:"",  
  appKey: WebIM.config.appkey,  
  success:function (re) {  
    console.log('链接服务器正常')  
  },  
  error:function (err){  
    console.log('链接服务器异常')   
  }  
}  
Vue.prototype.$imoption = options 

Vue.prototype.$imConn = imConn


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
