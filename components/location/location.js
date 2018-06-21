// components/location/location.js
var bmap = require('../../libs/bmap-wx.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  
  data: {
    locationInfo: ''
  },
  
  attached: function() {
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
  
  methods: {

  }
})
