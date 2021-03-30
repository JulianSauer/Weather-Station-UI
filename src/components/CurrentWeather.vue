<template>
  <div>
    <div>
      <table id="weatherTable">
        <tr>
          <td>Temperature:</td>
          <td>{{ temperature }}°C</td>
        </tr>
        <tr>
          <td>Humidity:</td>
          <td>{{ humidity }}%</td>
        </tr>
        <tr>
          <td>Wind Speed:</td>
          <td>{{ windSpeed }}m/s</td>
        </tr>
        <tr>
          <td>Gust Speed:</td>
          <td>{{ gustSpeed }}m/s</td>
        </tr>
        <tr>
          <td>Wind Direction:</td>
          <td>{{ windDirection }}</td>
        </tr>
        <tr>
          <td>Rain:</td>
          <td>{{ rain }}mm</td>
        </tr>
      </table>
    </div>
    <p id="lastUpdate">Sensor data from: {{ timestamp }}</p>
  </div>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator';
import axios from "axios";
import dateParser from "../mixins/DateParser";

export default {
  extends: Vue,
  mixins: [dateParser],
  data() {
    return {
    timestamp: '',
    temperature: '',
    gustSpeed: '',
    humidity: '',
    rain: '',
    windDirection: '',
    windSpeed: ''
    }
  },

  created() {
    this.$store.subscribe((mutation, state) => {
      let dateAndTime = this.convertStringToDate(state.sortedSensorData[0].sensorData.timestamp)
      this.timestamp = dateAndTime.toLocaleTimeString() + ' (' + dateAndTime.toLocaleDateString() + ')'
      this.temperature = state.sortedSensorData[0].sensorData.temperature
      this.gustSpeed = state.sortedSensorData[0].sensorData.gustSpeed
      this.humidity = state.sortedSensorData[0].sensorData.humidity
      this.rain = state.sortedSensorData[0].sensorData.rain
      this.windDirection = state.sortedSensorData[0].sensorData.windDirection
      this.windSpeed = state.sortedSensorData[0].sensorData.windSpeed
    });
  },

  methods: {

    convertDirection(degrees) {
      let direction = degrees / 22.5
      switch (direction) {
        case 0:
          return 'N'
        case 1:
          return 'NNE'
        case 2:
          return 'NE'
        case 3:
          return 'NEE'
        case 4:
          return 'E'
        case 5:
          return 'SEE'
        case 6:
          return 'SE'
        case 7:
          return 'SSE'
        case 8:
          return 'S'
        case 9:
          return 'SSW'
        case 10:
          return 'SW'
        case 11:
          return 'SWW'
        case 12:
          return 'W'
        case 13:
          return 'NWW'
        case 14:
          return 'NW'
        case 15:
          return 'NNW'
      }
      return ''
    }
  }
}
</script>

<style>
#weatherTable {
  margin-left: auto;
  margin-right: auto;
}

td {
  text-align: left;
}

#lastUpdate {
  float: right
}
</style>
