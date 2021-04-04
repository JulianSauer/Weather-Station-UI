<template>
  <div>

    <v-layout row mx-0 my-0>

      <v-flex xs12 sm12 md5 lg3 xl2>
        <v-card elevation="2" class="mx-3 my-3">
          <v-card-title>{{ $t('currentWeather') }}</v-card-title>
          <CurrentWeather/>
        </v-card>
      </v-flex>

      <v-flex xs12 sm12 md5 lg3 xl2>
        <v-card elevation="2" class="mx-3 my-3">
          <v-card-title>{{ $t('forecast') }}</v-card-title>
          <WeatherForecastShort/>
        </v-card>
      </v-flex>
    </v-layout>


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
import WeatherForecastShort from '@/components/WeatherForecastShort.vue';
import TemperatureChart from '@/components/TemperatureChart.vue';
import WindSpeedChart from '@/components/WindSpeedChart.vue';

@Component({
  components: {
    CurrentWeather: CurrentWeather,
    WeatherForecastShort: WeatherForecastShort,
    TemperatureChart: TemperatureChart,
    WindSpeedChart: WindSpeedChart,
  },
})
export default class Current extends Vue {
}
</script>
