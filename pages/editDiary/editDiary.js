// pages/editDiary/editDiary.js
var bmap = require('../../libs/bmap-wx.js');
var common = require('../../utils/util.js');
import { ajaxPost, ajaxGet } from '../../utils/request.js'

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
    editDetails: {},
    minHeight: '800rpx',
    textValue: '',
  },
  initData: function() {
    this.setData({
      locationInfo: '',
      chooseDate: '',
      active: '',
      activeColor: '#000',
      activeFontSize: '28',
      editDetails: {},
      minHeight: '800rpx',
      textValue:'',
    })
  },
  bindAction: function (e) {
    this.setData({
      active: e.target.dataset.attr,
      minHeight: '400rpx'
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
  bindBlur: function(){
    this.setData({
     
    })
  },
  bindFocus: function() {
    this.setData({
      active: '',
      minHeight: '800rpx'
    })
  },
  getEditContent: function(event){
    let self = this;
    this.setData({
      textValue: event.detail.value,
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
      date: data.chooseDate ? data.chooseDate : common.formatTime(new Date())
    }

    ajaxPost('/api/diary/submitDiary', formData)

    console.log(formData);

    // this.initData();
    // wx.switchTab({
    //   url: '/pages/home/home',
    // })



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
    console.log('onHide')

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload')
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