// pages/service/service.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isConstellationView: false,
    isJokeView: false,
    constellationData: null,
    jokeData: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var isConstellationViewTmp = false
    var isJokeViewTmp = false
    if (options.type == 'constellation'){
      isConstellationViewTmp = true
      this.updataConstellationData()
    } else if (options.type == 'joke'){
      isJokeViewTmp = true
      this.updataJokeData()    
    }
    this.setData({
      isConstellationView: isConstellationViewTmp,
      isJokeView: isJokeViewTmp
    })
    
  },

  //加载星座运势数据
  updataConstellationData:function(){
    var that=this
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.serverUrl + app.globalData.apiVersion + '/services/constellation',
      success: function (res) {
        that.setData({
          constellationData: res.data.data
        })
        wx.hideLoading()
      }
    })
  },

  //加载笑话数据
  updataJokeData: function(){
    var that = this
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.serverUrl + app.globalData.apiVersion + '/services/joke',
      success: function (res) {
        that.setData({
          jokeData: res.data.data
        })
        wx.hideLoading()
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

  }
})