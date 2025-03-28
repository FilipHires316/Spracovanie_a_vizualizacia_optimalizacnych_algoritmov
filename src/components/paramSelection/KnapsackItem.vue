<template>
  <div style="margin-top: 10px; display: flex; align-items: center;">
    <q-input
      filled
      v-model="size"
      label="Veľkosť predmetu"
      stack-label
      dense
      class="bg-white text-primary"
      style="margin-top: 0; margin-right: 1vw; width: 48%"
    />
    <q-input
      filled
      v-model="price"
      label="Cena predmetu"
      stack-label
      dense
      class="bg-white text-primary"
      style="margin-top: 0; width: 48%"
    />
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
import { defineComponent, ref, toRefs } from 'vue';

export default defineComponent({
  name: 'KnapsackItem',
  props: {
    itemId: { type: Number, required: true },
    initSize: { type: Number, default: 0 },
    initPrice: { type: Number, default: 0 }
  },
  setup(props, { emit }) {
    const { initSize, initPrice } = toRefs(props);
    const size = ref(initSize.value);
    const price = ref(initPrice.value);

    const deleteItem = () => {
      emit('delete', props.itemId);
    };

    return {
      size,
      price,
      deleteItem
    };
  }
});
</script>

<style lang="scss" scoped>
</style>
