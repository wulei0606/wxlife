// pages/weather/weather.js

const app = getApp()

const popularCities = [{
  "province": "广东省",
  "city": "深圳",
  "area": "南山区"
},
{
  "province": "广东省",
  "city": "广州",
  "area": "天河区"
},
{
  "province": "北京市",
  "city": "北京",
  "area": "朝阳区"
},
{
  "province": "上海市",
  "city": "上海",
  "area": "徐汇区"
}
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAuthorized: false,
    weatherData: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.updateWeatherData()
  },

  updateWeatherData: function(){
    wx.showLoading({
      title: '加载中...',
    })
    var that = this
    wx.request({
      url: app.globalData.serverUrl + app.globalData.apiVersion + '/services/weather',
      method: 'POST',
      data:{
        cities: popularCities
      },
      success:function(res){
        var tmpData = res.data.data
        that.setData({
          weatherData:tmpData
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
    this.updateWeatherData()
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