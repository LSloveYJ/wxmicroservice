Page({
  onTap: function() {
    //重定向(页面被卸载)  onUnload
    wx.redirectTo({
      url: '../index/index',
    })
    //建议最多五级，页面内跳转(仅隐藏)  onHide
    // wx.navigateTo({
    //   url: '/pages/index/index',
    // })
  }
})