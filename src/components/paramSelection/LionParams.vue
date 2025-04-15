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
    <q-input
      filled
      v-model.number="packs"
      label="Počet svoriek"
      stack-label
      dense
      type="number"
      class="bg-white text-primary"
      style="margin-top: 10px;"
      :rules="[val => (val !== null && val >= 5) || 'Počet svoriek musí byť aspoň 5']"
      hide-bottom-space
    />
    <q-input
      filled
      v-model.number="females"
      label="Počet samíc v svorke"
      stack-label
      dense
      type="number"
      class="bg-white text-primary"
      style="margin-top: 10px;"
      :rules="[val => (val !== null && val >= 3) || 'Počet samíc musí byť aspoň 3']"
      hide-bottom-space
    />
    <q-input
      filled
      v-model.number="males"
      label="Počet samcov v svorke"
      stack-label
      dense
      type="number"
      class="bg-white text-primary"
      style="margin-top: 10px;"
      :rules="[val => (val !== null && val >= 1) || 'Počet samcov musí byť aspoň 1']"
      hide-bottom-space
    />
    <q-input
      filled
      v-model.number="hunters"
      label="Percento loviacich samíc"
      stack-label
      dense
      type="number"
      class="bg-white text-primary"
      style="margin-top: 10px;"
      :rules="[val => (val !== null && val >= 20) || 'Percento loviacich samíc musí byť aspoň 20']"
      hide-bottom-space
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
    paramStore.resetStore(['iterations', 'packs', 'females', 'males', 'hunters']);
    paramStore.algorithm = 'lion';
    const model = ref<string | null>(null);

    const {
      iterations,
      packs,
      females,
      males,
      hunters,
    } = storeToRefs(paramStore);

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
