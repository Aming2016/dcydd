const state = {
	searchname:"",
	citynumber:true,//控制哪个页面进入的选择城市列表
	cityname:"",//存储的城市
	brokername:"",//存储的经纪人
	daikanlilv:"",//带看记录
	awaitlist:"",//存储预约看房的列表
	brokermessage:"",//评价经纪人信息传递
	counseloritem:"",//顾问item
	houseremark:"",//看房备注
	housing:"",//传递的小区
	dzitem:"",//栋座
	dyitem:"",//单元
	mpitem:"",//门牌号
	business:"",//代办业务类型 
	activeindex:window.sessionStorage.btnindex?window.sessionStorage.btnindex:"1",//控制下面四个按钮
	message:"",//聊天对象
	messagelist:"",//存储聊天信息
	friendlist:[],//会话列表,
	messagebol:0,//消息总数量
}
export default state;