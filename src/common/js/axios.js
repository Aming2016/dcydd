//引入axios
import Vue from 'vue'
import axios from 'axios'

import { Toast,Header,Button,Swipe, SwipeItem,IndexList, IndexSection,Cell,MessageBox, Picker ,Loadmore,InfiniteScroll,Indicator} from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.component(Toast.name, Toast)
Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(IndexList.name, IndexList)
Vue.component(IndexSection.name, IndexSection)
Vue.component(Cell.name, Cell)
Vue.component(MessageBox.name, MessageBox)
Vue.component(Picker.name, Picker)
Vue.component(Loadmore.name, Loadmore)
Vue.use(InfiniteScroll)

let cancel ,promiseArr = {}
const CancelToken = axios.CancelToken;

//请求拦截器
axios.interceptors.request.use(config => {
    //发起请求时，取消掉当前正在进行的相同请求
    if (promiseArr[config.url]) {
        promiseArr[config.url]('操作取消')
        promiseArr[config.url] = cancel
    } else {
        promiseArr[config.url] = cancel
    }
      return config
}, err => {
    return Promise.reject(err)
})


axios.interceptors.request.use(//header拦截器
  config => {// 在发送请求之前做些什么
      if (window.localStorage.site) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
          config.headers = {
            'unique-code':window.localStorage.token,
            'scity':window.localStorage.site
        }
      }
      Indicator.open({
        text: "正在加载...",
        spinnerType: "fading-circle"
      });
      setTimeout(() => {
        Indicator.close();
      }, 5000);
      return config;
  },
  err => {// 对请求错误做些什么
      return Promise.reject(err);
      Indicator.close();
  });

//响应拦截器即异常处理
axios.interceptors.response.use(response => {// 对响应数据做点什么
  Indicator.close();
    return response
}, err => {// 对响应错误做点什么
  Indicator.close();
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
        Toast({
            message: '错误请求',
            position: 'bottom'
          });
          break;
        case 401:
          Toast({
            message: '未授权，请重新登录',
            position: 'bottom'
          });
          break;
        case 403:
          Toast({
            message: '拒绝访问',
            position: 'bottom'
          });
          break;
        case 404:
          Toast({
            message: '请求错误,未找到该资源',
            position: 'bottom'
          });
          break;
        case 405:
          Toast({
            message: '请求方法未允许',
            position: 'bottom'
          });
          break;
        case 408:
          Toast({
            message: '请求超时',
            position: 'bottom'
          });
          break;
        case 500:
          Toast({
            message: '服务器端出错',
            position: 'bottom'
          });
          break;
        case 501:
          Toast({
            message: '网络未实现',
            position: 'bottom'
          });
          break;
        case 502:
          Toast({
            message: '网络错误',
            position: 'bottom'
          });
          break;
        case 503:
          Toast({
            message: '服务不可用',
            position: 'bottom'
          });
          break;
          Toast({
            message: '网络超时',
            position: 'bottom'
          });
          break;
        case 505:
          Toast({
            message: 'http版本不支持该请求',
            position: 'bottom'
          });
          break;
        default:
        Toast({
            message: `连接错误${err.response.status}`,
            position: 'bottom'
          });
      }
    } else {

      Toast({
        message:"连接到服务器失败",
        position: 'bottom'
      });
    }
    // message.error(err.message)
      return Promise.resolve(err.response)
})
axios.defaults.baseURL = '/api'

axios.defaults.timeout = 10000
Vue.prototype.$http = axios;
// export default {
//   //get请求
//     get (url,param) {
//       return new Promise((resolve,reject) => {
//         axios({
//           method: 'get',
//           url,
//           params: param,
//           cancelToken: new CancelToken(c => {
//             cancel = c
//           })
//         }).then(res => {
//           resolve(res)
//         })
//       })
//     },
//   //post请求
//     post (url,param) {
//       return new Promise((resolve,reject) => {
//         axios({
//           method: 'post',
//           url,
//           data: param,
//           cancelToken: new CancelToken(c => {
//             cancel = c
//           })
//         }).then(res => {
//           resolve(res)
//         })
//       })
//      }
//   }