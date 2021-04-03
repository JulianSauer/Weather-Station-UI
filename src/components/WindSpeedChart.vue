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
    this.windSpeedGradient.addColorStop(0, "rgb(38,166,154)");

    this.gustSpeedGradient = this.$refs.canvas
        .getContext("2d")
        .createLinearGradient(0, 0, 0, 450);
    this.gustSpeedGradient.addColorStop(0, "rgb(38,198,218)");

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

        if (entry.sensorData.windSpeed < min) {
          min = entry.sensorData.windSpeed
        }
        if (entry.sensorData.windSpeed > max) {
          max = entry.sensorData.windSpeed
        }
        if (entry.sensorData.gustSpeed < min) {
          min = entry.sensorData.gustSpeed
        }
        if (entry.sensorData.gustSpeed > max) {
          max = entry.sensorData.gustSpeed
        }
      })

      this.scaleMin = this.scaleDown(min, 3)
      this.scaleMax = this.scaleUp(max, 3)
    },

    updateChart() {
      this.renderChart(
          {
            labels: this.timeLabels,
            datasets: [
              {
                label: this.$t('windSpeed'),
                borderColor: "#009688",
                pointBackgroundColor: "#009688",
                borderWidth: 3,
                pointBorderColor: "#009688",
                backgroundColor: this.windSpeedGradient,
                data: this.windSpeedData
              },
              {
                label: this.$t('gustSpeed'),
                borderColor: "#00BCD4",
                pointBackgroundColor: "#00BCD4",
                borderWidth: 3,
                pointBorderColor: "#00BCD4",
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
                  labelString: this.$t('speed') + ' in m/s'
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
