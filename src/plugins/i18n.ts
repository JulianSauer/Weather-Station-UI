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
      hourlyForecast: 'Hourly Forecast',
      dailyForecast: 'Daily Forecast',
      currentWeather: 'Current Weather',
      time: 'Time',
      day: 'Day',
      humidity: 'Humidity',
      rain: 'Rain',
      temperature: 'Temperature',
      windDirection: 'Wind Direction',
      windSpeed: 'Wind Speed',
      gustSpeed: 'Gust Speed',
      speed: 'Speed',
      precipitationProbability: 'Precipitation Probability',
      from: 'from',
      to: 'to',
      invalidDateError: 'Invalid date interval'
    },
    de: {
      weatherStation: 'Wetterstation',
      forecast: 'Vorhersage',
      hourlyForecast: 'Stündliche Vorhersage',
      dailyForecast: 'Tägliche Vorhersage',
      currentWeather: 'Aktuelles Wetter',
      time: 'Uhrzeit',
      day: 'Tag',
      humidity: 'Luftfeuchtigkeit',
      rain: 'Regen',
      temperature: 'Temperatur',
      windDirection: 'Windrichtung',
      windSpeed: 'Windgeschwindigkeit',
      gustSpeed: 'Böengeschwindigkeit',
      speed: 'Geschwindigkeit',
      precipitationProbability: 'Regenwahrscheinlichkeit',
      from: 'von',
      to: 'bis',
      invalidDateError: 'Ungültiges Datumsinterval'
    }
  }
})
