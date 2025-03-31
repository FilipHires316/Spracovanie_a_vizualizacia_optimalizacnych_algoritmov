import { defineStore } from 'pinia';
import { useParamStore } from 'stores/paramStore'

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
    if (!paramStore.knapsackItems) {
      throw new Error("knapsackItems is undefined");
    }
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

  return {
    createSolutions,
    calculateFitness,
    getProblemType,
  };
});
