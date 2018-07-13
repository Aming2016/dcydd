// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'//共享数据
import 'babel-polyfill'//兼容问题
//图片懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  error: '../static/imgs/moveone.png',
  loading: '../static/imgs/loading.png'
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
// import websdk from 'easemob-websdk'
// let webIM = window.WebIM = websdk
// Vue.prototype.$WebIM = webIM
// const imConn = new webIM.connection({
//   isMultiLoginSessions: webIM.config.isMultiLoginSessions,
//   https: typeof webIM.config.https === 'boolean' ? webIM.config.https : location.protocol === 'https:',
//   url: webIM.config.xmppURL,
//   isAutoLogin: true,
//   heartBeatWait: webIM.config.heartBeatWait,
//   autoReconnectNumMax: webIM.config.autoReconnectNumMax,
//   autoReconnectInterval: webIM.config.autoReconnectInterval,
//   apiUrl: webIM.config.apiURL
// })
// const options = {  
//   apiUrl: WebIM.config.apiURL,  
//   user: '1',  
//   pwd: 'xiuxiutrip123456',  
//   appKey: WebIM.config.appkey,  
//   success:function (re) {  
//     console.log('链接服务器正常')  
//   },  
//   error:function (err){  
//     alert(err)  
//   }  
// }  
// Vue.prototype.$imoption = options 

// Vue.prototype.$imConn = imConn


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
