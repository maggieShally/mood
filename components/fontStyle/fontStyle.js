// components/fontStyle/fontStyle.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    activeColor: {
      type: String,
      value: '#000',
    },
    activeFontSize: {
      type: String,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    colorList: ['#FFA500', '#FF7F50', '#FF4500', '#9ACD32', '#8B8B83', '#FFE1FF', '#8B0000', '#708090', '#7A378B', '#FFBBFF', '#8B864E', '#00688B', '#FFDAB9', '#FF8247', '#00CD66', '#79CDCD', '#8B4500', '#FF3030'],
    currActive: '#FFA500',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getCurrColor: function(event) {
      const currcolor = event.target.dataset.currcolor
      this.setData({
        currActive: currcolor
      })
      this.triggerEvent('getCurrColor', currcolor)
    },
    getFontSize: function(event){
      console.log(event);
      const fontSize = event.detail.value;
      this.triggerEvent('getFontSize', fontSize)
    }
  }
})
