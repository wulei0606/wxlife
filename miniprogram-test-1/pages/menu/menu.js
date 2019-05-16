// pages/menu/menu.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    grids: [{
      "name":"应用1"
    },{
      "name": "应用1"
    }],

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.updateMenuData()
  },
  fillIconData:function(menuData){
    var pathPrefix = '/resources/icons/applications/'
    for (var index=0; index < menuData.length; index ++){
      var item = menuData[index]
      switch(item.app.application){
        case 'weather':
         item.icon = pathPrefix + 'weather.png'
         break
        case 'stock':
          item.icon = pathPrefix + 'stock.png'
          break
        case 'backup-image':
          item.icon = pathPrefix + 'picture.png'
          break
        case 'joke':
          item.icon = pathPrefix + 'joke.png'
          break
        case 'constellation':
          item.icon = pathPrefix + 'constellation.png'
          break
      }
    }
    return menuData
  },

  /**
   * 请求后台，更新menu数据
   */
  updateMenuData:function(){
    var that = this
    wx.request({
      url: app.globalData.serverUrl + app.globalData.apiVersion + '/services/menu',
      success: function(res){
        var menuData = res.data.data
        menuData = that.fillIconData(menuData)
        that.setData({
          grids:menuData
        })
      }
    })
  },

  onNavigatorTap: function (e) {
    var index = e.currentTarget.dataset.index
    var appItem = this.data.grids[index]
    if (appItem.app.application == 'weather'){
      wx.navigateTo({
        url: '../weather/weather',
      })
    } else if (appItem.app.application == 'backup-image'){
      wx.navigateTo({
        url: '../backup/backup',
      })
    } else if (appItem.app.application == 'stock') {
      wx.navigateTo({
        url: '../stock/stock',
      })
    } else if (appItem.app.application == 'constellation') {
      wx.navigateTo({
        url: '../service/service?type=constellation',
      })
    } else if (appItem.app.application == 'joke') {
      wx.navigateTo({
        url: '../service/service?type=joke',
      })
    }
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