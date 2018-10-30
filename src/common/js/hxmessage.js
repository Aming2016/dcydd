const hxmessage = (that) => {
        that.$imoption.user=JSON.parse(window.localStorage.dc_mydata).easemobUsername;
        that.$imoption.pwd=JSON.parse(window.localStorage.dc_mydata).easemobPassword;
        that.$imConn.open(that.$imoption);
        that.$imConn.listen({
                onOpened(message) {
                  //连接成功回调
                  // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
                  // 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true
                  // 则无需调用conn.setPresence();
                  console.log(message)
                },
                onClosed(message) {}, //连接关闭回调
                onTextMessage(message) {
                        console.log(message)  
                        that.$store.dispatch("pushfriendmessage",message);
                        console.log("收到文本消息")
                }, //收到文本消息
                onEmojiMessage(message) {}, //收到表情消息
                onPictureMessage(message) {
                        console.log(message)
                        that.$store.dispatch("pushfriendmessage",message);
                        console.log("收到图片消息")
                }, //收到图片消息
                onCmdMessage(message) {}, //收到命令消息
                onAudioMessage(message) {}, //收到音频消息
                onLocationMessage(message) {}, //收到位置消息
                onFileMessage(message) {}, //收到文件消息
                onVideoMessage(message) {
                  var node = document.getElementById("privateVideo");
                  var option = {
                    url: message.url,
                    headers: {
                      Accept: "audio/mp4"
                    },
                    onFileDownloadComplete: function(response) {
                      var objectURL = WebIM.utils.parseDownloadResponse.call(
                        conn,
                        response
                      );
                      node.src = objectURL;
                    },
                    onFileDownloadError: function() {
                    }
                  };
                  WebIM.utils.download.call(conn, option);
                }, //收到视频消息
                onPresence(message) {}, //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
                onRoster(message) {}, //处理好友申请
                onInviteMessage(message) {}, //处理群组邀请
                onOnline() {
                  console.log(message)
                }, //本机网络连接成功
                onOffline() {
                  if(!that.$imConn.isOpened()){
                    that.$imoption.user=JSON.parse(window.localStorage.dc_mydata).easemobUsername;
                    that.$imoption.pwd=JSON.parse(window.localStorage.dc_mydata).easemobPassword;
                    that.$imConn.open(that.$imoption);
                  }
                }, //本机网络掉线
                onError(message) {
                  console.log(that.$imConn.isOpened())               
                }, //失败回调
                onBlacklistUpdate(list) {
                  //黑名单变动
                  // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
                },
                onReceivedMessage(message) {
                  console.log(message)
                }, //收到消息送达服务器回执
                onDeliveredMessage(message) {}, //收到消息送达客户端回执
                onReadMessage(message) {}, //收到消息已读回执
                onCreateGroup(message) {}, //创建群组成功回执（需调用createGroupNew）
                onMutedMessage(message) {} //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
              });
              let lockey = JSON.parse(window.localStorage.dc_mydata).easemobUsername;
              if(localStorage.getItem(lockey)){
                that.$store.state.friendlist=JSON.parse(localStorage.getItem(lockey))
              }else{
                var list=[];
                that.$store.state.friendlist=list;
                localStorage.setItem(lockey, JSON.stringify(list));
              };
    }
    export {
        hxmessage
    }