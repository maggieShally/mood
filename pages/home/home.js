// pages/home/home.js

import { formatDiaryDate } from '../../utils/util' 
import  { getDetailsList, getToken } from '../../services/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    diaryList: [],
    totalPage: 0,
    pageNo: 0,
    pageSize: 10,
  },
  onShow: function() {
    this.getDiaryList({
      pageNo: 1
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success(res) {
        console.log(res)
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success () {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.startRecord()
            }
          })
        }
      }
    })

    wx.getUserInfo({
      success: function(res) {
      console.log(res)
      },
      fail: function(err) {
        console.log(err)
      }
    })

    // wx.login({
    //   success: res => {
    //     console.log(res)
    //     // const params = {
    //     //   appID:'wxffcd8beefa67cdb3',
    //     //   secret:'f9751a22f9281020dadca28d7d2d09c0',
    //     //   js_code: res.code
    //     // }
    //     if(res.code) {
    //       getToken({code: res.code}).then(res => {
    //         console.log(res)
    //       })
    //     }
    //   }
    // })
  },

  getDiaryList: function (extra) {
    const { pageSize, diaryList } = this.data;
    getDetailsList({ pageSize, ...extra }).then(res => {
      this.setData({
        diaryList: extra.pageNo === 1 ? res.itemList : diaryList.concat(res.itemList).map(item => {
          return {
            ...item,
            ...formatDiaryDate(item.date),
          }
        }),
        totalPage: Math.ceil(res.totalRecord / pageSize),
        pageNo: res.pageNo
      })

    })
  },
  
  onPullDownRefresh: function () {
    const { totalPage, pageNo } = this.data;

    if(totalPage <= pageNo) {
      wx.stopPullDownRefresh();
      return false;
    }

    this.getDiaryList({pageNo: pageNo+1});
    setTimeout(function(){
      wx.stopPullDownRefresh();
    }, 1500)
  },

  redirectDetail: function(obj){
    const currId = obj.detail;
    wx.navigateTo({
      url: '/pages/diaryDetail/diaryDetail?id='+currId
    })
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