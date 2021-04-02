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
        "-10": "rgb(38,166,154)",
        "-5": "rgb(77,182,172)",
        "0": "rgb(128,203,196)",
        "5": "rgb(178,223,219)",
        "10": "rgb(224,242,241)",
        "15": "rgb(255,204,128)",
        "20": "rgb(255,167,38)",
        "25": "rgb(251,140,0)",
        "30": "rgb(230,81,0)",
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

        if (entry.sensorData.temperature < min) {
          min = entry.sensorData.temperature
        }
        if (entry.sensorData.temperature > max) {
          max = entry.sensorData.temperature
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
                borderColor: "white",
                pointBackgroundColor: "white",
                borderWidth: 3,
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
