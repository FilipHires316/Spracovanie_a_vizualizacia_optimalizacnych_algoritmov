import { defineStore } from 'pinia';
import { useParamStore } from 'stores/paramStore'
import { Chromosome } from 'stores/individuals/chromosome'

export const useKnapsackProblem = defineStore('knapsackProblem', () => {

  const paramStore = useParamStore();

  const createSolutions = (): number[][] => {
    const solutions: number[][] = [];
    let counter: number = 0;
    if (paramStore.population) {
      while (solutions.length < paramStore.population) {
        const currentSolution: number[] = [];
        for (let i = 0; i < paramStore.knapsackItems.length; i++) {
          currentSolution.push(Math.random() < 0.5 ? 0 : 1);
        }
        if (!solutions.some(sol => sol.every((val, index) => val === currentSolution[index]))) {
          solutions.push(currentSolution);
          counter = 0;
        }
        else {
          counter++
          if (counter > 100) {
            return solutions;
          }
        }
      }
    }
    return solutions;
  };

  const calculateFitness = (solution: number[], iteration: number) => {
    let totalSize = 0;
    let totalPrice = 0;
    for (let i = 0; i < solution.length; i++) {
      if (solution[i] === 1) {
        totalSize += paramStore.knapsackItems[i]?.size ?? 0;
        totalPrice += paramStore.knapsackItems[i]?.price ?? 0;
      }
    }
    if (paramStore.capacity && totalSize > paramStore.capacity) {
      return totalPrice * 100 - totalSize - (totalSize - paramStore.capacity * iteration * 50);
    }
    return totalPrice * 100 - totalSize;
  };


  const getProblemType = () => {
    return 'knapsack'
  };

  const mutate = (population: Chromosome[], mutationRate: number) => {
    population.forEach(individual => {
      for (let index = 0; index < individual.solution.length; index++) {
        if (Math.random() * 100 < mutationRate) {
          individual.solution[index] = individual.solution[index] === 0 ? 1 : 0;
        }
      }
    });
    return population;
  };

  return {
    mutate,
    createSolutions,
    calculateFitness,
    getProblemType,
  };
});
