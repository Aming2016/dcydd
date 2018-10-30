
export default {
	btnone({commit}){//调用弹出框遮罩层
		commit("BTNONE")
	},
	pushfriendlist({commit},payload){//push到会话列表
		commit("PUSHFRIENDLIST",payload)
	},
	pushfriendlisttwo({commit},payload){//push到会话列表
		commit("PUSHFRIENDLISTTWO",payload)
	},
	pushfriendmessage({commit},payload){//聊天消息push到对应的人身上去；
		commit("PUSHFRIENDMESSAGE",payload)
	}
}

