<template>
  <q-card class="q-pa-md" style="width: 98vw; height: auto">
    <h6 class="text-h6">Vizualizácia Riešenia</h6>
    <div class="column q-gutter-md">
      <q-card
        v-for="(bin, binIndex) in visualBins"
        :key="'bin-' + binIndex"
        class="q-pa-sm bg-grey-1"
        style="width: 99%; border: 2px solid #555; height: auto"
      >
        <div class="text-subtitle2 q-mb-sm">Kôš {{ binIndex + 1 }}</div>
        <div class="relative w-full flex h-10">
          <!-- Render items in the bin -->
          <div
            v-for="(item, itemIndex) in bin.items"
            :key="'item-' + itemIndex"
            class="h-full text-white text-xs flex items-center justify-center"
            :style="{
              width: `${item.percentage}%`,
              minWidth: '4px',
              height: '3vw',
              backgroundColor: item.color,
            }"
          >
            <q-tooltip>
              Veľkosť: {{ item.size }}
            </q-tooltip>
          </div>

          <!-- Render unused space -->
            <q-tooltip>
              Nevyužitý priestor: {{ bin.unused.toFixed(1) }}%
            </q-tooltip>
          </div>
      </q-card>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  solution: number[][];     // Each inner array is a bin of item sizes
  capacity: number;  // Max capacity per bin
}>();

function getColor(index: number): string {
  const colors = ['#1abc9c', '#3498db', '#9b59b6', '#e67e22', '#e74c3c', '#2ecc71', '#f1c40f'];
  return colors[index % colors.length] as string;
}

const visualBins = computed(() => {
  return props.solution.map((binItems) => {
    const used = binItems.reduce((a, b) => a + b, 0);
    const items = binItems.map((size, i) => ({
      size,
      percentage: (size / props.capacity) * 100,
      color: getColor(i)
    }));
    const unused = Math.max(0, ((props.capacity - used) / props.capacity) * 100);

    return {
      items,
      unused
    };
  });
});
</script>
