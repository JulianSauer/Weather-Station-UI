<template>
  <div>
    <v-card elevation="2" class="my-3 mx-auto" width="256">
      <v-card-title>{{ $t('currentWeather') }}</v-card-title>
      <CurrentWeather/>
    </v-card>
    <v-card elevation="2" class="my-3 mx-3">
      <TemperatureChart/>
    </v-card>
    <v-card elevation="2" class="my-3 mx-3">
      <WindSpeedChart/>
    </v-card>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import CurrentWeather from '@/components/CurrentWeather.vue';
import TemperatureChart from '@/components/TemperatureChart.vue';
import WindSpeedChart from '@/components/WindSpeedChart.vue';

@Component({
  components: {
    CurrentWeather: CurrentWeather,
    TemperatureChart: TemperatureChart,
    WindSpeedChart: WindSpeedChart,
  },
})
export default class Current extends Vue {
}
</script>
