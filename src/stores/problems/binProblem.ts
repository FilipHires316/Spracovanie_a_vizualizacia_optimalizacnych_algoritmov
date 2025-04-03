import { defineStore } from 'pinia';
import { Chromosome } from 'stores/individuals/chromosome'

export const useBinProblem = defineStore('binProblem', () => {

  const createSolutions = () => {
    return
  };

  const calculateFitness = () => {
    return
  };

  const getProblemType = () => {
    return 'bin'
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
