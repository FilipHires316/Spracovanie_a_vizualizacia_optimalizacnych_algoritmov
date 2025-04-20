<!-- visualisation of best and average fitness for each iteration -->
<template>
  <q-card class="q-pa-md">
    <Bar
      :data="chartData"
      :options="chartOptions"
      @click="handleClick"
    />
  </q-card>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import type {
  ChartOptions,
  ChartEvent,
  ActiveElement
} from 'chart.js';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineComponent({
  name: 'GenerationGraph',
  components: { Bar },
  props: {
    bestFitness: { type: Array as () => number[], required: true },
    averageFitness: { type: Array as () => number[], required: true },
    label: { type: String, default: 'Fitness Graph' }
  },
  emits: ['bar-click'],
  setup(props, { emit }) {
    const generations = computed(() => {
      return props.bestFitness.map((_, i) => i + 1)
    })

    const maxFitnessIndex = computed(() => {
      return props.bestFitness.indexOf(Math.max(...props.bestFitness))
    })

    const chartData = computed(() => {
      const bestFitnessColors = props.bestFitness.map((fitness, index) =>
        index === maxFitnessIndex.value ? 'red' : '#66bb6a'
      )

      return {
        labels: generations.value,
        datasets: [
          {
            label: 'Najlepšia Fitness',
            backgroundColor: bestFitnessColors,
            data: props.bestFitness
          },
          {
            label: 'Priemerná Fitness',
            backgroundColor: '#42a5f5',
            data: props.averageFitness
          },
        ]
      }
    })

    const chartOptions: ChartOptions<'bar'> = {
      responsive: true,
      maintainAspectRatio: false,
      onClick: (event: ChartEvent, elements: ActiveElement[]) => {
        if (elements.length > 0) {
          const index = elements[0]?.index
          if (index !== undefined) {
            emit('bar-click', index)
          }
        }
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            generateLabels: (chart) => {
              const original = ChartJS.defaults.plugins.legend.labels.generateLabels(chart)

              const customLegend = [
                {
                  text: 'Najlepšie riešenie z celej populácie',
                  fillStyle: 'red',
                  strokeStyle: 'red',
                  lineWidth: 1,
                  hidden: false,
                  index: original.length + 1
                }
              ]

              const modifiedOriginal = original.map(label => {
                if (label.text === 'Najlepšia Fitness') {
                  return {
                    ...label,
                    fillStyle: '#66bb6a'
                  }
                }
                return label
              })

              return [...modifiedOriginal, ...customLegend]
            }
          }

        },
        title: {
          display: true,
          text: props.label
        }
      }
    }


    return {
      chartData,
      chartOptions,
      handleClick: chartOptions.onClick
    }
  }
})
</script>

<style scoped>
canvas {
  max-height: 400px;
}
</style>
