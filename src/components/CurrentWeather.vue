<template>
  <div>
    <div>
      <table id="weatherTable">
        <tr>
          <td>{{ $t('temperature') }}:</td>
          <td>{{ temperature }}°C</td>
        </tr>
        <tr>
          <td>{{ $t('humidity') }}:</td>
          <td>{{ humidity }}%</td>
        </tr>
        <tr>
          <td>{{ $t('windSpeed') }}:</td>
          <td>{{ windSpeed }}m/s</td>
        </tr>
        <tr>
          <td>{{ $t('gustSpeed') }}:</td>
          <td>{{ gustSpeed }}m/s</td>
        </tr>
        <tr>
          <td>{{ $t('windDirection') }}:</td>
          <td>{{ windDirection }}</td>
        </tr>
        <tr>
          <td>{{ $t('rain') }}:</td>
          <td>{{ rain }}mm</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import {Vue} from 'vue-property-decorator';
import dateParser from "../mixins/DateParser";
import store from "@/store/index"

export default {
  extends: Vue,
  mixins: [dateParser],
  data() {
    return {
      temperature: '',
      gustSpeed: '',
      humidity: '',
      rain: '',
      windDirection: '',
      windSpeed: ''
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
      this.temperature = store.state.sortedSensorData[0].sensorData.temperature
      this.gustSpeed = store.state.sortedSensorData[0].sensorData.gustSpeed
      this.humidity = store.state.sortedSensorData[0].sensorData.humidity
      this.rain = store.state.sortedSensorData[0].sensorData.rain
      this.windDirection = store.state.sortedSensorData[0].sensorData.windDirection
      this.windSpeed = store.state.sortedSensorData[0].sensorData.windSpeed
    },

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
