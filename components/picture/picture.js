// components/picture/picture.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    imgList: [],

  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindPicture: function (e) {
      const that = this;
      wx.chooseImage({
        count: 9, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths

          wx.uploadFile({
            url: 'http://up.qiniu.com/', //仅为示例，非真实的接口地址
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {
              key: `giftCoverTest_${new Date().getTime()}.jpg`,
              token: "xxx",
            },
            success(res) {
              const data = res.data
              //do something
            }
          })


          console.log(tempFilePaths);
          let imgList = 
          that.setData({
              imgList: [...that.data.imgList, ...tempFilePaths]
          },()=>{
            that.triggerEvent('getPicture',that.data.imgList);
          })
        }
      })
    },
  }
})
