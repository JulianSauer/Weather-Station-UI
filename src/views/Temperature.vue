<template>
  <div>
    <TemperatureChart/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TemperatureChart from '@/components/TemperatureChart.vue';

@Component({
  components: {
    TemperatureChart: TemperatureChart,
  },
})
export default class Temperature extends Vue {}
</script>
