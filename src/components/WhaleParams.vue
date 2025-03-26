<template>
  <div class="content-container" style="margin-top: 1vw">
    <q-btn-toggle
      v-model="model"
      class="my-custom-toggle"
      spread
      no-caps
      elevated
      toggle-color="primary"
      color="white"
      text-color="primary"
      :options="[
          {label: 'Optimálne', icon: 'check', value: 'optimum'},
          {label: 'Velká populácia', icon: 'trending_up', value: 'big'},
          {label: 'Rýchly výpočet', icon: 'timer', value: 'small'},
          {label: 'vlastné', icon: 'tuned', value: 'own'},
        ]"
    ></q-btn-toggle>
    <q-input
      filled
      v-model="iterations"
      label="Počet iterácií"
      stack-label
      dense
      class="bg-white text-primary"
      style="margin-top: 10px;"
    />
    <q-input
      filled
      v-model="population"
      label="Veľkosť populácie"
      stack-label
      dense
      class="bg-white text-primary"
      style="margin-top: 10px;"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { whalePresets } from 'stores/presets/whalePresets'

export default defineComponent({
  name: 'WhaleParams',
  setup() {
    const model = ref<string | null>(null);
    const iterations = ref<number | null>(null);
    const population = ref<number | null>(null);

    watch(model, (newVal) => {
      const preset = whalePresets[newVal as keyof typeof whalePresets];
      if (preset) {
        iterations.value = preset.iterations;
        population.value = preset.population;
      }
    });

    return {
      model,
      iterations,
      population,
    };
  }
});
</script>

<style lang="scss" scoped>
</style>
