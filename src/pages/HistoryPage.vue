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
        <GenerationGraph
          v-if="entries[leftSolutionIndex]"
          :bestFitness="entries[leftSolutionIndex]?.bestFitness as number[]"
          :averageFitness="entries[leftSolutionIndex]?.averageFitness as number[]"
          label="Vývoj Fitness"
          @bar-click="(genIndex) => leftIteration = genIndex"
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
        <GenerationGraph
          v-if="entries[rightSolutionIndex]"
          :bestFitness="entries[rightSolutionIndex]?.bestFitness as number[]"
          :averageFitness="entries[rightSolutionIndex]?.averageFitness as number[]"
          label="Vývoj Fitness"
          @bar-click="(genIndex) => rightIteration = genIndex"
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
  components: { GenerationGraph, IndividualsGraph},
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
      rightIteration
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
</style>
