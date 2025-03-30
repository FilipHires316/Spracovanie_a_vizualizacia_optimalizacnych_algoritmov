import { defineStore } from 'pinia';

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

  return {
    createSolutions,
    calculateFitness,
    getProblemType,
  };
});
