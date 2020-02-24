// pages/mine/alipay.js
var app=getApp();
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  formSubmit: util.throttle(function(e){
   var ali= e.detail.value.ali;
   var money=e.detail.value.money;
   var that=this;
   var db='no';
    console.log('form发生了submit事件，提交数据：', e.detail.value)
    wx.getUserInfo({
      success: function (res) {
        that.data.nickName = res.userInfo.nickName,
          that.data.avatarUrl = res.userInfo.avatarUrl,
          that.setData({
            db: "ok"// 设置变量db，只有成功获取用户信息后才写入数据库
          })
        if (db = "ok") {
   wx.request({
     url: app.data.url+'/alipay',
     data:
     {
       'number': e.detail.value.ali,
       'name': res.userInfo.nickName
     },
     method:'get',
     success:function(res)
     {
        wx.showToast({
          title: res.data,
          duration:3000,
          icon:'none'
       })
       var time = 0;
   var i = setInterval(function () {
         time++
         wx.reLaunch({//关闭当前页面，跳转到应用内的某个页面
           url: 'mine'
         })
         if (i > 3)
           clearInterval(i)
       }, 3000)
     }
   })
   }
  }})},3000)
})