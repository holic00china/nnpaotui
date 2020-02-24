// pages/mine/join.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      avatarUrl: "",//用户头像
      nickName: "",//用户昵称
    }
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
  formSubmit: function (e) {
    // 获取当前表单元素输入框内容
    var input1 = e.detail.value.id;
    //var input2 = e.detail.value.arriveAddress;
    //var input3 = e.detail.value.code;
    //var input4 = e.detail.value.title;
    //var input5 = e.detail.value.tel;
    //不允许input留空
    if (input1) {
      console.log('form发生了submit事件，提交数据：', e.detail.value)
       var that = this;
    var nickName = that.data.nickName;
    var avatarUrl = that.data.avatarUrl;
    var db = "no";
    wx.getUserInfo({
      success: function (res) {
        that.data.nickName = res.userInfo.nickName,
          that.data.avatarUrl = res.userInfo.avatarUrl,
          that.setData({
            db: "ok"// 设置变量db，只有成功获取用户信息后才写入数据库
          })
        if (db = "ok") {
          wx.request({
            url: app.data.url + '/idCheck',
            data: {
              'id': e.detail.value.id,
              'name': e.detail.value.name,
              'tel': e.detail.value.tel,
              'nickName': res.userInfo.nickName
            },
            method: 'post',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res.data)
              if(res.data == 1) {
                wx.showToast({
                  title: '身份证验证成功'
                });
                var time = 0;
                var i = setInterval(function () {
                  time++
                  wx.reLaunch({//关闭当前页面，跳转到应用内的某个页面
                    url: 'mine'
                  })
                  if (i > 3)
                    clearInterval(i)
                }, 3000)
                wx.reLaunch({
                  url: 'mine',
                })
              } else {
                wx.showToast({
                  title: '身份证验证失败'
                });
              }
            }
          })
        }}})
     }},
})