import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
export default new VueI18n({
  locale: 'en',
  fallbackLocale: 'de',
  messages: {
    en: {
      weatherStation: 'Weather Station',
      forecast: 'Forecast',
      currentWeather: 'Current Weather',
      humidity: 'Humidity',
      rain: 'Rain',
      temperature: 'Temperature',
      windDirection: 'Wind Direction',
      windSpeed: 'Wind Speed',
      gustSpeed: 'Gust Speed',
      speed: 'Speed',
    },
    de: {
      weatherStation: 'Wetterstation',
      forecast: 'Vorhersage',
      currentWeather: 'Aktuelles Wetter',
      humidity: 'Luftfeuchtigkeit',
      rain: 'Regen',
      temperature: 'Temperatur',
      windDirection: 'Windrichtung',
      windSpeed: 'Windgeschwindigkeit',
      gustSpeed: 'Böengeschwindigkeit',
      speed: 'Geschwindigkeit',
    }
  }
})
