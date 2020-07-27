// pages/diaryDetail/diaryDetail.js
import { formatDiaryDate } from '../../utils/util' 
import { getDiaryDetailsById, delDiaryById } from '../../services/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    diaryDetails: {},
    lastX:'',
    lastY:'',

  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      id: options.id || ''
    }, () => {
      this.getDiaryDetails();
    })
  },
  // handletouchtart: function(event){
  //   console.log(event);
  //   this.setData({
  //     lastX: event.touches[0].pageX,
  //     lastY: event.touches[0].pageY,
  //   })
  // },
  // handletouchmove: function (event){
  //   const currX = event.touches[0].pageX;
  //   const currY = event.touches[0].pageY;
  //   const { lastX, lastY } = this.data;
  //   if((currX - lastX) < 0) {
  //     console.log('left');
  //   } else if ((currX - lastX) > 0) {
  //     console.log('rigth');
  //   }
  // },

  getDiaryDetails: function () {
    const { id } = this.data;
    getDiaryDetailsById({id}).then(res => {
      this.setData({
        diaryDetails: {
          ...res.info,
          ...formatDiaryDate(res.info.date),
        }
      })
    })
  },

  handleEdit: function(){
    const { id } = this.data
    wx.navigateTo({
      url: `/pages/editDiary/editDiary?id=${id}`,
    })
  },

  handleDel: function(){
    console.log(this.data)
    delDiaryById({ id: this.data.id }).then(res => {
      wx.switchTab({
        url: '/pages/home/home'
      })
      wx.showToast({
        title:'删除成功'
      })
    })
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