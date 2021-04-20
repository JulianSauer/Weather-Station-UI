<template>
  <div style="height: 100%; padding: 12px">

    <v-card elevation="2">
      <SensorDatePicker/>
    </v-card>

    <v-card elevation="2" :style="chartHeight" class="mt-3">
      <HumidityChart style="height: 100%"/>
    </v-card>

  </div>
</template>

<script>
import Vue from 'vue';
import HumidityChart from '@/components/HumidityChart.vue';
import SensorDatePicker from "@/components/SensorDatePicker";

export default Vue.extend({
  components: {
    HumidityChart: HumidityChart,
    SensorDatePicker: SensorDatePicker
  },

  data() {
    return {
      chartHeight: 'height: 300px'
    }
  },

  created() {
    window.addEventListener('resize', this.resizeChart)
  },

  mounted() {
    this.resizeChart()
  },

  destroyed() {
    window.removeEventListener("resize", this.resizeChart)
  },

  methods: {
    resizeChart() {
      let appbarHeight = document.getElementById('appbar').clientHeight
      let padding = 36
      let datePicker = 114
      let height = window.innerHeight - padding - datePicker - appbarHeight
      this.chartHeight = 'height: ' + height + 'px'
    }
  }
})
</script>
