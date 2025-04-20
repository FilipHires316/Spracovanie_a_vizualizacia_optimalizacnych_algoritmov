<!-- form for one item in knapsack problem -->
<template>
  <div style="margin-top: 10px; display: flex; align-items: center;">
    <!-- field for item size -->
    <q-input
      filled
      v-model.number="localSize"
      label="Veľkosť predmetu"
      stack-label
      dense
      type="number"
      class="bg-white text-primary"
      style="margin-top: 0; margin-right: 1vw; width: 48%"
      :rules="[val => (val !== null && val >= 0) || 'Veľkosť nesmie byť záporná']"
      hide-bottom-space
    />
    <!-- field for item price -->
    <q-input
      filled
      v-model.number="localPrice"
      label="Cena predmetu"
      stack-label
      dense
      type="number"
      class="bg-white text-primary"
      style="margin-top: 0; width: 48%"
      :rules="[val => (val !== null && val >= 0) || 'Cena nesmie byť záporná']"
      hide-bottom-space
    />
    <!-- button for deleting item -->
    <q-btn
      icon="remove"
      color="red"
      text-color="white"
      size="md"
      class="q-mb-md custom-button"
      style="margin-top: 0.8vw; margin-left: 2%; width: 1vw"
      @click="deleteItem"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'KnapsackItem',
  props: {
    item: { type: Object, required: true }
  },
  setup(props, { emit }) {
    const localSize = ref(props.item.size);
    const localPrice = ref(props.item.price);

    watch([localSize, localPrice], ([newSize, newPrice]) => {
      emit('update', { id: props.item.id, size: Number(newSize), price: Number(newPrice) });
    });

    watch(
      () => props.item,
      (newItem) => {
        localSize.value = newItem.size;
        localPrice.value = newItem.price;
      },
      { deep: true }
    );

    const deleteItem = () => {
      emit('delete', props.item.id);
    };

    return {
      localSize,
      localPrice,
      deleteItem
    };
  }
});
</script>

<style lang="scss" scoped>
</style>
