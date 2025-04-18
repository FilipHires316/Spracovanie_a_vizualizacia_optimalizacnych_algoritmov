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
    },
    index: {
      type: Number,
      default: 1
    }
  },
  emits: ['bar-click'],
  setup(props, { emit }) {
    const generations = computed(() => props.data.map((_, i) => i + 1))

    const fitnessValues = computed(() => props.data.map(entry => entry.fitness))

    // Find the maximum fitness value index
    const maxFitnessIndex = computed(() => {
      return fitnessValues.value.indexOf(Math.max(...fitnessValues.value))
    })

    const chartData = computed(() => {
      // Create arrays for background colors (green by default, red for max value)
      const backgroundColors = fitnessValues.value.map((fitness, index) =>
        index === maxFitnessIndex.value ? 'red' : '#66bb6a' // Red for max, green for others
      )

      return {
        labels: generations.value,
        datasets: [
          {
            label: 'Fitness',
            backgroundColor: backgroundColors,
            data: fitnessValues.value
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
                  text: 'Najlepšie riešenie z iterácie',
                  fillStyle: 'red',
                  strokeStyle: 'red',
                  lineWidth: 1,
                  hidden: false,
                  index: original.length + 1 // optional, just to sort it last
                }
              ]

              // Force "Najlepšia Fitness" to green no matter what
              const modifiedOriginal = original.map(label => {
                if (label.text === 'Fitness') {
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
