
export default {
	btnone({commit}){//调用弹出框遮罩层
		commit("BTNONE")
	},
	message({commit},payload){
		commit("MESSAGE",payload)
	},
	messagelist({commit},payload){
		commit("MESSAGELIST",payload)
	},
	messagebtn({commit},payload){
		commit("MESSAGEBTN",payload)
	},
	messagebtnone({commit},payload){
		commit("MESSAGEBTNONE",payload)
	},
	messagebtntwo({commit},payload){
		commit("MESSAGEBTNTWO",payload)
	},
	getConversation({commit},payload){
		commit("GETCONVERSATION",payload)
	},
	messagepush({commit},payload){//更新会话列表
		commit("MESSAGEPUSH",payload)
	},
	movemessageitem({commit},payload){
		commit("MOVEMESSAGEITEM",payload)
	},
	onepushmessagelist({commit},payload){
		commit("ONEPUSHMESSGELIST",payload)
	}
}

