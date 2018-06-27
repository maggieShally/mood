// components/location/location.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    locationInfo: {
      type: String,
      value: '',
    },
  },
  
  data: {
    activeWeather:'',
    weatherList: ['sunny', 'cloudy', 'overcast', 'fog', 'smallRain', 'bigRain','rain', 'thunderstorm','snow', 'moon']
  },
  
  
  methods: {
    getWeather: function (e) {
      const weather = e.currentTarget.dataset.weather;
      this.setData({
        activeWeather: weather
      });
      this.triggerEvent('getWeather', weather)
    },

  }
})
