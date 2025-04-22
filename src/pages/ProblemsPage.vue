<!-- layout of page where parameters are choosed -->
<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-md items-stretch">
      <div class="col-md-6 col-xs-12">
        <!-- input parameters for algorithm -->
        <div class="q-pa-md bg-primary text-white shadow-2 rounded-borders column items-center full-height">
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
        <!-- input parameters for problem -->
        <div class="q-pa-md bg-primary text-white shadow-2 rounded-borders column items-center full-height">
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
    <!-- button for starting the simulation -->
    <div class="button-container">
      <q-btn
        icon="play_arrow"
        round
        color="primary"
        size="20px"
        class="q-mb-md"
        style="margin-top: 1vw"
        @click="checkInputs"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import GeneticParams from 'components/paramSelection/GeneticParams.vue';
import LionParams from 'components/paramSelection/LionParams.vue'
import WhaleParams from 'components/paramSelection/WhaleParams.vue'
import KnapsackParams from 'components/paramSelection/KnapsackParams.vue'
import BinParams from 'components/paramSelection/BinParams.vue'
import SalesmanParams from 'components/paramSelection/SalesmanParams.vue'
import { useParamStore } from 'stores/paramStore'

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
    const selectedOptimization = ref('Genetic');
    const selectedProblem = ref('Knapsack');
    const paramStore = useParamStore();
    const checkInputs = paramStore.checkInputs;

    return { selectedOptimization, selectedProblem, checkInputs };
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
