import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useParamStore = defineStore('paramStore', () => {
  const model = ref<string | null>(null);
  const iterations = ref<number | null>(null);
  const population = ref<number | null>(null);
  const mutation = ref<number | null>(null);
  const showNewInput = ref<boolean>(false);
  const elitism = ref<number | null>(null);
  const choose = ref<string | null>(null);
  const tournamentSize = ref<number | null>(null);
  const crossing = ref<string | null>(null);
  const packs = ref<number | null>(null);
  const females = ref<number | null>(null);
  const males = ref<number | null>(null);// false means hidden, true means shown
  const hunters = ref<number | null>(null);
  const capacity = ref<number | null>(null);
  const items = ref<{ id: number; size: number; price: number }[]>([]);
  const start = ref<{ id: number; x: number; y: number }[]>([])

  return {
    model,
    iterations,
    population,
    mutation,
    showNewInput,
    elitism,
    choose,
    tournamentSize,
    crossing,
    packs,
    females,
    males,
    hunters,
    capacity,
    items,
    start,
  };
});
