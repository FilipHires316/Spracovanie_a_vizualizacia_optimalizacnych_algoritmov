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
import type { Lion } from 'stores/individuals/lion'
import type { Whale } from 'stores/individuals/whale'
import type { Chromosome } from 'stores/individuals/chromosome'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineComponent({
  name: 'IndividualsGraph',
  components: { Bar },
  props: {
    data: {
      type: Array as () => Lion[] | Whale[] | Chromosome[],
      required: true
    },
    label: {
      type: String,
      default: 'Fitness Graph'
    }
  },
  emits: ['bar-click'],
  setup(props, { emit }) {
    const generations = computed(() => props.data.map((_, i) => i + 1))

    const fitnessValues = computed(() => props.data.map(entry => entry.fitness))

    const chartData = computed(() => ({
      labels: generations.value,
      datasets: [
        {
          label: 'Fitness',
          backgroundColor: '#66bb6a',
          data: fitnessValues.value
        }
      ]
    }))

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
