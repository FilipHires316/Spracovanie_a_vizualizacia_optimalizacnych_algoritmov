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
        no-caps
        elevated
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
      no-caps
      elevated
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
import { defineComponent, ref, watch } from 'vue';
import { geneticPresets } from 'stores/presets/geneticPresets'; // Import the config

export default defineComponent({
  name: 'GeneticParams',
  setup() {
    const model = ref<string | null>(null);
    const iterations = ref<number | null>(null);
    const population = ref<number | null>(null);
    const mutation = ref<number | null>(null);
    const showNewInput = ref<boolean>(false);
    const elitism = ref<number | null>(null);
    const choose = ref<string | null>(null);
    const tournamentSize = ref<number | null>(null);
    const crossing = ref<string | null>(null);

    // Watch for changes in model and apply preset values
    watch(model, (newVal) => {
      const preset = geneticPresets[newVal as keyof typeof geneticPresets];
      if (preset) {
        iterations.value = preset.iterations;
        population.value = preset.population;
        mutation.value = preset.mutation;
        showNewInput.value = preset.showNewInput;
        elitism.value = preset.elitism;
        choose.value = preset.choose;
        tournamentSize.value = preset.tournamentSize;
        crossing.value = preset.crossing;
    }
  });

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
