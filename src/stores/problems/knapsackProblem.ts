import { defineStore } from 'pinia';
import { useParamStore } from 'stores/paramStore'
import type { Chromosome } from 'stores/individuals/chromosome'
import type { Lion } from 'stores/individuals/lion'

export const useKnapsackProblem = defineStore('knapsackProblem', () => {

  const paramStore = useParamStore();

  const createSolutions = (size: number): number[][] => {
    const solutions: number[][] = [];
    let counter: number = 0;
    while (solutions.length < size) {
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
    return solutions;
  };

  const rearrange = (solution: (number | undefined)[]): number[] => {
    return solution.map(val =>
      val === undefined ? 0 : val < 0 ? 0 : val > 1 ? 1 : val
    );
  };

  const calculateFitness = (solution: number[]) => {
    let fitness = 0;
    let totalSize = 0;
    let totalPrice = 0;
    for (let i = 0; i < solution.length; i++) {
      if (solution[i] === 1) {
        totalSize += paramStore.knapsackItems[i]?.size ?? 0;
        totalPrice += paramStore.knapsackItems[i]?.price ?? 0;
      }
    }
    if (paramStore.capacity) {
     fitness = totalPrice * 100 + ((paramStore.capacity - totalSize) * 50);
    }
    if (fitness < 1) {
      return 1
    }
    return fitness
  };


  const getProblemType = () => {
    return 'knapsack'
  };

  const mutate = (population: Chromosome[] | Lion[], mutationRate: number) => {
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
    rearrange
  };
});
