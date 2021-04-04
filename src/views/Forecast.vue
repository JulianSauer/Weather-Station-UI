<template>
  <div>
      <WeatherForecast/>
  </div>
</template>

<script language="ts">
import {Component, Vue} from 'vue-property-decorator'
import WeatherForecast from '@/components/WeatherForecast.vue';

@Component({
  components: {
    WeatherForecast: WeatherForecast
  },
})
export default class Forecast extends Vue {
}
</script>
