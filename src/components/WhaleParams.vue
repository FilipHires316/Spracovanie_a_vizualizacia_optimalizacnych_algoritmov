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
      v-model="population"
      label="Počet svoriek"
      stack-label
      dense
      class="bg-white text-primary"
      style="margin-top: 10px;"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'WhaleParams',
  setup() {
    const model = ref("optimum");
    const iterations = ref(20);
    const population = ref(80);

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
