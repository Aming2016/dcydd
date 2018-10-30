
export default {
	BTNONE(state) {
		state.shade = true
	},
	//push到聊天列表
	PUSHFRIENDLIST(state, payload) {
		var objct = {
			quantity: 0,//消息数量			
			emplName: payload.emplName,//昵称
			photo: payload.photo,//头像
			chatUsername: payload.chatUsername,//环信标识
			content: [],//聊天消息
		}
		state.chatobject = objct;
		//存储到vuex里面
		var listfind = state.friendlist.find((value, index) => {
			return value.chatUsername == payload.chatUsername
		});
		if (!listfind) {
			//判断存储的会话列表是否存在这个人
			state.friendlist.unshift(objct)
		}
		//存储到缓存里
		var lockey = JSON.parse(window.localStorage.dc_mydata).easemobUsername;
		if (localStorage.getItem(lockey)) {
			var messagelist = JSON.parse(localStorage.getItem(lockey));
			var listtwofind = messagelist.find((value, index) => {
				return value.chatUsername == payload.chatUsername
			});
			if (!listtwofind) {
				//判断存储的会话列表是否存在这个人
				messagelist.unshift(objct);
				localStorage.setItem(lockey, JSON.stringify(messagelist));
			}
		}
	},
	//聊天消息push到对应的人身上去；
	PUSHFRIENDMESSAGE(state, payload) {
		let chatUsername;
		if (payload.chatUsername) {
			chatUsername = payload.chatUsername;
		} else {
			chatUsername = payload.from;
		};
		payload.time = new Date().getTime();
		//push到vuex里面
		for (let i = 0; i < state.friendlist.length; i++) {
			if (state.friendlist[i].chatUsername == chatUsername) {
				//收到消息量加1
				if (!payload.chatUsername) {
					state.friendlist[i].quantity++
				}
				state.friendlist[i].content.push(payload);
				var str = state.friendlist.splice(i, 1);
				state.friendlist.unshift(str[0]);
			}
		}

		//push到缓存里面
		var lockey = JSON.parse(window.localStorage.dc_mydata).easemobUsername;
		var messagelist = JSON.parse(localStorage.getItem(lockey));
		for (let i = 0; i < messagelist.length; i++) {
			if (messagelist[i].chatUsername == chatUsername) {
				//收到消息量加1
				if (!payload.chatUsername) {
					messagelist[i].quantity++
				}
				messagelist[i].content.push(payload);
				var str = messagelist.splice(i, 1);
				messagelist.unshift(str[0]);
				localStorage.setItem(lockey, JSON.stringify(messagelist));
			}
		}
	},
	//点击聊天列表进入聊天界面
	PUSHFRIENDLISTTWO(state, payload) {
		state.chatobject = payload;
	}

}