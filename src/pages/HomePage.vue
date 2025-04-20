<!-- layout of homepage -->
<template>
  <q-page class="row items-center justify-evenly">
    <InfoPanel
    />
  </q-page>
</template>

<script lang="ts">
import { defineComponent} from 'vue';
import InfoPanel from 'components/infoPanels/InfoPanel.vue';

export default defineComponent({
  name: 'HomePage',

  components: {
    InfoPanel
  },
});
</script>

<style scoped>
</style>
