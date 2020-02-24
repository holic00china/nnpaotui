//index.js
//获取应用实例
const md5 = require('md5.js');
const app = getApp()
/*var amapFile = require('../../libs/amap-wx.js');
var markersData = {
  latitude: '',//纬度
  longitude: '',//经度
  key: "f7443619ef092506c7c7c482496d09d6"//申请的高德地图key
};*/
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    placeholder:'输入想买的商品，如：肯德基汉堡',
    item:[{
        title:'正在招大量跑腿小哥~'
    }],
    selected: true,
    selected1: false,
    city:['校区1','校区2','校区3'],
    objectArray: [
      {
        id: 0,
        name: '校区1'
      },
      {
        id: 1,
        name: '校区2'
      },
      {
        id: 2,
        name: '校区3'
      }],
    index: 0
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    app.globalData.area = e.detail.value
    console.log('全局变量'+app.globalData.area)
  },
  onLoad: function () {
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
             // console.log(res.userInfo)
            }
          })
        }
        else{
          wx.navigateTo({
            url: 'allow', //跳转到授权页面
          })
        }
      }
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
    },
  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true,
      selected2:false
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true,
      selected2:false
    })},
  selected2: function (e) {
    this.setData({
      selected: false,
      selected1: false,
      selected2: true
    })
  },
  onShow:function(){
  //  this.loadInfo();
  },
  /*loadInfo: function () {
    var that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude//维度
        var longitude = res.longitude//经度
        console.log(res);
        that.loadCity(latitude, longitude);
      }
    })
  },

  //把当前位置的经纬度传给高德地图，调用高德API获取当前地理位置，天气情况等信息
  loadCity: function (latitude, longitude) {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: markersData.key });
    myAmapFun.getRegeo({
      location: '' + longitude + ',' + latitude + '',//location的格式为'经度,纬度'
      success: function (data) {
        //字符截取定位城市
        console.log(data[0].name.substring(0, 3));
      },
      fail: function (info) { }
    });

    myAmapFun.getWeather({
      success: function (data) {
        that.setData({
          city: data.city.data
        })
        //console.log(data);城市
        //console.log(data);
        //成功回调
      },
      fail: function (info) {
        //失败回调
        console.log(info)
      }
    })
  }*/
 /*pay:function(e){
   var appId ="wxa73fc2bacb6e0e94";
   var mchid="1562755421";
   var key ="BBC123AAADCWRFFS54896AZZ5409QSDY";
   var timestamp = Date.parse(new Date());
   var noncestr = md5.b64Md5(timestamp);
   
   console.log(noncestr);
   wx.requestPayment({
     timeStamp: timestamp / 1000,
     nonceStr: noncestr,
     package: '',
     signType: 'MD5',
     paySign: md5.b64Md5(appId+'&'+),
     'success':function(res){
       console.log('成功');
     },
     'fail':function(res){
       console.log(res)
     },
   })
 },*/
 /*unitedPayRequest: function (openid) {
    var that = this;
    //统一支付签名
    var appid = 'wxa73fc2bacb6e0e94';//appid必填
    var body = 'test';//商品名必填
    var mch_id = '1562755421';//商户号必填
    var nonce_str = util.randomString();//随机字符串，不长于32位。  
    var notify_url = '';//通知地址必填
    var total_fee = parseInt(0.01 * 100); //价格，这是一分钱
    var trade_type = "JSAPI";
    var key = 'BBC123AAADCWRFFS54896AZZ5409QSDY'; //商户key必填，在商户后台获得
    var out_trade_no = 'a11111';//自定义订单号必填

    var unifiedPayment = 'appid=' + appid + '&body=' + body + '&mch_id=' + mch_id + '&nonce_str=' + nonce_str + '&notify_url=' + notify_url + '&openid=' + openid + '&out_trade_no=' + out_trade_no + '&total_fee=' + total_fee + '&trade_type=' + trade_type + '&key=' + key;
    console.log("unifiedPayment", unifiedPayment);
    var sign = md5.md5(unifiedPayment).toUpperCase();
    console.log("签名md5", sign);

    //封装统一支付xml参数
    var formData = "<xml>";
    formData += "<appid>" + appid + "</appid>";
    formData += "<body>" + body + "</body>";
    formData += "<mch_id>" + mch_id + "</mch_id>";
    formData += "<nonce_str>" + nonce_str + "</nonce_str>";
    formData += "<notify_url>" + notify_url + "</notify_url>";
    formData += "<openid>" + openid + "</openid>";
    formData += "<out_trade_no>" + that.data.ordernum + "</out_trade_no>";
    formData += "<total_fee>" + total_fee + "</total_fee>";
    formData += "<trade_type>" + trade_type + "</trade_type>";
    formData += "<sign>" + sign + "</sign>";
    formData += "</xml>";
    console.log("formData", formData);
    //统一支付
    wx.request({
      url: 'https://api.mch.weixin.qq.com/pay/unifiedorder', //别忘了把api.mch.weixin.qq.com域名加入小程序request白名单，这个目前可以加
      method: 'POST',
      head: 'application/x-www-form-urlencoded',
      data: formData, //设置请求的 header
      success: function (res) {
        console.log("返回商户", res.data);
        var result_code = util.getXMLNodeValue('result_code', res.data.toString("utf-8"));
        var resultCode = result_code.split('[')[2].split(']')[0];
        if (resultCode == 'FAIL') {
          var err_code_des = util.getXMLNodeValue('err_code_des', res.data.toString("utf-8"));
          var errDes = err_code_des.split('[')[2].split(']')[0];
          wx.showToast({
            title: errDes,
            icon: 'none',
            duration: 3000
          })
        } else {
          //发起支付
          var prepay_id = util.getXMLNodeValue('prepay_id', res.data.toString("utf-8"));
          var tmp = prepay_id.split('[');
          var tmp1 = tmp[2].split(']');
          //签名  
          var key = 'BBC123AAADCWRFFS54896AZZ5409QSDY';//商户key必填，在商户后台获得
          var appId = 'wxa73fc2bacb6e0e94';//appid必填
          var timeStamp = util.createTimeStamp();
          var nonceStr = util.randomString();
          var stringSignTemp = "appId=" + appId + "&nonceStr=" + nonceStr + "&package=prepay_id=" + tmp1[0] + "&signType=MD5&timeStamp=" + timeStamp + "&key=" + key;
          console.log("签名字符串", stringSignTemp);
          var sign = md5.md5(stringSignTemp).toUpperCase();
          console.log("签名", sign);
          var param = { "timeStamp": timeStamp, "package": 'prepay_id=' + tmp1[0], "paySign": sign, "signType": "MD5", "nonceStr": nonceStr }
          console.log("param小程序支付接口参数", param);
          that.processPay(param);
        }

      },
    })

  }*/
  //unitedPayRequest()
  processPay: function (param) {
    wx.navigateTo({
      url: '../pay',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
   /* wx.requestPayment({
      timeStamp: param.timeStamp,
      nonceStr: param.nonceStr,
      package: param.package,
      signType: param.signType,
      paySign: param.paySign,
      success: function (res) {
        // success
        console.log("wx.requestPayment返回信息", res);
        wx.showModal({
          title: '支付成功',
          content: '您将在“微信支付”官方号中收到支付凭证',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
            } else if (res.cancel) {
            }
          }
        })
      },
      fail: function () {
        console.log("支付失败");
      },
      complete: function () {
        console.log("支付完成(成功或失败都为完成)");
      }
    })*/
  }//processPay()
})
