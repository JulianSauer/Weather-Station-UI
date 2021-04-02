<template>
  <div>
    <WindDirectionChart/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import WindDirectionChart from '@/components/WindDirectionChart.vue';

@Component({
  components: {
    WindDirectionChart: WindDirectionChart,
  },
})
export default class WindDirection extends Vue {}
</script>
