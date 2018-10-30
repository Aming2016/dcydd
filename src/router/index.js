import Vue from 'vue'
import Router from 'vue-router'
const home = resolve => require(['@/components/home/home'], resolve)// 首页
const message = resolve => require(['@/components/message/message'], resolve)// 消息
const messageitem = resolve => require(['@/components/message/messageitem'], resolve)// 消息列表
const abmessage = resolve => require(['@/components/message/abmessage'], resolve)// 消息列表
const lookhouse = resolve => require(['@/components/lookhouse/lookhouse'], resolve)// 约看
const lookhouseone = resolve => require(['@/components/lookhouse/lookhouseone'], resolve)// 约看1
const lookhousetwo = resolve => require(['@/components/lookhouse/lookhousetwo'], resolve)// 约看2
const lookhousethree = resolve => require(['@/components/lookhouse/lookhousethree'], resolve)// 约看3
const awaitlook = resolve => require(['@/components/home/awaitlook'], resolve)// 首页待看列表
const schedule = resolve => require(['@/components/lookhouse/schedule'], resolve)// 首页预约看房的日程详情
const aboutlist = resolve => require(['@/components/lookhouse/aboutlist'], resolve)// 首页预约看房的约看列表
const houseremark = resolve => require(['@/components/lookhouse/houseremark'], resolve)// 首页预约看房的看房备注appraisepeople
const appraisepeople = resolve => require(['@/components/lookhouse/appraisepeople'], resolve)// 首页预约看房的经纪人评价

const information = resolve => require(['@/components/information/information'], resolve)// 资讯
const mine = resolve => require(['@/components/mine/mine'], resolve)// 我的
const indexlist = resolve => require(['@/components/home/indexlist'], resolve)// 首页定位列表
const searchbox = resolve => require(['@/components/home/searchbox'], resolve)// 首页搜索
const searchlist = resolve => require(['@/components/home/searchlist'], resolve)// 首页所搜过滤列表

const hotdistrict = resolve => require(['@/components/home/hotdistrict'], resolve)// 首页所搜过滤列表
const renting = resolve => require(['@/components/home/renting'], resolve)// 首页我要买房我要卖房
const rentingitem = resolve => require(['@/components/home/rentingitem'], resolve)// 首页我要买房我要卖房详情页
const subscribeitem = resolve => require(['@/components/home/subscribeitem'], resolve)// 首页我要买房我要卖房预约看房
const sellrent = resolve => require(['@/components/home/sellrent'], resolve)// 首页我要租售房
const regionlist = resolve => require(['@/components/home/regionlist'], resolve)// 首页搜索小区找房
const handbook = resolve => require(['@/components/home/handbook'], resolve)// 首页购房指南列表
const estatechoose = resolve => require(['@/components/home/estatechoose'], resolve)// 首页我要卖房买房的小区页面
const worktype = resolve => require(['@/components/home/worktype'], resolve)// 首页我要租售的代办业务类型
const counselorlistitem = resolve => require(['@/components/home/counselorlistitem'], resolve)// 首页的顾问详情
const questiondetails = resolve => require(['@/components/home/questiondetails'], resolve)// 首页的问题详情
const fitmentfinish = resolve => require(['@/components/home/fitmentfinish'], resolve)//首页装修
const publicbenefit = resolve => require(['@/components/home/publicbenefit'], resolve)//首页世华公益
const remoteserve = resolve => require(['@/components/home/remoteserve'], resolve)//首页异地代办tp
const housetrusteeship = resolve => require(['@/components/home/housetrusteeship'], resolve)//首页房屋托管
const overseaspurcha = resolve => require(['@/components/home/overseaspurcha'], resolve)//首页海外置业sojourntnvest
const sojourntnvest = resolve => require(['@/components/home/sojourntnvest'], resolve)//首页旅游投资

