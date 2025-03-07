<template>
  <div class="content-container" style="margin-top: 1vw">
    <q-btn-toggle
      v-model="model"
      class="my-custom-toggle"
      spread
      no-caps
      glossy
      unelevated
      toggle-color="primary"
      color="white"
      text-color="primary"
      :options="[
        { label: 'Optimálne', icon: 'check', value: 'optimum' },
        { label: 'Veľa možností', icon: 'trending_up', value: 'big' },
        { label: 'Rýchly výpočet', icon: 'timer', value: 'small' },
        { label: 'Vlastné', icon: 'tuned', value: 'own' },
      ]"
    ></q-btn-toggle>

    <q-input
      filled
      v-model="capacity"
      label="Kapacita batohu"
      stack-label
      dense
      class="bg-white text-primary"
      style="margin-top: 10px;"
    />

    <h5 class="subsection-title">Počiatočné / Koncové mesto:</h5>

    <CityItem :show-button="false"/>

    <h5 class="subsection-title">Ostatné body:</h5>

    <div v-for="(item) in items" :key="item.id">
      <CityItem :itemId="item.id" @delete="removeItem" />
    </div>

    <q-btn
      icon="add"
      color="green"
      text-color="white"
      size="lg"
      class="q-mb-md custom-button"
      style="margin-top: 1vw; margin-left: 41%"
      @click="addItem"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CityItem from 'components/CityItem.vue';

export default defineComponent({
  name: 'SalesmanParams',
  components: {
    CityItem
  },

  setup() {
    const model = ref("optimum");
    const capacity = ref(100);
    const items = ref<{ id: number }[]>([]); // Array to track added items
    let idCounter = 0; // Unique ID counter

    // Function to add a new item
    const addItem = () => {
      items.value.push({ id: idCounter++ });
    };

    // Function to remove an item based on ID
    const removeItem = (id: number) => {
      items.value = items.value.filter(item => item.id !== id);
    };

    return {
      model,
      capacity,
      items,
      addItem,
      removeItem
    };
  }
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
