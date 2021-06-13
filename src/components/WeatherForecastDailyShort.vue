<template>
  <div>
    <v-simple-table dense height="161px">
      <template v-slot:default>
        <thead>
        <tr>
          <th><v-icon>mdi-calendar</v-icon></th>
          <th><v-icon>mdi-thermometer</v-icon></th>
          <th><v-icon>mdi-water</v-icon></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="f in forecast">
          <td>{{ f.timestamp }}</td>
          <td>{{ f.temperature }}°C</td>
          <td>{{ f.precipitationProbability }}%</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
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
      forecast: [{
        timestamp: '',
        temperature: 0,
        precipitationProbability: 0,
      }],
    }
  },

  created() {
    this.unsubscribe = this.$store.subscribe(() => {
      this.loadDataFromStore()
    });
  },

  mounted() {
    this.loadDataFromStore()
  },

  beforeDestroy() {
    this.unsubscribe()
  },

  methods: {

    loadDataFromStore() {
      let forecast = this.$store.state.dailyForecast
      this.forecast = new Array(forecast.dataFor.length)
      for (let i = 0; i < forecast.dataFor.length; i++) {
        let date = this.convertStringToDate(forecast.dataFor[i], 'YYYYMMDD-hhmmss')
        this.forecast[i] = {
          timestamp: this.formatDate(date, 'DD.MM'),
          temperature: forecast.temperature[i],
          precipitationProbability: forecast.rain[i]
        }
      }
    },
  }
}
</script>

<style>
th {
  text-align: center;
}
</style>
