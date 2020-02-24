// pages/order/order.js
var app = getApp();
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:{},
    nickName:"",
    hide:"none",
    show:"block",
    area: 0
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.getUserInfo({
      success: function (res) {
        that.data.nickName = res.userInfo.nickName,

          wx.request({
          url: app.data.url + '/checkRun',
          data:{
            name: res.userInfo.nickName
          },
          success:function(res){
            if(res.data==1)
            {
              var dis = that.data.show;
              dis = 'none';
              var hid = that.data.hide;
              hid="block"
              that.setData({
                show: dis,
                hide:hid
              })
            }
          }

          })
          that.setData({
            nickName: that.data.nickName
          })}})
    var url = app.data.url;
    that.setData({
      currentData:0
    })
      console.log('数据加载中')
      wx.request({
        url: url + '/wait',
        header: {
          'content-type': 'application/json' // 默认值
        },
        data:{
          state:0,
          area: app.globalData.area
        },
        success: function (res) {
         //console.log(res.data)
          that.setData({
            order: res.data
          })
        },
        fail: function () {
          console.log("fail")
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
    const that = this;
    wx.getUserInfo({
      success: function (res) {
        that.data.nickName = res.userInfo.nickName,

          wx.request({
            url: app.data.url + '/checkRun?name=' + res.userInfo.nickName,
            success: function (res) {
              if (res.data == 1) {
                var dis = that.data.show;
                dis = 'none';
                var hid = that.data.hide;
                hid = "block"
                that.setData({
                  show: dis,
                  hide: hid
                })
              }
            }

          })
        that.setData({
          nickName: that.data.nickName
        })
      }
    })
    var url = app.data.url;
    that.setData({
      currentData: 0
    })
    console.log('数据加载中')
    wx.request({
    url: url + '/wait',
        header: {
          'content-type': 'application/json' // 默认值
        },
        data:{
          state:0,
          area: app.globalData.area
        },
      success: function (res) {
        //console.log(res.data)
        that.setData({
          order: res.data
        })
      },
      fail: function () {
        console.log("fail")
      }
    }),
    this.setData({
      area: app.globalData.area
    })
    console.log("全局"+this.data.area)
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
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    var url = app.data.url;
    console.log(url);
    const that = this;
    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current
      })
    }
    console.log('数据加载中')
    wx.request({
      url: url + '/wait?state='+e.target.dataset.current,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          order: res.data
        })
      },
      fail: function () {
        console.log("fail")
      }
    })
    console.log(e.target.dataset.current)
  },
  onchange: util.throttle(function (e) {
    var that = this;
    var index = 0;
    var db = "no";
    var nickName = that.data.nickName;
    var txt=e.target.dataset.text;
    var mon = e.target.dataset.money;
    console.log(mon);
    console.log(e.target.id);
   wx.getUserInfo({
     success: function (res) {
       that.data.nickName = res.userInfo.nickName,
         that.setData({
           nickName: that.data.nickName,
         }),
         that.setData({
           db: "ok"// 设置变量db，只有成功获取用户信息后才写入数据库
         })
         if (db = "ok") {
           var name, url;
           wx.request({
             url: app.data.url + '/jiedan',//写自己的服务器
             header: {
               "Content-Type": "application/x-www-form-urlencoded"
             },
             method: "GET",
             data: {
               name: res.userInfo.nickName,
               title:txt,
               money:mon
             },
             success: function (res) {
               console.log(res.data)
               if (res.data == 0) {
                 wx.showToast({
                   title: '您还不是跑腿小哥哦~',
                   duration:3000,
                   icon:"none"
                 });
                 return;
               }
               else
               {
                 wx.showToast({
                   title: '接单成功'
                 });
                 getCurrentPages()[getCurrentPages().length - 1].onLoad();
               }
             },
             fail: function (res) {
               console.log(res.data)
               if(res==0)
               {
                 wx.showToast({
                   title: '请绑定手机号或身份证'
                 }); 
               }
               wx.showToast({
                 title: '接单失败'
               });
             }
     })}}})},3000)

})