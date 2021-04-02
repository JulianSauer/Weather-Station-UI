<template>
  <div>
    <HumidityChart/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HumidityChart from '@/components/HumidityChart.vue';

@Component({
  components: {
    HumidityChart: HumidityChart,
  },
})
export default class Humidity extends Vue {}
</script>
