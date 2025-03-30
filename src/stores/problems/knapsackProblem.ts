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

  const calculateFitness = () => {
    return
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
