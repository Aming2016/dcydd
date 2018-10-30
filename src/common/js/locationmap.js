const locationmap = (that) => {
    return new Promise(resolve => {

        if (window.localStorage.sitename == undefined) {
            //浏览器定位
            var map = new BMap.Map("allmap");
            var point = new BMap.Point(116.331398, 39.897445);
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(r => {
                //获取坐标
                if (geolocation.getStatus() == BMAP_STATUS_SUCCESS) {
                    var mk = new BMap.Marker(r.point);
                    window.localStorage.mapxy = JSON.stringify({
                        lng: r.point.lng,
                        lat: r.point.lat
                    });
                    window.localStorage.mapmine = JSON.stringify({
                        lng: r.point.lng,
                        lat: r.point.lat
                    });

                    var myFun = result => {
                        var cityName = result.name; //城市名称
                        if (cityName.substr(cityName.length - 1, 1) == "市") {
                            cityName = cityName.substring(0, cityName.length - 1);
                        }
                        var site = pinyinUtil.getPinyin(cityName).replace(/\s/g, ""); //汉字转拼音
                        window.localStorage.setItem("sitename", cityName);
                        window.localStorage.setItem("site", site);
                        resolve()
                    };
                    var myCity = new BMap.LocalCity();
                    myCity.get(myFun);
                   
                } else {
                    that.$http.get(that.$url.URL.DEFAULTCITY).then(res => {
                        var cityName = res.data.data.name; //城市名字
                        if (cityName.substr(cityName.length - 1, 1) == "市") {
                            cityName = cityName.substring(0, cityName.length - 1);
                        }
                        // that.sitename = cityName;
                        window.localStorage.setItem("sitename", cityName); //缓存城市名
                        window.localStorage.mapxy = JSON.stringify({
                            //缓存城市坐标
                            lng: res.data.data.px,
                            lat: res.data.data.py
                        });
                        // that.site = res.data.data.value;
                        window.localStorage.site = res.data.data.value; //缓存城市拼音
                        //其他执行 
                        resolve()
                    });
                }
            });
        } else {
            //其他执行 
            resolve()
        }

    })
}
export {
    locationmap
}