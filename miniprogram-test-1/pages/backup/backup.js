// backup/backup.js

const app = getApp()
const imageUrl = app.globalData.serverUrl + app.globalData.apiVersion + '/services/image'
Page({



  /**
   * 页面的初始数据
   */
  data: {
    needUploadFiles:[],
    //下载图片的临时路径
    downloadBackupedFiles:[]
  },

  //选择图片上传
  chooseImage: function(e){
    var that = this
    wx.chooseImage({
      count: 0,
      sizeType: ['original', 'compressed'],//可以指定原图还是压缩，默认二者都有
      sourceType: ['album', 'camera'],//可以指定来源是相机还是相册，默认二者都有
      success: function (res) {
        that.setData({
          // files: that.data.files.concat(res.tempFilePaths)
          needUploadFiles:that.data.needUploadFiles.concat(res.tempFilePaths)
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //图片预览
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.needUploadFiles // 需要预览的图片http链接列表
    })
  },
  //上传图片文件
  uploadFiles: function(){
    var that = this
    that.setData({
      newBackupedFiles:[]
    })
    for (var i = 0; i < this.data.needUploadFiles.length; i++){
      var filePath = this.data.needUploadFiles[i]
      wx.uploadFile({
        url: app.globalData.serverUrl + app.globalData.apiVersion + '/services/image',
        filePath: filePath,
        name: 'test',
        success: function(res){
          var res = JSON.parse(res.data)
          var md5 = res.data[0].md5
          var name = res.data[0].name
          var newImageItem = {
            "md5": md5,
            "name": name
          }
          that.downloadFile(newImageItem)
        }
      })
    }
    wx.showToast({
      title: '上传成功',
    })
    this.setData({
      needUploadFiles:[]
    })
  },
  //下载图片
  downloadFile:function(imgItem){
    var that = this
    var downloadUrl = imageUrl + '?md5=' + imgItem.md5
    wx.downloadFile({
      url: downloadUrl,
      header: {},
      success: function (res) { 
        var temPath = res.tempFilePath
        var newDownloadBackupedFiles = that.data.downloadBackupedFiles
        newDownloadBackupedFiles.push(temPath)
        that.setData({
          downloadBackupedFiles:newDownloadBackupedFiles
        })
        
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 删除图片
  deleteBackup: function(imgItem){
    console.log('delete a backup file.' + imgItem.md5)
    wx.request({
      url: imageUrl + '?md5=' + imgItem.md5,
        method: 'DELETE',
        success: function(res){
          console.log(res.data)
          wx.showToast({
            title: '删除成功',
          })
        }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.downloadAllFromRemote()
  },

  //下载所有的已备份图片
  downloadAllFromRemote: function(){
    var that = this
    wx.request({
      url: app.globalData.serverUrl + app.globalData.apiVersion + '/services/image/list',
      method: 'GET',
      success: function(res){
        var imageLsit = res.data.data
        for (var i=0;i<imageLsit.length;i++){
          var imageItem = imageLsit[i]
          that.downloadFile(imageItem)
        }
      }
    })
  },

  //长按删除图片
  longTapConfirm: function(e){
    var that = this
    var confirmList = ["删除备份"]
    wx.showActionSheet({
      itemList: confirmList,
      success: function(res){
        if(res.cancle){
          return
        }
        var imageIndex = e.currentTarget.dataset.index
        var imageItem = that.data.downloadBackupedFiles[imageIndex]
        var newList = that.data.downloadBackupedFiles
        newList.splice(imageIndex,1)
        that.setData({
          downloadBackupedFiles:newList
        })
        that.deleteBackup(imageItem)
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

// Page({
//   data: {
//     files: []
//   },
//   chooseImage: function (e) {
//     var that = this;
//     wx.chooseImage({
//       sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
//       sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
//       success: function (res) {
//         // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
//         that.setData({
//           files: that.data.files.concat(res.tempFilePaths)
//         });
//       }
//     })
//   },
//   previewImage: function (e) {
//     wx.previewImage({
//       current: e.currentTarget.id, // 当前显示图片的http链接
//       urls: this.data.files // 需要预览的图片http链接列表
//     })
//   }
// });