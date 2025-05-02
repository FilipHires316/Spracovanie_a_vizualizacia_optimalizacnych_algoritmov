<!-- layout of history page -->
<template>
  <!-- button for opening left drawer with history entries -->
  <q-btn
    v-if="!isMobile || !leftDrawerOpen"
    dense
    flat
    round
    color="black"
    icon="menu"
    @click="toggleLeftDrawer"
    style="position: fixed; z-index: 9998; top: 100px; left: 0"
  />
  <!-- left drawer with history entries -->
  <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered overlay>
    <q-scroll-area style="height: 100%; flex: 1" class="custom-scroll">
      <div class="Menu">
        <q-expansion-item
          class="MenuBanner"
          expand-separator
          label="HISTÓRIA"
          default-opened
          header-style="border-radius: 20px"
          expand-icon-class="text-white"
          header-class="bg-primary"
        >
          <div v-for="(item, index) in history" :key="index">
            <q-item>
              <q-btn
                class="deleteButton"
                stack
                round
                icon="cancel"
                @click="deleteEntryByIndex(item)"
              />
              <q-btn
                class="menuButton"
                :label="'Výpočet ' + item"
                stack
                @click="leftSolutionIndexSet(item)"
              />
            </q-item>
          </div>
          <q-btn
            class="deleteButton"
            style="margin-left: 120px; margin-top: 20px; "
            round
            icon="delete"
            @click="resetDB()"
          />
        </q-expansion-item>
      </div>
    </q-scroll-area>
  </q-drawer>

  <!-- button for opening right drawer with history entries only if screen is split -->
  <q-btn
    v-if="(!isMobile || !rightDrawerOpen) && screenSplit"
    dense
    flat
    round
    color="black"
    icon="menu"
    @click="toggleRightDrawer"
    style="position: fixed; z-index: 9998; top: 100px; right: 0"
  />

  <!-- right drawer with history entries only if screen is split-->
  <q-drawer
    show-if-above
    v-model="rightDrawerOpen"
    side="right"
    bordered
    overlay
    v-show="screenSplit"
  >
    <q-scroll-area style="height: 100%; flex: 1" class="custom-scroll">
      <div class="Menu">
        <q-expansion-item
          class="MenuBanner"
          expand-separator
          label="HISTÓRIA"
          default-opened
          header-style="border-radius: 20px"
          expand-icon-class="text-white"
          header-class="bg-primary"
        >
          <div v-for="(item, index) in history" :key="index">
            <q-item>
              <q-btn
                class="deleteButton"
                stack
                round
                icon="cancel"
                @click="deleteEntryByIndex(item)"
              />
              <q-btn
                class="menuButton"
                :label="'Výpočet ' + item"
                stack
                @click="rightSolutionIndexSet(item)"
              />
            </q-item>
          </div>
          <q-btn
            class="deleteButton"
            style="margin-left: 120px; margin-top: 20px; "
            round
            icon="delete"
            @click="resetDB()"
          />
        </q-expansion-item>
      </div>
    </q-scroll-area>
  </q-drawer>

  <div class="page-container" v-if="leftSolutionEntry && rightSolutionEntry">
    <!-- left page with visualisation of solution is filling entire page if screen is not split -->
    <div class="scroll-wrapper" :style="{ width: screenSplit ? '50vw' : '100vw' }">
      <q-page class="column items-center justify-evenly page">
        <!-- title of the problem solved and algorithm used -->
        <div class="headerBanner">
          <span class="title">
            {{
             leftSolutionEntry.algorithm + ' + ' + leftSolutionEntry.problem
            }}
          </span>
        </div>

        <!-- parameters of chosen algorithm -->
        <div class="row q-col-gutter-md" style="margin-top: 10px; width: 100%">
          <div class="col-md-6 col-xs-12">
            <div
              class="q-pa-md bg-primary text-white shadow-2 rounded-borders flex column items-center" style="border-radius: 20px; height: 100%">
              <h4 class="section-title">Optimalizačný algoritmus</h4>
              <span class="paramInfo">{{'Počet iterácií: ' + leftSolutionEntry.solution.length}}</span>
              <span class="paramInfo">{{'Velkosť populácie: ' + leftSolutionEntry.solution[0]?.length}}</span>
              <span v-if="leftSolutionEntry.algorithm == 'Genetický'" class="paramInfo">{{'Pravdepodobnosť mutácie: ' + leftSolutionEntry.mutation + '%'}}</span>
              <span v-if="leftSolutionEntry.algorithm == 'Genetický' && leftSolutionEntry.elitism" class="paramInfo">{{'Elitizmus: Áno'}}</span>
              <span v-if="leftSolutionEntry.algorithm == 'Genetický' && !leftSolutionEntry.elitism" class="paramInfo">{{'Elitizmus: Nie'}}</span>
              <span v-if="leftSolutionEntry.algorithm == 'Genetický' && leftSolutionEntry.elitism" class="paramInfo">{{'Miera elitizmu: ' + leftSolutionEntry.elitismRate + '%'}}</span>
              <span v-if="leftSolutionEntry.algorithm == 'Genetický' && leftSolutionEntry.choose == 'roulette'" class="paramInfo">{{'Spôsob výberu jedincov: Ruleta'}}</span>
              <span v-if="leftSolutionEntry.algorithm == 'Genetický' && leftSolutionEntry.choose == 'tournament'" class="paramInfo">{{'Spôsob výberu jedincov: Turnaj'}}</span>
              <span v-if="leftSolutionEntry.algorithm == 'Genetický' && leftSolutionEntry.crossing == 'one'" class="paramInfo">{{'Spôsob kríženia: Jednobodové'}}</span>
              <span v-if="leftSolutionEntry.algorithm == 'Genetický' && leftSolutionEntry.crossing == 'two'" class="paramInfo">{{'Spôsob kríženia: Dvojbodové'}}</span>
              <span v-if="leftSolutionEntry.algorithm == 'Genetický' && leftSolutionEntry.crossing == 'uni'" class="paramInfo">{{'Spôsob kríženia: Uniformné'}}</span>
              <span v-if="leftSolutionEntry.algorithm == 'Levy'" class="paramInfo">{{'Počet svoriek: ' + leftSolutionEntry.packs}}</span>
              <span v-if="leftSolutionEntry.algorithm == 'Levy'" class="paramInfo">{{'Počet samíc v svorke: ' + leftSolutionEntry.females}}</span>
              <span v-if="leftSolutionEntry.algorithm == 'Levy'" class="paramInfo">{{'Počet samcov v svorke: ' + leftSolutionEntry.males}}</span>
              <span v-if="leftSolutionEntry.algorithm == 'Levy'" class="paramInfo">{{'Loviace samice: ' + leftSolutionEntry.hunters + '%'}}</span>
            </div>
          </div>

          <!-- parameters of chosen problem -->
          <div class="col-md-6 col-xs-12">
            <div
              class="q-pa-md bg-primary text-white shadow-2 rounded-borders flex column items-center" style="border-radius: 20px; height: 100%">
              <h4 class="section-title">Optimalizačný problém</h4>
              <span v-if="leftSolutionEntry.problem == 'Batoh' || leftSolutionEntry.problem == 'Koše'" class="paramInfo">{{'Kapacita: ' + leftSolutionEntry.capacity }}</span>
              <span v-if="leftSolutionEntry.problem == 'Batoh' || leftSolutionEntry.problem == 'Koše'" class="paramInfo">{{'Počet predmetov: ' + leftSolutionEntry.count}}</span>
              <span v-if="leftSolutionEntry.problem == 'Batoh' || leftSolutionEntry.problem == 'Koše'" class="paramInfo">{{'Priemerná velkosť predmetov: ' + leftSolutionEntry.averageWeight}}</span>
              <span v-if="leftSolutionEntry.problem == 'Batoh'" class="paramInfo">{{'Priemerná cena predmetov: ' + leftSolutionEntry.averagePrice}}</span>
              <span v-if="leftSolutionEntry.problem == 'Obchodný cestujúci'" class="paramInfo">{{'Počet miest: ' + leftSolutionEntry.count }}</span>
            </div>
          </div>
        </div>

        <!-- fitness graph of entire population -->
        <GenerationGraph
          style="width: 98%; margin-top: 20px; height: 20vw"
          :bestFitness="leftSolutionEntry.bestFitness as number[]"
          :averageFitness="leftSolutionEntry.averageFitness as number[]"
          label="Vývoj Fitness"
          @bar-click="(genIndex) => (leftIteration = genIndex)"
        />

        <!-- fitness graph of one iteration -->
        <IndividualsGraph
          style="width: 98%; margin-top: 20px; height: 20vw"
          :Fitness="leftSolutionEntry.fitness[leftIteration] ?? []"
          :label="'Fitness Jedincov'"
          @bar-click="(genIndex) => { leftIndividual = genIndex }"
        />

        <!-- visualisation of traveling salesman problem solution -->
        <SalesmanVisualisation
          style="width: 98%; margin-top: 20px; margin-bottom: 20px"
          v-if="leftSolutionEntry.problem == 'Obchodný cestujúci'"
          :cities="leftSolutionEntry.solution[leftIteration]?.[leftIndividual] ?? []"
        />

        <!-- visualisation of knapsack problem solution -->
        <KnapsackVisualisation
          style="width: 98%; margin-top: 20px; margin-bottom: 20px"
          v-if="leftSolutionEntry.problem == 'Batoh'"
          :solution="leftSolutionEntry.solution[leftIteration]?.[leftIndividual] ?? []"
          :capacity="leftSolutionEntry.capacity as number"
        />

        <!-- visualisation of bin packing problem solution -->
        <BinVisualisation
          style="width: 98%; margin-top: 20px; margin-bottom: 20px"
          v-if="leftSolutionEntry.problem == 'Koše'"
          :solution="leftSolutionEntry.solution[leftIteration]?.[leftIndividual] ?? []"
          :capacity="leftSolutionEntry.capacity as number"
        />
      </q-page>
    </div>

    <!-- right page with visualisation of solution only if screen is split -->
    <div v-if="screenSplit" class="scroll-wrapper" :style="{ width: screenSplit ? '50vw' : '100vw' }">
      <q-page class="column items-center justify-evenly page">
        <!-- title of the problem solved and algorithm used -->
        <div class="headerBanner">
          <span class="title">
            {{
              rightSolutionEntry.algorithm + ' + ' + rightSolutionEntry.problem
            }}
          </span>
        </div>

        <!-- parameters of chosen algorithm -->
        <div class="row q-col-gutter-md" style="margin-top: 10px; width: 100%">
          <div class="col-md-6 col-xs-12">
            <div
              class="q-pa-md bg-primary text-white shadow-2 rounded-borders flex column items-center" style="border-radius: 20px; height: 100%">
              <h4 class="section-title">Optimalizačný algoritmus</h4>
              <span class="paramInfo">{{'Počet iterácií: ' + rightSolutionEntry.solution.length}}</span>
              <span class="paramInfo">{{'Velkosť populácie: ' + rightSolutionEntry.solution[0]?.length}}</span>
              <span v-if="rightSolutionEntry.algorithm == 'Genetický'" class="paramInfo">{{'Pravdepodobnosť mutácie: ' + rightSolutionEntry.mutation + '%'}}</span>
              <span v-if="rightSolutionEntry.algorithm == 'Genetický' && rightSolutionEntry.elitism" class="paramInfo">{{'Elitizmus: Áno'}}</span>
              <span v-if="rightSolutionEntry.algorithm == 'Genetický' && !rightSolutionEntry.elitism" class="paramInfo">{{'Elitizmus: Nie'}}</span>
              <span v-if="rightSolutionEntry.algorithm == 'Genetický' && rightSolutionEntry.elitism" class="paramInfo">{{'Miera elitizmu: ' + rightSolutionEntry.elitismRate + '%'}}</span>
              <span v-if="rightSolutionEntry.algorithm == 'Genetický' && rightSolutionEntry.choose == 'roulette'" class="paramInfo">{{'Spôsob výberu jedincov: Ruleta'}}</span>
              <span v-if="rightSolutionEntry.algorithm == 'Genetický' && rightSolutionEntry.choose == 'tournament'" class="paramInfo">{{'Spôsob výberu jedincov: Turnaj'}}</span>
              <span v-if="rightSolutionEntry.algorithm == 'Genetický' && rightSolutionEntry.crossing == 'one'" class="paramInfo">{{'Spôsob kríženia: Jednobodové'}}</span>
              <span v-if="rightSolutionEntry.algorithm == 'Genetický' && rightSolutionEntry.crossing == 'two'" class="paramInfo">{{'Spôsob kríženia: Dvojbodové'}}</span>
              <span v-if="rightSolutionEntry.algorithm == 'Genetický' && rightSolutionEntry.crossing == 'uni'" class="paramInfo">{{'Spôsob kríženia: Uniformné'}}</span>
              <span v-if="rightSolutionEntry.algorithm == 'Levy'" class="paramInfo">{{'Počet svoriek: ' + rightSolutionEntry.packs}}</span>
              <span v-if="rightSolutionEntry.algorithm == 'Levy'" class="paramInfo">{{'Počet samíc v svorke: ' + rightSolutionEntry.females}}</span>
              <span v-if="rightSolutionEntry.algorithm == 'Levy'" class="paramInfo">{{'Počet samcov v svorke: ' + rightSolutionEntry.males}}</span>
              <span v-if="rightSolutionEntry.algorithm == 'Levy'" class="paramInfo">{{'Loviace samice: ' + rightSolutionEntry.hunters + '%'}}</span>
            </div>
          </div>

          <!-- parameters of chosen problem -->
          <div class="col-md-6 col-xs-12">
            <div
              class="q-pa-md bg-primary text-white shadow-2 rounded-borders flex column items-center" style="border-radius: 20px; height: 100%">
              <h4 class="section-title">Optimalizačný problém</h4>
              <span v-if="rightSolutionEntry.problem == 'Batoh' || rightSolutionEntry.problem == 'Koše'" class="paramInfo">{{'Kapacita: ' + rightSolutionEntry.capacity }}</span>
              <span v-if="rightSolutionEntry.problem == 'Batoh' || rightSolutionEntry.problem == 'Koše'" class="paramInfo">{{'Počet predmetov: ' + rightSolutionEntry.count}}</span>
              <span v-if="rightSolutionEntry.problem == 'Batoh' || rightSolutionEntry.problem == 'Koše'" class="paramInfo">{{'Priemerná velkosť predmetov: ' + rightSolutionEntry.averageWeight}}</span>
              <span v-if="rightSolutionEntry.problem == 'Batoh'" class="paramInfo">{{'Priemerná cena predmetov: ' + rightSolutionEntry.averagePrice}}</span>
              <span v-if="rightSolutionEntry.problem == 'Obchodný cestujúci'" class="paramInfo">{{'Počet miest: ' + rightSolutionEntry.count }}</span>
            </div>
          </div>
        </div>

        <!-- fitness graph of entire population -->
        <GenerationGraph
          style="width: 98%; margin-top: 20px; height: 20vw"
          :bestFitness="rightSolutionEntry.bestFitness as number[]"
          :averageFitness="rightSolutionEntry.averageFitness as number[]"
          label="Vývoj Fitness"
          @bar-click="(genIndex) => (rightIteration = genIndex)"
        />

        <!-- fitness graph of one iteration -->
        <IndividualsGraph
          style="width: 98%; margin-top: 20px; height: 20vw"
          :Fitness="rightSolutionEntry.fitness[rightIteration] ?? []"
          :label="'Fitness Jedincov'"
          @bar-click="(genIndex) => { rightIndividual = genIndex}"
        />

        <!-- visualisation of traveling salesman problem solution -->
        <SalesmanVisualisation
          style="width: 98%; margin-top: 20px; margin-bottom: 20px"
          v-if="rightSolutionEntry.problem == 'Obchodný cestujúci'"
          :cities="rightSolutionEntry.solution[rightIteration]?.[rightIndividual] ?? []"
        />

        <!-- visualisation of knapsack problem solution -->
        <KnapsackVisualisation
          style="width: 98%; margin-top: 20px; margin-bottom: 20px"
          v-if="rightSolutionEntry.problem == 'Batoh'"
          :solution="rightSolutionEntry.solution[rightIteration]?.[rightIndividual] ?? []"
          :capacity="rightSolutionEntry.capacity as number"
        />

        <!-- visualisation of bin packing problem solution -->
        <BinVisualisation
          style="width: 98%; margin-top: 20px; margin-bottom: 20px"
          v-if="rightSolutionEntry.problem == 'Koše'"
          :solution="rightSolutionEntry.solution[rightIteration]?.[rightIndividual] ?? []"
          :capacity="rightSolutionEntry.capacity as number"
        />
      </q-page>
    </div>

    <!-- button for splitting the screen -->
    <q-btn
      color="grey"
      :icon="screenSplit ? 'remove' : 'add'"
      @click="screenSplitShift"
      style="width: 4vw; height: 4vw; position: fixed; bottom: 1vw; right: 1vw"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref, watchEffect } from 'vue'
