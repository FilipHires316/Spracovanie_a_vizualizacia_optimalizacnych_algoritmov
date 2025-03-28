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
        { label: 'Vlastné', icon: 'tuned', value: 'own' },
      ]"
    />

    <q-input
      filled
      v-model="capacity"
      label="Kapacita batohu"
      stack-label
      dense
      class="bg-white text-primary"
      style="margin-top: 10px;"
    />

    <h5 class="subsection-title">Predmety:</h5>

    <div v-for="(item) in items" :key="item.id">
      <KnapsackItem
        :itemId="item.id"
        :initSize="item.size"
        :initPrice="item.price"
        @delete="removeItem"
      />
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
import KnapsackItem from 'components/paramSelection/KnapsackItem.vue';
import { knapsackPresets } from 'stores/presets/knapsackPresets';
import { useParamStore } from 'stores/paramStore'

export default defineComponent({
  name: 'KnapsackParams',
  components: {
    KnapsackItem
  },

  setup() {
    const model = ref<string | null>(null);
    const capacity = ref<number | null>(null);
    const items = ref<{ id: number; size: number; price: number }[]>([]);
    let idCounter = 0;
    const paramStore = useParamStore

    const addItem = (size: number = 0, price: number = 0) => {
      items.value.push({ id: idCounter++, size, price });
    };

    const removeItem = (id: number) => {
      items.value = items.value.filter(item => item.id !== id);
    };

    watch(model, (newVal) => {
      const preset = knapsackPresets[newVal as keyof typeof knapsackPresets];
      if (preset) {
        capacity.value = preset.capacity;
        items.value = [];
        preset.items.forEach(([ size, price ]) => {
          addItem(size, price);
        });
      }
    });

    return {
      model,
      capacity,
      items,
      addItem,
      removeItem,
      paramStore,
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
