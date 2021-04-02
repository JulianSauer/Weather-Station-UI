<script>
import {Line} from "vue-chartjs";
import dateParser from "@/mixins/DateParser";
import scaling from "@/mixins/Scaling"
import store from "@/store/index"

export default {
  extends: Line,
  mixins: [dateParser, scaling],

  data() {
    return {
      scaleMin: 0,
      scaleMax: 30,
      gradient: null,
      temperatureData: [],
      timeLabels: [],
      temperatureColors: {
        "-10": "rgb(0,94,255)",
        "-5": "rgb(0,115,255)",
        "0": "rgb(0,149,255)",
        "5": "rgb(0,234,255)",
        "10": "rgb(0,234,255)",
        "15": "rgb(255,221,0)",
        "20": "rgb(255,200,0)",
        "25": "rgb(255,119,0)",
        "30": "rgb(255,0,0)"
      }
    }
  },

  created() {
    this.unsubscribe = this.$store.subscribe(() => {
      this.loadDataFromStore()
      this.updateChart()
    });
  },

  mounted() {
    this.loadDataFromStore()
    this.updateChart()
  },

  beforeDestroy() {
    this.unsubscribe()
  },

  methods: {

    loadDataFromStore() {
      this.temperatureData = []
      this.timeLabels = []
      let min = store.state.sortedSensorData[0].sensorData.temperature
      let max = store.state.sortedSensorData[0].sensorData.temperature
      store.state.sortedSensorData.forEach(entry => {
        this.timeLabels.unshift(entry.timeLabel)
        this.temperatureData.unshift(entry.sensorData.temperature)

        if (entry.temperature < min) {
          min = entry.temperature
        }
        if (entry.temperature > max) {
          max = entry.temperature
        }
      })

      this.scaleMin = this.scaleDown(min, 5)
      this.scaleMax = this.scaleUp(max, 5)
    },

    updateGradient() {
      this.gradient = this.$refs.canvas
          .getContext("2d")
          .createLinearGradient(0, 0, 0, 450);

      if (this.scaleMax > 30) {
        this.gradient.addColorStop(0, this.temperatureColors["30"]);
      } else {
        this.gradient.addColorStop(0, this.temperatureColors[this.scaleMax]);
      }
      if (this.scaleMin < -10) {
        this.gradient.addColorStop(1, this.temperatureColors["-10"]);
      } else {
        this.gradient.addColorStop(1, this.temperatureColors[this.scaleMin]);
      }
    },

    updateChart() {
      this.updateGradient()
      this.renderChart(
          {
            labels: this.timeLabels,
            datasets: [
              {
                label: "Temperature",
                borderColor: "#000000",
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
                  labelString: 'Temperature in °C'
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
