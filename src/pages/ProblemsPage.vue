<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-md-6 col-xs-12">
        <div class="q-pa-md bg-primary text-white shadow-2 rounded-borders flex column items-center justify-center" style="padding-bottom: 3vw; text-align: center;">
          <h4 class="section-title">Vstupné parametre optimalizačného algoritmu</h4>
          <q-tabs inline-label class="bg-primary text-white" shrink style=" width: 100%; padding-left: 3vw; padding-right: 3vw">
            <q-tab name="Genetický" icon="science" label="Genetický" style="white-space: nowrap;" />
            <q-tab name="Levy" icon="pets" label="Inšpirovaný levmi" style="white-space: nowrap;" />
            <q-tab name="Veľryby" icon="waves" label="Inšpirovaný veľrybami" style="white-space: nowrap;" />
          </q-tabs>
          <GeneticParams></GeneticParams>
        </div>
      </div>

      <div class="col-md-6 col-xs-12">
        <div class="q-pa-md bg-primary text-white shadow-2 rounded-borders flex column items-center justify-center" style="padding-bottom: 435px; text-align: center;">
          <h4 class="section-title">Vstupné parametre optimalizačného problému</h4>
          <q-tabs inline-label class="bg-primary text-white" shrink>
            <q-tab name="Batoh" icon="shopping_bag" label="Batoh" style="white-space: nowrap; max-width: 200px; overflow: hidden; text-overflow: ellipsis;" />
            <q-tab name="Koše" icon="delete" label="Koše" style="white-space: nowrap; max-width: 200px; overflow: hidden; text-overflow: ellipsis;" />
            <q-tab name="Obchodný cestujúci" icon="flight_takeoff" label="Obchodný cestujúci" style="white-space: nowrap; max-width: 200px; overflow: hidden; text-overflow: ellipsis;" />
          </q-tabs>
        </div>
      </div>
    </div>
    <div class="button-container">
      <q-btn
        icon="play_arrow"
        round
        color="primary"
        size="20px"
        class="q-mb-md"
        style="margin-top: 1vw"
      />
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue';
import GeneticParams from 'components/GeneticParams.vue'

export default defineComponent({
  name: 'ProblemsPage',

  components: {
    GeneticParams,
  },

  setup() {
    const todos = ref([]);
    const meta = ref({});

    return { todos, meta };
  }
});
</script>

<style scoped>
.section-title {
  font-family: 'Arial', sans-serif;
  font-size: 27px;
  font-weight: bold;
  margin-bottom: 1vw;
  color: white;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 1vw;
  margin-top: 1vw;
  margin-bottom: 2vw;
}
</style>

