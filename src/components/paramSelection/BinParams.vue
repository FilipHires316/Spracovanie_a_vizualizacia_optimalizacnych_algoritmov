<!-- form for bin packing parameters -->
<template>
  <div class="content-container" style="margin-top: 1vw">
    <!-- choice of preset -->
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

    <!-- field for capacity -->
    <q-input
      filled
      v-model.number="capacity"
      label="Kapacita koša"
      stack-label
      dense
      type="number"
      class="bg-white text-primary"
      style="margin-top: 10px"
      :rules="[val => (val !== null && val >= 1) || 'Kapacita musí byť aspoň 1']"
      hide-bottom-space
    />

    <h5 class="subsection-title">Predmety:</h5>

    <!-- dynamic items -->
    <div v-for="item in binItems" :key="item.id">
      <BinItem
        :item="item"
        @delete="removeItem"
        @update="updateItem"
      />
    </div>

    <!-- button for adding new item -->
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
import BinItem from 'components/paramSelection/BinItem.vue';
import { binPresets } from 'stores/presets/binPresets';
import { useParamStore } from 'stores/paramStore';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'BinParams',
  components: {
    BinItem,
  },

  setup() {
    let idCounter = 0;
    const paramStore = useParamStore();
    paramStore.resetStore(['capacity', 'binItems']);
    paramStore.problem = 'bin';

    const model = ref<string | null>(null);
    const { capacity, binItems } = storeToRefs(paramStore);

    const addItem = (size: number = 0) => {
      binItems.value.push({ id: idCounter++, size });
    };

    const removeItem = (id: number) => {
      binItems.value = binItems.value.filter(item => item.id !== id);
    };

    const updateItem = (updatedItem: { id: number; size: number }) => {
      const item = binItems.value.find(i => i.id === updatedItem.id);
      if (item) {
        item.size = updatedItem.size;
      }
    };

    watch(model, (newVal) => {
      const preset = binPresets[newVal as keyof typeof binPresets];
      if (preset) {
        capacity.value = preset.capacity;
        binItems.value = [];
        preset.items.forEach(([ size ]) => {
          addItem(size);
        });
      }
    });

    return {
      model,
      capacity,
      binItems,
      addItem,
      removeItem,
      updateItem,
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
