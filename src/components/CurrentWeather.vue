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
          <td>Wind Direction:</td>
          <td>{{ windDirection }}</td>
        </tr>
        <tr>
          <td>Gust Speed:</td>
          <td>{{ gustSpeed }}m/s</td>
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

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import axios from "axios";

@Component
export default class CurrentWeather extends Vue {
  timestamp = ''
  temperature = ''
  gustSpeed = ''
  humidity = ''
  rain = ''
  windDirection = ''
  windSpeed = ''

  created(): void {
    this.updateData()
  }

  updateData(): void {
    axios
        .get('https://8tx41fy5r8.execute-api.eu-central-1.amazonaws.com/api/weather')
        .then(response => {
          let dateAndTime = this.convertDate(response.data.timestamp)
          this.timestamp = dateAndTime.toLocaleTimeString() + ' (' + dateAndTime.toLocaleDateString() + ')'
          this.temperature = response.data.temperature
          this.gustSpeed = response.data.gustSpeed
          this.humidity = response.data.humidity
          this.rain = response.data.rain
          this.windDirection = this.convertDirection(response.data.windDirection)
          this.windSpeed = response.data.windSpeed
        })
        .catch(error => {
          console.log(error)
        })
  }

  convertDate(t: string): Date {
    return new Date(t.slice(0, 4) + '-' + t.slice(4, 6) + '-' + t.slice(6, 8) + 'T' + t.slice(9, 11) + ':' + t.slice(11, 13) + ':' + t.slice(13, 15))
  }

  convertDirection(degrees: number): string {
    let direction = degrees / 22.5
    console.log(direction)
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
