<template>
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
          <q-btn
            v-for="(item, index) in history.entries"
            :key="index"
            class="menuButton"
            :label="item.algorithm + ' + ' + item.problem"
            stack
            @click="leftSolutionIndexSet(index)"
          />
        </q-expansion-item>
      </div>
    </q-scroll-area>
  </q-drawer>

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
          <q-btn
            v-for="(item, index) in history.entries"
            :key="index"
            class="menuButton"
            :label="item.algorithm + ' + ' + item.problem"
            stack
            @click="rightSolutionIndexSet(index)"
          />
        </q-expansion-item>
      </div>
    </q-scroll-area>
  </q-drawer>

  <div class="page-container">
    <!-- Left Page -->
    <div class="scroll-wrapper" :style="{ width: screenSplit ? '50vw' : '100vw' }">
      <q-page class="column items-center justify-evenly page">
        <div v-if="entries[leftSolutionIndex]" class="headerBanner">
          <span class="title">
            {{
              entries[leftSolutionIndex]?.algorithm + ' + ' + entries[leftSolutionIndex]?.problem
            }}
          </span>
        </div>

        <div v-if="entries[leftSolutionIndex]" class="row q-col-gutter-md" style="margin-top: 10px; width: 100%">
          <div class="col-md-6 col-xs-12">
            <div
              class="q-pa-md bg-primary text-white shadow-2 rounded-borders flex column items-center" style="border-radius: 20px; height: 100%">
              <h4 class="section-title">Optimalizačný algoritmus</h4>
              <span class="paramInfo">{{'Počet iterácií: ' + entries[leftSolutionIndex]?.solution.length}}</span>
              <span class="paramInfo">{{'Velkosť populácie: ' + entries[leftSolutionIndex]?.solution[0]?.length}}</span>
              <span v-if="entries[leftSolutionIndex]?.algorithm == 'Genetický'" class="paramInfo">{{'Pravdepodobnosť mutácie: ' + 'x' + '%'}}</span>
              <span v-if="entries[leftSolutionIndex]?.algorithm == 'Genetický'" class="paramInfo">{{'Elitizmus: ' + 'Áno/Nie'}}</span>
              <span v-if="entries[leftSolutionIndex]?.algorithm == 'Genetický'" class="paramInfo">{{'Miera elitizmu: ' + 'x' + '%'}}</span>
              <span v-if="entries[leftSolutionIndex]?.algorithm == 'Genetický'" class="paramInfo">{{'Spôsob výberu jedincov: ' + 'Ruleta/Turnaj'}}</span>
              <span v-if="entries[leftSolutionIndex]?.algorithm == 'Genetický'" class="paramInfo">{{'Spôsob kríženia: ' + 'Jednobodové/Dvojbodové/Uniformné'}}</span>
              <span v-if="entries[leftSolutionIndex]?.algorithm == 'Levy'" class="paramInfo">{{'Počet svoriek: ' + 'x'}}</span>
              <span v-if="entries[leftSolutionIndex]?.algorithm == 'Levy'" class="paramInfo">{{'Počet samíc v svorke: ' + 'x'}}</span>
              <span v-if="entries[leftSolutionIndex]?.algorithm == 'Levy'" class="paramInfo">{{'Počet samcov v svorke: ' + 'x'}}</span>
              <span v-if="entries[leftSolutionIndex]?.algorithm == 'Levy'" class="paramInfo">{{'Loviace samice: ' + 'x' + '%'}}</span>
            </div>
          </div>

          <div class="col-md-6 col-xs-12">
            <div
              class="q-pa-md bg-primary text-white shadow-2 rounded-borders flex column items-center" style="border-radius: 20px; height: 100%">
              <h4 class="section-title">Optimalizačný problém</h4>
              <span v-if="entries[leftSolutionIndex]?.problem == 'Batoh' || entries[leftSolutionIndex]?.problem == 'Koše'" class="paramInfo">{{'Počet predmetov: ' + 'x'}}</span>
              <span v-if="entries[leftSolutionIndex]?.problem == 'Batoh' || entries[leftSolutionIndex]?.problem == 'Koše'" class="paramInfo">{{'Priemerná váha predmetov: ' + 'x'}}</span>
              <span v-if="entries[leftSolutionIndex]?.problem == 'Batoh'" class="paramInfo">{{'Priemerná cena predmetov: ' + 'x'}}</span>
              <span v-if="entries[leftSolutionIndex]?.problem == 'Obchodný cestujúci'" class="paramInfo">{{'Počet miest: ' + entries[leftSolutionIndex]?.solution.length}}</span>
            </div>
          </div>
        </div>

        <GenerationGraph
          v-if="entries[leftSolutionIndex]"
          :bestFitness="entries[leftSolutionIndex]?.bestFitness as number[]"
          :averageFitness="entries[leftSolutionIndex]?.averageFitness as number[]"
          label="Vývoj Fitness"
          @bar-click="(genIndex) => (leftIteration = genIndex)"
        />
        <IndividualsGraph
          v-if="entries[leftSolutionIndex]"
          style="max-width: 90vw; height: 50vw; padding: 20px"
          :data="entries[leftSolutionIndex]?.solution[leftIteration] ?? []"
          :label="'Fitness Jedincov'"
          @bar-click="(genIndex) => console.log('Clicked generation', genIndex)"
        />
      </q-page>
    </div>

    <!-- Right Page -->
    <div class="scroll-wrapper" v-show="screenSplit" :style="{ width: '50vw' }">
      <q-page class="column items-center justify-evenly page">
        <div v-if="entries[rightSolutionIndex]" class="headerBanner">
          <span class="title"
            >{{
              entries[rightSolutionIndex]?.algorithm + ' + ' + entries[rightSolutionIndex]?.problem
            }}
          </span>
        </div>
        <GenerationGraph
          v-if="entries[rightSolutionIndex]"
          :bestFitness="entries[rightSolutionIndex]?.bestFitness as number[]"
          :averageFitness="entries[rightSolutionIndex]?.averageFitness as number[]"
          label="Vývoj Fitness"
          @bar-click="(genIndex) => (rightIteration = genIndex)"
        />
        <IndividualsGraph
          v-if="entries[rightSolutionIndex]"
          style="max-width: 90vw; height: 50vw; padding: 20px"
          :data="entries[rightSolutionIndex]?.solution[rightIteration] ?? []"
          :label="'Fitness Jedincov'"
          @bar-click="(genIndex) => console.log('Clicked generation', genIndex)"
        />
      </q-page>
    </div>
  </div>

  <q-btn
    color="grey"
    :icon="screenSplit ? 'remove' : 'add'"
    @click="screenSplitShift"
    style="width: 4vw; height: 4vw; position: fixed; bottom: 1vw; right: 1vw"
  />
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import { useHistory } from 'stores/history'
import { storeToRefs } from 'pinia'
import GenerationGraph from 'components/visualisation/GenerationGraph.vue'
import IndividualsGraph from 'components/visualisation/IndividualsGraph.vue'

