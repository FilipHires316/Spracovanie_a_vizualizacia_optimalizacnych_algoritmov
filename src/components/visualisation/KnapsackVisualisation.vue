<!-- visualisation of knapsack problem solution -->
<template>
  <q-card class="q-pa-md" style="width: 98vw; height: auto">
    <h6 class="text-h6">Celková hodnota zvolených predmetov: {{totalUsedPrice}}</h6>
    <!-- bar representing knapsack -->
    <q-card class="q-pa-md bg-grey-1" style="width: 100%; border: 2px solid #555; height: auto">
      <div class="relative h-10 w-full flex">
        <!-- items inside knapsack -->
        <div
          v-for="(item, index) in filledItems"
          :key="'item-' + index"
          class="h-full text-white text-xs flex items-center justify-center"
          :style="{
            width: `${item.percentage}%`,
            minWidth: '4px',
            height: '3vw',
            backgroundColor: item.color,
          }"
        >
          <span>{{item.value}}</span>
          <q-tooltip>
            Cena: {{ item.value }}, Velkosť: {{ item.weight }}
          </q-tooltip>
        </div>
          <q-tooltip>
            Nevyužitý priestor: {{ unusedPercentage.toFixed(1) }}%
          </q-tooltip>
        </div>
    </q-card>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  solution: number[][];
  capacity: number;
}>();

function getColor(index: number): string {
  const colors = ['#1abc9c', '#3498db', '#9b59b6', '#e67e22', '#e74c3c', '#2ecc71', '#f1c40f'];
  return colors[index % colors.length] as string;
}

const totalUsedWeight = computed(() =>
  props.solution.reduce((sum, [, weight]) => sum + (weight ?? 0), 0)
);

const totalUsedPrice = computed(() =>
  props.solution.reduce((sum, [price,]) => sum + (price ?? 0), 0)
);

const filledItems = computed(() => {
  return [...props.solution]
    .sort((a, b) => (a[1] ?? 0) - (b[1] ?? 0))
    .map(([value, weight], index) => {
      const percentage = ((weight ?? 0) / props.capacity) * 100;

      return {
        value,
        weight,
        percentage,
        color: getColor(index),
      };
    });
});

const unusedPercentage = computed(() => {
  const used = totalUsedWeight.value;
  return Math.max(0, ((props.capacity - used) / props.capacity) * 100);
});
</script>
