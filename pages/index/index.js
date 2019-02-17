const indexContent = require("../index-template/index-template.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      post_contain: indexContent.contidion
    })
  },
  toDetail: function(even) {
    var postId = even.currentTarget.dataset.postId
    wx.navigateTo({
      url: '../page-detail/page-detail?postId=' + postId
    })
  }
})