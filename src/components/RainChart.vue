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
      timeLabels: [],
      rainData: []
    }
  },

  created() {
    this.$store.subscribe((mutation, state) => {
      this.rainData = []
      this.timeLabels = []
      let min = state.sortedSensorData[0].sensorData.rain
      let max = state.sortedSensorData[0].sensorData.rain
      state.sortedSensorData.forEach(entry => {
        this.timeLabels.unshift(entry.timeLabel)
        this.rainData.unshift(entry.sensorData.rain)

        if (entry.rain < min) {
          min = entry.rain
        }
        if (entry.rain > max) {
          max = entry.rain
        }
      })

      this.scaleMin = this.scaleDown(min, 10, 0)
      this.scaleMax = this.scaleUp(max, 10)
      this.updateChart()
    });
  },

  mounted() {
    this.gradient = this.$refs.canvas
        .getContext("2d")
        .createLinearGradient(0, 0, 0, 450);

    this.gradient.addColorStop(0, "rgb(2,127,241)");
    this.gradient.addColorStop(0.5, "rgb(2,127,241)");
    this.gradient.addColorStop(1, "rgb(224,239,255)");

    this.updateChart()
  },

  methods: {

    updateChart() {
      this.renderChart(
          {
            labels: this.timeLabels,
            datasets: [
              {
                label: "Rain",
                borderColor: "#027ff1",
                pointBackgroundColor: "white",
                borderWidth: 1,
                pointBorderColor: "white",
                backgroundColor: this.gradient,
                data: this.rainData
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
                  labelString: 'Rain in mm'
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
