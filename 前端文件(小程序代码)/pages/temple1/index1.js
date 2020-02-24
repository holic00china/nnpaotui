// pages/temple1/index1.js
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      length:0,
      money:0,
      area:0,
    openid1: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var time = util.formatTime(new Date());
    this.setData({
      time: time,
      area: options.area
    });
    console.log('传参area是：'+options.area);
    var that = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.request({
            url: app.data.url+'/login', //仅为示例，并非真实的接口地址
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
  userInput: function (e) {
    this.setData({
      length: e.detail.value.length
    })
  },
  
  formSubmit: util.throttle(function (e) {

    var a = this.data.money;
    var area = this.data.area;
    //获取时间
    var time = util.formatTime(new Date());
    // 获取当前表单元素输入框内容
    var input1 = e.detail.value.name;
    var input2 = e.detail.value.arriveAddress;
    var input3 = e.detail.value.code;
    var input4 = e.detail.value.title;
    var input5 = e.detail.value.tel;
    console.log(a);
    wx.request({
      url: app.data.url+'/pay/payfee.php',//改成你自己的链接
      data: {
        id: this.data.openid1,//获取用户 openid
        fee: a //商品价格
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
            //不允许input留空
            if (input1 && input2 && input3 && input4 && input5) {
              console.log('form发生了submit事件，提交数据：', e.detail.value)
              console.log(time)
              var name = "";
              wx.getUserInfo({
                success: function (res) {
                  name = res.userInfo.nickName
                  console.log(name);
                  wx.request({
                    url: app.data.url + '/order',
                    data: {
                      'title': e.detail.value.title,
                      'arriveAddress': e.detail.value.arriveAddress,
                      'code': e.detail.value.code,
                      'name': e.detail.value.name,
                      'tel': e.detail.value.tel,
                      'time': time,
                      'categoryId': 1,
                      'nickname': name,
                      'money': a,
                      'area': area
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
                          if (i > 2)
                            clearInterval(i)
                        }, 2000)
                      } else {
                        wx.showToast({
                          title: '下单失败'
                        });
                        wx.reLaunch({//关闭当前页面，跳转到应用内的某个页面
                          url: 'index1'
                        })
                      }
                    }

                  })
                }
              })

            }
            else {
              wx.showToast({
                title: '请输入完整信息，不能为空！',
                icon: 'none',
                duration: 2000
              })
            }
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
   
      //-----------------//
   
  },3000),
  formReset: function () {
    console.log('form发生了reset事件')
  },
  weimoney:function(e){
    var w = e.detail.value;
    console.log('输入的值：'+e.detail.value);
    if(w<=1.5)
    {
      this.setData({
        money:1.5
      })
    }
    else if(w>=1.5&&w<=5)
    {
      this.setData({
        money: 3
      })
    }
    else
    {
      this.setData({
        money: 5
      })
    }
  },
  order:function(){
    var a = this.data.money;
    var area = this.data.area;
    //获取时间
    var time = util.formatTime(new Date());
    // 获取当前表单元素输入框内容
    var input1 = e.detail.value.name;
    var input2 = e.detail.value.arriveAddress;
    var input3 = e.detail.value.code;
    var input4 = e.detail.value.title;
    var input5 = e.detail.value.tel;
    //不允许input留空
    if (input1 && input2 && input3 && input4 && input5) {
      console.log('form发生了submit事件，提交数据：', e.detail.value)
      console.log(time)
      var name = "";
      wx.getUserInfo({
        success: function (res) {
          name = res.userInfo.nickName
          console.log(name);
          wx.request({
            url: app.data.url + '/order.php',
            data: {
              'title': e.detail.value.title,
              'arriveAddress': e.detail.value.arriveAddress,
              'code': e.detail.value.code,
              'name': e.detail.value.name,
              'tel': e.detail.value.tel,
              'time': time,
              'categoryId': 1,
              'nickname': name,
              'money': a,
              'area': area
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
                  if (i > 2)
                    clearInterval(i)
                }, 2000)
              } else {
                wx.showToast({
                  title: '下单失败'
                });
                wx.reLaunch({//关闭当前页面，跳转到应用内的某个页面
                  url: 'index1'
                })
              }
            }

          })
        }
      })

    }
    else {
      wx.showToast({
        title: '请输入完整信息，不能为空！',
        icon: 'none',
        duration: 2000
      })
    }
  }
})