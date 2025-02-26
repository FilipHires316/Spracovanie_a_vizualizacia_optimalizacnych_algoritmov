<template>
  <q-page class="row items-center justify-evenly">
    <InfoPanel
    />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import InfoPanel from 'components/InfoPanel.vue';

export default defineComponent({
  name: 'HomePage',

  components: {
    InfoPanel
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
