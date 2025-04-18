<template>
  <q-card class="q-pa-md">
    <q-card-section>
      <h6 class="text-h6">Vizualizácia riešenia</h6>
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

interface City {
  x: number
  y: number
  name?: string
}

// Props
const props = defineProps<{
  cities: City[]
  path: number[]
}>()

interface TooltipFormatterParams {
  seriesName: string;
  dataIndex: number;
  data: { name?: string };
}

const chartOptions: ComputedRef<EChartsOption> = computed(() => {
  const scatterData = props.cities.map((city, i) => ({
    value: [city.x, city.y],
    name: city.name || `City ${i}`,
    label: {
      show: true,
      formatter: (param: { dataIndex: number }) => props.cities[param.dataIndex]?.name || `City ${param.dataIndex}`,
      position: 'top'
    }
  }))

  const lineData = props.path.map(index => [props.cities[index]?.x, props.cities[index]?.y])

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
          formatter: (param: { dataIndex: number }) => props.cities[param.dataIndex]?.name || `City ${param.dataIndex}`,
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
