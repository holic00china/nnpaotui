const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


function throttle(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1500
  }

  let _lastTime = null

  // 返回新的函数
  return function () {
    let _nowTime = + new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments)   //将this和参数传给原函数
      _lastTime = _nowTime
    }
  }
}

module.exports = {
  formatTime: formatTime,
  throttle: throttle
}

/*
 console.log('form发生了submit事件，提交数据：', e.detail.value)
    wx.request({
      url: 'http://6y4jei.natappfree.cc/order.php',
      data: {
        'title': e.detail.value.title,
        'arriveAddress': e.detail.value.arriveAddress,
        'code': e.detail.value.code,
        'name': e.detail.value.name,
        'tel': e.detail.value.tel,
        'categoryId': 1
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
          var time=0;
         var i= setInterval(function(){
            time++
            wx.reLaunch({//关闭当前页面，跳转到应用内的某个页面
              url: '../index/index'
            })
            if(i>3)
            clearInterval(i)
          },3000)
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
 */
