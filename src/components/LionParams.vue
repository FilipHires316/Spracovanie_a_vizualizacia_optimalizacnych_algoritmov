<template>
  <div class="content-container" style="margin-top: 1vw">
    <q-btn-toggle
      v-model="model"
      class="my-custom-toggle"
      spread
      no-caps
      glossy
      unelevated
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
      v-model="packs"
      label="Počet svoriek"
      stack-label
      dense
      class="bg-white text-primary"
      style="margin-top: 10px;"
    />
    <q-input
      filled
      v-model="females"
      label="Počet samíc v svorke"
      stack-label
      dense
      class="bg-white text-primary"
      style="margin-top: 10px;"
    />
    <q-input
      filled
      v-model="males"
      label="Počet samcov v svorke"
      stack-label
      dense
      class="bg-white text-primary"
      style="margin-top: 10px;"
    />
    <q-input
      filled
      v-model="hunters"
      label="Percento loviacich samíc"
      stack-label
      dense
      class="bg-white text-primary"
      style="margin-top: 10px;"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { lionPresets } from 'stores/presets/lionPresets'

export default defineComponent({
  name: 'LionParams',
  setup() {
    const model = ref<string | null>(null);
    const iterations = ref<number | null>(null);
    const packs = ref<number | null>(null);
    const females = ref<number | null>(null);
    const males = ref<number | null>(null);// false means hidden, true means shown
    const hunters = ref<number | null>(null);

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
