<template>
  <div>
    <CurrentWeather/>
    <TemperatureChart/>
    <HumidityChart/>
    <WindSpeedChart/>
    <WindDirectionChart/>
    <RainChart/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CurrentWeather from '@/components/CurrentWeather.vue';
import HumidityChart from '@/components/HumidityChart.vue';
import RainChart from '@/components/RainChart.vue';
import TemperatureChart from '@/components/TemperatureChart.vue';
import WindSpeedChart from '@/components/WindSpeedChart.vue';
import WindDirectionChart from '@/components/WindDirectionChart.vue';

@Component({
  components: {
    CurrentWeather: CurrentWeather,
    HumidityChart: HumidityChart,
    RainChart: RainChart,
    TemperatureChart: TemperatureChart,
    WindSpeedChart: WindSpeedChart,
    WindDirectionChart: WindDirectionChart,
  },
})
export default class Current extends Vue {}
</script>