const hotdisitem = resolve => require(['@/components/home/hotdisitem'], resolve)// 首页热门小区详情页
const rentinglist = resolve => require(['@/components/home/rentinglist'], resolve)// 首页二手房列表和租房列表
const brokerlist = resolve => require(['@/components/home/brokerlist'], resolve)// 首页的经纪人列表筛选
const brokeritem = resolve => require(['@/components/home/brokeritem'], resolve)// 我的页的经纪人列表
const broker = resolve => require(['@/components/home/broker'], resolve)// 我的页的经纪人列表
const seekshop = resolve => require(['@/components/home/seekshop'], resolve)// 首页的找门店
const mapboxone = resolve => require(['@/components/home/mapboxone'], resolve)// 首页的 详情地图
const mapboxtwo = resolve => require(['@/components/home/mapboxtwo'], resolve)//首页的 详情地图
const lookrecord = resolve => require(['@/components/home/lookrecord'], resolve)// 首页  带看记录
const comparison = resolve => require(['@/components/home/comparison'], resolve)//首页  房源对比
const discussindex = resolve => require(['@/components/home/discussindex'], resolve)// 首页 全部评价
const cartogram = resolve => require(['@/components/home/cartogram'], resolve)// 首页 全部评价
const contrastlist = resolve => require(['@/components/home/contrastlist'], resolve)// 首页对比列表
const advisory = resolve => require(['@/components/home/advisory'], resolve)// 首页面的咨询
const quizpage = resolve => require(['@/components/home/quizpage'], resolve)//首页面的咨询的提问首页
const acttention = resolve => require(['@/components/home/attention'], resolve)// 首页面的咨询的我关注的counselorlist
const counselorlist = resolve => require(['@/components/home/counselorlist'], resolve)// 首页面的咨询的顾问列表
const newhouse = resolve => require(['@/components/home/newhouse'], resolve)// 首页面的新房
const calculator = resolve => require(['@/components/home/calculator'], resolve)// 首页面的计算器
const makeplan = resolve => require(['@/components/home/makeplan'], resolve)// 首页面的成交进度
const makeplaninquire = resolve => require(['@/components/home/makeplaninquire'], resolve)// 首页面的成交进度查询页面

const minecentre = resolve => require(['@/components/mine/minecentre'], resolve)// 我的页的个人中心
const minename = resolve => require(['@/components/mine/minename'], resolve)//我的页的修改姓名
const phonenumber = resolve => require(['@/components/mine/phonenumber'], resolve)//我的页的修改手机号码
const minepassword = resolve => require(['@/components/mine/minepassword'], resolve)//我的页的修改密码
const minesystem = resolve => require(['@/components/mine/minesystem'], resolve)//我的页的修改密码

const feedback = resolve => require(['@/components/mine/feedback'], resolve)//我的页的意见反馈
const register = resolve => require(['@/components/mine/register'], resolve)//我的页的登陆页面
const forgetpassword = resolve => require(['@/components/mine/forgetpassword'], resolve)//我的页的忘记密码
const registertwo = resolve => require(['@/components/mine/registertwo'], resolve)//我的页的注册页面
const minseller = resolve => require(['@/components/mine/minseller'], resolve)//我的页面的我要卖房
const minsellerone = resolve => require(['@/components/mine/minsellerone'], resolve)//我的页面的我的申请
const minsellertwo = resolve => require(['@/components/mine/minsellertwo'], resolve)//我的页面的我的房源
const takelooklist = resolve => require(['@/components/mine/takelooklist'], resolve)//我的页面的委托详情的带看记录
const invitation = resolve => require(['@/components/mine/invitation'], resolve)//我的页面的邀请好友页面
const friendlist = resolve => require(['@/components/mine/friendlist'], resolve)//我的页面的邀请好友列表
const twocode = resolve => require(['@/components/mine/twocode'], resolve)//我的页面的微信绑定页面
const cardstock = resolve => require(['@/components/mine/cardstock'], resolve)//我的页的卡卷
const integral = resolve => require(['@/components/mine/integral'], resolve)//我的页的积分

const minerentinglist = resolve => require(['@/components/mine/minerentinglist'], resolve)//我的页面的我收藏的二手房租房
const minecomment = resolve => require(['@/components/mine/minecomment'], resolve)//我的页面的我的评论

