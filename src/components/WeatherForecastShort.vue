<template>
  <div>
    <v-simple-table dense height="161px">
      <template v-slot:default>
        <thead>
        <tr>
          <th>{{ $t('time') }}</th>
          <th>{{ $t('temperature') }}</th>
          <th>{{ $t('precipitationProbability') }}</th>
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
      let forecast = this.$store.state.hourlyForecast
      this.forecast = new Array(forecast.length)
      for (let i = 0; i < forecast.length; i++) {
        let entry = forecast[i]
        let date = this.convertStringToDate(entry.timestamp)
        this.forecast[i] = {
          timestamp: this.formatDate(date, 'hh:mm'),
          temperature: forecast[i].temperature,
          precipitationProbability: forecast[i].precipitationProbability
        }
      }
    },
  }
}
</script>
