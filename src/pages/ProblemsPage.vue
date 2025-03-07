<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-md-6 col-xs-12">
        <div class="q-pa-md bg-primary text-white shadow-2 rounded-borders flex column items-center" style="height: 100%; min-height: 32vw">
          <h4 class="section-title">Vstupné parametre optimalizačného algoritmu</h4>
          <q-tabs
            v-model="selectedOptimization"
            inline-label
            class="bg-primary text-white"
            shrink
            style="width: 100%; padding-left: 3vw; padding-right: 3vw"
          >
            <q-tab name="Genetic" icon="science" label="Genetický" style="white-space: nowrap;" />
            <q-tab name="Lions" icon="pets" label="Inšpirovaný levmi" style="white-space: nowrap;" />
            <q-tab name="Whales" icon="waves" label="Inšpirovaný veľrybami" style="white-space: nowrap;" />
          </q-tabs>
          <GeneticParams v-if="selectedOptimization === 'Genetic'" />
          <LionParams v-if="selectedOptimization === 'Lions'" />
          <WhaleParams v-if="selectedOptimization === 'Whales'" />
        </div>
      </div>

      <div class="col-md-6 col-xs-12">
        <div class="q-pa-md bg-primary text-white shadow-2 rounded-borders flex column items-center" style="height: 100%; min-height: 32vw">
          <h4 class="section-title">Vstupné parametre optimalizačného problému</h4>
          <q-tabs
            v-model="selectedProblem"
            inline-label
            class="bg-primary text-white"
            shrink
          >
            <q-tab name="Knapsack" icon="shopping_bag" label="Batoh" style="white-space: nowrap;" />
            <q-tab name="Bin" icon="delete" label="Koše" style="white-space: nowrap;" />
            <q-tab name="Salesman" icon="flight_takeoff" label="Obchodný cestujúci" style="white-space: nowrap;" />
          </q-tabs>
          <KnapsackParams v-if="selectedProblem === 'Knapsack'" />
          <BinParams v-if="selectedProblem === 'Bin'" />
          <SalesmanParams v-if="selectedProblem === 'Salesman'" />
        </div>
      </div>
    </div>
    <div class="button-container">
      <q-btn
        icon="play_arrow"
        round
        color="primary"
        size="20px"
        class="q-mb-md"
        style="margin-top: 1vw"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import GeneticParams from 'components/GeneticParams.vue';
import LionParams from 'components/LionParams.vue'
import WhaleParams from 'components/WhaleParams.vue'
import KnapsackParams from 'components/KnapsackParams.vue'
import BinParams from 'components/BinParams.vue'
import SalesmanParams from 'components/SalesmanParams.vue'

export default defineComponent({
  name: 'ProblemsPage',

  components: {
    GeneticParams,
    LionParams,
    WhaleParams,
    KnapsackParams,
    BinParams,
    SalesmanParams,
  },

  setup() {
    const selectedOptimization = ref('Genetic'); // Default selection for optimization algorithm
    const selectedProblem = ref('Knapsack'); // Default selection for problem

    return { selectedOptimization, selectedProblem };
  }
});
</script>

<style scoped>
.section-title {
  font-family: 'Arial', sans-serif;
  font-size: 27px;
  font-weight: bold;
  margin-bottom: 1vw;
  color: white;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 1vw;
  margin-top: 1vw;
  margin-bottom: 2vw;
}
</style>
