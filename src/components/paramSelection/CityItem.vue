<!-- form for one city in traveling salesman problem -->
<template>
  <div style="margin-top: 10px; display: flex; align-items: center;">
    <!-- field for x index -->
    <q-input
      filled
      v-model.number="localX"
      label="X"
      stack-label
      dense
      type="number"
      class="bg-white text-primary"
      style="margin-top: 0; margin-right: 1vw; width: 45%"
      :rules="[val => (val !== null && val >= 1) || 'Súradnica nesmie byť záporná']"
      hide-bottom-space
    />
    <!-- field for y index -->
    <q-input
      filled
      v-model.number="localY"
      label="Y"
      stack-label
      dense
      type="number"
      class="bg-white text-primary"
      style="margin-top: 0; width: 45%"
      :rules="[val => (val !== null && val >= 1) || 'Súradnica nesmie byť záporná']"
      hide-bottom-space
    />
    <!-- button for deleting city -->
    <q-btn
      v-if="showButton"
      icon="remove"
      color="red"
      text-color="white"
      size="md"
      class="q-mb-md custom-button"
      style="margin-top: 1vw; margin-left: 2%; width: 1vw"
      @click="deleteItem"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'CityItem',
  props: {
    item: { type: Object, required: true },
    showButton: { type: Boolean, default: true },
  },
  setup(props, { emit }) {
    const localX = ref(props.item.x);
    const localY = ref(props.item.y);

    watch([localX, localY], ([newX, newY]) => {
      emit('update', { id: props.item.id, x: Number(newX), y: Number(newY) });
    });

    watch(
      () => props.item,
      (newItem) => {
        localX.value = newItem.x;
        localY.value = newItem.y;
      },
      { deep: true }
    );

    const deleteItem = () => {
      emit('delete', props.item.id);
    };

    return {
      localX,
      localY,
      deleteItem,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
