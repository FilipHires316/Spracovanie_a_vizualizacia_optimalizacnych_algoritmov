import { defineStore } from 'pinia';
import type { Chromosome } from 'stores/individuals/chromosome'
import { useParamStore } from 'stores/paramStore'

export const useSalesmanProblem = defineStore('salesmanProblem', () => {

  const paramStore = useParamStore();

  const createSolutions = (): number[][] => {
    const solutions: number[][] = [];
    let counter: number = 0;

    if (paramStore.population) {
      while (solutions.length < paramStore.population) {
        const currentSolution: number[] = Array.from({ length: paramStore.cities.length + 1 }, (_, index) => index);
        if (!solutions.some(sol => sol.every((val, index) => val === currentSolution[index]))) {
          solutions.push(currentSolution);
          counter = 0;
        } else {
          counter++;
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
    return 'salesman'
  };

  const mutate = (population: Chromosome[], mutationRate: number) => {
    console.log(mutationRate)
    return population
  };

  return {
    mutate,
    createSolutions,
    calculateFitness,
    getProblemType,
  };
});
