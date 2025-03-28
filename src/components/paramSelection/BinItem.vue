<template>
  <div style="margin-top: 10px; display: flex; align-items: center;">
    <q-input
      filled
      v-model="size"
      label="Veľkosť predmetu"
      stack-label
      dense
      class="bg-white text-primary"
      style="margin-top: 0; margin-right: 1vw; width: 99%"
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
import { defineComponent, ref, toRefs } from 'vue';

export default defineComponent({
  name: 'BinItem',
  props: {
    itemId: { type: Number, required: true }, // Unique ID for the item
    initSize: { type: Number, default: 0 },
  },
  setup(props, { emit }) {
    const { initSize } = toRefs(props); // Convert props to reactive
    const size = ref(initSize.value);

    // Emit event to parent when delete button is clicked
    const deleteItem = () => {
      emit('delete', props.itemId);
    };

    return {
      size,
      deleteItem
    };
  }
});
</script>


<style lang="scss" scoped>
</style>
