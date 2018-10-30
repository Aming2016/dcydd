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
	friendlist:[],//好友列表
	chatobject:"",//聊天对象
	// chatmessage:{},//聊天消息
}
export default state;