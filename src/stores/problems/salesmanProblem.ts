import { defineStore } from 'pinia';
import type { Chromosome } from 'stores/individuals/chromosome'

export const useSalesmanProblem = defineStore('salesmanProblem', () => {

  const createSolutions = () => {
    return
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
