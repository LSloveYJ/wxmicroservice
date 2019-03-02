// pages/page-detail/page-detail.js
const indexContent = require("../index-template/index-template.js")
Page({
  data: {
    isPlayMusic: false,
  },
  onLoad: function(even) {
    var postId = even.postId
    this.data.postId = postId
    var post = indexContent.contidion[postId]
    this.setData(
      post
    )
    // 设置收藏缓存
    var postCollections = wx.getStorageSync("posts_collected")
    if (postCollections) {
      //缓存永久储存
      //注意：页面加载时，字符串没有定义，也是false,所以这里如果没有写逻辑，也是未收藏
      var postCollection = postCollections[postId]
      this.setData({
        collenction: postCollection
      })
    } else {
      postCollections = {}
      postCollections[postId] = false
      wx.setStorageSync("posts_collected", postCollections)
    }
  },
  //点击收藏
  collenctionTap: function(event) {
    this.getPostsCollectedSyc();
    //异步方法调试困难
    //优点：业务原型是解耦的
    // this.getPostsCollectedAsy();
  },
  getPostsCollectedAsy: function() {
    //异步方法不能使用this
    var that = this;
    wx.getStorage({
      key: "posts_collected",
      success: function(res) {
        var postsCollected = res.data;
        var postCollected = postsCollected[that.data.postId];
        // 收藏变成未收藏，未收藏变成收藏
        postCollected = !postCollected;
        postsCollected[that.data.postId] = postCollected;
        that.showToast(postsCollected, postCollected);
      }
    })
  },
  getPostsCollectedSyc: function() {
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.postId];
    // 收藏变成未收藏，未收藏变成收藏
    postCollected = !postCollected;
    postsCollected[this.data.postId] = postCollected;
    this.showToast(postsCollected, postCollected);
  },
  onShareTap: function() {
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ]
    //显示操作菜单
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function(res) {
        // res.cancel 用户是不是点击了取消按钮
        // res.tapIndex 数组元素的序号，从0开始
        wx.showModal({
          title: "用户 " + itemList[res.tapIndex],
          content: "用户是否取消？ 现在无法实现分享功能，什么时候能支持呢"
        })
      }
    })
  },
  //显示模态对话框
  showModal: function(postsCollected, postCollected) {
    var that = this;
    wx.showModal({
      title: "收藏",
      content: postCollected ? "收藏该文章？" : "取消收藏该文章？",
      showCancel: "true",
      cancelText: "取消",
      cancelColor: "#333",
      confirmText: "确认",
      confirmColor: "#405f80",
      success: function(res) {
        if (res.confirm) {
          wx.setStorageSync('posts_collected', postsCollected)
          // 更新数据绑定变量，从而实现切换图片
          that.setData({
            collenction: postCollected
          })
        }
      }
    })
  },

  //显示消息提示框
  showToast: function(postsCollected, postCollected) {
    // 更新文章是否的缓存值
    wx.setStorageSync('posts_collected', postsCollected)
    // 更新数据绑定变量，从而实现切换图片
    this.setData({
      collenction: postCollected
    })
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success"
    })
  },
  //音乐播放（必须主动关闭才能停止）
  onMusicTap: function() {
    var isPlayMusic = this.data.isPlayMusic
    if (isPlayMusic) {
      wx.pauseBackgroundAudio()
      isPlayMusic = false
    } else {
      var post = indexContent.contidion[this.data.postId]
      wx.playBackgroundAudio({
        //必须是流媒体文件
        dataUrl: post.music.dataUrl,
        title: post.music.title,
        coverImgUrl: post.music.coverImgUrl
      })
      isPlayMusic = true
    }
    this.setData({
      isPlayMusic: isPlayMusic
    })
  }

})