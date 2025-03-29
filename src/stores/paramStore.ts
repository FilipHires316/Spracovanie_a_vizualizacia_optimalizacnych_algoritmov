import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

type ResettableKey =
  | 'iterations'
  | 'population'
  | 'mutation'
  | 'showNewInput'
  | 'elitism'
  | 'choose'
  | 'tournamentSize'
  | 'crossing'
  | 'packs'
  | 'females'
  | 'males'
  | 'hunters'
  | 'capacity'
  | 'knapsackItems'
  | 'binItems'
  | 'cities'
  | 'start';

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
  const males = ref<number | null>(null);
  const hunters = ref<number | null>(null);
  const capacity = ref<number | null>(null);
  const knapsackItems = ref<{ id: number; size: number; price: number }[]>([]);
  const binItems = ref<{ id: number; size: number }[]>([]);
  const cities = ref<{ id: number; x: number; y: number }[]>([]);
  const start = ref<{ id: number; x: number; y: number }[]>([]);

  const resetStore = (keysToReset: ResettableKey[] = []) => {
    if (keysToReset.includes('iterations')) iterations.value = null;
    if (keysToReset.includes('population')) population.value = null;
    if (keysToReset.includes('mutation')) mutation.value = null;
    if (keysToReset.includes('showNewInput')) showNewInput.value = false;
    if (keysToReset.includes('elitism')) elitism.value = null;
    if (keysToReset.includes('choose')) choose.value = null;
    if (keysToReset.includes('tournamentSize')) tournamentSize.value = null;
    if (keysToReset.includes('crossing')) crossing.value = null;
    if (keysToReset.includes('packs')) packs.value = null;
    if (keysToReset.includes('females')) females.value = null;
    if (keysToReset.includes('males')) males.value = null;
    if (keysToReset.includes('hunters')) hunters.value = null;
    if (keysToReset.includes('capacity')) capacity.value = null;
    if (keysToReset.includes('knapsackItems')) knapsackItems.value = [];
    if (keysToReset.includes('binItems')) binItems.value = [];
    if (keysToReset.includes('cities')) cities.value = [];
    if (keysToReset.includes('start')) start.value = [];
  };

  const router = useRouter();

  const checkInputs = () => {
    let check = true;
    if (algorithm.value === 'genetic') {
      if (
        (iterations.value === null || iterations.value < 1) ||
        (population.value === null || population.value < 20) ||
        (mutation.value === null || mutation.value < 0) ||
        (elitism.value === null || elitism.value < 0) ||
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
    if (problem.value === 'knapsack') {
      if (
        (capacity.value === null || capacity.value < 1)
      ) {
        check = false;
      }
      knapsackItems.value.forEach((item) => {
        if (item.size === null || item.size < 0 || item.price === null || item.price < 0) {
          check = false;
        }
      });
    }
    if (problem.value === 'bin') {
      if (
        (capacity.value === null || capacity.value < 1)
      ) {
        check = false;
      }
      binItems.value.forEach((item) => {
        if (item.size === null || item.size < 0) {
          check = false;
        }
      });
    }
    if (problem.value === 'salesman') {
      start.value.forEach((item) => {
        if (item.x === null || item.x < 0 || item.y === null || item.y < 0) {
          check = false;
        }
      });
      cities.value.forEach((item) => {
        if (item.x === null || item.x < 0 || item.y === null || item.y < 0) {
          check = false;
        }
      });
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
