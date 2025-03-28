<template>
  <div class="content-container" style="margin-top: 1vw">
    <q-btn-toggle
      v-model="model"
      class="my-custom-toggle"
      spread
      no-caps
      elevated
      toggle-color="primary"
      color="white"
      text-color="primary"
      :options="[
        { label: 'Optimálne', icon: 'check', value: 'optimum' },
        { label: 'Veľa možností', icon: 'trending_up', value: 'big' },
        { label: 'Rýchly výpočet', icon: 'timer', value: 'small' },
        { label: 'Vlastné', icon: 'tuned', value: 'own' },
      ]"
    ></q-btn-toggle>

    <h5 class="subsection-title">Počiatočné / Koncové mesto:</h5>

    <div v-for="item in start" :key="item.id">
      <CityItem
        :itemId="item.id"
        :initX="item.x"
        :initY="item.y"
      />
    </div>

    <h5 class="subsection-title">Ostatné mestá:</h5>

    <div v-for="item in items" :key="item.id">
      <CityItem
        :itemId="item.id"
        :initX="item.x"
        :initY="item.y"
        @delete="removeItem"
      />
    </div>

    <q-btn
      icon="add"
      color="green"
      text-color="white"
      size="lg"
      class="q-mb-md custom-button"
      style="margin-top: 1vw; margin-left: 41%"
      @click="addItem()"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import CityItem from 'components/paramSelection/CityItem.vue'
import { salesmanPresets } from 'stores/presets/salesmanPresets'
import { useParamStore } from 'stores/paramStore'

export default defineComponent({
  name: 'SalesmanParams',
  components: {
    CityItem,
  },

  setup() {
    const model = ref<string | null>(null)
    const items = ref<{ id: number; x: number; y: number }[]>([])
    const start = ref<{ id: number; x: number; y: number }[]>([])
    let idCounter = 0
    const paramStore = useParamStore

    const addItem = (x: number = 0, y: number = 0) => {
      items.value.push({ id: idCounter++, x, y })
    }

    const addStart = (x: number = 0, y: number = 0) => {
      start.value.push({ id: idCounter++, x, y })
    }

    const removeItem = (id: number) => {
      items.value = items.value.filter((item) => item.id !== id)
    }

    watch(model, (newVal) => {
      const preset = salesmanPresets[newVal as keyof typeof salesmanPresets]
      if (preset) {
        items.value = []
        start.value = []
        preset.cities.forEach(([x, y]) => {
          addItem(x, y)
        })
        preset.start.forEach(([x, y]) => {
         addStart(x, y)
        })
      }
    })

    addStart(0, 0)

    return {
      model,
      items,
      start,
      addItem,
      removeItem,
      addStart,
      paramStore,
    }
  },
})
</script>

<style lang="scss" scoped>
.subsection-title {
  font-family: 'Arial', sans-serif;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 0;
  margin-top: 1vw;
}
</style>
