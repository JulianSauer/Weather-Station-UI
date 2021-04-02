<script>
import {Line} from "vue-chartjs";
import dateParser from "@/mixins/DateParser";
import scaling from "@/mixins/Scaling";
import store from "@/store/index"

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
    this.unsubscribe = this.$store.subscribe(() => {
      this.loadDataFromStore()
      this.updateChart()
    });
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

    this.loadDataFromStore()
    this.updateChart()
  },

  beforeDestroy() {
    this.unsubscribe()
  },

  methods: {

    loadDataFromStore() {
      this.windSpeedData = []
      this.timeLabels = []
      let min = store.state.sortedSensorData[0].sensorData.windSpeed
      let max = store.state.sortedSensorData[0].sensorData.windSpeed
      store.state.sortedSensorData.forEach(entry => {
        this.timeLabels.unshift(entry.timeLabel)
        this.windSpeedData.unshift(entry.sensorData.windSpeed)
        this.gustSpeedData.unshift(entry.sensorData.gustSpeed)

        if (entry.windSpeed < min) {
          min = entry.windSpeed
        }
        if (entry.windSpeed > max) {
          max = entry.windSpeed
        }
      })

      this.scaleMin = this.scaleDown(min, 5)
      this.scaleMax = this.scaleUp(max, 5)
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
