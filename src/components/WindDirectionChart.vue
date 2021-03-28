<script>
import {Radar} from "vue-chartjs";
import axios from "axios";
import dateParser from "@/mixins/DateParser";
import scaling from "@/mixins/Scaling"

export default {
  extends: Radar,
  mixins: [dateParser, scaling],

  data() {
    return {
      scaleMax: 100,
      windDirectionData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      windDirectionLabels: ['N', 'NNE', 'NE', 'NEE', 'E', 'SEE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'SWW', 'W', 'NWW', 'NW', 'NNW']
    }
  },

  created() {
    let now = new Date()
    let begin = this.formatDate(now, "YYYYMMDD-hhmmss")
    now.setHours(now.getHours() - 10)
    let end = this.formatDate(now, "YYYYMMDD-hhmmss")
    this.loadWindDirectionData(begin, end)
  },

  mounted() {
    this.updateChart()
  },

  methods: {

    loadWindDirectionData(begin, end) {
      axios
          .get('https://8tx41fy5r8.execute-api.eu-central-1.amazonaws.com/api/weather', {
            params: {
              begin: begin,
              end: end
            }
          })
          .then(response => {
            let windDirections = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            response.data.forEach(entry => {
              let direction = entry.windDirection / 22.5
              windDirections[direction]++
            })

            let max = 0
            windDirections.forEach((entry, i) => {
              windDirections[i] = (entry / response.data.length) * 100
              if (windDirections[i] > max) {
                max = windDirections[i]
              }
            })
            this.scaleMax = this.scaleUp(max, 10, 100)
            this.windDirectionData = windDirections
            this.updateChart()
          })
    },

    updateChart() {
      this.renderChart(
          {
            labels: this.windDirectionLabels,
            datasets: [
              {
                label: "Wind Direction in %",
                backgroundColor: "rgba(179,181,198,0.2)",
                borderColor: "rgba(179,181,198,1)",
                pointBackgroundColor: "rgba(179,181,198,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(179,181,198,1)",
                data: this.windDirectionData
              }
            ]
          },
          {
            responsive: true,
            maintainAspectRatio: false,
            scale: {
              ticks: {
                min: 0,
                max: this.scaleMax
              }
            }
          }
      );
    }

  }
};
</script>
