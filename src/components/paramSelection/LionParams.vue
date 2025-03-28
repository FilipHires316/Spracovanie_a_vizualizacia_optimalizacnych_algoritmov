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
          {label: 'Veľká populácia', icon: 'trending_up', value: 'big'},
          {label: 'Rýchly výpočet', icon: 'timer', value: 'small'},
          {label: 'Vlastné', icon: 'tuned', value: 'own'},
        ]"
    ></q-btn-toggle>

    <q-input
      filled
      v-model="iterations"
      label="Počet iterácií"
      stack-label
      dense
      type="number"
      class="bg-white text-primary"
      style="margin-top: 10px;"
    />
    <q-input
      filled
      v-model="packs"
      label="Počet svoriek"
      stack-label
      dense
      type="number"
      class="bg-white text-primary"
      style="margin-top: 10px;"
    />
    <q-input
      filled
      v-model="females"
      label="Počet samíc v svorke"
      stack-label
      dense
      type="number"
      class="bg-white text-primary"
      style="margin-top: 10px;"
    />
    <q-input
      filled
      v-model="males"
      label="Počet samcov v svorke"
      stack-label
      dense
      type="number"
      class="bg-white text-primary"
      style="margin-top: 10px;"
    />
    <q-input
      filled
      v-model="hunters"
      label="Percento loviacich samíc"
      stack-label
      dense
      type="number"
      class="bg-white text-primary"
      style="margin-top: 10px;"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { lionPresets } from 'stores/presets/lionPresets'
import { useParamStore } from 'stores/paramStore'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'LionParams',
  setup() {
    const paramStore = useParamStore();
    const reset = () => {
      paramStore.resetStore();
      paramStore.algorithm = 'lion';
    };
    reset()
    const model = ref<string | null>(null);

    // Store references to ensure reactivity
    const {
      iterations,
      packs,
      females,
      males,
      hunters,
    } = storeToRefs(paramStore);

    // Watch for model changes and apply preset values
    watch(model, (newVal) => {
      const preset = lionPresets[newVal as keyof typeof lionPresets];
      if (preset) {
        iterations.value = preset.iterations;
        packs.value = preset.packs;
        males.value = preset.males;
        females.value = preset.females;
        hunters.value = preset.hunters;
      }
    });

    return {
      model,
      iterations,
      packs,
      females,
      males,
      hunters,
    };
  }
});
</script>

<style lang="scss" scoped>
</style>
