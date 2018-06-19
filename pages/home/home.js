// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diaryList: [{
      content: "日记日记日记日记日记日记日记日记日记日记日记日记",
      week: "周二",
      date: '2018.06',
      day: '19',
      time: '22:44'
    }, {
      content: "111111111111111111111",
      week: "周二",
      date: '2018.06',
      day: '19',
      time: '22:44'
      }, {
        content: "2222222222222222222",
        week: "周二",
        date: '2018.06',
        day: '19',
        time: '22:44'
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    
    this.setData({
      diaryList: [...this.data.diaryList, ...this.data.diaryList]
    },() => {
      console.log(this.data.diaryList);
    })
    setTimeout(function(){
      wx.stopPullDownRefresh()
      console.log('end')
    }, 2000)
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