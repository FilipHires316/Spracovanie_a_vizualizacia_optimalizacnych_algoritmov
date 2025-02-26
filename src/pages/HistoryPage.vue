<template>
  <q-page class="row items-center justify-evenly">
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'HistoryPage',

  components: {
  },

  setup() {
    const todos = ref([]);
    const meta = ref({});

    return { todos, meta };
  }
});
</script>

<style scoped>
</style>
