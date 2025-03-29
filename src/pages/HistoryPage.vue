<template>
  <q-page class="items-center">
    <h5>Posledné parametre</h5>
    <p>algorithm: {{ paramStore.algorithm }}</p>
    <p>problem: {{ paramStore.problem }}</p>
    <p>iterations: {{ paramStore.iterations }}</p>
    <p>population: {{ paramStore.population }}</p>
    <p>mutation: {{ paramStore.mutation }}</p>
    <p>showNewInput: {{ paramStore.showNewInput }}</p>
    <p>elitism: {{ paramStore.elitism }}</p>
    <p>choose: {{ paramStore.choose }}</p>
    <p>tournamentSize: {{ paramStore.tournamentSize }}</p>
    <p>crossing: {{ paramStore.crossing }}</p>
    <p>packs: {{ paramStore.packs }}</p>
    <p>females: {{ paramStore.females }}</p>
    <p>males: {{ paramStore.males }}</p>
    <p>hunters: {{ paramStore.hunters }}</p>
    <p>capacity: {{ paramStore.capacity }}</p>
    <p>knapsackItems: {{ paramStore.knapsackItems }}</p>
    <p>binItems: {{ paramStore.binItems }}</p>
    <p>cities: {{ paramStore.cities }}</p>
    <p>start: {{ paramStore.start }}</p>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useParamStore } from 'stores/paramStore';

export default defineComponent({
  name: 'HistoryPage',

  setup() {
    const paramStore = useParamStore();

    return {
      paramStore,
    };
  },
});
</script>

<style scoped>
</style>
