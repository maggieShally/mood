// pages/home/home.js

import { ajaxPost, ajaxGet } from '../../utils/request.js'

import { formatDiaryDate } from '../../utils/util' 

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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDiaryList();
  },

  getDiaryList: function () {
    const { pageNo, pageSize, diaryList } = this.data;
    ajaxPost('/api/diary/getDiary', { pageNo: pageNo + 1, pageSize }).then(res => {
      this.setData({
        diaryList: diaryList.concat(res.itemList).map(item => {
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

    this.getDiaryList();
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