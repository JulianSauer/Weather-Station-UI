<template>
  <div style="height: 100%; padding: 10px;">
    <RainChart style="height: 100%;"/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import RainChart from '@/components/RainChart.vue';

@Component({
  components: {
    RainChart: RainChart,
  },
})
export default class Rain extends Vue {
}
</script>
