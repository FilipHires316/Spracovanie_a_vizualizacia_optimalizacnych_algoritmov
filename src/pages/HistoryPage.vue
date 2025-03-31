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
  <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
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
            @click="solutionIndexSet(index)"
          />
        </q-expansion-item>
      </div>
    </q-scroll-area>
  </q-drawer>

  <q-page class="column items-center justify-evenly">
    <div>
      {{entries[solutionIndex]}}
    </div>
    <div v-if="entries.length > 0" class="button-container" style="margin-top: 10px">
      <q-btn
        class="button"
        color="white"
        text-color="black"
        label="Predchádzajúce"
        @click="solutionIndexDecrement"
        style="width: 10vw"
      />
      <q-btn
        class="button"
        color="primary"
        label="Ďalšie"
        @click="solutionIndexIncrement"
        style="width: 10vw"
      />
    </div>
  </q-page>
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

    const solutionIndex = ref(history.entries.length - 1)

    const solutionIndexIncrement = () => {
      solutionIndex.value++
      if (solutionIndex.value > history.entries.length - 1)
        solutionIndex.value = 0
    }

    const solutionIndexDecrement = () => {
      solutionIndex.value--
      if (solutionIndex.value < 0)
        solutionIndex.value = history.entries.length - 1
    }
    const solutionIndexSet = (index: number) => {
      solutionIndex.value = index
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

    return {
      history,
      toggleLeftDrawer,
      leftDrawerOpen,
      solutionIndex,
      isMobile,
      solutionIndexIncrement,
      solutionIndexDecrement,
      solutionIndexSet,
      entries
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
</style>
