<!-- layout of page where parameters are choosed -->
<template>
  <div class="q-pa-md">
    <!-- text while computing -->
    <div v-if="isRunning" class="loading-text-overlay">
      <div class="loading-text">OPTIMALIZÁCIA PREBIEHA...</div>
    </div>

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
        @click="runWithLoading"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue';
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

    const isRunning = ref(false);

    const runWithLoading = async () => {
      isRunning.value = true;
      await nextTick();
      setTimeout(() => {
        (async () => {
          try {
            await checkInputs();
          } catch (e) {
            console.error(e);
          } finally {
            isRunning.value = false;
          }
        })().catch((error) => {
          console.error('Error in async function:', error);
        });
      }, 50);
    };

    return {
      selectedOptimization,
      selectedProblem,
      checkInputs,
      runWithLoading,
      isRunning,
    };
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

.loading-text-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-text {
  font-size: 30px;
  font-weight: bold;
  color: white;
  background-color: #027be3;
  padding: 1.5rem 3rem;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
}
</style>
