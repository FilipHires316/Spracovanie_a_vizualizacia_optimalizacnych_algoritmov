<template>
  <div class="content-container" style="margin-top: 1vw">
    <q-btn-toggle
      v-model="model"
      class="my-custom-toggle"
      spread
      no-caps
      elevated
      toggle-color="primary"
      color="white"
      text-color="primary"
      :options="[
        { label: 'Optimálne', icon: 'check', value: 'optimum' },
        { label: 'Veľa možností', icon: 'trending_up', value: 'big' },
        { label: 'Rýchly výpočet', icon: 'timer', value: 'small' },
        { label: 'Vlastné', icon: 'tuned', value: 'own' }
      ]"
    ></q-btn-toggle>

    <h5 class="subsection-title">Počiatočné / Koncové mesto:</h5>
    <div v-for="item in start" :key="item.id">
      <CityItem :item="item" :showButton="false" />
    </div>

    <h5 class="subsection-title">Ostatné mestá:</h5>
    <div v-for="item in cities" :key="item.id">
      <CityItem :item="item" @delete="removeItem" @update="updateCity" />
    </div>

    <q-btn
      icon="add"
      color="green"
      text-color="white"
      size="lg"
      class="q-mb-md custom-button"
      style="margin-top: 1vw; margin-left: 41%"
      @click="addItem()"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import CityItem from 'components/paramSelection/CityItem.vue';
import { salesmanPresets } from 'stores/presets/salesmanPresets';
import { useParamStore } from 'stores/paramStore';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'SalesmanParams',
  components: { CityItem },
  setup() {
    let idCounter = 0;
    const paramStore = useParamStore();
    paramStore.resetStore(['start', 'cities']);
    paramStore.problem = 'salesman';
    const model = ref<string | null>(null);
    const { start, cities } = storeToRefs(paramStore);

    const addItem = (x: number = 0, y: number = 0) => {
      cities.value.push({ id: idCounter++, x, y });
    };

    const removeItem = (id: number) => {
      cities.value = cities.value.filter(item => item.id !== id);
    };

    const updateCity = (updatedCity: { id: number; x: number; y: number }) => {
      const city = cities.value.find(i => i.id === updatedCity.id);
      if (city) {
        city.x = updatedCity.x;
        city.y = updatedCity.y;
      }
    };

    const addStart = (x: number = 0, y: number = 0) => {
      start.value.push({ id: idCounter++, x, y });
    };

    watch(model, (newVal) => {
      const preset = salesmanPresets[newVal as keyof typeof salesmanPresets];
      if (preset) {
        start.value = [];
        preset.start.forEach(([ x, y ]) => addStart(x, y));
        cities.value = [];
        preset.cities.forEach(([ x, y ]) => addItem(x, y));
      }
    });

    if (!start.value.length) {
      addStart(0, 0);
    }

    return {
      model,
      start,
      cities,
      addItem,
      removeItem,
      updateCity,
      paramStore,
    };
  },
});
</script>

<style lang="scss" scoped>
.subsection-title {
  font-family: 'Arial', sans-serif;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 0;
  margin-top: 1vw;
}
</style>
