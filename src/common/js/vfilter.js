const vfilter = {
    stringfilter(val) {
        if (val == "" || val == undefined || val == null) {
            return null;
        } else {
            return val;
        }
    },
    imgfilter(val) {
        if (val == "" || val == undefined || val == null) {
            return require("../../imgs/home/beijingtupianyuse.png");
        } else {
            return val;
        }
    },
    headimgfrilter(val){
        if(val==null){
            return "this.src='" + require('../../imgs/home/headimgmoren.png') + "'";
        }
    },
    headimgfriltertwo(val){
        if(val==null){
            return require('../../imgs/home/headimgmoren.png');
        }else{
            return val;
        }
    },
    timefilter(val) {
        var dateTime = new Date(val);
        var year = dateTime.getFullYear();
        var month = dateTime.getMonth() + 1;
        var day = dateTime.getDate();
        var hour = dateTime.getHours();
        var minute = dateTime.getMinutes();
        var second = dateTime.getSeconds();
        var now = new Date();
        var now_new = new Date().getTime();  //typescript转换写法
        var milliseconds = 0;
        var timeSpanStr;
        milliseconds = now_new - val;
        if (milliseconds <= 1000 * 60 * 1) {
            timeSpanStr = '刚刚';
        }
        else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
            timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
        }
        else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
            timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
        }
        else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
            timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
        }
        else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
            timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute;
        } else {
            timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
        }
        return timeSpanStr;
    },
    brokertype(val) {
        if (val == 'OWNER') {
            return "业主"
        } else if (val == 'RECMD_MAN') {
            return "推荐人"
        } else if (val == "SELLER") {
            return "卖方"
        } else {
            return "买方"
        }
    },
    labelfilter(val) {
        if (val == "ORIGINAL_HOUSE") {
            return "原始房源"
        } else {
            return ""
        }
    },
    labelonefilter(val) {
        if (val == '0') {
            return ""
        } else if (val == "1") {
            return "已出售"
        } else if (val == '2') {
            return "已失效"
        } else {
            return "已停租"
        }
    },
    jjrheadimg(val) {//经纪人头像
        return 'http://dichan-test.oss-cn-shenzhen.aliyuncs.com/' + val.split("_")[0] + '/Empl/PIC/' + val.split("_")[1] + '/' + val.split("_")[1] + '.jpg'
    },
    messagefilterimg(val) {//聊天图片
        if (val.url) {
            return val.msg_body.media_id;
        } else {
            // var url;
            // JIM.getResource({
            //     media_id: val.msg_body.media_id
            // }).onSuccess(data => {
            //     //data.code 返回码
            //     //data.message 描述
            //     //data.url 资源临时访问路径
            //     return data.url
            // });   
            return "http://dl.im.jiguang.cn/"+val.msg_body.media_id
        }
    },
    monthvfilter(val){
        var myDate = new Date();
        var year = myDate.getFullYear();
        if(val.split("-")[0]==year){
            if(val.split("-")[1][0]=='0'){
                return val.split("-")[1][1];
            }else{
                return val.split("-")[1];
            }
        }else{
            return val;
        }
    }
}
export default vfilter;