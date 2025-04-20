import { storeToRefs } from 'pinia';
import { useKnapsackProblem } from 'stores/problems/knapsackProblem';
import { useBinProblem } from 'stores/problems/binProblem';
import { useSalesmanProblem } from 'stores/problems/salesmanProblem';
import { geneticAlgorithm } from 'stores/algorithms/geneticAlgorithm';
import { lionAlgorithm } from 'stores/algorithms/lionAlgorithm';
import { whaleAlgorithm } from 'stores/algorithms/whaleAlgorithm';
import { useParamStore } from 'stores/paramStore'
import { useHistory } from 'stores/history'
import type { Lion } from 'stores/individuals/lion'
import type { Whale } from 'stores/individuals/whale'
import type { Chromosome } from 'stores/individuals/chromosome'
import { HistoryEntry } from 'stores/individuals/HistoryEntry'

let problemToSolve:
  | ReturnType<typeof useKnapsackProblem>
  | ReturnType<typeof useBinProblem>
  | ReturnType<typeof useSalesmanProblem>
  | null = null;

// function that decides which algorithm function will be called and for which problem also saves results to history
export const solve = () => {
  const paramStore = useParamStore();
  const history = useHistory();
  const { algorithm, problem } = storeToRefs(paramStore);
  let populationHistory: Chromosome[][] | Lion[][] | Whale[][] = []
  let result: HistoryEntry = new HistoryEntry([], 'none', 'none', [])
 // defining which problem is being solved
  if (problem.value === 'knapsack') {
    problemToSolve = useKnapsackProblem();
  } else if (problem.value === 'bin') {
    problemToSolve = useBinProblem();
  } else if (problem.value === 'salesman') {
    problemToSolve = useSalesmanProblem();
  }
  // calling algorithm that solves problem and saves it result
  if (problemToSolve) {
    let tempHistory;
    if (algorithm.value === 'genetic') {
      tempHistory = geneticAlgorithm(problemToSolve);
    } else if (algorithm.value === 'lion') {
      tempHistory = lionAlgorithm(problemToSolve);
    } else if (algorithm.value === 'whale') {
      tempHistory = whaleAlgorithm(problemToSolve);
    }
    if (tempHistory !== undefined) {
      populationHistory = tempHistory;
    }
    // creating and saving all data needed for visualisation based on algorithm and problem
    const { entries } = storeToRefs(history);
    const visSolution: number[][][][] = []
    let count = 0;
    let capacity = 0;
    let averageWeight = 0;
    let averagePrice = 0;
    if (problemToSolve.getProblemType() == 'Batoh') {
      count = paramStore.knapsackItems.length;
      capacity = paramStore.capacity as number
      let totalWeight = 0;
      let totalPrice = 0;
      paramStore.knapsackItems.forEach(item => {
        totalPrice += item.price;
        totalWeight += item.size;
      })
      averageWeight = Math.round((totalWeight / paramStore.knapsackItems.length) * 100) / 100;
      averagePrice = Math.round((totalPrice / paramStore.knapsackItems.length) * 100) / 100;
      populationHistory.forEach(generation => {
        const gen: number[][][] = []
        generation.forEach(individual => {
          const sol: number[][] = []
          individual.solution.forEach((index, i) => {
            if (index == 1) {
              sol.push([paramStore.knapsackItems[i]?.price ?? 0, paramStore.knapsackItems[i]?.size ?? 0]);
            }
          })
          gen.push(sol)
        })
        visSolution.push(gen)
      })
    }
    if (problemToSolve.getProblemType() == 'Koše') {
      count = paramStore.binItems.length;
      capacity = paramStore.capacity as number
      let totalWeight = 0;
      paramStore.binItems.forEach(item => {
        totalWeight += item.size;
      })
      averageWeight = Math.round((totalWeight / paramStore.binItems.length) * 100) / 100;
      populationHistory.forEach(generation => {
        const gen: number[][][] = []
        generation.forEach(individual => {
          const sol: number[][] = []
          for (let i = 0; i < Math.max(...individual.solution); i++) {
            sol.push([])
          }
          individual.solution.forEach((index, i) => {
            sol[index - 1]?.push(paramStore.binItems[i]?.size ?? 0);
          })
          gen.push(sol)
        })
        visSolution.push(gen)
      })
    }
    if (problemToSolve.getProblemType() == 'Obchodný cestujúci') {
      count = paramStore.cities.length + 1;
      populationHistory.forEach(generation => {
        const gen: number[][][] = []
        generation.forEach(individual => {
          const sol: number[][] = [[paramStore.start[0]?.x ?? 0, paramStore.start[0]?.y ?? 0]]
          individual.solution.forEach(index => {
            sol.push([paramStore.cities[index]?.x ?? 0, paramStore.cities[index]?.y ?? 0]);
          })
          gen.push(sol)
        })
        visSolution.push(gen)
      })
    }
    const fitness: number[][] = []
    populationHistory.forEach(generation => {
      const currentFitness: number[] = []
      generation.forEach(individual => {
        currentFitness.push(individual.fitness);
      })
      fitness.push(currentFitness)
    })
    if (algorithm.value === 'genetic')
      {result = new HistoryEntry(visSolution, 'Genetický', problemToSolve.getProblemType(), fitness, { mutation: paramStore.mutation as number, elitism: paramStore.showNewInput, elitismRate: paramStore.elitism as number, choose: paramStore.choose as string, crossing: paramStore.crossing as string, count: count, capacity: capacity, averageWeight: averageWeight, averagePrice: averagePrice});
    } else if (algorithm.value === 'lion') {
      result = new HistoryEntry(visSolution, 'Levy', problemToSolve.getProblemType(), fitness, {packs: paramStore.packs as number, females: paramStore.females as number, males: paramStore.males as number, hunters: paramStore.hunters as number, count: count, capacity: capacity, averageWeight: averageWeight, averagePrice: averagePrice})
    } else if (algorithm.value === 'whale') {
      result = new HistoryEntry(visSolution, 'Veľryby', problemToSolve.getProblemType(), fitness, {count: count, capacity: capacity, averageWeight: averageWeight, averagePrice: averagePrice})
    }
    populationHistory.forEach(entry => {
      let max = 0
      let average = 0
      entry.forEach(individual => {
        if (individual.fitness > max)
          max = individual.fitness
        average += individual.fitness
      })
      average = average / entry.length
      result.bestFitness.push(max)
      result.averageFitness.push(average)
      max = 0
      average = 0
    })
    // finally saving data to history storage
    entries.value.push(result)
  }
};
