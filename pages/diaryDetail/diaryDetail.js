// pages/diaryDetail/diaryDetail.js
import { ajaxPost, ajaxGet } from '../../utils/request.js'
import { formatDiaryDate } from '../../utils/util' 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currId: '',
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


    // const temp = { "content": "我今天写的是我今天写的是我今天写的是我今天写的是我今天写的是我今天写的是", "fontSize": 42, "color": "#FF7F50", "chooseDate": "2016-06-27 22:55", "weather": "overcast", "images": ["http://tmp/wxffcd8beefa67cdb3.o6zAJs_8AstuEJV3ZfAZmU2Utpe8.Cs6xPU3W5f6Dab1b870f621c4e62dc7c308491eca535.jpg", "http://tmp/wxffcd8beefa67cdb3.o6zAJs_8AstuEJV3ZfAZmU2Utpe8.gcbQ4zBJNjTD23b67feba51714336f9d21887eee0ff6.jpg"], "location": "广东省深圳市南山区桃园路2号22层" };


    // const chooseDate = temp.chooseDate;
    // const weekends = ['周一', '周二', '周三', '周四', '周五', '周六', '周七']
    // const week = weekends[(new Date(chooseDate)).getDay()];
    // const days = chooseDate.split(' ')[0];
    // const times = chooseDate.split(' ')[1];

    // this.setData({
    //   diaryDetails: {
    //     ...temp,
    //     week,
    //     days,
    //     times
    //   },
    // })
  },
  handletouchtart: function(event){
    console.log(event);
    this.setData({
      lastX: event.touches[0].pageX,
      lastY: event.touches[0].pageY,
    })
  },
  handletouchmove: function (event){
    const currX = event.touches[0].pageX;
    const currY = event.touches[0].pageY;
    const { lastX, lastY } = this.data;
    if((currX - lastX) < 0) {
      console.log('left');
    } else if ((currX - lastX) > 0) {
      console.log('rigth');
    }
  },

  getDiaryDetails: function () {
    const { id } = this.data;
    ajaxGet('/api/diary/getDiaryDetails', { id }).then(res => {
      this.setData({
        diaryDetails: {
          ...res.info,
          ...formatDiaryDate(res.info.date),
        }
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