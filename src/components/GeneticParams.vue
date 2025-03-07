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
        label="Veľkosť počiatočnej populácie"
        stack-label
        dense
        class="bg-white text-primary"
        style="margin-top: 10px;"
      />
      <q-input
        filled
        v-model="mutation"
        label="Pravdepodobnosť mutácie v %"
        stack-label
        dense
        class="bg-white text-primary"
        style="margin-top: 10px;"
      />
      <div style="margin-top: 10px; display: flex; align-items: center;">
        <q-toggle
          v-model="showNewInput"
          label="Elitizmus"
          color="white"
          style="margin-right: 10px;"
        />
        <q-input
          v-if="showNewInput"
          filled
          v-model="elitism"
          label="Miera elitizmu v %"
          stack-label
          dense
          class="bg-white text-primary"
          style="margin-top: 0; width: 100%"
        />
      </div>
    <div style="margin-top: 10px; display: flex; align-items: center;">
      <q-btn-toggle
        v-model="choose"
        class="my-custom-toggle"
        spread
        glossy
        no-caps
        unelevated
        toggle-color="primary"
        color="white"
        text-color="primary"
        :options="[
          {label: 'Ruleta', value: 'roulette'},
          {label: 'Turnaj', value: 'tournament'},
        ]"
      ></q-btn-toggle>
      <q-input
        v-if="choose == 'tournament'"
        filled
        v-model="tournamentSize"
        label="Veľkosť turnaju"
        stack-label
        dense
        class="bg-white text-primary"
        style="margin-top: 0; width: 100%; margin-left: 1vw;"
      />
    </div>
    <q-btn-toggle
      v-model="crossing"
      class="my-custom-toggle"
      spread
      glossy
      no-caps
      unelevated
      toggle-color="primary"
      color="white"
      text-color="primary"
      style="margin-top: 1vw;"
      :options="[
          {label: 'Jednobodové kríženie', value: 'one'},
          {label: 'Dvojbodové kríženie', value: 'two'},
          {label: 'Uniformné kríženie', value: 'uni'},
        ]"
    ></q-btn-toggle>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'GeneticParams',
  setup() {
    const model = ref("optimum");
    const iterations = ref(20);
    const population = ref(100);
    const mutation = ref(0.3);
    const showNewInput = ref(false); // false means hidden, true means shown
    const elitism = ref(3);
    const choose = ref("roulette");
    const tournamentSize = ref(3);
    const crossing = ref("one");

    return {
      model,
      iterations,
      population,
      mutation,
      showNewInput,
      elitism,
      choose,
      tournamentSize,
      crossing,
    };
  }
});
</script>

<style lang="scss" scoped>
</style>
