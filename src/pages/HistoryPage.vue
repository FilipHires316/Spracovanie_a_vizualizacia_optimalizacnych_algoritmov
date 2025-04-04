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
    v-if="(!isMobile || !rightDrawerOpen) && !screenSplit"
    dense
    flat
    round
    color="black"
    icon="menu"
    @click="toggleRightDrawer"
    style="position: fixed; z-index: 9998; top: 100px; right: 0"
  />

  <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered overlay v-show="!screenSplit">
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
    <div style="padding-left: 5vw; padding-right: 5vw; height: 85vh; overflow: hidden; overflow-y: scroll; scrollbar-width: none;">
      <q-page class="column items-center justify-evenly page">
        <div>
          {{ entries[leftSolutionIndex]?.bestFitness }}
          {{ entries[leftSolutionIndex]?.averageFitness }}
        </div>
        <div v-if="entries.length > 0" class="button-container" style="margin-top: 10px">
          <q-btn
            class="button"
            color="white"
            text-color="black"
            label="Predchádzajúce"
            @click="leftSolutionIndexDecrement"
            style="width: 10vw"
          />
          <q-btn
            class="button"
            color="primary"
            label="Ďalšie"
            @click="leftSolutionIndexIncrement"
            style="width: 10vw"
          />
        </div>
        <q-btn
          color="grey"
          :icon="screenSplit ? 'add' : 'remove'"
          @click="screenSplitShift"
          style="width: 4vw; height: 4vw; position: fixed; bottom: 1vw; right: 1vw;"
        />
      </q-page>
    </div>

    <div style="padding-left: 5vw; padding-right: 5vw; height: 85vh; overflow: hidden; overflow-y: scroll; scrollbar-width: none;" v-show="!screenSplit">
      <q-page class="column items-center justify-evenly page">
        <div>
          {{ entries[rightSolutionIndex] }}
        </div>
        <div v-if="entries.length > 0" class="button-container" style="margin-top: 10px">
          <q-btn
            class="button"
            color="white"
            text-color="black"
            label="Predchádzajúce"
            @click="rightSolutionIndexDecrement"
            style="width: 10vw"
          />
          <q-btn
            class="button"
            color="primary"
            label="Ďalšie"
            @click="rightSolutionIndexIncrement"
            style="width: 10vw"
          />
        </div>
        <q-btn
          color="grey"
          :icon="screenSplit ? 'add' : 'remove'"
          @click="screenSplitShift"
          style="width: 4vw; height: 4vw; position: fixed; bottom: 1vw; right: 1vw;"
        />
      </q-page>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import { useHistory } from 'stores/history'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'HistoryPage',

  components: {},

  setup() {
    const history = useHistory()
    const {
      entries
    } = storeToRefs(history);

    const leftDrawerOpen = ref(false)
    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    const rightDrawerOpen = ref(false)
    const toggleRightDrawer = () => {
      rightDrawerOpen.value = !rightDrawerOpen.value
    }

    const leftSolutionIndex = ref(history.entries.length - 1)
    const rightSolutionIndex = ref(history.entries.length - 1)

    const screenSplit = ref(true)

    const screenSplitShift = () => {
      screenSplit.value = !screenSplit.value
    }

    const leftSolutionIndexIncrement = () => {
      leftSolutionIndex.value++
      if (leftSolutionIndex.value > history.entries.length - 1)
        leftSolutionIndex.value = 0
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const leftSolutionIndexDecrement = () => {
      leftSolutionIndex.value--
      if (leftSolutionIndex.value < 0)
        leftSolutionIndex.value = history.entries.length - 1
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const leftSolutionIndexSet = (index: number) => {
      leftSolutionIndex.value = index
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const rightSolutionIndexIncrement = () => {
      rightSolutionIndex.value++
      if (rightSolutionIndex.value > history.entries.length - 1)
        rightSolutionIndex.value = 0
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const rightSolutionIndexDecrement = () => {
      rightSolutionIndex.value--
      if (rightSolutionIndex.value < 0)
        rightSolutionIndex.value = history.entries.length - 1
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const rightSolutionIndexSet = (index: number) => {
      rightSolutionIndex.value = index
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const isMobile = ref(false)

    const checkMobile = () => {
      isMobile.value = window.innerWidth <= 768
    }

    onMounted(() => {
      checkMobile()
      window.addEventListener('resize', checkMobile)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', checkMobile)
    })

    onMounted(() => {
      checkMobile()
      window.addEventListener('resize', checkMobile)
      leftDrawerOpen.value = false;
      rightDrawerOpen.value = false;
    })

    return {
      history,
      toggleLeftDrawer,
      leftDrawerOpen,
      toggleRightDrawer,
      rightDrawerOpen,
      leftSolutionIndex,
      rightSolutionIndex,
      isMobile,
      leftSolutionIndexIncrement,
      leftSolutionIndexDecrement,
      leftSolutionIndexSet,
      rightSolutionIndexIncrement,
      rightSolutionIndexDecrement,
      rightSolutionIndexSet,
      entries,
      screenSplit,
      screenSplitShift
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
  color: Black;
  border-radius: 20px;
  margin-top: 0.5vw;
  margin-left: 1vw;
  text-align: left;
  min-width: 250px;
  max-width: 250px;
}

.button {
  border-radius: 20px;
  min-width: 140px;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 1vw;
  margin-bottom: 2vw;
}

.page-container {
  display: flex;
  width: 100vw;
  height: 85vh;
  overflow: hidden;
  overflow-y: scroll;
  scrollbar-width: none;
}
</style>
