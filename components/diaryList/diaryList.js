// components/diaryList/diaryList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemlist: {
      type: 'Array'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    redirectDetail: function(event) {
      const currId = event.currentTarget.id;
      this.triggerEvent('redirectDetail', currId);
    }
  }
})
