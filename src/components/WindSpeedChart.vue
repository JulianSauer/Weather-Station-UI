<script>
import {Line} from "vue-chartjs";
import axios from "axios";
import dateParser from "@/mixins/DateParser";
import scaling from "@/mixins/Scaling";

export default {
  extends: Line,
  mixins: [dateParser, scaling],

  data() {
    return {
      timeLabels: [],
      windSpeedGradient: null,
      windSpeedData: [],
      gustSpeedGradient: null,
      gustSpeedData: [],
      scaleMin: 0,
      scaleMax: 30
    }
  },

  created() {
    let now = new Date()
    let begin = this.formatDate(now, "YYYYMMDD-hhmmss")
    now.setHours(now.getHours() - 10)
    let end = this.formatDate(now, "YYYYMMDD-hhmmss")
    this.loadWindSpeedData(begin, end)
  },

  mounted() {
    this.windSpeedGradient = this.$refs.canvas
        .getContext("2d")
        .createLinearGradient(0, 0, 0, 450);
    this.windSpeedGradient.addColorStop(0, "rgb(166,209,255)");

    this.gustSpeedGradient = this.$refs.canvas
        .getContext("2d")
        .createLinearGradient(0, 0, 0, 450);
    this.gustSpeedGradient.addColorStop(0, "rgb(0,102,255)");

    this.updateChart()
  },

  methods: {

    loadWindSpeedData(begin, end) {
      axios
          .get('https://8tx41fy5r8.execute-api.eu-central-1.amazonaws.com/api/weather', {
            params: {
              begin: begin,
              end: end
            }
          })
          .then(response => {
            let min = response.data[0].windSpeed
            let max = response.data[0].windSpeed
            response.data.forEach((entry, i) => {
              let date = this.convertStringToDate(entry.timestamp)
              this.timeLabels[i] = this.formatDate(date, "hh:mm")
              this.windSpeedData[i] = entry.windSpeed
              this.gustSpeedData[i] = entry.gustSpeed

              if (entry.windSpeed < min) {
                min = entry.windSpeed
              }
              if (entry.gustSpeed < min) {
                min = entry.gustSpeed
              }
              if (entry.gustSpeed > max) {
                max = entry.gustSpeed
              }
              if (entry.windSpeed > max) {
                max = entry.windSpeed
              }
            })
            this.scaleMin = this.scaleDown(min, 5, 0)
            this.scaleMax = this.scaleUp(max, 5)
            this.updateChart()
          })
    },

    updateChart() {
      this.renderChart(
          {
            labels: this.timeLabels,
            datasets: [
              {
                label: "Wind Speed",
                borderColor: "#0066ff",
                pointBackgroundColor: "white",
                borderWidth: 1,
                pointBorderColor: "white",
                backgroundColor: this.windSpeedGradient,
                data: this.windSpeedData
              },
              {
                label: "Gust Speed",
                borderColor: "#0066ff",
                pointBackgroundColor: "white",
                borderWidth: 1,
                pointBorderColor: "white",
                backgroundColor: this.gustSpeedGradient,
                data: this.gustSpeedData
              }
            ],
          },
          {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Speed in m/s'
                },
                ticks: {
                  min: this.scaleMin,
                  max: this.scaleMax
                }
              }]
            }
          }
      );
    }
  }
};
</script>
