<template>
  <div>
    <CurrentWeather/>
    <TemperatureChart/>
    <WindDirectionChart/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CurrentWeather from '@/components/CurrentWeather.vue';
import TemperatureChart from '@/components/TemperatureChart.vue';
import WindDirectionChart from '@/components/WindDirectionChart.vue';

@Component({
  components: {
    CurrentWeather: CurrentWeather,
    TemperatureChart: TemperatureChart,
    WindDirectionChart: WindDirectionChart,
  },
})
export default class Current extends Vue {}
</script>
