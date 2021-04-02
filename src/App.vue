<template>
  <div id="app">
    <v-app>
      <v-app-bar app color="teal" dark>
        <v-app-bar-nav-icon @click.stop="navigationDrawer = !navigationDrawer"></v-app-bar-nav-icon>
        <span v-if="!isSmallDevice()" class="mr-2">Weather Station</span>
        <v-spacer></v-spacer>

        <span class="mr-1">{{ timestamp }}</span>
        <v-btn v-on:click="updateSensorData24" icon>
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="navigationDrawer" absolute temporary dark color="teal darken-3">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title"> Weather Station</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list nav>
          <v-list-item-group>
            <v-list-item to="/">
              <v-list-item-title>Current Weather</v-list-item-title>
            </v-list-item>

            <v-list-item to="/forecast">
              <v-list-item-title>Forecast</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <v-divider></v-divider>

        <v-list nav dense>
          <v-list-item-group>
            <v-list-item to="/temperature">
              <v-list-item-title>Temperature</v-list-item-title>
            </v-list-item>

            <v-list-item to="/humidity">
              <v-list-item-title>Humidity</v-list-item-title>
            </v-list-item>

            <v-list-item to="/rain">
              <v-list-item-title>Rain</v-list-item-title>
            </v-list-item>

            <v-list-item to="/wind-direction">
              <v-list-item-title>Wind Direction</v-list-item-title>
            </v-list-item>

            <v-list-item to="/wind-speed">
              <v-list-item-title>Wind Speed</v-list-item-title>
            </v-list-item>

          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <router-view/>
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
      navigationDrawer: false,
      timestamp: ''
    }
  },

  watch: {
    group() {
      this.navigationDrawer = false
    },
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
    },

    isSmallDevice() {
      return this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm'
    },
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
