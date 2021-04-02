<template>
  <div>
    <WindSpeedChart/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import WindSpeedChart from '@/components/WindSpeedChart.vue';

@Component({
  components: {
    WindSpeedChart: WindSpeedChart,
  },
})
export default class WindSpeed extends Vue {}
</script>
