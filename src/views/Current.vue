<template>
  <div>

    <v-layout row mx-0 my-0>

      <v-flex xs12 sm6 md4 lg3 xl2>
        <v-card elevation="2" class="mx-3 my-3" :loading="currentWeatherLoading">
          <v-card-title>{{ $t('currentWeather') }}</v-card-title>
          <CurrentWeather/>
        </v-card>
      </v-flex>

      <v-flex xs12 sm6 md4 lg3 xl2>
        <v-card elevation="2" class="mx-3 my-3" :loading="hourlyForecastLoading">
          <v-card-title>{{ $t('hourlyForecast') }}</v-card-title>
          <WeatherForecastHourlyShort/>
        </v-card>
      </v-flex>

      <v-flex xs12 sm6 md4 lg3 xl2>
        <v-card elevation="2" class="mx-3 my-3" :loading="dailyForecastLoading">
          <v-card-title>{{ $t('dailyForecast') }}</v-card-title>
          <WeatherForecastDailyShort/>
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
import WeatherForecastDailyShort from '@/components/WeatherForecastDailyShort.vue';
import WeatherForecastHourlyShort from '@/components/WeatherForecastHourlyShort.vue';
import TemperatureChart from '@/components/TemperatureChart.vue';
import WindSpeedChart from '@/components/WindSpeedChart.vue';

@Component({
  components: {
    CurrentWeather: CurrentWeather,
    WeatherForecastDailyShort: WeatherForecastDailyShort,
    WeatherForecastHourlyShort: WeatherForecastHourlyShort,
    TemperatureChart: TemperatureChart,
    WindSpeedChart: WindSpeedChart,
  },
})
export default class Current extends Vue {
  currentWeatherLoading = 'teal'
  hourlyForecastLoading = 'teal'
  dailyForecastLoading = 'teal'
  unsubscribe = function () { };

  created(): void {
    this.unsubscribe = this.$store.subscribe((_, state) => {
      if (state.sortedSensorData.length > 1) {
        this.currentWeatherLoading = 'false'
      }
      if (state.hourlyForecast.length > 1) {
        this.hourlyForecastLoading = 'false'
      }
      if (state.dailyForecast.length > 1) {
        this.dailyForecastLoading = 'false'
      }
    })
  }

  beforeDestroy(): void {
    this.unsubscribe()
  }
}
</script>
