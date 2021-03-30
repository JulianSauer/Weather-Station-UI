<script>
import {Radar} from "vue-chartjs";
import dateParser from "@/mixins/DateParser";
import scaling from "@/mixins/Scaling"

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
    this.$store.subscribe((mutation, state) => {
      let windDirections = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      state.sortedSensorData.forEach(entry => {
        let direction = entry.sensorData.windDirection / 22.5
        windDirections[direction]++
      })

      let max = 0
      windDirections.forEach((entry, i) => {
        windDirections[i] = (entry / state.sortedSensorData.length) * 100
        if (windDirections[i] > max) {
          max = windDirections[i]
        }
      })
      this.scaleMax = this.scaleUp(max, 10, 100)
      this.windDirectionData = windDirections
      this.updateChart()
    });
  },

  mounted() {
    this.updateChart()
  },

  methods: {

    updateChart() {
      this.renderChart(
          {
            labels: this.windDirectionLabels,
            datasets: [
              {
                label: "Wind Direction in %",
                backgroundColor: "rgba(179,181,198,0.2)",
                borderColor: "rgba(179,181,198,1)",
                pointBackgroundColor: "rgba(179,181,198,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(179,181,198,1)",
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
