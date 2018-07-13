
export default {
	BTNONE(state) {
		state.shade = true
	},
	MESSAGE(state, payload) {
		state.message = payload
	},
	MESSAGELIST(state, payload) {
		state.messagelist = payload
	},
	MESSAGEBTN(state, payload) {
		for (let i = 0; i < state.messagelist.length; i++) {
			if (
				state.messagelist[i].from_username ==
				payload.messages[0].from_username
			) {
				var message = {}
				if (payload.messages[0].content.msg_type == "image") {
					var url = "";
					JIM.getResource({
						media_id: payload.messages[0].content.msg_body.media_id
					}).onSuccess(data => {
						url = data.url;
						message.ctime_ms = payload.messages[0].ctime_ms;
						message.content = {
							from_id: payload.messages[0].from_username,
							url: true,
							msg_body: {
								media_id: url
							},
							msg_type: "image"
						};
						state.messagelist[i].msgs.push(message)
					});
					console.log(url)

				} else {
					console.log(payload)
					message.ctime_ms = payload.messages[0].ctime_ms;
					message.content = {
						from_id: payload.messages[0].from_username,
						msg_body: {
							text: payload.messages[0].content.msg_body.text
						},
						msg_type: "text"
					};
					state.messagelist[i].msgs.push(message)

				};

			}
		}
	},
	MESSAGEBTNONE(state, payload) {
		state.messagelist.push(payload);
	},
	MESSAGEBTNTWO(state, payload) {
		for (let i = 0; i < state.messagelist.length; i++) {
			if (
				state.messagelist[i].from_username ==
				payload.name
			) {
				state.messagelist[i].msgs.push(payload)
			}
		}
	},
	GETCONVERSATION(state, payload) {
		payload.reverse();
		var set = 0;
		for (let i = 0; i < payload.length; i++) {
			set = set + payload[i].unread_msg_count
		}
		state.messagebol = set;
		state.friendlist = payload
	},
	MESSAGEPUSH(state, payload) {//更新会话列表
		console.log(state.friendlist)
		console.log(payload)
		// if (state.friendlist.length == '0') {
		// 	var set = {
		// 		username: payload.from_id,
		// 		unread_msg_count: 1,
		// 		nickName: payload.from_name,
		// 		name: payload.from_id,
		// 	}
		// 	state.friendlist.unshift(set)
		// } else {
			let arr = state.friendlist.filter(item => {
				return item.username == payload.from_id; //假设id为唯一标识
			});
			if (arr.length == 0) {
				var set = {
					username: payload.from_id,
					unread_msg_count: 1,
					nickName: payload.from_name,
					name: payload.from_id,
				}
				state.friendlist.unshift(set)
			} else {
				for (let i = 0; i < state.friendlist.length; i++) {
					if (payload.from_id == state.friendlist[i].username) {
						state.friendlist[i].unread_msg_count++
					}
				}
			}
		// }


	},
	ONEPUSHMESSGELIST(state,payload){//第一次发消息
		let arr = state.friendlist.filter(item => {
			return item.username == payload.username; //假设id为唯一标识
		});
		if (arr.length == 0) {
			state.friendlist.unshift(payload)
		}
	},
	MOVEMESSAGEITEM(state, payload) {//清空相应人的已读信息
		for (let i = 0; i < state.friendlist.length; i++) {
			if (payload == state.friendlist[i].username) {
				state.friendlist[i].unread_msg_count = 0
			}
		}
	}
}