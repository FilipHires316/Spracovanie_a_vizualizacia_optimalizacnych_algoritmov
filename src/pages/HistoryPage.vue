<template>
  <q-page class="items-center">
    <h5>Výsledky</h5>
    <p>{{ history.entries }}</p>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useHistory } from 'stores/history';

export default defineComponent({
  name: 'HistoryPage',

  setup() {
    const history = useHistory();

    return {
      history
    };
  },
});
</script>

<style scoped>
</style>
