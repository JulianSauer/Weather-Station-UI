import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        sortedSensorData: [{
            timeLabel: '',
            sensorData: {
                source: '',
                timestamp: '19700101-000000',
                gustSpeed: 0,
                humidity: 0,
                rain: 0,
                temperature: 0,
                windDirection: 0,
                windSpeed: 0,
                dataFor: []
            }
        }],
        to: '',
        from: '',
        hourlyForecast: {
            source: 'TomorrowIO-Hourly',
            timestamp: 'latest',
            temperature: [],
            rain: [],
            dataFor: []
        },
        dailyForecast: {
            source: 'TomorrowIO-Daily',
            timestamp: 'latest',
            temperature: [],
            rain: [],
            dataFor: []
        }
    },
    mutations: {
        updateSensorData(state, payload) {
            state.sortedSensorData = new Array(payload.sensorData.length)
            for (let i = 0; i < payload.sensorData.length; i++) {
                state.sortedSensorData[i] = {
                    timeLabel: payload.timeLabels[i],
                    sensorData: payload.sensorData[i]
                }
            }

            state.sortedSensorData.sort((a, b) => {
                let timestampA = Number(a.sensorData.timestamp.replace('-', ''))
                let timestampB = Number(b.sensorData.timestamp.replace('-', ''))
                if (timestampA > timestampB) {
                    return -1
                }
                return 1
            })

            state.from = payload.from
            state.to = payload.to
        },

        updateHourlyForecast(state, payload) {
            state.hourlyForecast = payload
        },

        updateDailyForecast(state, payload) {
            state.dailyForecast = payload
        }
    },
    actions: {},
    modules: {},
})
