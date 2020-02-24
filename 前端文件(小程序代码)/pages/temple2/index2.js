var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    length: 0,
    area:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var time = util.formatTime(new Date());
    this.setData({
      time: time,
      area:options.area
    });
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
  userInput: function (e) {
    this.setData({
      length: e.detail.value.length
    })
  },

  formSubmit: function (e) {
    //获取时间
    var time = util.formatTime(new Date());
    var area=this.data.area;
    // 获取当前表单元素输入框内容
    var input1 = e.detail.value.name;
    var input2 = e.detail.value.arriveAddress;
    var input4 = e.detail.value.title;
    var input5 = e.detail.value.tel;
    //不允许input留空
    if (input1 && input2 && input4 && input5) {
      console.log('form发生了submit事件，提交数据：', e.detail.value)
      console.log(time)
      wx.request({
        url: app.data.url + '/order2',
        data: {
          'title': e.detail.value.title,
          'arriveAddress': e.detail.value.arriveAddress,
          'name': e.detail.value.name,
          'tel': e.detail.value.tel,
          'time': time,
          'categoryId': 2,
          'area':area
        },
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data)
          if (res.data == 1) {
            wx.showToast({
              title: '下单成功'
            });
            var time = 0;
            var i = setInterval(function () {
              time++
              wx.reLaunch({//关闭当前页面，跳转到应用内的某个页面
                url: '../index/index'
              })
              if (i > 3)
                clearInterval(i)
            }, 3000)
          } else {
            wx.showToast({
              title: '下单失败'
            });
            wx.reLaunch({//关闭当前页面，跳转到应用内的某个页面
              url: 'index2'
            })
          }
        }

      })
    } else {
      wx.showToast({
        title: '请输入完整信息，不能为空！',
        icon: 'none',
        duration: 2000
      })
    }
    //-----------------//

  },
  formReset: function () {
    console.log('form发生了reset事件')
  }
})