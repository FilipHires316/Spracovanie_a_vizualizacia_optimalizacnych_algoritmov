<!-- form for whale inspired algorithm -->
<template>
  <div class="content-container" style="margin-top: 1vw">
    <!-- preset choice -->
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
          {label: 'Veľká populácia', icon: 'trending_up', value: 'big'},
          {label: 'Rýchly výpočet', icon: 'timer', value: 'small'},
          {label: 'Vlastné', icon: 'tuned', value: 'own'},
        ]"
    ></q-btn-toggle>

    <!-- field for number of iterations -->
    <q-input
      filled
      v-model.number="iterations"
      label="Počet iterácií"
      stack-label
      dense
      type="number"
      class="bg-white text-primary"
      style="margin-top: 10px;"
      :rules="[val => (val !== null && val >= 1) || 'Počet iterácií musí byť aspoň 1']"
      hide-bottom-space
    />

    <!-- field for population size -->
    <q-input
      filled
      v-model.number="population"
      label="Veľkosť populácie"
      stack-label
      dense
      type="number"
      class="bg-white text-primary"
      style="margin-top: 10px;"
      :rules="[val => (val !== null && val >= 20) || 'Velkosť populácie musí byť aspoň 20']"
      hide-bottom-space
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { whalePresets } from 'stores/presets/whalePresets'
import { useParamStore } from 'stores/paramStore'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'WhaleParams',
  setup() {
    const paramStore = useParamStore();
    paramStore.resetStore(['iterations', 'population']);
    paramStore.algorithm = 'whale';
    const model = ref<string | null>(null);

    const {
      iterations,
      population,
    } = storeToRefs(paramStore);

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
