<template>
  <div>

    <v-layout row mx-0 my-0>

      <v-flex xs12 sm12 md6>
        <v-card elevation="2" class="mx-3 my-3">
          <v-card-title>{{ $t('hourlyForecast') }}</v-card-title>
          <v-simple-table dense>
            <template v-slot:default>
              <thead>
              <tr>
                <th>{{ $t('time') }}</th>
                <th>{{ $t('temperature') }}</th>
                <th>{{ $t('precipitationProbability') }}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="f in hourlyForecast">
                <td>{{ f.timestamp }}</td>
                <td>{{ f.temperature }}°C</td>
                <td>{{ f.precipitationProbability }}%</td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-flex>

      <v-flex xs12 sm12 md6>
        <v-card elevation="2" class="mx-3 my-3">
          <v-card-title>{{ $t('dailyForecast') }}</v-card-title>
          <v-simple-table dense>
            <template v-slot:default>
              <thead>
              <tr>
                <th>{{ $t('day') }}</th>
                <th>{{ $t('temperature') }}</th>
                <th>{{ $t('precipitationProbability') }}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="f in dailyForecast">
                <td>{{ f.timestamp }}</td>
                <td>{{ f.temperature }}°C</td>
                <td>{{ f.precipitationProbability }}%</td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-flex>

    </v-layout>
  </div>
</template>

<script>
import {Vue} from 'vue-property-decorator';
import dateParser from "../mixins/DateParser";

export default {
  extends: Vue,
  mixins: [dateParser],
  data() {
    return {
      hourlyForecast: [{
        timestamp: '',
        temperature: 0,
        precipitationProbability: 0,
      }],
      dailyForecast: [{
        timestamp: '',
        temperature: 0,
        precipitationProbability: 0,
      }],
    }
  },

  created() {
    this.unsubscribe = this.$store.subscribe(() => {
      this.loadHourlyForecastFromStore()
      this.loadDailyForecastFromStore()
    });
  },

  mounted() {
    this.loadHourlyForecastFromStore()
    this.loadDailyForecastFromStore()
  },

  beforeDestroy() {
    this.unsubscribe()
  },

  methods: {

    loadHourlyForecastFromStore() {
      let forecast = this.$store.state.hourlyForecast
      this.hourlyForecast = new Array(forecast.length)
      for (let i = 0; i < forecast.length; i++) {
        let entry = forecast[i]
        let date = this.convertStringToDate(entry.timestamp)
        this.hourlyForecast[i] = {
          timestamp: this.formatDate(date, 'hh:mm'),
          temperature: forecast[i].temperature,
          precipitationProbability: forecast[i].precipitationProbability
        }
      }
    },

    loadDailyForecastFromStore() {
      let forecast = this.$store.state.dailyForecast
      this.dailyForecast = new Array(forecast.length)
      for (let i = 0; i < forecast.length; i++) {
        let entry = forecast[i]
        let date = this.convertStringToDate(entry.timestamp)
        this.dailyForecast[i] = {
          timestamp: this.formatDate(date, 'DD.MM'),
          temperature: forecast[i].temperature,
          precipitationProbability: forecast[i].precipitationProbability
        }
      }
    },
  }
}
</script>
