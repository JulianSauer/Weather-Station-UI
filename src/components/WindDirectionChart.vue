<script>
import {Radar} from "vue-chartjs";
import dateParser from "@/mixins/DateParser";
import scaling from "@/mixins/Scaling"
import store from "@/store/index"

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
      let windDirections = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      store.state.sortedSensorData.forEach(entry => {
        let direction = entry.sensorData.windDirection / 22.5
        windDirections[direction]++
      })

      let max = 0
      windDirections.forEach((entry, i) => {
        windDirections[i] = (entry / store.state.sortedSensorData.length) * 100
        if (windDirections[i] > max) {
          max = windDirections[i]
        }
      })
      this.scaleMax = this.scaleUp(max, 10, 100)
      this.windDirectionData = windDirections
    },

    updateChart() {
      this.renderChart(
          {
            labels: this.windDirectionLabels,
            datasets: [
              {
                label: "Wind Direction in %",
                backgroundColor: "rgb(38,166,154, 0.4)",
                borderColor: "#009688",
                pointBackgroundColor: "#009688",
                pointBorderColor: "#009688",
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
