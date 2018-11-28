// pages/savePic/index.html.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxCode: ''

  },
  record: function() {
    console.log(123)
    const recorderManager = wx.getRecorderManager()

    recorderManager.onStart(() => {
      console.log('recorder start')
    })
    recorderManager.onPause(() => {
      console.log('recorder pause')
    })
    recorderManager.onStop((res) => {
      console.log('recorder stop', res)
      const { tempFilePath } = res
    })
    recorderManager.onFrameRecorded((res) => {
      const { frameBuffer } = res
      console.log('frameBuffer.byteLength', frameBuffer.byteLength)
    })

    const options = {
      duration: 10000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'aac',
      frameSize: 50
    }

    recorderManager.start(options)
  },

  saveImgs: function() {
    const { ctx } = this.data;
    wx.canvasToTempFilePath({
      canvasId: 'weixinCode',
      success(res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function () {

          }
        })
        console.log(res.tempFilePath)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this;
    this.setData({
      ctx: wx.createCanvasContext("weixinCode")
    }, () => {
      this.getWxCoce()
    })
    
    // 

  },
  getWxCoce: function() {
    const self = this;
    wx.downloadFile({
      url: 'https://qa002appapi.blissmall.net/appapi/appclient/v2/gift/getQrCode?page=pages/openGift/index&shareCode=25953818729237873680',
      header: {
        authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJqd3QiLCJpYXQiOjE1Mzk1ODc1NTUsInN1YiI6IntcImNsaWVudElkXCI6XCJYRjAwMTJcIixcImNsaWVudE5hbWVcIjpcIuW5uOemj-W-ruWVhuWfjuWwj-eoi-W6j1wifSIsImlzcyI6IlhGMDAxMiIsImV4cCI6MTUzOTY3Mzk1NX0.eUfmNA513--n_9_3LWC-1n9N7dUQt3EwbRDY1MOmPmE',
        sysUserLoginCredentials: 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJqd3QiLCJpYXQiOjE1Mzk1ODc1NjgsInN1YiI6IjIzNzk5MTMxOTA1Njc2MjY2MzAiLCJpc3MiOiIyMzc5OTEzMTkwNTY3NjI2NjMwIiwiZXhwIjoxNTM5NjczOTY4fQ.fUqFG-eVOkzNmyMEL82uxfs3IDGPX9zRhdMG-BIIWbk'
      },
      success: function (res) {
        if (res.statusCode === 200) {
          console.log(res.tempFilePath );
          self.setData({
            wxCode: res.tempFilePath 
          }, function() {
            self.createdPIc(res.tempFilePath);
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '加载小程序码失败',
          mask: true,
          icon: 'none'
        })
      }
    })


  },
  createdPIc: function (wxCode) {
    const { ctx } = this.data;
    var gradient = ctx.createLinearGradient(0,0,0,500);
    gradient.addColorStop(0, '#F16283'); 
    gradient.addColorStop(0.5, '#FF8C53');
    gradient.addColorStop(1, '#EB9235');
    ctx.setFillStyle(gradient);
    ctx.fillRect(0, 100, 375, 500);

    ctx.setFillStyle('#fff');
    ctx.fillRect(15, 130, 345, 400);
  
    ctx.drawImage(
      "https://appletcdn.blissmall.net/imgs/poster-gift.png",
      120,120,100,125
    )

    ctx.drawImage(
      wxCode,
      120, 240, 100, 125
    )

    ctx.draw()
    
    // ctx.draw(false, () =>{
    //   wx.canvasToTempFilePath({
    //     canvasId: 'weixinCode',
    //     success(res) {
    //       wx.saveImageToPhotosAlbum({
    //         filePath: res.tempFilePath,
    //         success: function () {
              
    //         }
    //       })
    //       console.log(res.tempFilePath)
    //     }
    //   })
    // });

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