<!-- visualisation of traveling salesman problem solution -->
<template>
  <q-card class="q-pa-md">
    <q-card-section>
      <h6 class="text-h6">Vizualizácia riešenia zvoleného jedinca:</h6>
      <h6 class="text-h6">Celková prejdená vzdialenosť: {{totalDistance}}</h6>
    </q-card-section>
    <q-card-section>
      <v-chart :option="chartOptions" autoresize style="height: 500px;" />
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { computed, type ComputedRef } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { ScatterChart, LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import type { EChartsOption } from 'echarts'

use([CanvasRenderer, ScatterChart, LineChart, GridComponent, TooltipComponent])

const props = defineProps<{
  cities: number[][]
}>()

interface TooltipFormatterParams {
  seriesName: string;
  dataIndex: number;
  data: { name?: string };
}

const totalDistance = computed(() => {
  if (props.cities.length < 2) return 0;
  let distance = 0;
  for (let i = 0; i < props.cities.length - 1; i++) {
    const dx = props.cities[i]![0]! - props.cities[i + 1]![0]!;
    const dy = props.cities[i]![1]! - props.cities[i + 1]![1]!;
    distance += Math.sqrt(dx * dx + dy * dy);
  }
  // Closing the path (last to first)
  const dx = props.cities[0]![0]! - props.cities[props.cities.length - 1]![0]!;
  const dy = props.cities[0]![1]! - props.cities[props.cities.length - 1]![1]!;
  distance += Math.sqrt(dx * dx + dy * dy);
  return Math.round(distance);
});

const chartOptions: ComputedRef<EChartsOption> = computed(() => {
  const scatterData = props.cities.map((city, i) => ({
    value: [city[0], city[1]],
    name: `City ${i}`,
    label: {
      show: true,
      formatter: (param: { dataIndex: number }) => `City ${param.dataIndex}`,
      position: 'top'
    }
  }))

  const lineData = props.cities.map(city => [city[0], city[1]])
  if (props.cities.length > 0) {
    const [firstX, firstY] = props.cities[0]!
    lineData.push([firstX, firstY])
  }

  return {
    tooltip: {
      trigger: 'item',
      formatter: (params: TooltipFormatterParams) => {
        return params.data?.name;
      }
    },
    xAxis: { type: 'value', name: 'X' },
    yAxis: { type: 'value', name: 'Y' },
    series: [
      {
        name: 'Cities',
        type: 'scatter',
        data: scatterData,
        symbolSize: 30,
        label: {
          show: true,
          formatter: (param: { dataIndex: number }) => `City ${param.dataIndex}`,
          position: 'top'
        }
      },
      {
        name: 'Path',
        type: 'line',
        data: lineData,
        lineStyle: {
          width: 2,
          color: '#1976D2'
        },
        symbol: 'circle',
        symbolSize: 8
      }
    ]
  } as EChartsOption
})
</script>

<style scoped>
</style>
