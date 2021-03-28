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
      gradient: null,
      scaleMin: 0,
      scaleMax: 100,
      humidityData: [],
      timeLabels: []
    }
  },

  created() {
    let now = new Date()
    let begin = this.formatDate(now, "YYYYMMDD-hhmmss")
    now.setHours(now.getHours() - 10)
    let end = this.formatDate(now, "YYYYMMDD-hhmmss")
    this.loadHumidityData(begin, end)
  },

  mounted() {
    this.gradient = this.$refs.canvas
        .getContext("2d")
        .createLinearGradient(0, 0, 0, 450);

    this.gradient.addColorStop(0, "rgb(110,186,255)");

    this.updateChart()
  },

  methods: {

    loadHumidityData(begin, end) {
      axios
          .get('https://8tx41fy5r8.execute-api.eu-central-1.amazonaws.com/api/weather', {
            params: {
              begin: begin,
              end: end
            }
          })
          .then(response => {
            let min = response.data[0].humidity
            let max = response.data[0].humidity
            response.data.forEach((entry, i) => {
              let date = this.convertStringToDate(entry.timestamp)
              this.timeLabels[i] = this.formatDate(date, "hh:mm")
              this.humidityData[i] = entry.humidity
            })
            this.scaleMin = this.scaleDown(min, 10, 0)
            this.scaleMax = this.scaleUp(max, 10, 100)
            this.updateChart()
          })
    },

    updateChart() {
      this.renderChart(
          {
            labels: this.timeLabels,
            datasets: [
              {
                label: "Humidity",
                borderColor: "#027ff1",
                pointBackgroundColor: "white",
                borderWidth: 1,
                pointBorderColor: "white",
                backgroundColor: this.gradient,
                data: this.humidityData
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
                  labelString: 'Humidity in %'
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
