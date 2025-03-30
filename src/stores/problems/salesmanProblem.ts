import { defineStore } from 'pinia';

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

  return {
    createSolutions,
    calculateFitness,
    getProblemType,
  };
});
