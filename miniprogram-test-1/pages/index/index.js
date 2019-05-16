//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    message:"hello,world!",
    array:[
      {
        message:"hello world!",
      },
      {
        message:"hello django!",
      }
    ]
  },
  tapName:function(event){
    console.log('in tabName function')
  },
  testNetwork:function(event){
    var data = 'undefined'
    wx.request({
      url: 'http://www.imooc.com',
      method: 'GET',
      header: {},
      success: function(res){
        data = res.data
        console.log('data: ', data)
      },
      fail: function(res){
        console.log('request failed')
      }
    })

  },
  testStorage:function(){
    wx.setStorage({
      key: 'test',
      data: 'data',
    })
    wx.getStorage({
      key: 'test',
      success: function(res) {
        var data = res.data
        console.log('data from storage: ',data)
      },
    })
    var data = wx.getStorageSync('test')
    console.log('data from storage2: ', data)
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
