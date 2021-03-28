<template>
  <div>
    <CurrentWeather/>
    <TemperatureChart/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CurrentWeather from '@/components/CurrentWeather.vue';
import TemperatureChart from "@/components/TemperatureChart.vue"; // @ is an alias to /src

@Component({
  components: {
    CurrentWeather: CurrentWeather,
    TemperatureChart: TemperatureChart
  },
})
export default class Home extends Vue {}
</script>
