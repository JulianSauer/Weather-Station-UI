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
      gradient: null,
      scaleMin: 0,
      scaleMax: 100,
      humidityData: [],
      timeLabels: []
    }
  },

  created() {
    this.unsubscribe = this.$store.subscribe(() => {
      this.loadDataFromStore()
      this.updateChart()
    });
  },

  mounted() {
    this.gradient = this.$refs.canvas
        .getContext("2d")
        .createLinearGradient(0, 0, 0, 450);

    this.gradient.addColorStop(0, "rgb(38,166,154)");

    this.loadDataFromStore()
    this.updateChart()
  },

  beforeDestroy() {
    this.unsubscribe()
  },

  methods: {

    loadDataFromStore() {
      this.humidityData = []
      this.timeLabels = []
      let min = store.state.sortedSensorData[0].sensorData.humidity
      let max = store.state.sortedSensorData[0].sensorData.humidity
      store.state.sortedSensorData.forEach(entry => {
        this.timeLabels.unshift(entry.timeLabel)
        this.humidityData.unshift(entry.sensorData.humidity)

        if (entry.sensorData.humidityData < min) {
          min = entry.sensorData.humidity
        }
        if (entry.sensorData.humidity > max) {
          max = entry.sensorData.humidity
        }
      })

      this.scaleMin = this.scaleDown(min, 10, 0)
      this.scaleMax = this.scaleUp(max, 10, 100)
    },

    updateChart() {
      this.renderChart(
          {
            labels: this.timeLabels,
            datasets: [
              {
                label: "Humidity",
                borderColor: "#009688",
                pointBackgroundColor: "#009688",
                borderWidth: 3,
                pointBorderColor: "#009688",
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
