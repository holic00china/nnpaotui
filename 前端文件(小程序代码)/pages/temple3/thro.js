const util = require('../../utils/util.js')

Page({
  data: {
    text: 'tomfriwel'
  },
  onLoad: function (options) {

  },
  tap: util.throttle(function (e) {
    console.log(this)
    console.log(e)
    console.log((new Date()).getSeconds())
  }, 2000)
})