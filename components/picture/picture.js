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
          console.log(tempFilePaths);
          let imgList = 
          that.setData({
              imgList: [...that.data.imgList, ...tempFilePaths]
          },()=>{
            // console.log(that.data.imgList);
          })
        }
      })
    },
  }
})
