<template>
  <div id="app">
    <v-app>
      <v-app-bar app color="teal" dark>
        <span class="mr-2">Weather Station</span>

        <v-spacer></v-spacer>

        <span>{{ timestamp }}</span>
        <v-btn v-on:click="updateSensorData24" icon>
          <v-icon>mdi-cached</v-icon>
        </v-btn>
      </v-app-bar>

      <v-main>
        <CurrentWeather/>
        <TemperatureChart/>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import Vue from 'vue';
import CurrentWeather from './components/CurrentWeather.vue';
import TemperatureChart from './components/TemperatureChart.vue';
import dateParser from "@/mixins/DateParser"
import weatherStationClient from "@/mixins/WeatherStationClient"
import store from '@/store/index'

export default Vue.extend({
  name: 'App',

  components: {
    CurrentWeather,
    TemperatureChart,
  },

  data() {
    return {
      timestamp: ''
    }
  },

  mixins: [dateParser, weatherStationClient],
  created() {
    this.updateSensorData24()

    this.$store.subscribe((mutation, state) => {
      let dateAndTime = this.convertStringToDate(state.sortedSensorData[0].sensorData.timestamp)
      this.timestamp =
          dateAndTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
          + ' (' +
          dateAndTime.toLocaleDateString([], {day: '2-digit', month: '2-digit'})
          + ')'
    });
  },

  methods: {
    updateSensorData24() {
      let now = new Date()
      let begin = this.formatDate(now, "YYYYMMDD-hhmmss")
      now.setHours(now.getHours() - 24)
      let end = this.formatDate(now, "YYYYMMDD-hhmmss")
      this.updateStore(store, begin, end)
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
