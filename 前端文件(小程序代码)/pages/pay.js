// pages/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid1:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.request({
            url: 'http://7ameu5.natappfree.cc/login.php', //仅为示例，并非真实的接口地址
            method: "GET",
            data: {
              "code": res.code
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log(res.data.openid);
              that.setData({
                openid1: res.data.openid
              })
              /*  if (res.data.openid) {
                  wx.setStorage({
                    key: "tokenId",
                    data: res.data.openid,
                  })
                }*/
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  pay: function () {
   wx.request({
     url: 'http://7ameu5.natappfree.cc/pay/payfee.php',//改成你自己的链接
      data: {
        id: this.data.openid1,//获取用户 openid
        fee: 100 //商品价格
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data);
        console.log('调起支付');
        wx.requestPayment({
          'timeStamp': res.data.timeStamp,
          'nonceStr': res.data.nonceStr,
          'package': res.data.package,
          'signType': 'MD5',
          'paySign': res.data.paySign,
          'success': function (res) {
            console.log('success');
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 3000
            });
          },
          'fail': function (res) {
            wx.showToast({
              title: '用户取消了支付！',
              icon: 'fail'
            })
          },
          'complete': function (res) {
            console.log('complete');
          }
        });
      },
      fail: function (res) {
        console.log(res.data)
      }
    });
  }
})