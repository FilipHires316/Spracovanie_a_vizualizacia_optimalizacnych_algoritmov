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
    <q-scroll-area style="height: 100%; flex: 1;" class="custom-scroll">
      <div class="Menu">
        <q-expansion-item
          class="MenuBanner"
          expand-separator
          label="ÚVOD"
          default-opened
          header-style="border-radius: 20px"
          expand-icon-class="text-white"
          header-class="bg-primary"
        >
          <q-btn class="menuButton" label="Optimalizácia" icon="info" stack @click="showComponent('TeachingAlgorithms', 0)"/>
        </q-expansion-item>

        <q-expansion-item
          class="MenuBanner"
          expand-separator
          label="OPTIMALIZAČNÉ ALGORITMY"
          default-opened
          header-style="border-radius: 20px"
          expand-icon-class="text-white"
          header-class="bg-primary"
        >
          <q-btn class="menuButton" label="Genetický algoritmus" icon="science" stack @click="showComponent('TeachingGenetic', 1)"/>
          <q-btn class="menuButton" label="Algoritmus inšpirovaný správaním levov" icon="pets" stack @click="showComponent('TeachingLion', 2)"/>
          <q-btn class="menuButton" label="Algoritmus inšpirovaný správaním veľrýb" icon="waves" stack @click="showComponent('TeachingWhale', 3)"/>
        </q-expansion-item>

        <q-expansion-item
          class="MenuBanner"
          expand-separator
          label="OPTIMALIZAČNÉ PROBLÉMY"
          default-opened
          header-style="border-radius: 20px"
          expand-icon-class="text-white"
          header-class="bg-primary"
        >
          <q-btn class="menuButton" label="Problém batohu" icon="shopping_bag" stack @click="showComponent('TeachingKnapsack', 4)"/>
          <q-btn class="menuButton" label="Problém balenia košov" icon="delete" stack @click="showComponent('TeachingBin', 5)"/>
          <q-btn class="menuButton" label="Problém obchodného cestujúceho" icon="flight_takeoff" stack @click="showComponent('TeachingSalesman', 6)"/>
        </q-expansion-item>
        <q-expansion-item
          class="MenuBanner"
          expand-separator
          label="ZDROJE"
          default-opened
          header-style="border-radius: 20px"
          expand-icon-class="text-white"
          header-class="bg-primary"
        >
          <q-btn class="menuButton" label="Použitá literatúra" icon="book" stack @click="showComponent('ResourcesAndLiterature', 7)"/>
        </q-expansion-item>
      </div>
    </q-scroll-area>
  </q-drawer>

  <q-page class="column items-center justify-evenly">
    <component :is="visibleComponent"/>
    <div class="button-container">
      <q-btn class="button" color="white" text-color="black" label="Predchádzajúce" @click="changeComponent(-1)" style="width: 10vw"/>
      <q-btn class="button" color="primary" label="Ďalšie" @click="changeComponent(1)" style="width: 10vw"/>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount} from 'vue';
import TeachingAlgorithms from 'components/TeachingAlgorithms.vue';
import TeachingGenetic from 'components/TeachingGenetic.vue';
import TeachingLion from 'components/TeachingLion.vue';
import TeachingWhale from 'components/TeachingWhales.vue';
import TeachingKnapsack from 'components/TeachingKnapsack.vue';
import TeachingBin from 'components/TeachingBin.vue';
import TeachingSalesman from 'components/TeachingSalesman.vue';
import ResourcesAndLiterature from 'components/ResourcesAndLiterature.vue';

export default defineComponent({
  name: 'AboutAlgorithmsPage',

  components: {
    TeachingAlgorithms,
    TeachingGenetic,
    TeachingLion,
    TeachingWhale,
    TeachingKnapsack,
    TeachingBin,
    TeachingSalesman,
    ResourcesAndLiterature
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    const visibleComponent = ref('TeachingAlgorithms');
    const componentIndex = ref(0);

    const components = [
      'TeachingAlgorithms',
      'TeachingGenetic',
      'TeachingLion',
      'TeachingWhale',
      'TeachingKnapsack',
      'TeachingBin',
      'TeachingSalesman',
      'ResourcesAndLiterature',
    ];

    const showComponent = (componentName: string, index: number) => {
      visibleComponent.value = componentName;
      componentIndex.value = index;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const changeComponent = (direction: number) => {
      componentIndex.value = (componentIndex.value + direction + components.length) % components.length;
      visibleComponent.value = components[componentIndex.value]!;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Reactive value for screen size detection
    const isMobile = ref(false);

    // Function to check screen width
    const checkMobile = () => {
      isMobile.value = window.innerWidth <= 768; // Adjust the breakpoint if necessary
    };

    // Check the screen width when component is mounted
    onMounted(() => {
      checkMobile();
      window.addEventListener('resize', checkMobile);
    });

    // Cleanup event listener when component is unmounted
    onBeforeUnmount(() => {
      window.removeEventListener('resize', checkMobile);
    });

    return {
      toggleLeftDrawer,
      leftDrawerOpen,
      visibleComponent,
      showComponent,
      componentIndex,
      changeComponent,
      isMobile
    };
  }
});
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
