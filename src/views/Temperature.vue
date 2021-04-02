<template>
  <div style="height: 100%; padding: 10px;">
    <TemperatureChart style="height: 100%"/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import TemperatureChart from '@/components/TemperatureChart.vue';

@Component({
  components: {
    TemperatureChart: TemperatureChart,
  },
})
export default class Temperature extends Vue {
}
</script>
