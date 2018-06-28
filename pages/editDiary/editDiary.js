// pages/editDiary/editDiary.js
var bmap = require('../../libs/bmap-wx.js');
var common = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    locationInfo: '',
    chooseDate: '',
    active: '',
    activeColor: '#000',
    activeFontSize: '28',
    editDetails: {}
  },
  bindAction: function (e) {
    this.setData({
      active: e.target.dataset.attr,
    })
  },
  getCurrColor: function (detailsObj) {
   
    let self = this;
    this.setData({
      activeColor: detailsObj.detail,
      editDetails: {
        ...this.data.editDetails,
        color: detailsObj.detail,
      }
    })
  },
  getFontSize: function(detailsObj) {
    let self = this;
    this.setData({
      activeFontSize: detailsObj.detail,
      editDetails: {
        ...this.data.editDetails,
        fontSize: detailsObj.detail,
      }
    })
  },
  getPicture: function (detailsObj) {
    let self = this;
    this.setData({
      editDetails: {
        ...this.data.editDetails,
        images: detailsObj.detail,
      }
    })
  },
  getWeather: function (detailsObj) {
    let self = this;
    this.setData({
      editDetails: {
        ...this.data.editDetails,
        weather: detailsObj.detail,
      }
    })
  },

  getChooseDate: function (detailsObj) {
    let self = this;
    this.setData({
      chooseDate: detailsObj.detail,
      editDetails: {
        ...this.data.editDetails,
        chooseDate: detailsObj.detail,
      }
    })
  },

  bindFocus: function() {
    this.setData({
      active: '',
    })
  },
  getEditContent: function(event){
    let self = this;
    this.setData({
      editDetails: {
        ...this.data.editDetails,
        content: event.detail.value
      }
    })
  },
  submitHandler: function(){
    const { data } = this;
    const formData= {
      ...data.editDetails,
      location: data.locationInfo,
      chooseDate: data.chooseDate ? data.chooseDate : common.formatTime(new Date())
    }
    wx.switchTab({
      url: '/pages/home/home',
    })
    console.log(JSON.stringify(formData));
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    let BMap = new bmap.BMapWX({
      ak: 'auFDdbUXFHFArkF7R55yxjfXLmclV5Aj'
    });
    let fail = function (data) {
      console.log(data)
    };
    let success = function (data) {
      const wxMarkerData = data.wxMarkerData;
      console.log(wxMarkerData);
      that.setData({
        locationInfo: wxMarkerData[0].address
      });
    }
    BMap.regeocoding({
      fail: fail,
      success: success
    });
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