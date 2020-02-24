// pages/temple3/bbs.js
var app=getApp();
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money:5
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    //console.log("bbs" + app.globalData.area);
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
  formSubmit: util.throttle(function (e) {
    var input = e.detail.value.content; // 获取当前表单元素输入框内容
    if (input=="") {
      wx.showToast({
        title: '内容不能为空！',
        icon:'none'
      })
    } else {

      wx.request({
        url: app.data.url + '/order3',
        data: {
          'content': e.detail.value.content,
          'money': 5,
          'area': app.globalData.area
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function (res) {
          console.log(res.data)
          if (res.data == 1) {
            wx.showToast({
              title: '留言成功'
            });
            var time = 0;
            var i = setInterval(function () {
              time++
              wx.reLaunch({//关闭当前页面，跳转到应用内的某个页面
                url: 'index3?area='+app.globalData.area
              })
              if (i > 2)
                clearInterval(i)
            }, 2000)
          }
          else {
            wx.showToast({
              title: '失败',
              icon: "none"
            })
          }
        }
      })
    }
  
  },3000)
})