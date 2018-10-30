function wxfx(objct) {
    var objct = {
        data: {},
        type: "SHARE"
    };
    this.$addevent(objct);
    //分享授权接口
    let fxcode = "";
    let myid = "";
    if (this.$route.query.fxcode) {
        fxcode = this.$route.query.fxcode
        this.$http.post(this.$url.URL.FXSHAREADD + "?code=" + this.$route.query.fxcode)
            .then(res => {
            })
    }
    if (this.$route.query.myid) {
        myid = this.$route.query.myid
    }
    this.$http.post(this.$url.URL.FXSHAREFETCDE + "?id=" + myid + "&url=" + window.location.href + "&code=" + fxcode)
        .then(res => {
            fxcode = res.data.data
        })
    try {
        myid = JSON.parse(window.localStorage.dc_mydata).id
    } catch (error) {
    }
    this.$http
        .get(this.$url.URL.SIGNATUREJAINQUAN + "?url=" + encodeURIComponent(objct.url))
        .then(res => {
            wx.config({
                debug: false, // true 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: res.data.data.appId,
                timestamp: res.data.data.timestamp,
                nonceStr: res.data.data.nonceStr,
                signature: res.data.data.signature,
                jsApiList: [
                    "onMenuShareTimeline",
                    "onMenuShareAppMessage",
                    "onMenuShareQQ",
                    "onMenuShareWeibo",
                    "onMenuShareQZone",
                    "checkJsApi"
                ]
            });
            wx.checkJsApi({
                jsApiList: [
                    "onMenuShareTimeline",
                    "onMenuShareAppMessage",
                    "onMenuShareQQ",
                    "onMenuShareWeibo",
                    "onMenuShareQZone"
                ],
                success: function (res) {
                    console.log(JSON.stringify(res));
                }
            });
            wx.error(function (res) {
                console.log(res)
            });
            //config信息验证后会执行ready方法
            wx.ready(() => {
                console.log(objct)
                console.log(fxcode)
                console.log(myid)
                var url;
                try {
                    var urllist = objct.url.split("?")
                    if (urllist[1]) {
                        url = objct.url + "&scity=" + window.localStorage.site + "&fxcode=" + fxcode + "&myid=" + myid
                    } else {
                        url = objct.url + "?scity=" + window.localStorage.site + "&fxcode=" + fxcode + "&myid=" + myid
                    }
                } catch (error) {
                }
                console.log(url)

                var sdata = {
                    title: objct.title,
                    desc: objct.content,
                    link: url,
                    imgUrl: objct.imgurl,
                    //分享成功的回调
                    success: function () {
                        console.log("分享成功");
                    },
                    //取消分享的回调
                    cancel: function () {
                        console.log("分享失败");
                    },
                    fail: function (res) {
                        console.log(JSON.stringify(res));
                    }
                };
                wx.onMenuShareTimeline(sdata);
                wx.onMenuShareAppMessage(sdata);
                wx.onMenuShareQQ(sdata);
                wx.onMenuShareWeibo(sdata);
                wx.onMenuShareQZone(sdata);
            });
        });
};
export {
    wxfx
}