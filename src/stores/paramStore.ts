import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router'

export const useParamStore = defineStore('paramStore', () => {
  const algorithm = ref<string | null>(null);
  const problem = ref<string | null>(null);
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
  const males = ref<number | null>(null); // false means hidden, true means shown
  const hunters = ref<number | null>(null);
  const capacity = ref<number | null>(null);
  const knapsackItems = ref<{ id: number; size: number; price: number }[]>([]);
  const binItems = ref<{ id: number; size: number }[]>([]);
  const cities = ref<{id: number; x: number; y: number }[]>([]);
  const start = ref<{ id: number; x: number; y: number }[]>([]);

  // Add the reset function
  const resetStore = () => {
    iterations.value = null;
    population.value = null;
    mutation.value = null;
    showNewInput.value = false;
    elitism.value = null;
    choose.value = null;
    tournamentSize.value = null;
    crossing.value = null;
    packs.value = null;
    females.value = null;
    males.value = null;
    hunters.value = null;
    capacity.value = null;
    knapsackItems.value = [];
    binItems.value = [];
    cities.value = [];
    start.value = [];
  };
  const router = useRouter();
  const checkInputs = () => {
    let check = true;
    if (algorithm.value === 'genetic') {
      if (
        (iterations.value === null || iterations.value < 1) ||
        (population.value === null || population.value < 20) ||
        mutation.value === null ||
        choose.value === null ||
        (choose.value === 'tournament' && (tournamentSize.value === null || tournamentSize.value < 2)) ||
        crossing.value === null
      ) {
        check = false;
      }
    }
    if (algorithm.value === 'lion') {
      if (
        (iterations.value === null || iterations.value < 1) ||
        (packs.value === null || packs.value < 5) ||
        (females.value === null || females.value < 3) ||
        (males.value === null || males.value < 1) ||
        (hunters.value === null || hunters.value < 20)
      ) {
        check = false;
      }
    }
    if (algorithm.value === 'whale') {
      if (
        (iterations.value === null || iterations.value < 1) ||
        (population.value === null || population.value < 2)
      ) {
        check = false;
      }
    }
    if (check && algorithm.value !== null && problem.value !== null) {
      void router.push('/History');
    }
  };

  return {
    algorithm,
    problem,
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
    knapsackItems,
    binItems,
    cities,
    start,
    resetStore,
    checkInputs,
  };
});