import { getEntryFromDB, getAllEntryIndexes, deleteEntry, resetEntriesObjectStore } from 'stores/db'
import GenerationGraph from 'components/visualisation/GenerationGraph.vue'
import IndividualsGraph from 'components/visualisation/IndividualsGraph.vue'
import SalesmanVisualisation from 'components/visualisation/SalesmanVisualisation.vue'
import KnapsackVisualisation from 'components/visualisation/KnapsackVisualisation.vue'
import BinVisualisation from 'components/visualisation/BinVisualisation.vue'
import type { HistoryEntry } from 'stores/individuals/HistoryEntry'

export default defineComponent({
  name: 'HistoryPage',
  components: {
    GenerationGraph,
    IndividualsGraph,
    SalesmanVisualisation,
    KnapsackVisualisation,
    BinVisualisation
  },
  setup() {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)
    const isMobile = ref(false)

    const leftIteration = ref(0)
    const rightIteration = ref(0)

    const history = ref<number[]>([])

    const leftSolutionIndex = ref(0)
    const rightSolutionIndex = ref(0)

    const leftIndividual = ref(0)
    const rightIndividual = ref(0)

    const screenSplit = ref(false)

    const toggleLeftDrawer = () => (leftDrawerOpen.value = !leftDrawerOpen.value)
    const toggleRightDrawer = () => (rightDrawerOpen.value = !rightDrawerOpen.value)
    const screenSplitShift = () => (screenSplit.value = !screenSplit.value)

    const leftSolutionIndexSet = (index: number) => {
      leftSolutionIndex.value = index
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const deleteEntryByIndex = async (index: number) => {
      await deleteEntry(index)
      history.value = await getAllEntryIndexes()
    }

    const resetDB = async () => {
      await resetEntriesObjectStore()
      history.value = await getAllEntryIndexes()
    }

    const rightSolutionIndexSet = (index: number) => {
      rightSolutionIndex.value = index
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const checkMobile = () => {
      isMobile.value = window.innerWidth <= 768
    }

    onMounted(async () => {
      checkMobile()
      window.addEventListener('resize', checkMobile)

      history.value = await getAllEntryIndexes()
      if (history.value.length > 0) {
        leftSolutionIndex.value = history.value[history.value.length - 1]!
        rightSolutionIndex.value = history.value[history.value.length - 1]!
      }
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', checkMobile)
    })

    const leftSolutionEntry = ref<HistoryEntry | null>(null)
    const rightSolutionEntry = ref<HistoryEntry | null>(null)

    watchEffect(() => {
      getEntryFromDB(leftSolutionIndex.value)
        .then(entry => {
          leftSolutionEntry.value = entry
        })
        .catch(error => {
          console.error('Error fetching left solution entry:', error)
        })

      getEntryFromDB(rightSolutionIndex.value)
        .then(entry => {
          rightSolutionEntry.value = entry
        })
        .catch(error => {
          console.error('Error fetching right solution entry:', error)
        })
    })

    return {
      history,
      toggleLeftDrawer,
      leftDrawerOpen,
      toggleRightDrawer,
      rightDrawerOpen,
      isMobile,
      leftSolutionIndex,
      rightSolutionIndex,
      screenSplit,
      screenSplitShift,
      leftSolutionIndexSet,
      rightSolutionIndexSet,
      leftIteration,
      rightIteration,
      leftIndividual,
      rightIndividual,
      leftSolutionEntry,
      rightSolutionEntry,
      deleteEntryByIndex,
      resetDB
    }
  },
})
</script>



<style scoped>
.Menu {
  position: relative;
  margin-top: 3vw;
  margin-bottom: 1vw;
  align-items: center;
}

.MenuBanner {
  width: 17.5vw;
  background: white;
  color: white;
  border-radius: 20px;
  margin-left: 1vw;
  margin-top: 1vw;
  min-width: 260px;
  max-width: 270px;
}

.menuButton {
  width: 95%;
  background: whitesmoke;
  color: black;
  border-radius: 20px;
  margin-top: 0.5vw;
  margin-left: 1vw;
  text-align: left;
}

.deleteButton {
  width: 5%;
  background: whitesmoke;
  color: red;
  border-radius: 20px;
  margin-top: 0.5vw;
  margin-left: 1vw;
  text-align: left;
}

.page-container {
  display: flex;
  width: 100vw;
  height: 85vh;
  overflow: hidden;
}

.scroll-wrapper {
  height: 85vh;
  overflow-y: auto;
  padding-left: 5vw;
  padding-right: 5vw;
  scrollbar-width: none;
}

.headerBanner {
  width: 100%;
  background-color: #1976d2;
  margin-top: 20px;
  border-radius: 20px;
  padding: 20px;
  justify-content: center;
  display: flex;
}

.title {
  color: white;
  font-size: 27px;
}

.section-title {
  font-family: 'Arial', sans-serif;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 1vw;
  color: white;
}

.paramInfo {
  font-family: 'Arial', sans-serif;
  font-size: 15px;
  font-weight: bold;
}
</style>