const mineregionlist = resolve => require(['@/components/mine/mineregionlist'], resolve)//我的页面的我收藏的小区
const minebroker = resolve => require(['@/components/mine/minebroker'], resolve)//我的页面的我收藏的小区
const mineselleritem = resolve => require(['@/components/mine/mineselleritem'], resolve)//我的页面的委托详情
const portrait = resolve => require(['@/components/mine/portrait'], resolve)//我的页面的头像
const abountuse = resolve => require(['@/components/mine/abountuse'], resolve)//我的页面的关于我们\
const wxregister = resolve => require(['@/components/mine/wxregister'], resolve)//我的页面的微信绑定页面
const htmlpage = resolve => require(['@/components/module/htmlpage'], resolve)//我的h5页面
Vue.use(Router)

export default new Router({
  mode: 'history',   //history   hash
  scrollBehavior (to, from, savedPosition) {
		return { x: 0, y: 0 }
	},
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
    },
    {
      path: '/message',
      name: 'message',
      component: message
    },
    {
      path:"/abmessage",
      name:"abmessage",
      component:abmessage
    },
    {
      path:"/information",
      name:"information",
      component:information
    },
    {
      path:"/wxregister",
      name:"wxregister",
      component:wxregister
    },
    {
      path:"/makeplaninquire",
      name:"makeplaninquire",
      component:makeplaninquire
    },
    {
      path:"/mapboxone",
      name:"mapboxone",
      component:mapboxone
    },
    {
      path:"/discussindex/:id",
      name:"discussindex",
      component:discussindex
    },
    {
      path:"/htmlpage",
      name:"htmlpage",
      component:htmlpage
    },
    {
      path:"/takelooklist/:id",
      name:"takelooklist",
      component:takelooklist
    },
    {
      path:"/invitation",
      name:"invitation",
      component:invitation
    },
    {
      path:"/friendlist/:id",
      name:'friendlist',
      component:friendlist
    },
    {
      path:"/twocode",
      name:"twocode",
      component:twocode
    },
    {
      path:"/cardstock",
      name:"cardstock",
      component:cardstock
    },
    {
      path:"/integral",
      name:"integral",
      component:integral
    },  
    {
      path:"/makeplan",
      name:"makeplan",
      component:makeplan
    },
    {
      path:"/estatechoose/:id",
      name:"estatechoose",
      component:estatechoose
    },
    {
      path:"/fitmentfinish",
      name:"fitmentfinish",
      component:fitmentfinish
    },
    {
      path:"/publicbenefit",
      name:"publicbenefit",
      component:publicbenefit
    },
    {
      path:"/housetrusteeship",
      name:"housetrusteeship",
      component:housetrusteeship
    },
    {
      path:"/overseaspurcha",
      name:"overseaspurcha",
      component:overseaspurcha
    },
    {
      path:"/sojourntnvest",
      name:"sojourntnvest",
      component:sojourntnvest
    },
    {
      path:"/remoteserve",
      name:"remoteserve",
      component:remoteserve
    },
    {
      path:"/acttention/:id",
      name:"acttention",
      component:acttention
    },
    {
      path:"/awaitlook",
      name:"awaitlook",
      component:awaitlook
    },
    {
      path:"/newhouse",
      name:"newhouse",
      component:newhouse
    },
    {
      path:"/counselorlist",
      name:"counselorlist",
      component:counselorlist
    },
    {
      path:"/mapboxtwo",
      name:"mapboxtwo",
      component:mapboxtwo
    },
    {
      path:"/contrastlist/:id",
      name:"contrastlist",
      component:contrastlist
    },
    {
      path:"/houseremark/:id",
      name:"houseremark",
      component:houseremark
    },
    {
      path:"/appraisepeople/:id",
      name:"appraisepeople",
      component:appraisepeople
    },
    {
      path:"/brokerlist/:id",
      name:"brokerlist",
      component:brokerlist
    },
    {
      path:"/quizpage/:id",
      name:"quizpage",
      component:quizpage
    },
    {
      path:"/lookrecord/:id",
      name:"lookrecord",
      component:lookrecord
    },
    {
      path:"/comparison",
      name:"comparison",
      component:comparison
    },
    {
      path:"/cartogram",
      name:"cartogram",
      component:cartogram
    },
    {
      path:"/messageitem",
      name:"messageitem",
      component:messageitem
    },
    {
      path: '/lookhouse',
      name: 'lookhouse',
      component: lookhouse,
      redirect:'/lookhouseone',
      children:[
        {
          path:'/lookhouseone',//1
          component:lookhouseone
        },
        {
          path:'/lookhousetwo',//2
          component:lookhousetwo
        },
        {
        path:'/lookhousethree',//3
        name:"lookhousethree",
          component:lookhousethree
        }
      ]
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine
    },
    {
      path:"/broker",
      name:"broker",
      component:broker,
    },
    {
      path:"/aboutlist/:id",
      name:"aboutlist",
      component:aboutlist
    },
    {
      path: '/indexlist',
      name: 'indexlist',
      component: indexlist
    },
    {
      path: '/searchbox',
      name: 'searchbox',
      component: searchbox
    },
    {
      path:"/abountuse",
      name:"abountuse",
      component:abountuse
    },
    {
      path:"/schedule/:id",
      name:"schedule",
      component:schedule
    },
    {
      path:"/minseller",
      name:'minseller',
      component:minseller,
      redirect:'/minsellerone/:id',
      children:[
        {
          path:'/minsellerone/:id',//1
          component:minsellerone
        },
        {
          path:'/minsellertwo/:id',//2
          component:minsellertwo
        },
      ]
    },
    {
      path:"/minecomment",
      name:"minecomment",
      component:minecomment
    },
    {
      path:"/advisory",
      name:"advisory",
      component:advisory
    },
    {
      path:'/searchlist',
      name:"searchlist",
      component:searchlist
    },
    {
      path:"/hotdistrict",
      name:"hotdistrict",
      component:hotdistrict
    },
    {
      path:"/renting",
      name:"renting",
      component:renting
    },
    {
      path:"/rentingitem/:id",
      name:"rentingitem",
      component:rentingitem
    },
    {
      path:"/counselorlistitem/:id",
      name:"counselorlistitem",
      component:counselorlistitem
    },
    {
      path:"/questiondetails/:id",
      name:"questiondetails",
      component:questiondetails
    },
    {
      path:"/subscribeitem",
      name:"subscribeitem",
      component:subscribeitem,
      meta: { keepAlive: true }
    },
    {
      path:"/portrait",
      name:"portrait",
      component:portrait
    },
    {
      path:"/sellrent/:id",
      name:"sellrent",
      component:sellrent, 
      meta: { keepAlive: true}
    },
    {
      path:"/regionlist",
      name:"regionlist",
      component:regionlist
    },
    {
      path:"/minecentre",
      name:"minecentre",
      component:minecentre
    },
    {
      path:"/worktype",
      name:"worktype",
      component:worktype
    },
    {
      path:"/handbook",
      name:"handbook",
      component:handbook
    },
    {
      path:"/hotdisitem/:id",
      name:"hotdisitem",
      component:hotdisitem
    },
    {
      path:"/rentinglist/:id",
      name:"rentinglist",
      component:rentinglist
    },
    {
      path:"/minename",
      name:"minename",
      component:minename
    },
    {
      path:"/phonenumber",
      name:"phonenumber",
      component:phonenumber
    },
    {
      path:"/minebroker/:id",
      name:"minebroker",
      component:minebroker
    },
    {
      path:"/calculator",
      name:"calculator",
      component:calculator
    },
    {
      path:"/minerentinglist",
      name:'minerentinglist',
      component:minerentinglist
    },
    {
      path:"/mineselleritem/:id",
      name:"mineselleritem",
      component:mineselleritem
    },
    {
      path:"/minepassword",
      name:"minepassword",
      component:minepassword
    },
    {
      path:"/minesystem",
      name:"minesystem",
      component:minesystem
    },
    {
      path:'/mineregionlist',
      name:"mineregionlist",
      component:mineregionlist
    },
    {
      path:"/feedback",
      name:"feedback",
      component:feedback
    },
    {
      path:"/register",
      name:"register",
      component:register
    },
    {
      path:"/forgetpassword",
      name:"forgetpassword",
      component:forgetpassword
    },
    {
      path:"/registertwo",
      name:"registertwo",
      component:registertwo
    },
    {
      path:"/brokeritem/:id",
      name:"brokeritem",
      component:brokeritem
    },
    {
      path:"/seekshop",
      name:"seekshop",
      component:seekshop,
    }
  ]
})
