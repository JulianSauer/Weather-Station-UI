import axios from "axios";

export default {
    methods: {
        updateWeatherSensorData(store, begin, end) {
            if (store.begin === begin && store.end === end) {
                return
            } else {
                store.begin = begin
                store.end = end
            }
            let now = new Date()
            begin = this.formatDate(now, "YYYYMMDD-hhmmss")
            now.setHours(now.getHours() - 10)
            end = this.formatDate(now, "YYYYMMDD-hhmmss")

            axios
                .get(process.env.VUE_APP_WEATHER_API + process.env.VUE_APP_CURRENT_WEATHER, {
                    params: {
                        begin: begin,
                        end: end
                    }
                })
                .then(response => {
                    let timeLabels = []
                    for (let i in response.data) {
                        let date = this.convertStringToDate(response.data[i].timestamp)
                        timeLabels.push(this.formatDate(date, "hh:mm"))
                        // Convert direction in which the wind is blowing into the direction it's coming from
                        response.data[i].gustSpeed = parseFloat(response.data[i].gustSpeed[0])
                        response.data[i].humidity = parseFloat(response.data[i].humidity[0])
                        response.data[i].rain = parseFloat(response.data[i].rain[0])
                        response.data[i].temperature = parseFloat(response.data[i].temperature[0])
                        response.data[i].windSpeed = parseFloat(response.data[i].windSpeed[0])
                        response.data[i].windDirection = (parseFloat(response.data[i].windDirection[0]) + 180) % 360
                    }
                    store.commit('updateSensorData', {
                        sensorData: response.data,
                        timeLabels: timeLabels
                    })
                })
        },
        updateForecastData(store, provider) {
            axios
                .get(process.env.VUE_APP_WEATHER_API + process.env.VUE_APP_FORECAST, {
                    params: {
                        from: provider,
                        resolution: 'hourly'
                    }
                })
                .then(response => {
                    store.commit('updateHourlyForecast', response.data)
                })
            axios
                .get(process.env.VUE_APP_WEATHER_API + process.env.VUE_APP_FORECAST, {
                    params: {
                        from: provider,
                        resolution: 'daily'
                    }
                })
                .then(response => {
                    store.commit('updateDailyForecast', response.data)
                })
        }
    }
}
