<template>
  <div style="height: 100%; padding: 10px;">
  <WindDirectionChart style="height: 100%"/>
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
