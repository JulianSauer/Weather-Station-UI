<script>
import {Line} from "vue-chartjs";
import axios from "axios";
import dateParser from "../mixins/DateParser";

export default {
  extends: Line,
  mixins: [dateParser],

  data() {
    return {
      gradient: null,
      temperatureData: [],
      temperatureLabels: []
    }
  },

  created() {
    let now = new Date()
    let begin = this.formatDate(now, "YYYYMMDD-hhmmss")
    now.setHours(now.getHours() - 10)
    let end = this.formatDate(now, "YYYYMMDD-hhmmss")
    this.loadTemperatureData(begin, end)
  },

  mounted() {
    this.gradient = this.$refs.canvas
        .getContext("2d")
        .createLinearGradient(0, 0, 0, 450);

    this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
    this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
    this.gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

    this.updateChart()
  },

  methods: {

    loadTemperatureData(begin, end) {
      axios
          .get('https://8tx41fy5r8.execute-api.eu-central-1.amazonaws.com/api/weather', {
            params: {
              begin: begin,
              end: end
            }
          })
          .then(response => {
            response.data.forEach((entry, i) => {
              let date = this.convertStringToDate(entry.timestamp)
              this.temperatureLabels[i] = this.formatDate(date, "hh:mm")
              this.temperatureData[i] = entry.temperature
            })
            this.updateChart()
          })
    },

    updateChart() {
      this.renderChart(
          {
            labels: this.temperatureLabels,
            datasets: [
              {
                label: "Temperature",
                borderColor: "#FC2525",
                pointBackgroundColor: "white",
                borderWidth: 1,
                pointBorderColor: "white",
                backgroundColor: this.gradient,
                data: this.temperatureData
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
                  labelString: '°C'
                },
                ticks: {
                  min: 0,
                  max: 30
                }
              }]
            }
          }
      );
    }
  }
};
</script>
