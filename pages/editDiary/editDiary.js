// pages/editDiary/editDiary.js
var bmap = require("../../libs/bmap-wx.js");
var common = require("../../utils/util.js");
import { formatDiaryDate } from "../../utils/util";
import { getDiaryDetailsById, editSubmitDiary } from "../../services/index";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    locationInfo: "",
    chooseDate: "",
    active: "",
    activeColor: "#000",
    activeFontSize: "28",
    editDetails: {},
    minHeight: "800rpx",
    textValue: "",
    editHtml: "", // 富文本内容
  },
  initData: function () {
    this.setData({
      locationInfo: "",
      chooseDate: "",
      active: "",
      activeColor: "#000",
      activeFontSize: "28",
      editDetails: {},
      minHeight: "800rpx",
      textValue: "",
    });
  },
  bindAction: function (e) {
    this.setData({
      active: e.target.dataset.attr,
      minHeight: "400rpx",
    });
  },
  getCurrColor: function (detailsObj) {
    let self = this;
    this.setData({
      activeColor: detailsObj.detail,
      editDetails: {
        ...this.data.editDetails,
        color: detailsObj.detail,
      },
    });
  },
  getFontSize: function (detailsObj) {
    let self = this;
    this.setData({
      activeFontSize: detailsObj.detail,
      editDetails: {
        ...this.data.editDetails,
        fontSize: detailsObj.detail,
      },
    });
  },
  getPicture: function (detailsObj) {
    let self = this;
    this.setData({
      editDetails: {
        ...this.data.editDetails,
        images: detailsObj.detail,
      },
    });
  },
  getWeather: function (detailsObj) {
    let self = this;
    this.setData({
      editDetails: {
        ...this.data.editDetails,
        weather: detailsObj.detail,
      },
    });
  },

  getChooseDate: function (detailsObj) {
    let self = this;
    this.setData({
      chooseDate: detailsObj.detail,
      editDetails: {
        ...this.data.editDetails,
        chooseDate: detailsObj.detail,
      },
    });
  },
  onStatusChange(e) {
    const formats = e.detail
    this.setData({ formats })
  },
  bindFocus: function () {
    this.setData({
      active: "",
      minHeight: "800rpx",
    });
  },
  submitHandler: function () {
    const { data } = this;
    const formData = {
      location: data.locationInfo,
      date: data.chooseDate ? data.chooseDate : common.formatTime(new Date()),
      id: data.editId
    };
    this.editorCtx.getContents({
      success: res => {
        formData.content = res.html
        editSubmitDiary(formData).then(() => {
          wx.switchTab({
            url: "/pages/home/home",
          });
        });
      }
    })
    
  },

  format(e) {
    let { name, value } = e.target.dataset;
    if (!name) return;
    // console.log('format', name, value)
    this.editorCtx.format(name, value);
  },

  insertImage() {
    const that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        that.editorCtx.insertImage({
          src: res.tempFilePaths[0],
          data: {
            id: "abcd",
            role: "god",
          },
          width: "80%",
          success: function () {
            console.log("insert image success");
          },
        });
      },
    });
  },

  onEditorReady: function () {
    const { editId } = this.data;
    const that = this;
    wx.createSelectorQuery()
    .select("#editor")
    .context(function (res) {
      that.editorCtx = res.context;
    })
    .exec(async () => {
      if (editId) {
        const result = await getDiaryDetailsById({ id: editId });
        const { info } = result 
        this.editorCtx.setContents({
          html: info.content,
        });
  
        this.setData({
          editDetails: {
            ...info,
          },
          editHtml: info.content,
          activeFontSize: info.fontSize,
          chooseDate: info.date,
          activeColor: info.color,
        });
      }
    });
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      editId: options.id,
    });
    const that = this;
    let BMap = new bmap.BMapWX({
      ak: "auFDdbUXFHFArkF7R55yxjfXLmclV5Aj",
    });
    let fail = function (data) {
      console.log(data);
    };
    let success = function (data) {
      const wxMarkerData = data.wxMarkerData;
      console.log(wxMarkerData);
      that.setData({
        locationInfo: wxMarkerData[0].address,
      });
    };
    BMap.regeocoding({
      fail: fail,
      success: success,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload");
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
