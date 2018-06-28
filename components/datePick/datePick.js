// components/datePick/datePick.js

var common = require('../../utils/util.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    chooseDate: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentDate: '',
  },
  attached: function(){

    this.setData({
      currentDate: common.formatTime(new Date())
    })
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindDateChange: function(e){
      const chooseDate = e.detail.value;
      this.triggerEvent('getChooseDate', chooseDate)
    }
  }
})
