let localhostDev =   true;
//如果是本地开发，就把localhostDev 设置成false，连接就是拼成‘http://112.74.181.229:7031/custAppApi’
//生产环境，就把localhostDev 设置成true，连接就是拼成‘http://custapi.shyj.cn/custAppApi’
let _host= localhostDev ? 'http://custapi.shyj.cn/custAppApi':'http://112.74.181.229:7031/custAppApi';
let URL = {
    APPKEY:"6db6fd9d435c228595f38d85",//极光key   6db6fd9d435c228595f38d85
    // MASTERSECRET:"51021de6001e77c8832ffcc1",//极光应用secret
    JUGUANGSGT:_host+'/jiguang/signature',// 极光初始化数据接口
    SECRETKEY:"29e94f94-8664-48f2-a4ff-7a5807e13b68",// 秘钥
    MINEDATAINFO:_host+'/member/myinfo',//获取个人数据
    UPDATENICKNAME:_host+'/member/updateNickName',//修改用户昵称
    UPDATEMOBILE:_host+'/member/updateMobile',//修改手机号码
    UPDATEPASSWORD:_host+'/member/updatePassword',//重置密码
    MINEHOUSCOLLECTIONLIST:_host+'/houseCollection/collectionList',//二手房收藏列表
    MINERENCOLLECTIONLIST:_host+'/rentHCollection/collectionList',//租房收藏列表
    COLLECTIONLIST:_host+'/brokerCollection/collectionList',//经纪人收藏
    BULDCOLLECTIONLIST:_host+'/buildCollection/collectionList',//我收藏的小区
    QUERYRENTHOUSELIST:_host+'/houseEntrustApply/queryRentHouseList',//我的出租房源列表
    QUERYSELLHOUSELIST:_host+'/houseEntrustApply/querySellHouseList',//我的出售房源列表
    HOUSEENTRUSTAPPLYITEM:_host+'/houseEntrustApply',//租售详情
    UPDATAHEADIMAGE:_host+'/member/updateHeadImage',//修改头像接口
    MAPHOUSESECONDHOUSE:_host+'/map-house/coordinate/secondHouse',//二手房地图坐标找房
    MAPHOUSERENTHOUSE:_host+'/map-house/coordinate/rentHouse',//租房二手房找房
    DEFAULTCITY:_host+'/dictionary/defaultCity',//获取默认城市和城市编码
    DEFAULTCITYITEM:_host+'/dictionary',//获取默认城市和城市编码查询单个
    APPOINTFILMENBERREMARK:_host+"/appoint/fillMemberRemark",//提交看房备注
    BROKEREVALFILL:_host+'/brokerEval/fillBrokerEvaluate',//经纪人评价
    MYCOLLECTIONLIST:_host+'/my/collectionList',//我的经纪人列表
    MYCOMMENT:_host+"/my/comment",//检查我的评论
    MYMYPROBLEM:_host+'/my/my_problem',//我的咨询
    TRADEPROGRESSQUERY:_host+'/tradeProgress/query',//成交进度列表
    FEEDBACKADVICE:_host+'/feedback/advice',//我的意见反馈
    //微信登陆接口
    APPID:"wxa58e668bb81fdad9",
    WXCODE:_host+'/member/authWeixin2',//微信登录
    JIGUANGBROKERREGUSER:_host+'/jiguang/broker/reguser',//极光注册经纪人
    JIGUANGBINDING:_host+'/jiguang/binding',//绑定极光账号
    
    
    REGISTER:_host+'/member/register',//注册账号
    FETCHSMSCODE:_host+'/member/fetchSmsCode',//获取验证码
    SMSCODELOGIN:_host+'/member/smsCodelogin',//用户验证码登录
    MEMBERLOGIN:_host+"/member/login",//账号密码登录
    LOGINBYWECHAT:'/member/loginByWechat',//微信登录
    RESETPASSWORD:_host+'/member/resetPassword',//忘记密码
    BANNER:_host + '/information/pubs',//资讯
    INDEX_BANNER:"/INDEX_BANNER",//首页banner
    CONSULT_INDEX_BANNER:"/CONSULT_INDEX_BANNER",//咨询banner
    HOUSE_RENT_BANNER:'/HOUSE_RENT_BANNER',//租房banner
    HOUSE_USED_BANNER:'/HOUSE_USED_BANNER',//二手房banner
    PURCHASE_GUIDE:'/PURCHASE_GUIDE',//购房指南banner
    CITYS: _host + '/dictionary/citys',//城市列表
    BUILDLIST: _host + '/build/buildList',//查询小区列表
    APPOINTCANCEL:_host+"/appoint/cancel",//取消预约看房
    CURRENTDATETIME:_host+'/dictionary/currentDateTime',//获取当前时间搓
    MAPRENTAREA:_host+'/map-house/rentArea',//城区套数列表
    MAPSECONDAREA:_host+'/map-house/secondArea ',//二手房城市均价列表
    MINELOGOUT:_host+'/member/logout',//退出登录
    HOTBUILDING:_host+'/build/hotBuilding',//首页热门小区列表
    MAPHOUSEALL:_host+'/map-house/all',//地图找房的所有资源
    HOUSESEE:_host+'/house/houseSee',//获取二手房带看记录list
    RENTHOUSESEE:_host+'/rentHouse/houseSee',//获取租房带看记录list
    HOUSECOLLECTIONADD:_host+'/houseCollection/add',//二手房点击收藏
    HOUSECOLLECTIONCANCEL:_host+'/houseCollection/cancel',//二手房点击取消收藏
    RENTHCOLLECTIONADD:_host+'/rentHCollection/add',//租房收藏
    BUILDCOLLECTIONADD:_host+'/buildCollection/add',//小区收藏
    BULDCOLLECTIONCANCEL:_host+'/buildCollection/cancel',//小区取消收藏
    RENTHCOLLECTIONCANCEL:_host+'/rentHCollection/cancel',//租房取消收藏
    CONTRASTJOID:_host+'/contrast/joid',//加入对比列表
    CONTRASTUSEDLIST:_host+"/contrast/usedList",//二手房对比列表
    CONTRASTCANCEL:_host+'/contrast/cancel',//取消加入对比列表
    BUILDSAMEUSED:_host+'/build/same-used',//同小区二手房
    UILDSAMEREND:_host+'/build/same-rent',//同小区租房
    HOUSEDETAILCOUNT:_host+'/house/detailCount',//房源清单列表数据统计
    DICTIONARY:_host+'/dictionary',//查询获取数据字典-单个
    BROKEREVALUATES:_host+'/brokerEval/brokerEvaluates',//  查询经纪人评价信息列表
    BROKERCOLLECTIONADD:_host+'/brokerCollection/add',//经纪人点击收藏
    BROKERCOLLECTIONCANCEL:_host+'/brokerCollection/cancel',//经纪人点击取消收藏
    HOUSEENTRUSTAPPRENTHOUSE:_host+'/houseEntrustApply/rentHouse',//出租房源申请
    HOUSEENTRUSTAPPLYSELLHOUSE:_host+'/houseEntrustApply/sellHouse',//出售房源申请
    SEARCHRECORDLIST:_host+'/searchRecord/list',//搜索历史记录
    INFOQUERYERMENTUIJIAN:_host+'/info/query',//首页热门推荐
    NEW_BUILD_INDEX_BANNER:"/NEW_BUILD_INDEX_BANNER",//新盘banner
    PLATEQUERYBANKUAI:_host+'/plate/query',//首页四个板块相关接口
    NEWBUILDINGINDEX:_host+'/newbuilding/index',//新房top按钮
    NEWBUILDINGQUERY:_host+'/newbuilding/query',//新房列表
    APPOINTADD:_host+'/appoint/add',//加入待看列表
    APPOINTDETAILIST:_host+'/appoint/detailLsit',//预约看房列表
    APPOINTDELETE:_host+'/appoint/delete',//删除预约看房
    APPOINTHOUSE:_host+'/appoint/house',//提交预约看房
    APPOINTREADYLIST:_host+'/appoint/readyList',//待看日程列表
    APPONTREADYDETIL:_host+'/appoint/readyDetail',//带看日程详情
    APPOINTCOMPLETE:_host+"/appoint/complete",//约看已看记录
    APPOINTREADYHOUSELIST:_host+"/appoint/readyHouseList",//约看列表
    APPOINTMEMBERREMARK:_host+'/appoint/memberRemark',//获取用户看房备注详情
    BUILDBUILDINGDZ:_host+'/build/building/dz',//获取栋座号
    BUILDBUILDINGDYFH:_host+'/build/building/dyfh',//获取单元或房号列表
    TRUSTAPPLYQUERYRENTHOUS:_host+'/houseEntrustApply/queryRentApplyList',//我的出租申请列表
    TRUSTAPPLYQUERYSELLHOUSE:_host+'/houseEntrustApply/querySellApplyList',//我的卖房申请
    TRUSTAPPLYQUERYRENHOUSELIST:_host+'/houseEntrustApply/queryRentHouseList',//委托出租房源列表
    TRUSTAPPLYQUERYSELLHOUSELIST:_host+'/houseEntrustApply/querySellHouseList',//委托二手房源列表
    HOUSEENTRUSTAPPLYRENT:_host+'/houseEntrustApply/rent',//出租申请详情
    HOUSEENTRUSTAPPLYSELL:_host+'/houseEntrustApply/sell',//获取我的卖房申请详情
    CONSULTANTLIST:_host+'/consultant/list',//顾问列表
    CONSULTANTREMD:_host+'/consultant/remd',//顾问推荐列表
    CONSULTANTHOT:_host+'/consultant/hot',//热门咨询列表\
    CONSULTANTSUBPROBLEM:_host+'/consultant/sub_problem',//向他咨询
    CONSULTANTMYPROBLEM:_host+'/consultant/my_problem',//我的提问
    CONSULTANTMYCONCERN:_host+'/consultant/my_concern',//我关注的问题

    MAPSECONDAREA:_host+'/map-house/secondArea',//地图找房二手房-城区均价列表
    INFOQUEYLIST:_host+'/info/query',//获取资讯内容信息列表
    LOANGANCYAPPLYREST:_host+'/loanAgencyApplyRest/loanAgency',//我的贷款申请
    QUERYLOANAPPLYLIST:_host+'/loanAgencyApplyRest/queryLoanApplyList',//我的代办申请列表
    QUERYLOANHOUSELIST:_host+'/loanAgencyApplyRest/queryLoanHouseList',//我的代办房源列表
    LOANAGENCYAPPLYRESTLOAN:_host+'/loanAgencyApplyRest/loan',//我的代办详情

    COMPILEINT:_host+'/appoint/compile',//已看房源列表
    REPORTLIST:_host+"/report/list",//待看房源列表
    READYLIST:_host+'/appoint/readyList',//待看房源列表
    DICTIONARYS:_host+'/dictionary/dictionarys',//筛选列表
    DICTIONARYTWO:_host+'/dictionary',//，筛选列表的价格获取
    AREADISTRICTS:_host+'/area/areaDistricts',//获取市级以下所有城区和片区
    BUILDINFO: _host + '/build/buildInfo',//查询小区房源详情
    HOSEUSED: _host + '/statistics/houseUsed',//首页统计
    HOUSEQUERY: _host + '/house/queryLike',//首页猜你喜欢二手房
    RENTHOUSE:_host + '/rentHouse/queryLike',// 首页猜你喜欢租房
    INFORMATION: _host + '/information/pubs',//首页的购房指南
    BROKERS:_host + '/broker/brokers',//经纪人信息列表
    BROKERTWO:_host+'/broker',//经纪人详情
    SHOPS:_host+'/shop/shops',//找门店
    HOUSELIST:_host+'/broker/houseList',//经纪人的二手房列表
    RENTHOUSELISTTWO:_host+'/broker/rentHouseList',//经纪人的租房列表
    RECMDLIST: _host + '/house/recmdList',//二手房推荐列表
    RRNTHOUSE:_host + '/rentHouse/recmdList',//租房的推荐列表
    HOUSEQUERYONE:_host+"/house/query",//二手房列表
    RENTHOUSEQUERYS:_host+'/rentHouse/query',//租房列表
    AGOTDETAILINFO:_host+'/house/getDetailInFo',//二手房详情
    BGOTDETAILINFO:_host+'/rentHouse/getDetailInFo',//租房详情
    BUILDINFOTWO:_host+'/build/buildInfo',//二手房详情中的关联小区
    RIMHOUSINGONE:_host+'/house/rimHousing',//二手房周边房源
    RIMHOUSINGTWO:_host+'/rentHouse/rimHousing',//租房周边房源
    RENTHOUSELIST:_host+'/build/rentHouseList',//小区的租房列表
    SECONDHOUSELIST:_host+'/build/secondHouseList',//小区的二手房列表
    GAODE:"http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=39.934,116.329&output=json&pois=1&ak=78b5875728ae0f81f08379e3b8790f1e" //高德地图
};
export default {URL}