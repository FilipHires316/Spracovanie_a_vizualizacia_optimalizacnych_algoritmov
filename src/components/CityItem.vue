<template>
  <div style="margin-top: 10px; display: flex; align-items: center;">
    <q-input
      filled
      v-model="size"
      label="Súradnica X"
      stack-label
      dense
      class="bg-white text-primary"
      style="margin-top: 0; margin-right: 1vw; width: 48%"
    />
    <q-input
      filled
      v-model="price"
      label="Súradnica Y"
      stack-label
      dense
      class="bg-white text-primary"
      style="margin-top: 0; width: 48%"
    />
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
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'CityItem',
  props: {
    showButton: {
      type: Boolean,
      default: true,
    },
    itemId: Number // Unique ID for the item
  },
  setup(props, { emit }) {
    const size = ref(0);
    const price = ref(0);

    // Emit event to parent when delete button is clicked
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
