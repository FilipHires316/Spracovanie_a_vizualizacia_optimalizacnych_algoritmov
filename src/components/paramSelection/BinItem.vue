<template>
  <div style="margin-top: 10px; display: flex; align-items: center;">
    <q-input
      filled
      v-model="localSize"
      label="Veľkosť predmetu"
      stack-label
      dense
      type="number"
      class="bg-white text-primary"
      style="margin-top: 0; margin-right: 1vw; width: 99%"
      :rules="[val => (val !== null && val >= 0) || 'Veľkosť nesmie byť záporná']"
      hide-bottom-space
    />
    <q-btn
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
  name: 'BinItem',
  props: {
    item: { type: Object, required: true },
  },
  setup(props, { emit }) {
    const localSize = ref(props.item.size);

    watch(localSize, (newVal) => {
      emit('update', { id: props.item.id, size: Number(newVal) });
    });

    watch(
      () => props.item,
      (newItem) => {
        localSize.value = newItem.size;
      },
      { deep: true }
    );

    const deleteItem = () => {
      emit('delete', props.item.id);
    };

    return {
      localSize,
      deleteItem,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
