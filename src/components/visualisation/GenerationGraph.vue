<template>
  <Bar
    :data="chartData"
    :options="chartOptions"
    @click="handleClick"
  />
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
    // Compute generations for x-axis labels
    const generations = computed(() => {
      return props.bestFitness.map((_, i) => i + 1)
    })

    // Find the index of the maximum value in bestFitness
    const maxFitnessIndex = computed(() => {
      return props.bestFitness.indexOf(Math.max(...props.bestFitness))
    })

    // Chart data with dynamic coloring for max value in bestFitness
    const chartData = computed(() => {
      // Create an array of background colors for bestFitness (green by default)
      const bestFitnessColors = props.bestFitness.map((fitness, index) =>
        index === maxFitnessIndex.value ? 'red' : '#66bb6a' // Highlight max fitness value in red
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
            backgroundColor: '#42a5f5', // Blue color for average fitness
            data: props.averageFitness
          },
          {
            label: 'Najlepšia Fitness',
            backgroundColor: 'red',
            data: [],
            borderWidth: 0,
          }
        ]
      }
    })

    // Chart options
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
          position: 'top'
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
