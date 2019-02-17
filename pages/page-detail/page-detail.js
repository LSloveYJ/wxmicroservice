// pages/page-detail/page-detail.js
const indexContent = require("../index-template/index-template.js")
Page({

  onLoad: function(even) {
    var postId = even.postId
    var post = indexContent.contidion[postId]
    this.setData(
      post
    )
  }
})