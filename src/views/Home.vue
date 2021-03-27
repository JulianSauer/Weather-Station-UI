<template>
  <div class="home">
    <CurrentWeather/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CurrentWeather from '@/components/CurrentWeather.vue'; // @ is an alias to /src

@Component({
  components: {
    CurrentWeather: CurrentWeather,
  },
})
export default class Home extends Vue {}
</script>