export default defineComponent({
  name: 'HistoryPage',
  components: {
    GenerationGraph,
    IndividualsGraph,
  },
  setup() {
    const history = useHistory()
    const { entries } = storeToRefs(history)

    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)
    const isMobile = ref(false)

    const leftIteration = ref(0)
    const rightIteration = ref(0)

    const leftSolutionIndex = ref(history.entries.length - 1)
    const rightSolutionIndex = ref(history.entries.length - 1)
    const screenSplit = ref(false)

    const toggleLeftDrawer = () => (leftDrawerOpen.value = !leftDrawerOpen.value)
    const toggleRightDrawer = () => (rightDrawerOpen.value = !rightDrawerOpen.value)
    const screenSplitShift = () => (screenSplit.value = !screenSplit.value)

    const leftSolutionIndexSet = (index: number) => {
      leftSolutionIndex.value = index
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const rightSolutionIndexSet = (index: number) => {
      rightSolutionIndex.value = index
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const checkMobile = () => {
      isMobile.value = window.innerWidth <= 768
    }

    onMounted(() => {
      checkMobile()
      window.addEventListener('resize', checkMobile)
      leftDrawerOpen.value = false
      rightDrawerOpen.value = false
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', checkMobile)
    })

    return {
      history,
      entries,
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
    }
  },
})
</script>

<style scoped>
.Menu {
  position: relative;
  margin-top: 3vw;
  margin-bottom: 1vw;
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
  width: 16.5vw;
  background: white;
  color: black;
  border-radius: 20px;
  margin-top: 0.5vw;
  margin-left: 1vw;
  text-align: left;
  min-width: 250px;
  max-width: 250px;
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
