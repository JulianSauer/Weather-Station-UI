import axios from "axios";

export default {
    methods: {
        updateStore(store, begin, end) {
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
                .get('https://8tx41fy5r8.execute-api.eu-central-1.amazonaws.com/api/weather', {
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
                    }
                    store.commit('updateSensorData', {
                        sensorData: response.data,
                        timeLabels: timeLabels
                    })
                })
        }
    }
}
