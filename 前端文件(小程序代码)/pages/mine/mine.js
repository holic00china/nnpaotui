//logs.js

var app = getApp();
Page({
  data: {
    userInfo: {
      avatarUrl: "",//用户头像
      nickName: "",//用户昵称
    }
  },
  onLoad: function () {
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })
 
    var that = this;
    var nickName = that.data.nickName;
    var avatarUrl = that.data.avatarUrl;
    //console.log(nickName);
    var db = "no";
    wx.getUserInfo({
      success: function (res) {
        that.data.nickName = res.userInfo.nickName,
          that.data.avatarUrl = res.userInfo.avatarUrl,
          that.setData({
            nickName: that.data.nickName,
            avatarUrl: that.data.avatarUrl,
          }),
          that.setData({
            db: "ok"// 设置变量db，只有成功获取用户信息后才写入数据库
          })
        if (db = "ok") {
          var name, url;
          wx.request({
            url: app.data.url+'/userCheck',//写自己的服务器
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
              name: res.userInfo.nickName,
              money: 0,
            },
            success: function (res) {
              console.log(res.data)
            },
            fail: function (res) {
              console.log(res.data)
            }
          })
        }
      },
    /**
     * 获取用户信息
     */
   /* wx.getUserInfo({
      success: function (res) {
        console.log(res);
        var avatarUrl = 'userInfo.avatarUrl';
        var nickName = 'userInfo.nickName';
        that.setData({
          [avatarUrl]: res.userInfo.avatarUrl,
          [nickName]: res.userInfo.nickName,
        })
      }
    })
    wx.request({
      url: 'http://zm8vvt.natappfree.cc/user.php',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
          'nickname':nickName,
          'money':0
      },
      method:'POST',
      success: function (res) {
        console.log(res.data)
        that.setData({
          order: res.data
        })
      },
      fail: function () {
        console.log("fail")
      }
    })*/
  })
  },
  toOrder: function () {
    wx.switchTab({
      url: '../order/order?currentItemId=0',
    })
  },

  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
  }
})
